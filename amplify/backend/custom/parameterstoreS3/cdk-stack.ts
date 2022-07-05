import * as cdk from '@aws-cdk/core';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import * as ssm from '@aws-cdk/aws-ssm';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
//import * as iam from '@aws-cdk/aws-iam';
//import * as sns from '@aws-cdk/aws-sns';
//import * as subs from '@aws-cdk/aws-sns-subscriptions';
//import * as sqs from '@aws-cdk/aws-sqs';

export class cdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });
    const dependacyTwo: AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this,
        amplifyResourceProps.category,
        amplifyResourceProps.resourceName,
        [{
          category: "storage", // api, auth, storage, function, etc.
          resourceName: "history" // find the resource at "amplify/backend/<category>/<resourceName>"
        } /* add more dependencies as needed */]
    );
    const BucketName = cdk.Fn.ref(dependacyTwo.storage.history.BucketName)
    new ssm.StringParameter(this, 'ParameterStoreBucketName', {
      parameterName: 'BucketName',
      stringValue: BucketName,
    });
  }
}