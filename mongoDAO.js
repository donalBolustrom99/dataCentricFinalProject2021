const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017';

const dbName = 'lecturersDB'
const colName = 'lecturers'

var lecturerDB
var lecturers

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then((client)=>{
    lecturerDB = client.db(dbName)
    lecturers = lecturerDB.collection(colName)
})
.catch((err)=>{
    console.log(err)
})

var getLecturers = function(){
    return new Promise((resolve, reject)=>{
        var curs = lecturers.find()
        curs.toArray()
        .then((docs)=>{
            resolve(docs)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

var addLecturer = function(_id, name, dept){
    return new Promise((resolve, reject)=>{
        lecturers.insertOne({"_id":_id, "name":name, "dept":dept})
        .then((result)=>{
            resolve(result)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

module.exports = {getLecturers, addLecturer}