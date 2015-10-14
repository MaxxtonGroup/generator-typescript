try {
	var express = require('express');
}catch(e) {
	console.log('Express framework not found!\nPlease make sure you have your dependencies installed correctly (tip try running "npm install").');
	process.exit()
}
var app = express();

console.log('#------------------------------------------------#');
console.log("#               Node + Express server            #");
console.log('#------------------------------------------------#\n');

app.use('/',express.static(__dirname + '/public'));
app.use('/vendors',express.static(__dirname + '/bower_components'));

app.listen(3000);
console.log("Listening for requests on port 3000");