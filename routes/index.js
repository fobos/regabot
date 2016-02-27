'use strict';

const cool = require('cool-ascii-faces');

const SECOND = 1000;
const MINUTE = 60 * SECOND;

const ttl = 30 * MINUTE;
let lastUpdateTime;

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => reply('Hello, world! ' + cool())
    }, {
        method: 'POST',
        path: '/rega',
        handler: (request, reply) => {
            const bot = request.server.methods.bot;
            console.log(lastUpdateTime);

            const notNeedReply = lastUpdateTime && (Date.now() - lastUpdateTime) < ttl;
            if (notNeedReply) {
                return reply();
            }

            const cnt = bot.getCounter((err, cnt) => {
                if (err) {
                    return reply();
                }
                lastUpdateTime = Date.now();

                const regPluralText = plural(cnt, ['регистрация', 'регистрации', 'регистраций']);
                return reply({
                    text: `ВОУ! У нас уже *${cnt}* ${regPluralText}! ${cool()}`
                });
            });
        }
    },{
        method: 'POST',
        path: '/regs',
        handler: (request, reply) => {
            const bot = request.server.methods.bot;
            const cnt = bot.getCounter((err, cnt) => {
                if (err) {
                    return reply();
                }

                const regPluralText = plural(cnt, ['регистрация', 'регистрации', 'регистраций']);
                return reply({
                    text: `${cool()} *${cnt}* ${regPluralText}!`
                });
            });
        }
    }
];

/**
 * Возвращет правильную плюральную форму для переданного числового значения
 *
 * @param  {Number} value Числовое значение
 * @param  {Array} choices Плюральные формы
 * @return {String} Выбранная плюральная форма
 *
 * @example
 * plural(110, ['Человек подписался', ' Человека подписались', 'Человек подписалось'])
 * вернет 'Человек подписалось'
 */
function plural(value, choices) {
    let singular = (value % 10 === 1 && value % 100 != 11);

    if (singular) {
        return choices[0];
    }

    if (choices.length === 2) {
        return choices[1];
    }

    let few = (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20));

    return few ? choices[1] : choices[2];
}
