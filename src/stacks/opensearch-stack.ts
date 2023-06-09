import * as cdk from 'aws-cdk-lib'
import * as cdkConstruct from 'constructs';

export interface OpenSearchStackProps extends cdk.StackProps {
  environment?: string 
}

enum PolicyType {
  Encryption="encryption",
  Network="network"
}

const accessPolicyType = "data"

export class OpenSearchStack extends cdk.Stack {
  constructor(scope: cdkConstruct.Construct, id: string, props: OpenSearchStackProps) {
    super(scope, id, props)

    new cdk.aws_opensearchserverless.CfnCollection(this, 'openSearchCollection',{
      name:'test-collection'
    })

    new cdk.aws_opensearchserverless.CfnAccessPolicy(this, 'opensearchAccessPolicy', {
      name: 'test-access-policy',
      policy: JSON.stringify([
        {
          "Rules": [
            {
              "ResourceType": "index",
              "Resource": ["index/*/*"],
              "Permission":["aoss:*"]
            },
            {
              "ResourceType": "collection",
              "Resource": ["collection/my-collection"],
              "Permission": ["aoss:*"]
            }
          ],
          "Principal": [`arn:aws:iam::${this.account}:user/test-user`]
        }
      ]),
      type: accessPolicyType,
    });

    new cdk.aws_opensearchserverless.CfnSecurityPolicy(this, 'opensearchNetworkSecurityPolicy', {
      name: 'test-network-security-policy',
      policy: JSON.stringify([
        {
          "Rules": [
            {
              "ResourceType": "collection",
              "Resource": ["collection/logs*"]
            },
            {
              "ResourceType": "dashboard",
              "Resource": ["collection/logs*"]
            }
          ],
          "AllowFromPublic": true
        }
      ]),
      type: PolicyType.Network,
    });

    new cdk.aws_opensearchserverless.CfnSecurityPolicy(this, 'opensearchEncryptionPolicy', {
      name: 'test-encrypt-policy',
      policy: JSON.stringify({
        "Rules": [
          {
            "ResourceType": "collection",
            "Resource": ["collection/logs*"]
          }
        ],
        "AWSOwnedKey": true
      }),
      type: PolicyType.Encryption,
    });

  }
}