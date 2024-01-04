// index.js
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
    ptContainer.innerHTML = '';

    patients.forEach((patient, index) => {
        const ptDiv = document.createElement('div');

        ptDiv.innerHTML = `
            <p>${index + 1}. ${patient.firstName} ${patient.lastName}</p>
            <p>Date of Birth: ${patient.dob}</p>
            <p>Gender: ${patient.gender}</p>
        `;

        // Create checkboxes for each order
        patient.orders.forEach(order => {
            const orderCheckbox = document.createElement('input');
            orderCheckbox.type = 'checkbox';
            orderCheckbox.value = order;
            orderCheckbox.id = `order-${order.id}`; // Assign a unique ID if you have order IDs
            orderCheckbox.disabled = false; // Enable the checkbox
            ptDiv.appendChild(orderCheckbox);

            const orderLabel = document.createElement('label');
            orderLabel.htmlFor = `order-${order.id}`;
            orderLabel.textContent = order;
            ptDiv.appendChild(orderLabel);
        });

        // Add complete button
        const completeButton = document.createElement('button');
        completeButton.type = 'button';
        completeButton.textContent = 'Complete';
        ptDiv.appendChild(completeButton);

        ptContainer.appendChild(ptDiv);

        // Attach click event listener to the complete button
        completeButton.addEventListener('click', () => completeOrder(patient.id));
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
        .then(res => {
            console.log(res.data);
            addPatient(newPatient);
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

function completeOrder(patientId) {
    const patient = patients.find(p => p.id === patientId);
    const completedOrders = [];

    // Iterate through checkboxes and collect completed orders
    patient.orders.forEach(order => {
        const checkbox = document.getElementById(`order-${order.id}`);
        if (checkbox.checked) {
            completedOrders.push(order);
        }
    });

    // Send the completed orders to the server
    axios.put(`http://localhost:4004/api/completeOrder/${patientId}`, { completedOrders })
        .then((res) => {
            console.log(res.data);
            fetchPatients(); // Fetch patients again to update the display
        })
        .catch((error) => {
            console.error('Error completing order:', error);
        });
}
