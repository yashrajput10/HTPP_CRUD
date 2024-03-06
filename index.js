const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
let students = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/view', (req, res) => {
  res.render('view', { students });
});

app.post('/studentForm', (req, res) => {

  let newStu = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    dob: req.body.dob,
    student_id: req.body.student_id,
    id: students.length + 1
  };

  students.push(newStu);
  res.redirect("/view");

});

app.get("/delete/:id", (req, res) => {

  const id = req.params.id;

  students = students.filter(student => student.id != id);
  res.redirect("/view");

});

app.get("/edit/:id", (req, res) => {

  const id = req.params.id;
  const student = students.find(student => student.id == id);

  res.render("edit", { student });

});

app.post("/update/:id", (req, res) => {

  const id = req.params.id;

  const updatedStudent = {
    id: parseInt(id),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    dob: req.body.dob,
    student_id: req.body.student_id
  };

  students = students.map(student => {

    if (student.id == id) {
      return updatedStudent;
    } else {
      return student;
    }

  });

  res.redirect("/view");
});

app.listen(port, () => {

  console.log("Server Start");

});
