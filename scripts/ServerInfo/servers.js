const AWS = require('aws-sdk');
const Promise = require("bluebird");
const credentials = new AWS.SharedIniFileCredentials({profile: 'your profile'});
AWS.config.credentials = credentials;

class Server{
    constructor() {
        this.ec2 = new AWS.EC2({region: 'your region (ex: ap-northeast-2)'});
        this.currentEc2Count = this.currentEc2Count.bind(this);
      }

    currentEc2Count() {
           
        return Promise.promisify(this.ec2.describeInstances.bind(this.ec2))({}).then((data) => {
            let currentCount = 0;
            
            for (let reservation of Array.from(data.Reservations)) {
                for (let instance of Array.from(reservation.Instances)) {
                    for (let tag of Array.from(instance.Tags)) {
                        if ((tag.Value.includes("web")) && (tag.Key === "Name")) {
                            currentCount += 1;
                        } 
                    }
                }
            }
            return new Promise((resolve, reject) => {
                resolve({
                    currentCount: currentCount,
                })
            })
        }).catch((err) => {
            console.error(err)
        })
      }
}
module.exports = Server;