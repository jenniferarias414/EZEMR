console.log("JS Connected")

const ptContainer = document.getElementById('my-patients');
const ptForm = document.getElementById('add-patient');
const firstName = document.getElementById('fname');
const lastName = document.getElementById('lname');
const ptDob = document.getElementById('dob');
const gender = document.getElementById('gender');
const ordersSelect = document.getElementById('orders');

let patients = [];

// Function to fetch patients from the server
function fetchPatients() {
    axios.get('http://localhost:4004/api/getPatients')
        .then(response => {
            // patients = response.data;
            displayPatients(response.data);
        })
        .catch(error => {
            console.error('Error retrieving patients:', error);
        });
}


// Function to display patients on the page
function displayPatients(patients) {
    // console.log('complete order for patientId:', patientId);
    ptContainer.innerHTML = '';

    patients.forEach((patient, index) => {
        const ptDiv = document.createElement('div');
        ptDiv.classList.add('ptDiv');

        ptDiv.innerHTML = `
            <p>${index + 1}. ${patient.firstName} ${patient.lastName}</p>
            <p>Date of Birth: ${patient.dob}</p>
            <p>Gender: ${patient.gender}</p>
        `;

        const ordersContainer = document.createElement('div');
        ordersContainer.classList.add('orders-container'); // container for orders
        ptDiv.appendChild(ordersContainer);

        // Create checkboxes for each order
        patient.orders.forEach(order => {
            const orderCheckboxContainer = document.createElement('div');
            orderCheckboxContainer.classList.add('order-checkbox-container'); // container to style each checkbox and label

            const orderCheckbox = document.createElement('input');
            orderCheckbox.type = 'checkbox';
            orderCheckbox.value = order;
            orderCheckbox.id = `order-${patient.id}-${order}`; //need ID for label 
            orderCheckbox.disabled = false; // Enable the checkbox
            orderCheckbox.classList.add(`orderCheckbox-${patient.id}`)
            ptDiv.appendChild(orderCheckbox);

            const orderLabel = document.createElement('label');
            orderLabel.htmlFor = `order-${patient.id}-${order}`;
            orderLabel.textContent = order;
            ptDiv.appendChild(orderLabel);

            orderCheckboxContainer.appendChild(orderCheckbox);
            orderCheckboxContainer.appendChild(orderLabel);
            ordersContainer.appendChild(orderCheckboxContainer);
        });

        // Add complete button
        const completeButton = document.createElement('button');
        completeButton.type = 'button';
        completeButton.textContent = 'Complete';
        ptDiv.appendChild(completeButton);

        ptContainer.appendChild(ptDiv);

        //add class to elements for styling
        completeButton.classList.add('completeBtn')
        
        ptContainer.classList.add('ptContainer')
       
        

        // Attach click event listener to the complete button
        console.log('Patient ID:', patient.id);
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
            displayPatients(res.data);
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
    let checkboxes = document.querySelectorAll(`.orderCheckbox-${patientId}`)
    console.log(checkboxes)
    // console.log(ptContainer.childNodes[patientId - 1].childNodes)
    // const patient = patients.find(p => p.id === patientId); //do in backend, use delete
    const completedOrders = [];

    // Iterate through checkboxes and collect completed orders
    checkboxes.forEach(box => {
        // const checkbox = document.getElementById(`order-${order.id}`);
        if (box.checked) {
            completedOrders.push(box.value);
            // console.log(box)
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
