//import modules
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"


const app = express()
const port = 3000

// In-memory store for submissions..a submission list that will be pushed with data
const submissions = [];

//use modules
app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Backend Connected!!!')
})


// const result = await response.text();
//Text
// app.post('/submit', (req, res) => {
//     console.log("Form Data Received:", req.body); // See username & password
//     res.send("Received user data!");
// });

// const result = await response.json();
//json
app.post('/submit', (req, res) => {
    const formData = req.body;
    console.log("Form Data Received:", formData);
    submissions.push(formData);     // Save to submissions array
    res.json({ success: true, message: 'Data received', data: formData });  //send JSON data
});

// View all submissions
app.get('/submissions', (req, res) => {
    res.json(submissions);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



//when you visit here without defining the app.get(/submit,  )..you wont see data
//http://localhost:3000/submit