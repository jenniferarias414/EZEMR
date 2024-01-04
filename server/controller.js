let myPatients = []
let globalId = 1

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
    

}