const express = require('express');
const { request } = require('express');
const Joi = require('joi');
const app = express();
const courses = require('./routes/courses');

app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views');

app.use('/api/courses', courses);

app.get('/', (req, res) => {
    //res.send('Hello World 123 2546');
    res.render('index',{title: 'My Express App', message: req.query.name});
});



app.listen(3000, () => console.log('Listening on port 3000'));
