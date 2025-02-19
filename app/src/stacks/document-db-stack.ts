import * as cdk from 'aws-cdk-lib'
import * as cdkConstruct from 'constructs';

export interface DocumentDBStackProps extends cdk.StackProps {
  vpc: cdk.aws_ec2.Vpc;
}

export class DocumentDBStack extends cdk.Stack {
  constructor(scope: cdkConstruct.Construct, id: string, props: DocumentDBStackProps) {
    super(scope, id, props)

    const clusterParameterGroup = new cdk.aws_docdb.ClusterParameterGroup(this, 'MyClusterParameterGroup', {
      family: 'docdb4.0',
      parameters: {
        tls: 'enabled',
      },
      dbClusterParameterGroupName: 'docdbparametergroup',
      description: 'parameter group for docdb cluster',
    });

    const dbCluster = new cdk.aws_docdb.DatabaseCluster(this, 'Database', {
      engineVersion: '4.0.0',
      masterUser: {
        username: 'clusteradmin',
        excludeCharacters: '"@/:',
      },
      instanceType: cdk.aws_ec2.InstanceType.of(cdk.aws_ec2.InstanceClass.T4G, cdk.aws_ec2.InstanceSize.MEDIUM),
      vpcSubnets: {
        subnetType: cdk.aws_ec2.SubnetType.PRIVATE_ISOLATED,
      },
      vpc: props.vpc,
      exportAuditLogsToCloudWatch: true,
      exportProfilerLogsToCloudWatch: true,
      parameterGroup: clusterParameterGroup,
    });

    dbCluster.addRotationSingleUser()

  }
}