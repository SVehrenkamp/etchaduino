//Server Init
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

//Arduino Init
var five = require('johnny-five');
var board = new five.Board();

app.use(express.static('./'));

app.get('/', function(req, res) { 
  res.sendFile(__dirname + '/index.html');
}); 



board.on('ready', function(){

	var potent_horiz = new five.Sensor({
		pin: "A0",
		freq: 250
	});

	var potent_vert = new five.Sensor({
		pin: "A1",
		freq: 250
	});

	var tilt = new five.Sensor({
		pin: "8",
		type: "digital"

	});

	board.repl.inject({
		pot: potent_horiz
	});

	board.repl.inject({
		pot: potent_vert
	});

	var sockets = {};
	io.on('connection', function(socket) {

	  sockets[socket.id] = socket;
	  console.log("Total clients connected : ", Object.keys(sockets).length);

	  io.sockets.emit('start', [potent_horiz.value, potent_vert.value]);
	  
	  potent_horiz.on('change', function(){
		console.log(this.value, this.raw);
		io.sockets.emit('horiz-change', this.value);
	  });

	  potent_vert.on('change', function(){
		console.log(this.value, this.raw);
		io.sockets.emit('vert-change', this.value);
	  });

	  tilt.on('data', function(){
	  	if(this.value === 0){
	  		console.log('Wipe!');
	  		io.sockets.emit('wipe');
	  	};
	  });

	  socket.on('disconnect', function() {
	    delete sockets[socket.id];
	  });


	});

});



// Start the server on port 3000
http.listen(3000, function(){
	console.log('App Listening on port 3000');
});