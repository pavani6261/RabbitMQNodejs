var express = require('express');
var router = express.Router();
var amqp = require('amqplib');
var producer = require('./rmqProducer');
const {currentfile,logger}= require('../log4')

const { details } = require('./rmqconfig');
var execFile = require("child_process").fork;

var currentfilename;
currentfile(__filename).then((data) => {
    //current file name 
    currentfilename = data;
});

router.get('/', async(req, res) => {
    logger.info(`file :${currentfilename}, get api called`);
    try {
        for (let i = 0; i < details.length; i++) {
            
            connectionName = details[i].connectionName;
            redirectUrl = details[i].redirectUrl;
            queueName = details[i].queueName;
            programName = details[i].programName;

            let myqueue = [connectionName,redirectUrl,queueName,programName];
            var data = "data";
            fileExecute(programName,myqueue)

            // res.render('index', { title:'Output',data: myqueue});

        }

    }
    catch (error) {
        console.log(error);
    }

});


async function fileExecute  (executefile,myqueue) {

    logger.info(`file : ${currentfilename}, fileExecute function called`);

    var fileloc = __dirname+ '\\'+ executefile ;
    console.log(fileloc,"file location to be executed");
    var message;
    var child =  execFile( fileloc,[myqueue]);

    child.on('message',(msg)=>{
        console.log(msg);
        message= msg
    });
    child.on('close',(code,signal)=>{
        console.log(signal,"process is terminating");
        // child.kill(signal);
    })
    return message;
};


module.exports = router;