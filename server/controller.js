let myPatients = []
let globalId = 1

// let orders = []
// let orderId = 1

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

    completeOrder: (req, res) => {
        const { id } = req.params;
        const { completedOrders } = req.body;

        const patientIndex = myPatients.findIndex((patient) => patient.id === parseInt(id, 10));

        if (patientIndex !== -1) {
            myPatients[patientIndex].orders = myPatients[patientIndex].orders.filter(
                (order) => !completedOrders.includes(order)
            );

            res.status(200).send(myPatients);
        } else {
            res.status(404).send("Patient not found");
        }
    },
    
    // newOrder: (req, res) => {
    //     let newOrder = req.body
    //     newOrder.id = orderId
    //     orderId++
    //     orders.push(newOrder)
    //     res.status(200).send(orders)
    // },

    // completeOrder: (req, res) => {
    //     let indexValue = orders.findIndex((order) => order.id === req.body.id)
    //     console.log(indexValue)
    //     console.log(orders[indexValue])
    //     orders.splice(indexValue, 1, req.body)
    //     res.status(200).send(orders)
    // },

}