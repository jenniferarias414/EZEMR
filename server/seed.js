require('dotenv').config() 
const {CONNECTION_STRING} = process.env 
const Sequelize = require('sequelize') 
const sequelize = new Sequelize(CONNECTION_STRING) 

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        
        drop table if exists xray_order;
        drop table if exists blood_order;
        drop table if exists ekg_order;
        drop table if exists ortho_order;
        drop table if exists patient;
        drop table if exists users;

        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(20),
            password VARCHAR(500)
        );

        CREATE TABLE patient (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id),
            first_name VARCHAR(20),
            last_name VARCHAR(20),
            date_of_birth DATE,
            gender BOOLEAN
        );

        CREATE TABLE xray_order (
            id SERIAL PRIMARY KEY,
            patient_id INTEGER NOT NULL REFERENCES patient(id),
            completed BOOLEAN
        );

        CREATE TABLE blood_order (
            id SERIAL PRIMARY KEY,
            patient_id INTEGER NOT NULL REFERENCES patient(id),
            completed BOOLEAN
        );

        CREATE TABLE EKG_order (
            id SERIAL PRIMARY KEY,
            patient_id INTEGER NOT NULL REFERENCES patient(id),
            completed BOOLEAN
        );

        CREATE TABLE ortho_order (
            id SERIAL PRIMARY KEY,
            patient_id INTEGER NOT NULL REFERENCES patient(id),
            completed BOOLEAN
        );

        insert into users (username, password)
        values ('Jenny', 'Jenny123'),
            ('Dewey', 'Dewey123'),
            ('Pamela', 'Pamela123'),
            ('Billy', 'Billy123');

        insert into patient (user_id, first_name, last_name, date_of_birth, gender)
        values (1, 'Jimmy', 'Smith', '1980-03-10', true),
            (2, 'Sally', 'Hamilton', '1945-06-05', false),
            (3, 'Jessica', 'Diver', '2012-12-08', false),
            (2, 'Gary', 'Sprinkler', '1995-03-25', true);
        `).then(() => {
            console.log('DB seeded successfully!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}