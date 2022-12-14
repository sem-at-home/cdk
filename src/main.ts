import * as cdk from 'aws-cdk-lib';
import * as awsConfig from './awsConfig';
import { NetworkStack } from './stacks/networkStack';

export const app = new cdk.App();

new NetworkStack(app, 'network-sandbox', {
  env: {account: awsConfig.AWSAccountIDs.SandBox1, region: awsConfig.MainRegion},
});