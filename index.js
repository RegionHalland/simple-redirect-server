var http = require('http');
var csv = require('csv-to-json');

exports.init = function(options = {
		portListen: 1337,
		httpStatusCode: 301,
		csvFile: ""
	}) {

	//Array used for mapping old to new routes
	var mappings = [];

	var obj = {
		filename: options.csvFile
	};

	var callback = function (err, json) {
		var server = http.createServer(function (req, res) {
			//We take everything after the domain url
			var alias = req.url.substring(1);
			//Add missing slash
			alias = "/" + alias;

			//If we have a mapping, let's redirect the user to this page
			if (mappings[alias]) {
				res.writeHead(options.httpStatusCode, {
					location: mappings[alias]
				});
				res.end();
				return;
			}

			//If we have a group mapping, we look for a keyword then redirect all those to an url
			json.map((element) => {
				if (element.group_word_match) {
					if (alias.includes(element.group_word_match)) {
						res.writeHead(options.httpStatusCode, {
							location: element.group_url
						});
						res.end();
						return;
					}
				}
			});

			//If we don't have a match in our mappings, let's redirect to root of new site url
			if (!mappings[alias]) {
				res.writeHead(options.httpStatusCode, {
					location: json[0].new_base_url
				});
				res.end();
				return;
			}

		});

		//Listen on port
		server.listen(options.portListen);
	};
	
	//Let's parse our csv
	csv.parse(obj, callback);
}