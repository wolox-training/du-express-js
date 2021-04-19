const config = require('../config');
const schemas = require('./schemas');
const paths = require('./paths');

const port = config.common.api.port || 8080;

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Witter',
    description: 'Wits and user management API',
    termsOfService: 'http://api_url/terms/',
    contact: {
      name: 'Wolox Team',
      email: 'daniel.uruena@wolox.co',
      url: 'https://www.wolox.com.ar/'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: `http://localhost:${port}/`,
      description: 'Local server'
    }
  ],
  security: [],
  tags: [
    {
      name: 'Users'
    }
  ],
  paths,
  components: {
    schemas,
    securitySchemes: {}
  }
};
