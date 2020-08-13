const express = require('express');
const { request } = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

app.get('/', (req, res) => {
    res.send('Hello World 123 2546');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('Not Foud');
    res.send(course)
});

app.post('/api/courses', (req, res) => {
    if (!req.body.name || req.body.name.length <3) {
        res.status(400).send('Name is required or not less than 3 char');
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //Look up for course ID existing.
    //If not, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) { 
        res.status(404).send('Not Foud');
        return;
    }

    //Input Validation
    //In invalid, return 400 -- Bad Request
    if (!req.body.name || req.body.name.length <3) {
        res.status(400).send('Name is required or not less than 3 char');
        return;
    }

    //Update course
    //Return data to client.
    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) { 
        res.status(404).send('Not Foud');
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

})

app.listen(3000, () => console.log('Listening on port 3000'));
