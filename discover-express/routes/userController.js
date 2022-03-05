const express = require("express");
const router = express.Router();
// const models = require("../models");

const users = Array();
let id = 0;

// User Post
router.post("/postUser", (req, res) => {
    // Params
    let name = req.body.name;

    console.log(req.body);

    try {
        users.push({user: { "id": id++, "name": name}});

        return res.status(201).json(users);
    } catch (error) {
          return res.status(500).json("error:" + error);
    }

});

// Users Get
router.get("/getUsers", (req, res) => {
    return res.status(201).json(users);
});


// User Get By Id
router.get("/getUserById/:id", (req, res) => {
    //Params
    let userId = req.params.id;

    try {
        let currentUser = users.find(user => user.user.id == userId);

        if(currentUser) {
            return res.status(201).json(currentUser);
        } else {
            return res.status(201).json("user not found");
        }

    } catch(error) {
        return res.status(500).json("error:" + error);
    }
});


// User Post
router.put("/updateUserById/:id", (req, res) => {
    let userId = req.params.id;

    let name = req.body.name;

    try {
        let currentUser = users.find(user => user.user.id == userId);
        if(currentUser) {
            let index = users.indexOf(currentUser);
            users[index].user.name = name;
            return res.status(201).json(users);
        } else {
            return res.status(201).json("user not found");
        }

    } catch(error) {
        return res.status(500).json("error:" + error);
    }
});


// User Delete
router.delete("/deleteUserById/:id", (req, res) => {
    let userId = req.params.id;

    try {
        let currentUser = users.find(user => user.user.id == userId);
        if(currentUser) {
            let index = users.indexOf(currentUser);
            users.splice(index, 1);
            return res.status(201).json(users);
        } else {
            return res.status(201).json("user not found");
        }

    } catch(error) {
        return res.status(500).json("error:" + error);
    }
});

module.exports = router;
