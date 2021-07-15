// fs module 
var fs = require('fs');
// need path module 
var path = require('path')

var pets = require('./pets.json')

var petPath = './pets.json'

// HANDLE ERROR IF NO ARG
var arrInput = process.argv
console.log(process.argv)

// if arr[2] is empty 
if (arrInput[2] === undefined) {
    console.error('Usage: node pets.js [read | create | update | destroy]')
    //The app should exit the process with a non-zero exit code to indicate that it failed to complete any work.
    process.exitCode = 1;
}

// READ 
if (arrInput[2] === 'read' && arrInput[3] === undefined) {
    fs.readFile(petPath, 'utf8', function(error, data) {
        var dataArr = JSON.parse(data); // an array of obj
        if (error) {
            console.log(error)
        } 
        console.log(dataArr)
    })
}

// handle index of READ
if (arrInput[2] === 'read' && arrInput[3]) {
    fs.readFile(petPath, 'utf8', function(error, data) {
        var dataArr = JSON.parse(data); // an array of obj
        if (error) {
            console.log(error)
        } 
        if (typeof dataArr[arrInput[3]] === 'undefined') {
            console.error('Usage: node pets.js read INDEX')
            process.exitCode = 1;
        } else {
            console.log(dataArr[arrInput[3]])
        }
    })
}

// CREATE
if ( arrInput[2] === 'create' && ( arrInput[3] === undefined || arrInput[4] === undefined || arrInput[5] === undefined ) ) {
    fs.readFile(petPath, 'utf8', function(error, data) {
        var dataArr = JSON.parse(data); // an array of obj
        if (error) {
            console.log(error)
        } 
        console.error('Usage: node pets.js create AGE KIND NAME')
        process.exitCode = 1;
    })
} 
if ( arrInput[2] === 'create' && arrInput[3] && arrInput[4] && arrInput[5] ) {
    var obj = {};
    obj.age = arrInput[3];
    obj.kind = arrInput[4];
    obj.name = arrInput[5];
    pets.push(obj);
    // console.log(pets)
    // need write file 
    fs.writeFile(petPath, JSON.stringify(pets), function(error){
        if(error) {
            console.log(error)
        } 
        console.log(obj)
    })
}


