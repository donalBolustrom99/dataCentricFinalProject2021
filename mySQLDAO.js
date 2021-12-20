const mysql = require('promise-mysql')

var mods

mysql.createPool({
    connectionLimit : 3,
    host : 'localhost',
    user: 'root',
    password: '',
    database: 'collegedb'
})
.then((result)=>{
    mods = result
})
.catch((err)=>{
    console.log(err)
});

//get all modules code
var getModules = function(){
    return new Promise((resolve, reject)=>{
        mods.query('select * from module')
        .then((info)=>{
            resolve(info)
        })
        .catch((err)=>{
            reject(err)
        })
    })  
}

//look for specific thing
var getModule = function(mid){
    return new Promise((resolve, reject)=>{
        var myQuery = {
            sql: "select * from module where mid = ?",
            values: [mid]
        }
        mods.query(myQuery) //"select * from module where mid ='"+ mid+"'"
        .then((info)=>{
            resolve(info)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

//get all modules code
var getStudents = function(){
    return new Promise((resolve, reject)=>{
        mods.query('select * from student')
        .then((info)=>{
            resolve(info)
        })
        .catch((err)=>{
            reject(err)
        })
    })  
}

//finding specific student
var getStudent = function(sid){
    return new Promise((resolve, reject)=>{
        var myQuery = {
            sql: 'select * from student where sid = ?',
            values: [sid]
        }
        mods.query(myQuery)
        .then((result)=>{
            resolve(result)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

//adding student code sql
var addStudent = function(_id, name, gpa){
    return new Promise((resolve, reject)=>{
        student.insertOne({"_id":_id, "name":name, "gpa":gpa})
        .then((result)=>{
            resolve(result)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

//deleting student code
var deleteStudent = function(sid){
    return new Promise((resolve, reject)=>{
        var deleteQuery = {
            sql: 'delete from student where sid = ?',
            values: [sid]
        }
        mods.query(deleteQuery)
        .then((result)=>{
            resolve(result)
        })
        .catch((err)=>{
            reject(err)
        })
    })  
}

module.exports = {getModules, getModule, getStudents, getStudent, addStudent, deleteStudent}