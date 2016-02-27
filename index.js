'use strict';

const Hapi = require('hapi');
const cool = require('cool-ascii-faces');

const bot = require('./regaCounterBot');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world! ' + cool());
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
    method: 'POST',
    path: '/regs',
    handler: (request, reply) => {
        reply('Ничо не знаю!');
    }
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
