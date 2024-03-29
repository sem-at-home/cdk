import * as cdk from 'aws-cdk-lib';
import * as awsConfig from './aws-environment-configuration';
import { NetworkStack } from './stacks/network-stack';
import { DocumentDBStack } from './stacks/document-db-stack';
import { GlueStack } from './stacks/glue-stack'; 
import { SsmManagedBastionStack } from './stacks/ssm-managed-bastion-no-internet-stack';
import { OpenSearchStack } from './stacks/opensearch-stack';
import { ClientVpnStack } from './stacks/clientvpn-stack';
import { DMSStack } from './stacks/dms-stack';

export const app = new cdk.App();

const network = new NetworkStack(app, 'network-devorg-sem', {
  env: {account: awsConfig.AWSAccountIDs.DevOrgTest, region: awsConfig.MainRegion},
});

new GlueStack(app, 'glue-devorg-sem', {
  env: {account: awsConfig.AWSAccountIDs.DevOrgTest, region: awsConfig.MainRegion},
})

new DocumentDBStack(app, 'documentdb-sem', {
  env: {account: awsConfig.AWSAccountIDs.DevOrgTest, region: awsConfig.MainRegion},
  vpc: network.vpc
})

new DMSStack(app, 'dms-devorg-sem', {
  env: {account: awsConfig.AWSAccountIDs.DevOrgTest, region: awsConfig.MainRegion},
  vpc: network.vpc
})

new SsmManagedBastionStack(app, 'managed-bastion-devorg-sem', {
  env: {account: awsConfig.AWSAccountIDs.DevOrgTest, region: awsConfig.MainRegion},
  vpc: network.vpc,
});

new OpenSearchStack(app, 'opensearch-devorg-sem', {
  env: {account: awsConfig.AWSAccountIDs.DevOrgTest, region: awsConfig.MainRegion}
})

new ClientVpnStack(app, 'client-vpn-stack', {
  env: {account: awsConfig.AWSAccountIDs.DevOrgTest, region: awsConfig.MainRegion},
})