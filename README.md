# RabbitMQNodejs

Create a route/config.json file 
In Which each object has – 
•	connectionName = amqp url to connect to cloud, 
•	queueName = name of queue,
•	redirectUrl =  if you want to redirect to any api (optional ), 
•	programName = listener program name (consumer file), 
•	logfileName = file name where your logs need to be written (optional)
In route/readconfig.js

## routeconfig.js file 
reads the config file and store the data in a variable (data1[])
loop through the variable (data1) and starts executing the listener files with given programname (data1[0].programName) and 
passess connectionName,queueName,programName,logfilename to thelistener file as process arguments.
In listener file:
  store the process variables in a variable (result[]).
  connects to cloudamqp using connectionName
  creates a channel in that connection
  looks  for queue in that channel 
  if there is any message it will receive that message
 
if there are one or more objects in the config file this program will start all the files at a time
•	Api to start all process 
o	Method – Get
o	Url – http://localhost:3000/readConfig/all
o	Response – 
{ 
"data": [
        {
            "connectionName": "amqps://fdqmauic:jdUuCFJnnnQNw9WVDbHb9dHrhqYgeDp3@campbell.lmq.cloudamqp.com/fdqmauic",
            "redirectUrl": "http://localhost:3001/users",
            "queueName": "customerqueue",
            "programName": "consumeQueue4.js",
            "logfileName": "consumerQueue4.log"
        },]
}
•	Api to get all process id’s  of consumer file which are running
o	Method – get
o	Url - http://localhost:3000/readConfig/pids
o	Response – 
{
    "datatotal": [
        {
            "connectionName": "amqps://fdqmauic:jdUuCFJnnnQNw9WVDbHb9dHrhqYgeDp3@campbell.lmq.cloudamqp.com/fdqmauic",
            "redirectUrl": "http://localhost:3001/users",
            "queueName": "customerqueue",
            "programName": "consumeQueue4.js",
            "logfileName": "consumerQueue4.log",
            "pid": 3640
        },         
 ]
}
•	Api to terminate a particular process ( file which is running with processId/pid)
o	Method – post
o	Url - localhost:3000/readConfig/exit
o	Request – 
  {
    “pid” : 9140   //process id of consumer file
  }

o	Response – 
  {
    				"pid": 9496,
    				"status": "terminated"
  }
•	Api to start a particular file ( with file name )
o	Method – Post
o	Url - localhost:3000/readConfig/start
o	Request – 
{
    "filename":"consumeQueue4.js"
}

o	Response – 
  {
    "datavar": [
        {
            "connectionName": "amqps://fdqmauic:jdUuCFJnnnQNw9WVDbHb9dHrhqYgeDp3@campbell.lmq.cloudamqp.com/fdqmauic",
            "redirectUrl": "http://localhost:3001/users",
            "queueName": "customerqueue",
            "programName": "consumeQueue4.js",
            "logfileName": "consumerQueue4.log",
            "pid": 12204
        },
    "status": "started",
    "filename": "consumeQueue4.js"
  }


##Create Cloudamqp Instance

Open Cloudamqp ( https://customer.cloudamqp.com/ ) in browser.
CloudAMQP provides managed RabbitMQ and LavinMQ servers in a cloud of your choice.
It is used for message queueing.
Create an account in CloudeAMQP and signin.
•	Create an Instance with Lemming (free) plan.
•	Select data center.  Example :  Amazon web services 
•	Select region.  Example :  US -East-2 (Ohio)
•	Click on review and create Instance  button
After creating instance goto Instances - CloudAMQP then click on your instance name
You can see the overview and Amqp details. Copy the URL for further use.
Example (amqp url ) –amqps://fdqmauic:jdUuCFJnnnQNw9WVDbHb9dHrhqYgeDp3@campbell.lmq.cloudamqp.com/fdqmauic
