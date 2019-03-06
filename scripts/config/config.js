var config = {
    "aws": {
      "KeyName": process.env.KeyName,
      "ImageId":process.env.ImageId,
      "SubnetId":process.env.SubnetId,
      "Groups":process.env.Groups,

    },
    "firebase": {
      "secret": process.env.FIREBASE_SECRET,
      "url": process.env.FIREBASE_URL
    },
    "naver": {
      "clientId": process.env.NAVER_CLIENT_ID,
      "clientSecret": process.env.NAVER_CLIENT_SECRET
    }
  };
module.exports = config;
