const _ = require('lodash');
const Server = require('./ServerInfo/servers');
module.exports = (robot) => {
    robot.respond(/서버 몇[대개]야/i, res => {
        res.send("잠시만 기다려주세요~ 알아보는 중이에요!");
        const server = new Server();
        server.currentEc2Count().then((counts) => {
          res.send(`총 ${counts.currentCount}대 입니다~`)
        }).catch((err) => {
          console.error(err);
        });
    });
}     