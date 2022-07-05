/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_HISTORY_BUCKETNAME
Amplify Params - DO NOT EDIT */
const bucket = process.env.STORAGE_HISTORY_BUCKETNAME
const region = process.env.REGION
const table = process.env.API_TAPGIVESCHALLENGE_SITETABLE_NAME
// Load the AWS SDK for Node.js
let AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: region});
let s3 = new AWS.S3({apiVersion: '2006-03-01'});
let firehose = new AWS.Firehose();
let dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
let glue = new AWS.Glue({apiVersion: '2017-03-31'});
// Choose what data to store
const modelParams = {
  CustomerTransactions: ["userPhoneNumber", "fullName", "siteName", "action", "collectedCount", "collectedItemType", "status"],
  // Site: ["expectedJerrycans", "status", "nickname"],
}
function delay(milliseconds){
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}
exports.handler = async event => {
  let promiseList = []
  // console.log(event.Records[0].dynamodb)
  for (const record in event.Records) {
    if (event.Records[record].dynamodb.hasOwnProperty("NewImage")) {
      let newImage = event.Records[record].dynamodb.NewImage
      if (newImage.__typename.S in modelParams)   {
        if (newImage.action.S === "subscribe") {
          const params = {
            Key: {
              "id": {
                S: newImage.siteID.S
              }
            },
            ExpressionAttributeValues: {
              ":n": {
                N: "1"
              }
            },
            ReturnValues: "ALL_NEW",
            TableName: table,
            UpdateExpression: "SET currentSubscribers = currentSubscribers + :n"
          }
          const dynamodbPromise = dynamodb.updateItem(params).promise()
          promiseList.push(dynamodbPromise)
        } else if (newImage.action.S === "unsubscribe") {
          const params = {
            Key: {
              "id": {
                S: newImage.siteID.S
              }
            },
            ExpressionAttributeValues: {
              ":n": {
                N: "1"
              }
            },
            ReturnValues: "ALL_NEW",
            TableName: table,
            UpdateExpression: "SET currentSubscribers = currentSubscribers - :n"
          }
          const dynamodbPromise = dynamodb.updateItem(params).promise()
          promiseList.push(dynamodbPromise)
        }
        else if (newImage.action.S === "visit") {
          const type = newImage.__typename.S.toLowerCase() // get model type
          // Clean the model of unneeded values

          const model = modelParams[newImage.__typename.S].reduce((prev, currParam)=> (
              Object.assign(prev, {[currParam]: newImage[currParam][Object.keys(newImage[currParam])[0]]})
          ), {})
          const d = new Date();
          Object.assign(model, {
            day: String(d.getUTCDate()),
            hour : String(d.getUTCHours()),
            month : String(d.getUTCMonth())+1, // makes index 1 instead of index 0
            year : String(d.getUTCFullYear()),
          })
          console.log(model)
          var params = {
            DeliveryStreamName: "tapgives-"+type, /* required */
            Record: { /* required */
              Data: JSON.stringify(model)/* Strings will be Base-64 encoded on your behalf */ /* required */
            }
          }
          const firehosePromise = firehose.putRecord(params).promise().then(function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
          })
          promiseList.push(firehosePromise)
        }
        // return s3Promise
      } else {
        // return Promise.resolve('Type Error: ' + newImage.__typename.S + " not supported");
        console.log('Type Error: ' + newImage.__typename.S + " not supported")
      }
    } else {
      console.log('Type Error: ' + event.Records[record].eventName + " not supported")
    }
  }
  // return Promise.all(promiseList)
  await Promise.all(promiseList)
  // await delay(1000)
  return Promise.resolve("Sucessfully processed " + event.Records.length + " events")
};
