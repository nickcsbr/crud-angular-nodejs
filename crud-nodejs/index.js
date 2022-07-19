const { application } = require('express');
const express = require('express');
const server = express();
const jwt = require('jsonwebtoken');

const SECRET = 'rkjuhwekjn45o2385uroigjnsljk65u340895tu';

server.use(express.json());

const app = require(__dirname + '/package.json');

const courses = ['FullStack Master', 'Desenvolvimento de Games', 'Viver de Youtube'];

//Login
server.post('/login', (req, res) => {
    const token = jwt.sign({
        userId: 1
    }, SECRET, { expiresIn: 300 });
    return res.json({ auth: true, token });
});

// Return a course
server.get('/courses/:index', verifyJWT, (req, res) => {
    const { index } = req.params;

    console.log('GET course ', req.userId);

    return res.json(courses[index]);
});

// Return all courses
server.get('/courses', verifyJWT, (req, res) => {
    console.log('GET courses ', req.userId);
    
    return res.json(courses);
});

// Create new course
server.post('/courses', verifyJWT, (req, res) => {
    const { name } = req.body;

    console.log('POST course ', req.userId);

    courses.push(name);

    return res.json(courses);
});

// Update a course
server.put('/courses/:index', verifyJWT, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;
    courses[index] = name;

    console.log('PUT course ', req.userId);

    return res.json(courses);
});

//Delete a course
server.delete('/courses/:index', verifyJWT, (req, res) => {
    const { index } = req.params;
    courses.splice(index, 1);

    console.log('DELETE course ', req.userId);

    return res.json({ message: 'Course deleted'});
});

function verifyJWT(req, res, next) {
    const token = req.headers['authorization'];
    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) return res.status(401).end();
        req.userId = decoded.userId;
        next();
    })
}

console.log(app.name + ' started');

server.listen(3000);