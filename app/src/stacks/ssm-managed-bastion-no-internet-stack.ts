import * as cdk from 'aws-cdk-lib'
import * as cdkConstruct from 'constructs';

export interface SsmManagedBastionStackProps extends cdk.StackProps {
  vpc: cdk.aws_ec2.Vpc;
}

export class SsmManagedBastionStack extends cdk.Stack {
  constructor(scope: cdkConstruct.Construct, id: string, props: SsmManagedBastionStackProps) {
    super(scope, id, props)

    const bastion = new cdk.aws_ec2.BastionHostLinux(this, 'BastionHostInstance', {
      vpc: props.vpc,
    });


    const ssmEndpoint = new cdk.aws_ec2.InterfaceVpcEndpoint(this, 'ssm-vpc-interface-endpoint', {
      vpc: props.vpc,
      service: cdk.aws_ec2.InterfaceVpcEndpointAwsService.SSM,
    });

    const ssmMessagesEndpoint = new cdk.aws_ec2.InterfaceVpcEndpoint(this, 'ssm-messages-vpc-interface-endpoint', {
      vpc: props.vpc,
      service: cdk.aws_ec2.InterfaceVpcEndpointAwsService.SSM_MESSAGES,
    });

    const ec2MessagesEndpoint = new cdk.aws_ec2.InterfaceVpcEndpoint(this, 'ec2-messages-vpc-interface-endpoint', {
      vpc: props.vpc,
      service: cdk.aws_ec2.InterfaceVpcEndpointAwsService.EC2_MESSAGES,
    });
  }
}