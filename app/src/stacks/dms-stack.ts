import * as cdk from 'aws-cdk-lib';
import * as cdkConstruct from 'constructs';

export interface DMSStackProps extends cdk.StackProps {
  vpc: cdk.aws_ec2.Vpc;
  environment?: string;
}

const enum EndpointType {
  Source = 'source',
  Target = 'target',
}

const enum EngineName {
  Mariadb = 'mariadb',
  Mysql = 'mysql',
}

export class DMSStack extends cdk.Stack {
  constructor(scope: cdkConstruct.Construct, id: string, props: DMSStackProps) {
    super(scope, id, props);

    const replicationSubnetGroup = new cdk.aws_dms.CfnReplicationSubnetGroup(
      this,
      'replication-subnet-group',
      {
        replicationSubnetGroupDescription: 'description of replication subnet group',
        subnetIds: props.vpc.isolatedSubnets.map((subnet) => subnet.subnetId),
      },
    );

    new cdk.aws_dms.CfnReplicationInstance(this, 'replication-instance', {
      replicationInstanceClass: 'dms.c4.large',
      allocatedStorage: 200,
      allowMajorVersionUpgrade: true,
      autoMinorVersionUpgrade: true,
      multiAz: true,
      replicationSubnetGroupIdentifier: replicationSubnetGroup.ref,
    });

    // new cdk.aws_dms.CfnEndpoint(this, 'source-endpoint', {
    //   endpointType: EndpointType.Source,
    //   engineName: EngineName.Mariadb,
    //   databaseName: 'databaseName',
    // })
  }
}
