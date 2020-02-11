// implement your API here
const express = require('express');
const cors = require('cors')


const Users = require('./data/db');

const server = express();

server.use(express.json());
server.use(cors())



// Display List of users// Tested and passed
server.get('/api/users', (req, res) =>{
    Users.find().then(users =>{
         res.status(201).json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    });
})

// Tested and good. 
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if(!userInfo.name || !userInfo.bio){
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        Users.insert(userInfo)
        .then(user => {  
            res.status(201).json(user);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "The users information could not be retrieved."})
        })   
    }
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    Users.findById(id)
     .then(users => {
         if (!users){
             return res.status(404).json({ message: "The user with the specified ID does not exist." })
         } else {
             return res.status(201).json(users)
         }
     })
     .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The users information could not be retrieved."})
    })   
})
server.delete('/api/users/:id', (req, res) =>{
    Users.remove(req.params.id)
    .then(removed => {
        if(!removed){
            return res.status(404).json({  message: "The user with the specified ID does not exist." })
        } else {
            return res.status(200).json(removed);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The users could not be removed." })
    });

})

server.put('/api/users/:id', (req, res) => {
    const userInfo = req.body;
    

    if(!userInfo.name || !userInfo.bio){
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        return Users.update(req.params.id, userInfo)
                .then(user => { 
            if (!user){
                res.status(404).json({ message: "The user with the specified ID does not exist."})
            } else{
                
                res.status(201).json(user);
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "The users information could not be retrieved."})
        })   
    }
})


const port = 5000;
server.listen(port, () => console.log(`\n API IS WORKING!!!!\n`))