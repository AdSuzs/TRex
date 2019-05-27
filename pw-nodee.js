const fs = require('fs')
var entrada = process.argv[2];
fs.readdir(entrada, function(err, items){
	console.log(items);
});
