import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DistributionConstruct } from './distribution-construct';
import { GithubActionsConstruct } from './github-actions-construct';
import { RouteConstruct } from './route-construct';

export interface MkDocsSiteProps extends StackProps {
  domainName: string;
  sites: string[];
}
export class MkDocsSiteStack extends Stack {
  constructor(scope: Construct, id: string, props: MkDocsSiteProps) {
    super(scope, id, props);

    const { domainName, sites } = props;

    const route = new RouteConstruct(this, `Route`, { domainName, subDomains: sites });
    const zone = route.zone;
    const certificate = route.certificate;
    
    
    const distributions = sites.map(dist => (new DistributionConstruct(this, `Dist${dist}`, { domainName, subDomain: dist, zone, certificate })));
    
    // Creates a user with role that is allowed to putObject to all buckets
    new GithubActionsConstruct(this, 'GithubActions', { bucketArns: distributions.map(dist => dist.bucketArn) });
  }
}
