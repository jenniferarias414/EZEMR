console.log("JS Connected")

const ptContainer = document.getElementById('my-patients');
const ptForm = document.getElementById('add-patient');
const firstName = document.getElementById('fname');
const lastName = document.getElementById('lname');
const ptDob = document.getElementById('dob');
const gender = document.getElementById('gender');
const ordersSelect = document.getElementById('orders');
const selectedOrdersDiv = document.getElementById('selected-orders');

let patients = [];

// Function to fetch patients from the server
function fetchPatients() {
    axios.get('http://localhost:4004/api/getPatients')
        .then(response => {
            patients = response.data;
            displayPatients();
        })
        .catch(error => {
            console.error('Error retrieving patients:', error);
        });
}

// Function to add a patient to the local list
function addPatient(patient) {
    patients.push(patient);
    displayPatients();
}

// Function to display patients on the page
function displayPatients() {
    ptContainer.innerHTML = ''; // Clear previous patients

    patients.forEach((patient, index) => {
        const ptDiv = document.createElement('div');
        const ordersDiv = document.createElement('div');

        ptDiv.innerHTML = `
            <p>${index + 1}. ${patient.firstName} ${patient.lastName}</p>
            <p>Date of Birth: ${patient.dob}</p>
            <p>Gender: ${patient.gender}</p>
        `;
        ptContainer.appendChild(ptDiv);

        ordersDiv.innerHTML = `
        <p>Orders: ${patient.orders.join(', ')}</p>
        <button type="submit">Complete</button>
        `;
        ptContainer.appendChild(ordersDiv);
    });
}

// Fetch patients on page load
fetchPatients();

ptForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const newPatient = {
        firstName: firstName.value,
        lastName: lastName.value,
        dob: ptDob.value,
        gender: gender.value,
        orders: getSelectedOrders(),
    };

    // Send the new patient data to the server
    axios.post('http://localhost:4004/api/newPatient', newPatient)
        .then(response => {
            console.log(response.data); // Log the server's response
            addPatient(newPatient); // Add the patient to the local list
        })
        .catch(error => {
            console.error('Error adding patient:', error);
        });

    // Clear the form fields
    firstName.value = '';
    lastName.value = '';
    ptDob.value = '';
    gender.value = '';
    ordersSelect.value = '';
    selectedOrdersDiv.innerHTML = '';
});

function getSelectedOrders() {
    const selectedOrders = [];
    for (let i = 0; i < ordersSelect.options.length; i++) {
        if (ordersSelect.options[i].selected) {
            selectedOrders.push(ordersSelect.options[i].text);
        }
    }
    return selectedOrders;
}

// Display selected orders on initial load
displaySelectedOrders(ordersSelect);

ordersSelect.addEventListener('change', function () {
    displaySelectedOrders(this);
});

function displaySelectedOrders(selectElement) {
    selectedOrdersDiv.innerHTML = ''; // Clear previous selections

    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].selected) {
            const orderCheckbox = document.createElement('input');
            orderCheckbox.type = 'checkbox';
            orderCheckbox.value = selectElement.options[i].value;
            orderCheckbox.disabled = true;


        }}}