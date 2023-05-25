import * as cdk from 'aws-cdk-lib';
import * as awsConfig from './aws-environment-configuration';
import { NetworkStack } from './stacks/network-stack';
import { SsmManagedBastionStack } from './stacks/ssm-managed-bastion-no-internet-stack';
import { ClientVpnStack } from './stacks/clientvpn-stack';

export const app = new cdk.App();

const network = new NetworkStack(app, 'network-devorg-sem', {
  env: {account: awsConfig.AWSAccountIDs.DevOrgTest, region: awsConfig.MainRegion},
});

new SsmManagedBastionStack(app, 'managed-bastion-devorg-sem', {
  env: {account: awsConfig.AWSAccountIDs.DevOrgTest, region: awsConfig.MainRegion},
  vpc: network.vpc,
});

new ClientVpnStack(app, 'client-vpn-stack', {
  env: {account: awsConfig.AWSAccountIDs.DevOrgTest, region: awsConfig.MainRegion},
})