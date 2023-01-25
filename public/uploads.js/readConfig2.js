var Person = function() { 
    //defaults
    var _age  =  0,
        _name = 'John Doe';

    this.initialize = function(name, age) {
      _name =  name;
      _age  =  age;
    };
    
    if (arguments.length) this.initialize();
    
    //public properties. no accessors required
    this.phoneNumber = '555-224-5555';
    this.address     = '22 Acacia ave. London, England';
    
    //getters and setters
    this.getName     = function()      { return _name; };
    this.setName     = function (name) { _name = name; };
    
    //public methods
    this.addBirthday = function()      { _age++; };
    this.toString    = function()      { return `My name is ${_name}  and I am ${_age} years old.`; };
}; 


var rob = new Person('Rob', 29); 
rob.setName("Sammer");
rob._age=30;
console.log(rob.getName())
rob.addBirthday();
console.log(rob.toString())
// /  *******************************


// var express = require('express');
// var router = express.Router();
// var amqp = require('amqplib');
// var producer = require('./rmqProducer');

// const { details } = require('./rmqconfig');
// const { stdout, stdin } = require('process');
// // const { argv } = require('process');

// class queueData{
//     constructor(connectionName,redirectUrl,queueName,programName){
//         this.connectionName=connectionName;
//         this.redirectUrl = redirectUrl;
//         this.queueName = queueName;
//         this.programName = programName;
//     }
// }


// router.get('/', (req, res) => {
//     try {
//         for (let i = 0; i < 1; i++) {
            
//             connectionName = details[i].connectionName;
//             redirectUrl = details[i].redirectUrl;
//             queueName = details[i].queueName;
//             programName = details[i].programName;

//             let myqueue = [connectionName,redirectUrl,queueName,programName];

//             let dataObj = Reflect.construct(
//                 queueData,
//                 myqueue
//             );


//             fileExecute(dataObj.programName,myqueue,res);

//         }
//         // async function connect(dataObj) {
//         //     console.log(dataObj.connectionName);
//         //     const connection = await amqp.connect(
//         //         dataObj.connectionName
//         //     );
//         //     const channel = await connection.createChannel();
//         //     const result = await channel.assertQueue(dataObj.queueName);
//         //     // channel.prefetch(1);
//         //     // fileExecute(dataObj.programName,dataObj,channel,res);
            
//         // }

//     }
//     catch (error) {
//         console.log(error);
//     }

// });

// var execFile = require("child_process").fork;

// async function fileExecute  (executefile,myqueue,res) {
//     console.log("fileExecute function called");

//     var fileloc = __dirname+ '\\'+ executefile ;
//     console.log(fileloc,"file location to be executed");

//     var child =  execFile( fileloc,[myqueue]);

//     child.on('message',(msg)=>{
//         res.redirect(myqueue[1]);
//         // res.send(stdout)
//     });
    
// };


// module.exports = router;

//  *******************************
// var express = require('express');
// var router = express.Router();
// var amqp = require('amqplib');

// const { details } = require('./rmqconfig');
// const { argv } = require('process');

// var queueData = function(){
//     var _connectionName='';
//     var _redirectUrl ='';
//     var _queueName ='';
//     var _programName='';

//     this.initialize = function(connectionName,redirectUrl,queueName,programName) {
//         _connectionName = connectionName || _connectionName;
//         _redirectUrl = redirectUrl || _redirectUrl;
//         _queueName = queueName ||_queueName;
//         _programName = programName || _programName;
//       };
//       if (arguments.length) this.initialize();
//     this.getconnectionName     = function()      { return _connectionName };
//     this.setconnectionName     = function (connectionName) { _connectionName = connectionName };
//     this.getredirectUrl     = function()      { return _redirectUrl };
//     this.setredirectUrl     = function (redirectUrl) { _redirectUrl = redirectUrl};
//     this.getqueueName     = function()      { return _queueName };
//     this.setqueueName     = function (queueName) { _queueName = queueName };
//     this.getprogramName     = function()      { return _programName };
//     this.setprogramName     = function (programName) { _programName = programName };

// }

// class Reflector {
//     constructor(obj) {
//         this.getProperties = function () {
//             var properties = [];
//             for (var prop in obj) {
//                 if (typeof obj[prop] != 'function') {
//                     properties.push(prop);
//                 }
//             }
//             return properties;
//         };

//         this.getAllMethods = function () {
//             var methods = [];
//             for (var method in obj) {
//                 if (typeof obj[method] == 'function') {
//                     methods.push(method);
//                 }
//             }
//             return methods;
//         };

//         this.getOwnMethods = function () {
//             var methods = [];
//             for (var method in obj) {
//                 if (typeof obj[method] == 'function'
//                     && obj.hasOwnProperty(method)) {
//                     methods.push(method);
//                 }
//             }
//             return methods;
//         };
//     }
// }

// console.log(details[0]);
// var obj = new queueData(details[0].connectionName,details[0].redirectUrl,details[0].queueName,details[0].programName);

// var reflector = new Reflector(obj);
// console.log(reflector.getAllMethods(),"all methods in queuedata");
// console.log(obj.setconnectionName(details[0].connectionName));


// var obj = new queueData();

// router.get('/', (req, res) => {
//     try {
//         for (let i = 0; i < details.length; i++) {

//             connectionName = details[i].connectionName;
//             redirectUrl = details[i].redirectUrl;
//             queueName = details[i].queueName;
//             programName = details[i].programName;

//             let myqueue = [connectionName,redirectUrl,queueName,programName];

//             let dataObj = Reflect.construct(
//                 queueData,
//                 myqueue
//             );

//             //  connect(dataObj);
//         }
//         async function connect(dataObj) {
//             console.log(dataObj.connectionName);
//             const connection = await amqp.connect(
//                 connectionName
//             );
//             const channel = await connection.createChannel();
//             const result = await channel.assertQueue(queueName);
//             // channel.prefetch(1);

//             fileExecute(dataObj.programName,dataObj);
            
//         }

//     }
//     catch (error) {
//         console.log(error);
//     }

// });

// var execFile = require("child_process").execFile;

// const fileExecute = function(executefile,dataObj) {
//     console.log("fileExecute function called");
//     console.log(dataObj);
//     var fileloc = __dirname+ '\\'+ executefile ;
//     console.log(fileloc,"file location to be executed");

//     var child = execFile("node", [fileloc],[dataObj], function(error, stdout, stderr) {
//         if (error) {
//             throw error;
//         }
//         if(stderr){
//             console.log(`{stderr:${stderr}},stderr from execfile`);
//             res.send({ status: stderr });
//         }
//         if(stdout){
//             console.log(`${stdout}`);
//             console.log(`stdout from execfile`);
//         }
        
//     });
// };


// module.exports = router;