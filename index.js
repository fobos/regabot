'use strict';

const Hapi = require('hapi');

const routes = require('./routes');
const botMethods = require('./methods/bot');


const server = new Hapi.Server();

server.connection({ port: process.env.PORT || 3000 });

server.route(routes);

server.method('bot.getCounter', botMethods.getCounter);

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
