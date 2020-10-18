const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('./database/mongoose');

const Program = require('./database/models/program');
app.use(express.json());
app.use(cors());
/*
 CORS
 localhost:3000 - backend
 localhost:4200 - frontend
 */

app.get('/programs', (req, res) => {
    Program.find({})
        .then((programs) => res.send(programs))
        .catch((error) => console.log(error));
});
app.get('/programs/:programId', (req, res) => {
    Program.find({ _id: req.params.programId })
        .then((program) => res.send(program))
        .catch((error) => console.log(error));
});
app.post('/programs', (req, res) => {
    (new Program(req.body))
        .save()
        .then((program) => res.send(program))
        .catch((error) => console.log(error));
});
app.patch('/programs/:programId', (req, res) => {
    Program.findByIdAndUpdate({ '_id': req.params.programId }, { $set: req.body })
        .then((program) => res.send(program))
        .catch((error) => console.log(error));
});
app.delete('/programs/:programId', (req, res) => {
    Program.findByIdAndDelete(req.params.programId)
        .then((program) => res.send(program))
        .catch((error) => console.log(error));
});

app.listen(3000, () => console.log("Server connected on port 3000"));;