import * as cdk from '@aws-cdk/core';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
import * as iam from '@aws-cdk/aws-iam';
import * as glue from '@aws-cdk/aws-glue';
import * as s3 from '@aws-cdk/aws-s3';
import * as kinesisFirehose from '@aws-cdk/aws-kinesisfirehose'

export class cdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });
    // const parentStackName = new cdk.CfnParameter(this, "ParentStackName", {
    //   type: "String",
    //   description:
    //       "The name of the amplify stack that this stack is a child of",
    // });
    const dependencies: AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this,
        amplifyResourceProps.category,
        amplifyResourceProps.resourceName,
        [{
          category: "storage", // api, auth, storage, function, etc.
          resourceName: "history" // find the resource at "amplify/backend/<category>/<resourceName>"
        } /* add more dependencies as needed */]
    );
    const projectName = cdk.Fn.ref(dependencies.storage.history.BucketName)
    const tapgivesBucket = "tapgivesbucket-"+projectName
    const s3AthenaBucketName = "tapgivesathenaoutput-"+projectName

    const firehoseRole = new iam.Role(this, 'DeliveryStreamRole', {
      assumedBy: new iam.ServicePrincipal('firehose.amazonaws.com'),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSGlueServiceRole"),
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess")]
    });

    firehoseRole.addToPolicy(new iam.PolicyStatement({
      resources: ['*'],
      actions: ['glue:*']
    }));

    firehoseRole.addToPolicy(new iam.PolicyStatement({
      resources: ['*'],
      actions: ['s3:AbortMultipartUpload', 's3:GetBucketLocation', 's3:GetObject', 's3:ListBucket', 's3:ListBucketMultipartUploads', 's3:PutObject']
    }));

    const s3Bucket = new s3.CfnBucket(this, "tapgivesbucket", {
      bucketName: tapgivesBucket
    })

    const s3AthenaBucket = new s3.CfnBucket(this, "tapgivesathenaoutput", {
      bucketName: s3AthenaBucketName,
      lifecycleConfiguration: {
        rules: [
          {
            id: "Expiry rule",
            status: "Enabled",
            expirationInDays: 1
          }
        ]
      }
    })

    const twDatabase = new glue.CfnDatabase(this, 'tapgivescdkathenadatabase', {
      catalogId: this.account,
      databaseInput: {
        name: 'tapgivescdkathenadatabase'
      }
    });


    const twJsonTable = new glue.CfnTable(this, 'json_records', {
      catalogId: this.account,
      databaseName: twDatabase.ref,
      tableInput: {
        name: 'json_records',
        storageDescriptor: {
          columns: [
            {
              name: "userphonenumber",
              type: "string"
            },
            {
              name: "fullname",
              type: "string"
            },
            {
              name: "sitename",
              type: "string"
            },
            {
              name: "action",
              type: "string"
            },
            {
              name: "collectedcount",
              type: "string"
            },
            {
              name: "collecteditemtype",
              type: "string"
            },
            {
              name: "governmentid",
              type: "string"
            },
            {
              name: 'day',
              type: 'string',
            },{
              name: 'hour',
              type: 'string',
            },{
              name: 'month',
              type: 'string',
            },{
              name: 'year',
              type: 'string',
            }
          ],
          compressed: false,
          location: "s3://" + tapgivesBucket + "/data/json-records/",
          inputFormat: "org.apache.hadoop.mapred.TextInputFormat",
          outputFormat: "org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat",
          numberOfBuckets: 0,
          serdeInfo: {
            serializationLibrary: "org.openx.data.jsonserde.JsonSerDe"
          },
        }
      }})

    const twParquetTable = new glue.CfnTable(this, 'customertransactions', {
      catalogId: this.account,
      databaseName: twDatabase.ref,
      tableInput: {
        name: 'customertransactions',
        // partitionKeys: [
        //   {
        //     name: 'partition_0',
        //     comment: 'year',
        //     type: 'string',
        //   },{
        //     name: 'partition_1',
        //     comment: 'month',
        //     type: 'string',
        //   }],
        storageDescriptor: {
          columns: [
            {
              name: "userphonenumber",
              type: "string"
            },
            {
              name: "fullname",
              type: "string"
            },
            {
              name: "sitename",
              type: "string"
            },
            {
              name: "action",
              type: "string"
            },
            {
              name: "collectedcount",
              type: "string"
            },
            {
              name: "collecteditemtype",
              type: "string"
            },
            {
              name: "governmentid",
              type: "string"
            },
            {
              name: 'day',
              type: 'string',
            },{
              name: 'hour',
              type: 'string',
            },{
              name: 'month',
              type: 'string',
            },{
              name: 'year',
              type: 'string',
            }
          ],

          compressed: false,
          location: "s3://" + tapgivesBucket + '/customertransactions/',
          inputFormat: "org.apache.hadoop.hive.ql.io.parquet.MapredParquetInputFormat",
          outputFormat: "org.apache.hadoop.hive.ql.io.parquet.MapredParquetOutputFormat",
          numberOfBuckets: 0,
          serdeInfo: {
            serializationLibrary: "org.apache.hadoop.hive.ql.io.parquet.serde.ParquetHiveSerDe"
          },
        }
      }})

    const kinesis = new kinesisFirehose.CfnDeliveryStream(this, 'twFirehose', {
      deliveryStreamName: "tapgives-customertransactions",
      extendedS3DestinationConfiguration: {
        bucketArn: s3Bucket.attrArn,
        prefix: 'customertransactions/',
        // prefix: 'customertransactions/!{timestamp:yyyy/MM}/',
        errorOutputPrefix: 'FirehoseFailures/!{firehose:error-output-type}/!{firehose:random-string}/',
        roleArn: firehoseRole.roleArn,
        // dynamicPartitioningConfiguration: {
        //   enabled: true
        // },
        // processingConfiguration: {
        //   enabled: false //true,
        //   // processors: [{
        //   //   type: 'MetadataExtraction',
        //   //   parameters: [
        //   //     {
        //   //       parameterName: "MetadataExtractionQuery",
        //   //       parameterValue: "{siteName:.siteName}"
        //   //     },
        //   //     {
        //   //       parameterName: "JsonParsingEngine",
        //   //       parameterValue: "JQ-1.6"
        //   //     }
        //   //   ]
        //   // }],
        // },
        dataFormatConversionConfiguration: {
          enabled: true,
          inputFormatConfiguration: {
            deserializer: {
              openXJsonSerDe: {}
            }
          },
          outputFormatConfiguration: {
            serializer: {
              parquetSerDe: {}
            }
          },
          schemaConfiguration: {
            roleArn: firehoseRole.roleArn,
            databaseName: twDatabase.ref,
            tableName: twJsonTable.ref
          }
        }
      },
    })
    // const crawlerRole = new iam.Role(this, 'GlueCrawlerRole', {
    //   assumedBy: new iam.ServicePrincipal('glue.amazonaws.com'),
    //   managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSGlueServiceRole"),
    //     iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess")]
    // })
    //
    // const glueCrawler = new glue.CfnCrawler(this, 'tapgivesgluecrawler', {
    //   name: "tapgivesgluecrawler",
    //   databaseName: twDatabase.ref,
    //   role: crawlerRole.roleArn,
    //   targets: {
    //     s3Targets: [{
    //       path: "s3://" + tapgivesBucket + "/customertransactions/"
    //     }]
    //   },
    //   schedule: {
    //     scheduleExpression: "cron(0 5 * * ? *)",
    //   },
    //   description: "Rescans athena table monthly"
    // })
    kinesis.node.addDependency(firehoseRole);

    // Create a new SSM Parameter for firehose
  }
}