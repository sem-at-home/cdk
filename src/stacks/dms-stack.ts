import * as cdk from 'aws-cdk-lib'
import * as cdkConstruct from 'constructs';

export interface DMSStackProps extends cdk.StackProps {
  environment?: string 
}

export class DMSStack extends cdk.Stack {
  constructor(scope: cdkConstruct.Construct, id: string, props: DMSStackProps) {
    super(scope, id, props)

    new cdk.aws_dms.CfnReplicationInstance(this, 'replicationInstance', {
      replicationInstanceClass: 'dms.c4.large',
    
      // allocatedStorage: 12,
      // allowMajorVersionUpgrade: false,
      // autoMinorVersionUpgrade: false,
      // availabilityZone: 'availabilityZone',
      // engineVersion: 'engineVersion',
      // kmsKeyId: 'kmsKeyId',
      // multiAz: false,
      // preferredMaintenanceWindow: 'preferredMaintenanceWindow',
      // publiclyAccessible: false,
      // replicationInstanceIdentifier: 'replicationInstanceIdentifier',
      // replicationSubnetGroupIdentifier: 'replicationSubnetGroupIdentifier',
      // resourceIdentifier: 'resourceIdentifier',
      // vpcSecurityGroupIds: ['vpcSecurityGroupIds'],
    });

  }
}