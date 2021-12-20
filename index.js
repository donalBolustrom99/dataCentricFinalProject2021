const express = require('express')
const app = express()
const port = 3000
const mySQLDAO = require('./mySQLDAO')
const ejs = require('ejs')
const res = require('express/lib/response')
const bodyParser = require('body-parser')
const mongoDAO = require('./mongoDAO')
const { request } = require('express')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req, res) => {
    res.render('home')
  })

//main list modules page,
app.get('/listModules', (req, res)=>{
    mySQLDAO.getModules()
    .then((info)=>{
        console.log(info)
        res.render('showMods', {modules:info})
    })
    .catch((err)=>{
        res.send(err)
    })
})

app.get('/module/edit/:_id', (req, res)=>{
    res.render('updateMods')
})

//getting and displayed the students in the database
app.get('/listStudents', (req, res)=>{
    mySQLDAO.getStudents()
    .then((info)=>{
        console.log(info)
        res.render('showStudents', {students:info})
    })
    .catch((err)=>{
        res.send(err)
    })
})

// //certain students
// app.get('/listStudents/:student', (req, res)=>{
//     mySQLDAO.getStudent(req.params.student)
//     .then((info)=>{
//         if (info.length >0){
//             console.log(info)
//             res.send(info)
//         }
//         else{
//             res.send("<h3>No Student Exists with SID " + req.params.student)
//         }
//     })
//     .catch((err)=>{
//         res.send(err)
//     })
// })

//adding more students
app.get('/addStudent', (req, res)=>{
    res.render("addStudent")
})


app.post('/addStudent', (req, res)=>{
    mySQLDAO.addStudent(req.body._id, req.body.name, req.body.gpa)
    .then((info)=>{
        res.redirect('/listStudents')
    })
    .catch((err)=>{
        console.log(err)
        res.send("nah")
    })
})

//remove students code
app.get('listStudents/:student', (req, res)=>{
    mySQLDAO.deleteStudent(req.params.sid)
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
})

//get and list all lecturers
app.get('/listLecturers', (req, res)=>{
    mongoDAO.getLecturers()
    .then((info)=>{
        console.log(info)
        res.render('showLects', {lecturers:info})
    })
    .catch((err)=>{
        res.send(err)
    })
})

//adding add page for lecturers page with gui
app.get('/addLecturer', (req, res)=>{
    res.render("addLects")
})

//post that infomation collected
app.post('/addLecturer', (req, res)=>{
    mongoDAO.addLecturer(req.body._id, req.body.name, req.body.dept)
    .then((info)=>{
        res.redirect('/listLecturers')
    })
    .catch((err)=>{
        console.log(err)
        res.send("yikes")
    })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})