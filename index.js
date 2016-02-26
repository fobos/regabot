'use strict';

const Hapi = require('hapi');

const bot = require('./regaCounterBot');

const server = new Hapi.Server();
server.connection({ port: process.env.POST || 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'POST',
    path: '/message',
    handler: (request, reply) => {
        reply();
    }
});

server.route({
    method: 'POST',
    path: '/rega',
    handler: bot
});


server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});



server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
