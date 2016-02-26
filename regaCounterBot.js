'use strict';

const wreck = require('wreck');
const cheerio = require('cheerio');

module.exports = function (request, reply) {
    wreck.get('http://2016.codefest.ru/', {
        timeout: 3000
    }, (err, response, payload) => {
        if (err) {
            return reply();
        }

        const cnt = parsePage(payload);
        if (cnt > 0) {
            return reply(cnt);
        }

        return reply();
    });
}

function parsePage(content) {
    const $ = cheerio.load(content);
    const cntText =$('a[href="/members/"] sup').text().trim();

    return Number(cntText);
}
