import * as cdk from 'aws-cdk-lib'
import * as cdkConstruct from 'constructs';

export interface DocumentDBStackProps extends cdk.StackProps {
  vpc: cdk.aws_ec2.Vpc;
}

export class DocumentDBStack extends cdk.Stack {
  constructor(scope: cdkConstruct.Construct, id: string, props: DocumentDBStackProps) {
    super(scope, id, props)

  }
}