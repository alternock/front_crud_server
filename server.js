const cors = require("cors");
const fs = require("fs");
const express = require("express");
const {
    v4: uuidv4
} = require('uuid');
const server = express();

let pathFile = "./mock.json";

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));


server.get("/all/users", (req, res) => {
    fs.readFile(pathFile, "utf-8", (err, jsonFile) => {
        if (!err) {
            let jsonString = JSON.parse(jsonFile);
            res.status(200).json({
                err: false,
                payload: jsonString
            });
        } else {
            res.status(500).json({
                err: true,
                payload: err
            });
        }
    });
});


server.get("/search/user/by/email", (req, res) => {
    let email = req.body.email;

    fs.readFile(pathFile, "utf-8", (err, jsonFile) => {
        if (!err) {
            let jsonString = JSON.parse(jsonFile);
            let user = jsonString.users.find(u => u.email === email);

            res.status(200).json({
                err: false,
                payload: user
            });
        } else {
            res.status(500).json({
                err: true,
                payload: err
            });
        }
    });
});


server.post("/create/user", (req, res) => {
    let user = {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
        country: req.body.country,
    };

    fs.readFile(pathFile, "utf-8", (err, jsonFile) => {
        if (!err) {
            let jsonString = JSON.parse(jsonFile);
            user["id"] = uuidv4().split("-")[0];
            jsonString.users.push(user);

            let jsonData = JSON.stringify(jsonString);

            fs.writeFile(pathFile, jsonData, err => {
                if (!err) {
                    res.status(200).json({
                        err: false,
                        payload: "create user success"
                    });
                } else {
                    res.status(500).json({
                        err: true,
                        payload: err
                    });
                }
            });
        } else {
            res.status(500).json({
                err: true,
                payload: err
            });
        }
    });
});


server.delete("/remove/user/by/email", (req, res) => {
    let email = req.body.email;

    fs.readFile(pathFile, "utf-8", (err, jsonFile) => {
        if (!err) {
            let jsonString = JSON.parse(jsonFile);
            jsonString.users = jsonString.users.filter(u=>{
                if(u.email !== email){
                    return u;
                }
            });

            let jsonData = JSON.stringify(jsonString);

            fs.writeFile(pathFile, jsonData, err => {
                if (!err) {
                    res.status(200).json({
                        err: false,
                        payload: "delete user success"
                    });
                } else {
                    res.status(500).json({
                        err: true,
                        payload: err
                    });
                }
            });
        } else {
            res.status(500).json({
                err: true,
                payload: err
            });
        }
    });
});


server.post("/update/user/by/email", (req, res) => {
    let user = {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
        country: req.body.country,
    };

    fs.readFile(pathFile, "utf-8", (err, jsonFile) => {
        if (!err) {
            let jsonString = JSON.parse(jsonFile);
            jsonString.users = jsonString.users.map(u=>{
                if(u.email === user.email){
                    return {...user, id: u.id};
                }else{
                  return u;
                }
            });

            let jsonData = JSON.stringify(jsonString);

            fs.writeFile(pathFile, jsonData, err => {
                if (!err) {
                    res.status(200).json({
                        err: false,
                        payload: "delete user success"
                    });
                } else {
                    res.status(500).json({
                        err: true,
                        payload: err
                    });
                }
            });
        } else {
            res.status(500).json({
                err: true,
                payload: err
            });
        }
    });
});


server.listen(5000, () => {
    console.log("start server - port: 5000");
});