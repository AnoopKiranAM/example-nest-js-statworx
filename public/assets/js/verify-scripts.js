

function populateDropdown(select, start, end) {
    for (let i = start; i <= end; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      select.appendChild(option);
    }
}

function populateDropdownYear(select, start, end) {
    for (let i = end; i >= start; i--) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      select.appendChild(option);
    }
}

const monthsList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function populateMonthDropdown(months, monthSelect) {
  months.forEach((month, index) => {
  const option = document.createElement('option');
  option.value = index + 1;
  option.textContent = month;
  monthSelect.appendChild(option);
  });
}

function populateCountryDropdown(select, data) {
  for (const country in data) {
    const option = document.createElement('option');
    // option.value = data[country];
    option.value = JSON.stringify({
      abbreviation: data[country],
      name: country,
    });
    option.textContent = country;
    select.appendChild(option);
  }
}

function populateUniveristyDropdown(select, data) {
  select.innerHTML = '';

  // Add the "Select" option at the top
  const option1 = document.createElement('option');
  option1.value = '';
  option1.textContent = 'Select'; // Set text content to "Select"
  select.appendChild(option1);

  for (const university in data) {
    const option = document.createElement('option');
    option.value = data[university];
    option.textContent = university;
    select.appendChild(option);
  }
  const option = document.createElement('option');
  option.value = 'ADD';
  option.textContent = decodeHtml(value);
  select.appendChild(option);
}

async function callSheerIdOrgSearchAPI(countryValue, universitySelect) {
  const apiUrl = `https://orgsearch.sheerid.net/rest/organization/search?country=${countryValue}&type=UNIVERSITY`;
  // const apiUrl = `https://orgsearch.sheerid.net/rest/organization/search?tags=HEI%2Cqualifying_hs%2Cqualifying_ps&country=${countryValue}&type=UNIVERSITY%2CPOST_SECONDARY%2CHIGH_SCHOOL&accountId=6523b353daa89173aa9a84cc`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const transformedData = {};
    data.forEach((entry) => {
      transformedData[entry.name] = JSON.stringify({
        id: entry.id,
        name: entry.name,
      });
    });
    populateUniveristyDropdown(universitySelect, transformedData);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

function validationHandle(day, month, year, errorMessage, verify_form_header, radio_steps, sheerid_text_logo, account_email_info) {

}

module.exports = { monthsList, populateDropdown, populateDropdownYear, populateMonthDropdown, 
  populateCountryDropdown, populateUniveristyDropdown, callSheerIdOrgSearchAPI, validationHandle }