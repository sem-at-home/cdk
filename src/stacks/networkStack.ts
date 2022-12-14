import * as cdk from 'aws-cdk-lib'
import * as cdkConstruct from 'constructs';

export class NetworkStack extends cdk.Stack {
  constructor(scope: cdkConstruct.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)
    
  }
}