const AWS = require('aws-sdk');
const Promise = require("bluebird");
const config = require("../config/config");
const credentials = new AWS.SharedIniFileCredentials({profile: 'whale'});
AWS.config.credentials = credentials;
ImageId = config.aws.ImageId;
KeyName = config.aws.KeyName;
SubnetId = config.aws.SubnetId;
Groups = config.aws.Groups;

class Server{
    constructor() {
        this.ec2 = new AWS.EC2({region: 'ap-northeast-2'});
        this.rds = new AWS.RDS({region: 'ap-northeast-2'});
        this.currentEc2Count = this.currentEc2Count.bind(this);
        this.addEc2 = this.addEc2.bind(this);
      }
    
    addEc2(){
        var params = {
            ImageId: ImageId, 
            MaxCount : 1,
            MinCount : 1,
            KeyName: KeyName, 
            InstanceType: "m4.xlarge", 
            NetworkInterfaces: [{
                        AssociatePublicIpAddress: true,
                        DeleteOnTermination: true,
                        DeviceIndex: 0,
                        SubnetId: SubnetId,
                        Groups: [
                            Groups
                        ]
                    }],
        
            TagSpecifications: [
                {
               ResourceType: "instance", 
               Tags: [
                  {
                 Key: "value", 
                 Value: "web"
                },
                {
                    Key: "new", 
                    Value: "true"
                   }
               ]
              }
             ]
        };
        
        this.ec2.runInstances.bind(this.ec2)(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{
                console.log(data);
            }           // successful response
            /*
            data = {
            }
            */
          });
    }

    currentEc2Count() {
           
        return Promise.promisify(this.ec2.describeInstances.bind(this.ec2))({}).then((data) => {
            let currentCount = 0;
            let tempCount = 0;
            for (let reservation of Array.from(data.Reservations)) {
                for (let instance of Array.from(reservation.Instances)) {
                    if (instance.State.Code !== 16) { continue; } // running
                    for (let tag of Array.from(instance.Tags)) {
                        if ((tag.Value.includes("web")) && (tag.Key === "Name")) {
                            currentCount += 1;
                        } 
                        else if((tag.Key === "new")) {
                            tempCount += 1;
                        }
                    }
                }
            }
    
            return new Promise((resolve, reject) => {
                resolve({
                    currentCount: currentCount,
                    tempCount : tempCount,
                })
            })
        }).catch((err) => {
            console.error(err)
        })
      }
}
module.exports = Server;