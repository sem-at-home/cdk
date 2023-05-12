import * as cdk from 'aws-cdk-lib'
import * as cdkConstruct from 'constructs';

export class NetworkStack extends cdk.Stack {
  public vpc: cdk.aws_ec2.Vpc;
  constructor(scope: cdkConstruct.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    this.vpc = new cdk.aws_ec2.Vpc(this, 'TheVPC', {
      ipAddresses: cdk.aws_ec2.IpAddresses.cidr('10.23.0.0/16'),
    })
    
  }
}