const express = require('express'),
  debug = require('debug')('express-sequelize'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  methodOverride = require('method-override'),
  swaggerJSDoc = require('swagger-jsdoc'),
  morgan = require('morgan'),
  http = require('http'),
  path = require('path'),
  cors = require('cors'),
  db = require('./models');
<% _.each(entities, function (entity) { %>
const <%= _.camelCase(entity.name) %> = require('./routes/<%= _s.camelize(_.capitalize(entity.name)) %>');
<% }); %>

/**
 * Get port from environment and store in Express.
 */
const app = express();
const port = normalizePort(process.env.PORT || '3000');

/**
 * Get port from environment and store in Express.
 */
app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cors());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));


const options = {
  definition: {
    info: {
      title: '<%= _s.slugify(baseName) %>', // Title (required)
      version: '1.0.0', // Version (required)
    },
    schemes: ["http"]
  },
  // Path to the API docs
  // apis: ['./routes.js'],
  apis: ['./routes/*.js', 'routes.js'], // pass all in array
};
const swaggerSpec = swaggerJSDoc(options);

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


<% _.each(entities, function (entity) { %>
app.get('/<%= baseName %>/<%= _.camelCase(pluralize(entity.name)) %>', <%= _.camelCase(entity.name) %>.findAll);
app.get('/<%= baseName %>/<%= _.camelCase(entity.name) %>/:id', <%= _.camelCase(entity.name) %>.find);
app.post('/<%= baseName %>/<%= _.camelCase(entity.name) %>', <%= _.camelCase(entity.name) %>.create);
app.put('/<%= baseName %>/<%= _.camelCase(entity.name) %>/:id', <%= _.camelCase(entity.name) %>.update);
app.delete('/<%= baseName %>/<%= _.camelCase(entity.name) %>/:id', <%= _.camelCase(entity.name) %>.destroy);
<% }); %>

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

db.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port, function() {
    debug('Express server listening on port ' + server.address().port);
  });
  server.on('error', onError);
  server.on('listening', onListening);
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
}
