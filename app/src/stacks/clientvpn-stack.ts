import * as cdk from 'aws-cdk-lib'
import * as cdkConstruct from 'constructs';

export class ClientVpnStack extends cdk.Stack {
  public vpc: cdk.aws_ec2.Vpc;
  constructor(scope: cdkConstruct.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    this.vpc = new cdk.aws_ec2.Vpc(this, 'vpc', {
      ipAddresses: cdk.aws_ec2.IpAddresses.cidr('10.23.0.0/16'),
      natGateways: 0,
    })

    this.vpc.addClientVpnEndpoint('endpoint', {
      cidr: '10.123.0.0/16',
      serverCertificateArn: 'arn:aws:acm:eu-west-1:896653224309:certificate/1efee99a-a4f2-4f27-88b8-d5918f927051',
      userBasedAuthentication: cdk.aws_ec2.ClientVpnUserBasedAuthentication.federated(cdk.aws_iam.SamlProvider.fromSamlProviderArn(this, 'samlprovider', 'arn:aws:iam::896653224309:saml-provider/AWSSSO_b069e4c53bec6273_DO_NOT_DELETE')),
      authorizeAllUsersToVpcCidr: false,
    })

  }
}