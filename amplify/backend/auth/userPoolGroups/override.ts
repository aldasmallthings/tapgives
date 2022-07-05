import { AmplifyUserPoolGroupStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyUserPoolGroupStackTemplate) {
    const policies = [
        {
            "PolicyName": "MapAccess",
            "PolicyDocument": {
                "Statement": [
                    {
                        "Sid": "LocationPolicy",
                        "Effect": "Allow",
                        "Action": [
                            "geo:*"
                        ],
                        "Resource": "*"
                    }
                ]
            }
        }
    ]
    const AdminPolicies = [
        {
            "PolicyName": "AdminS3Policy",
            "PolicyDocument": {
                "Statement": [
                    {
                        "Sid": "LocationPolicy",
                        "Effect": "Allow",
                        "Action": [
                            "geo:*",
                            "s3:*"
                        ],
                        "Resource": "*"
                    }
                ]
            }
        }
    ]
    resources.userPoolGroupRole["SiteManagers"].addOverride("Properties.Policies", policies)
    resources.userPoolGroupRole["Admins"].addOverride("Properties.Policies", AdminPolicies)
}
