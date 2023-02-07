import { CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import { User, CfnAccessKey, PolicyStatement, PolicyDocument, Role } from "aws-cdk-lib/aws-iam";

interface GithubActionsConstructProps {
  bucketArns: string[];
}
export class GithubActionsConstruct extends Construct {
  constructor(scope: Construct, id: string, props: GithubActionsConstructProps) {
    super(scope, id);
    const { bucketArns } = props;

    const cdUser = new User(this, 'GithubActionsUser', {
      passwordResetRequired: false
    });

    const accessKey = new CfnAccessKey(this, 'GithubActionsAccessKey', {
      userName: cdUser.userName,
    });

    const s3PutPolicy = new PolicyDocument({
      statements: [
        new PolicyStatement({
          resources: bucketArns.map(arn => `${arn}/*`),
          actions: ['s3:PutObject'],
        }),
        new PolicyStatement({
          resources: ['*'],
          actions: ['cloudfront:CreateInvalidation']
        })
      ],
    });

    const role = new Role(this, 'publish-static-site-role', {
      assumedBy: cdUser.grantPrincipal,
      description: 'Role for running s3 cp from github actions',
      inlinePolicies: {
        S3Put: s3PutPolicy,
      },
    });

    new CfnOutput(this, 'accessKeyId', { value: accessKey.ref });
    new CfnOutput(this, 'secretAccessKey', { value: accessKey.attrSecretAccessKey });
    new CfnOutput(this, 'publishRoleARN', { value: role.roleArn });
  }
}