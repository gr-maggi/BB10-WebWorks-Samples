/*
* Copyright 2012 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var format = require('util').format,
    express = require('express'),
	fs = require("fs"),
	path = require("path"),
    app = express.createServer();


app.use(express.bodyParser());

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.post('/upload', function(req, res) {
    console.log(req.files);
    var filename = Object.keys(req.files)[0];
    console.log("filename: " + filename);
    var file = req.files[filename];
    console.log("file: " + file);
    var tmpPath = file.path;
    console.log("tmpPath: " + tmpPath);

    if (path.existsSync(tmpPath)) {
	    res.send(format('uploaded %s (%d Kb) to %s as %s'
	    , filename
	    , file.size / 1024 | 0 
	    , file.path
	    , req.body.title));    	
        fs.rename(tmpPath, __dirname + "/upload/" + filename);
    } else {
    	res.send('File not found :(', 404);
    }

});

app.listen(8080);
