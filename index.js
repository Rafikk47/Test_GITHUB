// lien du tuto https://www.youtube.com/watch?v=EcKe0xAY9GA

const express = require('express');
//const { faker } = require('faker');
const { faker } = require('@faker-js/faker');
const bodyParser = require('body-parser');
const app = express();



//List Users (ici on simule une BDD qui est une liste d'utilisateurs fausse (fake))
const users=[];

for(let i=0; i<10; i++){
    users.push(
        {
            firstname : faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email()
        }
    )

}


// Créer la versionn de notre api
const versionApi= '/api/v1';

// GET /api/v1/users cette méthode sert à récup une liste d'utilisateurs

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get(`${versionApi}/users`,(req,res)=> {
    res.json({
        data: users
    })
});


// GET /api/v1/users/:id cette méthode sert à récup un utilisateur spécifique issu d'une liste

app.get(`${versionApi}/users/:id`, (req,res) => {

    const id = req.params.id - 1;
    res.json({
        data: users[id] || null
    })
})

// POST /api/v1/users cette méthode sert à poster (rajouter) un utilisateur

app.post(`${versionApi}/users`,(req,res) => {
    
    const data = req.body;

    users.push(data);

    console.log(data);
    
    res.json({
        index: users.length,
        data: users[users.length-1]
    })
})

// PUT /api/v1/users/:id cette méthode sert à modifier les infos d'un utilisateur en fct de son id

app.put(`${versionApi}/users/:id`, (req,res) => {

    const id = req.params.id -1;
    const data = req.body;
    
    users[id]= Object.assign(users[id],data);
    
    res.json({
        data:users[id]
    })
})

// DELETE /api/v1/users/:id cette méthode sert à supprimer un utilisateur spécifique

app.delete(`${versionApi}/users/:id`, (req,res) => {

    const id = req.params.id -1;

    users.splice(id,1);

    console.log(users);
    console.log(users.length);

    res.sendStatus(200);


});

app.listen(3000,()=> console.log('Listening on port 3000'));
 