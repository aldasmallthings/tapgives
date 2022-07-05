/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_HISTORY_BUCKETNAME
Amplify Params - DO NOT EDIT */const AWS = require('aws-sdk');

const region = process.env.REGION
const env = process.env.ENV
const catalog = "AwsDataCatalog"// process.env.CATALOG Amplify doesnt export env variables for some reason still
const database = "tapgivescdkathenadatabase" //process.env.DATABASE same as above
const S3BucketName = process.env.STORAGE_HISTORY_BUCKETNAME

// const output = process.env.OUTPUT
const output = "s3://tapgivesathenaoutput-"+S3BucketName
// Set the region
AWS.config.update({region: region});
const athena = new AWS.Athena();
const s3 = new AWS.S3({apiVersion: '2006-03-01'});


function getBucketPath(s3Raw) {
    // input in form s3://[bucketName]/path
    // extract bucketName and path
    s3Raw = s3Raw.substring(5)
    const bucketName = s3Raw.split("/")[0]
    const path = s3Raw.substring(s3Raw.indexOf("/")+1)
    return([bucketName, path])
}
function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

exports.handler = async (event) => {
    // TODO implement
    let {userPhoneNumber, siteName, year, month, day, hour} = event.arguments
    if (userPhoneNumber == null) {
        // Making sure all inputs are 2 "digits" long
        // No longer required with revision
        // if (month < 10)
        //     month = "0"+month
        // if (day < 10 && day >= 0)
        //     day = "0"+day
        // if (hour < 10)
        //     hour = "0"+hour
        var params = {
            QueryString: "select hour, count(*) from customertransactions where sitename = '"
                + siteName + "' and year = '"
                + year + "' and month = '"
                + month + ((parseInt(day) >= 0 )?"' and day = '"+ day:"")+
                "' group by hour",
            QueryExecutionContext: {
                Catalog: catalog,
                Database: database,
            },
            ResultConfiguration: {
                EncryptionConfiguration: {
                    EncryptionOption: "SSE_S3", /* required */
                },
                OutputLocation: output
            },
        };
        const values = await athena.startQueryExecution(params).promise()
        const queryDetails = await athena.getQueryExecution(values).promise()
        const s3location = queryDetails.QueryExecution.ResultConfiguration.OutputLocation
        const [bucketName, path] = getBucketPath(s3location)
        params = {
            Bucket: bucketName,
            Key: path,
        }
        let vals = null;
        // Even when awaiting for athena to finish, you must wait a bit longer due to S3 put not being instant
        // Sometimes it takes longer than a second for s3 to upload the item, we'll give up to 5 retries then
        for (let retries = 0; retries < 5; retries++) {
            try {
                await delay(3000)
                vals = await s3.getObject(params).promise()
                break
            } catch (e) {
                console.log("Error on s3 retrieval", e)
            }
        }
        if (vals == null)
            throw new Error("Failed 5 times")

        return  vals.Body.toString('utf-8')
    } else {
        var params = {
            QueryString: "select * from customertransactions where userphonenumber = '"
                + userPhoneNumber + "'",
            QueryExecutionContext: {
                Catalog: catalog,
                Database: database,
            },
            ResultConfiguration: {
                EncryptionConfiguration: {
                    EncryptionOption: "SSE_S3", /* required */
                },
                OutputLocation: output
            },
        };
        const values = await athena.startQueryExecution(params).promise()
        const queryDetails = await athena.getQueryExecution(values).promise()
        const s3location = queryDetails.QueryExecution.ResultConfiguration.OutputLocation
        const [bucketName, path] = getBucketPath(s3location)
        params = {
            Bucket: bucketName,
            Key: path,
        }
        let vals = null;
        // Even when awaiting for athena to finish, you must wait a bit longer due to S3 put not being instant
        // Sometimes it takes longer than a second for s3 to upload the item, we'll give up to 5 retries then
        for (let retries = 0; retries < 5; retries++) {
            try {
                await delay(3000)
                vals = await s3.getObject(params).promise()
                break
            } catch (e) {
                console.log("Error on s3 retrieval", e)
            }
        }
        if (vals == null) {
            throw new Error("Failed 5 times")
        }

        return  vals.Body.toString('utf-8')
    }

};
