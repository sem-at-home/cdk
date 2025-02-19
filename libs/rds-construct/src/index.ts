import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';


export class ZeroScalingAuroraCluster extends cdk.aws_rds.DatabaseCluster {
  constructor(scope: Construct, id: string, props: cdk.aws_rds.DatabaseClusterProps) {
    super(scope, id, {
      ...props,
      engine: cdk.aws_rds.DatabaseClusterEngine.auroraPostgres({version: cdk.aws_rds.AuroraPostgresEngineVersion.VER_16_5}),
      serverlessV2MinCapacity: 0,
      storageEncrypted: true,
      writer: cdk.aws_rds.ClusterInstance.serverlessV2('writer'),
    });
  }
}
