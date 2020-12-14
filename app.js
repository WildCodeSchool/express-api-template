const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const session = require('express-session');
const sessionStore = require('./sessionStore');
const { inTestEnv, inProdEnv, SERVER_PORT } = require('./env');
const handleServerInternalError = require('./middlewares/handleServerInternalError');
const handleValidationError = require('./middlewares/handleValidationError');
const handleRecordNotFoundError = require('./middlewares/handleRecordNotFoundError');

const app = express();
app.set('x-powered-by', false);

// docs
if (!inProdEnv && !inTestEnv) {
  const swaggerDocument = YAML.load('./docs/swagger.yaml');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// pre-route middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { sameSite: true, secure: inProdEnv },
  })
);

// routes
require('./routes')(app);

// post-route middlewares
app.use(handleRecordNotFoundError);
app.use(handleValidationError);
app.use(handleServerInternalError);

// server setup
const server = app.listen(SERVER_PORT, () => {
  if (!inTestEnv) {
    console.log(`Server running on port ${SERVER_PORT}`);
  }
});

// process setup
process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('uncaughtException', (error) => {
  console.error('uncaughtException', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('beforeExit', () => {
  app.close((error) => {
    if (error) console.error(JSON.stringify(error), error.stack);
  });
});

module.exports = server;
