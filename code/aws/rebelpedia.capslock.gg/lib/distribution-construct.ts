import { Construct } from 'constructs';
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
import { IHostedZone, ARecord, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { CloudFrontWebDistribution, OriginProtocolPolicy, ViewerCertificate } from 'aws-cdk-lib/aws-cloudfront';
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager';

interface DistributionConstructProps {
  subDomain: string;
  domainName: string;
  zone: IHostedZone;
  certificate: ICertificate;
}

export class DistributionConstruct extends Construct {
  public readonly bucketArn: string;

  constructor(scope: Construct, id: string, props: DistributionConstructProps) {
    super(scope, id);

    const { subDomain, domainName, zone, certificate } = props;

    const siteDomain = `${subDomain}.${domainName}`;
    
    const siteBucket = new Bucket(this, 'SiteBucket', {
      bucketName: siteDomain,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });
    
    this.bucketArn = siteBucket.bucketArn;
    
    const distribution = new CloudFrontWebDistribution(
      this,
      'SiteDistribution',
      {
        // aliasConfiguration: {
        //   acmCertRef: certificateArn,
        //   names: [siteDomain],
        //   sslMethod: SSLMethod.SNI,
        //   securityPolicy: SecurityPolicyProtocol.TLS_V1_1_2016,
        // },
        viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, { aliases: [siteDomain] }),
        originConfigs: [
          {
            customOriginSource: {
              domainName: siteBucket.bucketWebsiteDomainName,
              originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      },
    );
      
    new ARecord(this, 'SiteAliasRecord', {
      recordName: siteDomain,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone,
    });
    
    new CfnOutput(this, 'Site', { value: 'https://' + siteDomain });
    new CfnOutput(this, 'Bucket', { value: siteBucket.bucketName });
    new CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
    });
  }
} 