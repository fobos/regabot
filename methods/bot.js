'use strict';

const wreck = require('wreck');
const cheerio = require('cheerio');


module.exports = {
    getCounter(next) {
        wreck.get('http://2016.codefest.ru/', {
            timeout: 3000
        }, (err, response, payload) => {
            if (!err) {
                const cnt = parsePage(payload);
                if (cnt > 0) {
                    return next(null, cnt);
                }
            }

            return next('Не удалось получить значение каунтера');
        });
    }
};

function parsePage(content) {
    const $ = cheerio.load(content);
    const cntText =$('a[href="/members/"] sup').text().trim();

    return Number(cntText);
}
