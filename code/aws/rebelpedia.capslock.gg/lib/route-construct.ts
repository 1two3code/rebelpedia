import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IHostedZone, HostedZone } from 'aws-cdk-lib/aws-route53';
import { DnsValidatedCertificate } from 'aws-cdk-lib/aws-certificatemanager';

interface RouteConstructProps {
  domainName: string;
  subDomains: string[];
}

export class RouteConstruct extends Construct {
  public readonly zone: IHostedZone;
  public readonly certificate: DnsValidatedCertificate;

  constructor(scope: Construct, id: string, props: RouteConstructProps) {
    super(scope, id);
    const { domainName, subDomains } = props;

    this.zone = HostedZone.fromLookup(this, 'Zone', {
      domainName: domainName,
    });
     
    
    this.certificate = new DnsValidatedCertificate(
      this,
      'SiteCertificate',
      { 
        domainName,
        subjectAlternativeNames: subDomains.map(sub => `${sub}.${domainName}`),
        hostedZone: this.zone,
        region: 'us-east-1', // cloudfront certs always us-east-1
      },
    );
    
    new CfnOutput(this, 'Certificate', { value: this.certificate.certificateArn });
  }
} 