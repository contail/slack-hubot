const _ = require("lodash");

module.exports = (robot) => {

  robot.hear(/안녕/i, res => res.send("반가워"));
  robot.hear(/hi/i, res => res.send("hello"));
  const enterReplies = ['와줘서 반가워요!', 'hihihi', 'hello'];
  const leaveReplies = ['잘가요ㅜㅜ'];

  robot.enter(res => res.send(res.random(enterReplies)));
  robot.leave(res => res.send(res.random(leaveReplies)));
  
  robot.respond(/이더 운세/i, function(res) {
    const today_luck = ['이더 가즈아!', '이더 떡락예상~~', '이더 떡상 예상', "이더 팔즈아~"];
    return res.reply(res.random(today_luck));
  });

  robot.respond(/운세/i, function(res) {
    const today_luck = ['오늘은 운세 좋아보여요~!', '오늘은 그저 그래요~', '오늘은 최악입니다ㅜㅜ'];
    return res.reply(res.random(today_luck));
  });
};
