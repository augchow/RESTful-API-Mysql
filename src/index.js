// import app from './config/express';
// import config from './config/config';

const app = require('./config/express');
const config = require('./config/config');

if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.log(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
  });
}

// export default app;
module.exports = app;
