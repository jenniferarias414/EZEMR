// require('dotenv').config() //configuring environment to use variables
// const {CONNECTION_STRING} = process.env //processing the envir variables
// const Sequelize = require('sequelize') //this class is how we connect to a db
// const sequelize = new Sequelize(CONNECTION_STRING)

let myPatients = [{dob: 
    "07/01/1983",
    firstName: 
    "Jenny",
    gender: 
    "female",
    id: 
    1,
    lastName: 
    "Arias",
    orders: 
    ['X-Ray', 'Bloodwork']}]

let globalId = 2



module.exports = {
    newPatient: (req, res) => {
        let newPatient = req.body
        newPatient.id = globalId
        globalId++
        myPatients.push(newPatient)
        res.status(200).send(myPatients)
    },

    getPatients: (req, res) => {
        res.status(200).send(myPatients)
    },

    // getPatients: (req, res) => {
    //     sequelize.query(`
    //     SELECT * FROM patients
    //     WHERE user_id = 2;
        
    //     `).then(dbRes => res.status(200).send(dbRes[0]))
    //     .catch((err) => console.error(err))
    // },

    completeOrder: (req, res) => {
        const { id } = req.params;
        const { completedOrders } = req.body;

        console.log(id, completedOrders)

        const patientIndex = myPatients.findIndex((patient) => patient.id === +id);


        if (patientIndex !== -1) {
            myPatients[patientIndex].orders = myPatients[patientIndex].orders.filter(
                (order) => !completedOrders.includes(order)
            );

            res.status(200).send(myPatients);
        } else {
            res.status(404).send("Patient not found");
        }
    },
}


