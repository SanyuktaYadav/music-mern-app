const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Music MERN App',
        description: 'Swagger documentation for APIs',
    },
    host: process.env.SWAGGER_HOST,
    schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js', './src/routes/auth.js', './src/routes/song.js', './src/routes/user.js']; // Your main Express app file

swaggerAutogen(outputFile, endpointsFiles, doc);
