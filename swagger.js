const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Journal Application API',
    description: 'Journal Application',
  },
  host: 'cse341final-qxbx.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });