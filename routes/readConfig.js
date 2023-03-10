
var express = require('express');
var router = express.Router();
var amqp = require('amqplib'); // importing amqplib 
var fs = require('fs');
var execFile = require("child_process").fork;  //importing child_process to execute another file simultaneously
var terminate = require('terminate');  //to terminate a process with process id
const baseClass = require('./baseClass');

const { logger, logfiles } = require('../log4');
logfiles();

//variable declaration
var processids = [];
var processid;
const fileRead = __dirname + '\\' + 'config.json';

var data1 = [];
var result1;
let i = 0;


/* reads the config file, format the data and call the file execution function */
async function readConfig(consumerfile = '') {

    try {

        var result = fs.readFileSync(fileRead, 'utf-8')  /*reads config file*/
        var data = JSON.parse(result);
        logger.info("from readconfig file");
        console.log(consumerfile)
        if (consumerfile.length < 2) {
            var i = 0;
            for (let key in data) {
                var logfileName;
                connectionName = data[key].connectionName; /*get the amqp connection string from config file*/
                redirectUrl = data[key].redirectUrl || ""; /*get the redirectUrl from config file*/
                queueName = data[key].queueName; /*get the  queueName from config file*/
                programName = data[key].programName; /*get the consumer program name from config file */
                if (data[key].logfileName) /* get the log file name of particular file; */
                {
                    logfileName = data[key].logfileName;
                }
                else logfileName = programName.split('.')[0] + '.log';

                let result1 = { connectionName: connectionName, redirectUrl: redirectUrl, queueName: queueName, programName: programName, logfileName: logfileName };
                let myqueue = [connectionName, redirectUrl, queueName, programName, logfileName]
                data1[i] = result1; /*array of data object from configfile */

                fileExecute(programName, myqueue, i) /*calling fileExecute function to execute file from each object of config file*/
                i++;

            }
            return data1;
        }
        else {

            for (let key in data) {

                if (data[key].programName == consumerfile) {

                    connectionName = data[key].connectionName; /*get the amqp connection string from config file*/
                    redirectUrl = data[key].redirectUrl || ""; /*get the redirectUrl from config file */
                    queueName = data[key].queueName; /*get the  queueName from config file */
                    programName = data[key].programName; /*get the consumer program name from config file */
                    if (data[key].hasOwnProperty(logfileName)) /* get the log file name of particular file; */
                    {
                        logfileName = data[key].logfileName;
                    }
                    else logfileName = programName + '.log';

                    console.log(queueName, "queue name");

                    let result1 = { connectionName: connectionName, redirectUrl: redirectUrl, queueName: queueName, programName: programName, logfileName: logfileName };
                    let myqueue = [connectionName, redirectUrl, queueName, programName, logfileName];

                    if (data1.length > 0) {
                        let count = 0;
                        data1.forEach(element => {
                            console.log(element, "element");
                            if (element.programName == consumerfile) {
                                element = result1;
                                console.log(element, "element which is restarted");
                                i = count;
                            }
                            count++;
                        });
                    }
                    else {
                        data1[0] = result1;
                        i = 0;
                    }
                    fileExecute(programName, myqueue, i); //calling fileExecute function to execute file from 
                                                        //each object of config file 
                    i++;
                }

            }
            return data1;
        }

    }
    catch (error) {
        console.log(error);

        return error;
    }

}


/* function to execute the file and get the process id from child process*/
async function fileExecute(executefile, myqueue, i) {

    var fileloc = __dirname + '\\' + executefile; //* adding the directory path for file name*/
    console.log(fileloc, "file location to be executed");


    var child = execFile(fileloc, [myqueue]);

    child.on('message', async (msg) => {

        data1.forEach(element => {

            if (element.programName === msg[1]) {
                element.pid = msg[0];
                console.log(element.pid, "elememt.pid")
            }
            console.log(element, "element of data1")
        });

    });

};

/*to get process ids of child process running.*/
router.get('/pids', async (req, res) => { /*to get pids of child processess*/

    console.log(data1, "data with process ids from api-/pids");

    res.status(200).json({ datatotal: data1 });
})

/*to terminate a process with pid as parameter*/
router.post('/exit', async (req, res) => {
    var stoppid = req.body.pid;

    try {

        terminate(stoppid, function (err) {
            if (err) { /* you will get an error if you did not supply a valid process.pid */
                console.log("Oopsy: " + err); //* handle errors in your preferred way. */
            }
            console.log("done");
            res.status(200).json({ pid: stoppid, status: "terminated" });
        });

    }
    catch (err) {
        res.status(500).json({ err: err, status: " error", Message: "something went wrong while terminating" })
    }
})

/* start all consumer files */
router.get('/all', async (req, res) => { 
    var queues = {};
    console.log("from get metthod");
    queues.data = await readConfig("");
    res.status(200).json(queues);
})

/** to start a particular file with filename as parameter */
router.post('/start', async (req, res) => {   
    var filename = req.body.filename;
    console.log(filename, "from re-start api");
    try {
        var datavar;
        datavar = await readConfig(filename) /*start a particular consumer file with filename*/
        console.log(datavar, "start api")
        res.status(200).json({ datavar, status: "started", filename: filename });
    }
    catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;
