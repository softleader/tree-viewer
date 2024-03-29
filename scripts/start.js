var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("../webpack.config");
var fs = require("fs");
var path = require("path");
var bodyParser = require('webpack-body-parser');

var port = process.env.PORT || 3000;
var host = process.env.HOST || 'localhost';

var cfg = config();

fs.unlink(path.resolve(cfg.output.path, cfg.output.filename), function() {});

cfg.entry.app.unshift(
	"webpack-dev-server/client?http://"+host+":"+port+"/", 
	"webpack/hot/dev-server"
);

cfg.plugins.unshift(
    new webpack.HotModuleReplacementPlugin()
);

// console.log(JSON.stringify(cfg));

var compiler = webpack(cfg);

// webpack-dev-server options: https://webpack.github.io/docs/webpack-dev-server.html#api
var server = new WebpackDevServer(compiler, {
	hot: true,
	setup: function(app) {
		// Here you can access the Express app object and add your own custom middleware to it.
		// For example, to define custom handlers for some paths:
		// app.get('/some/path', function(req, res) {
		//   res.json({ custom: 'response' });
		// });
		var jsonParser = bodyParser.json();
		
		app.get('/findAll', jsonParser, function(req, res) {
			if (req.body == null) return res.sendStatus(400);
			req.body.message = "findAll data success";
			req.body.dns = ['uid=137,organizationName=technology department,dc=softleader,dc=com'
			,'uid=138,organizationName=technology department,dc=softleader,dc=com'
			,'uid=138,organizationName=technology department,dc=softleader,dc=com1'
			,'uid=139,organizationName=technology department,dc=softleader,dc=com'];
			res.send(req.body);
		});

		app.get('/test', jsonParser, function(req, res) {
			if (req.body == null) return res.sendStatus(400);
			req.body.message = "select data success";
			req.body.dns = ['uid=1,'+req.query.dn, 'uid=2,'+req.query.dn, 'uid=3,'+req.query.dn];
			console.log(req.body);
			res.send(req.body);
		});

		app.post('/test', jsonParser, function(req, res) {
			if (req.body == null) return res.sendStatus(400);
			req.body.message = "store data success";
			console.log(req.body);
			res.send(req.body);
		});
		
		app.delete('/test', jsonParser, function(req, res) {
			if (req.body == null) return res.sendStatus(400);
			req.body.message = "delete data success";
			req.body.isDelete = true;
			console.log(req.body);
			res.send(req.body);
		});
	},
	quiet: true,
	publicPath:  '/js/',
	stats: { colors: true }
});
server.listen(port, host, function(err) {
	if (err) {
		throw new Error(err);
	}
	console.log('Listening on http://' + host + ':' + port);
});