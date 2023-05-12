import * as cdk from 'aws-cdk-lib'
import * as cdkConstruct from 'constructs';

export interface SsmManagedBastionStackProps extends cdk.StackProps {
  vpcId: string;
}

export class SsmManagedBastionStack extends cdk.Stack {
  constructor(scope: cdkConstruct.Construct, id: string, props: SsmManagedBastionStackProps) {
    super(scope, id, props)

    new cdk.aws_ec2.BastionHostLinux(this, 'BastionHostInstance', {
      vpc: cdk.aws_ec2.Vpc.fromLookup(this, 'vpc', {vpcId: props.vpcId}),
    });

  }
}