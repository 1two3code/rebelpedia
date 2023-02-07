"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributionConstruct = void 0;
const constructs_1 = require("constructs");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_route53_1 = require("aws-cdk-lib/aws-route53");
const aws_s3_1 = require("aws-cdk-lib/aws-s3");
const aws_route53_targets_1 = require("aws-cdk-lib/aws-route53-targets");
const aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
class DistributionConstruct extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        const { subDomain, domainName, zone, certificate } = props;
        const siteDomain = `${subDomain}.${domainName}`;
        const siteBucket = new aws_s3_1.Bucket(this, 'SiteBucket', {
            bucketName: siteDomain,
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'index.html',
            publicReadAccess: true,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
        });
        this.bucketArn = siteBucket.bucketArn;
        const distribution = new aws_cloudfront_1.CloudFrontWebDistribution(this, 'SiteDistribution', {
            // aliasConfiguration: {
            //   acmCertRef: certificateArn,
            //   names: [siteDomain],
            //   sslMethod: SSLMethod.SNI,
            //   securityPolicy: SecurityPolicyProtocol.TLS_V1_1_2016,
            // },
            viewerCertificate: aws_cloudfront_1.ViewerCertificate.fromAcmCertificate(certificate, { aliases: [siteDomain] }),
            originConfigs: [
                {
                    customOriginSource: {
                        domainName: siteBucket.bucketWebsiteDomainName,
                        originProtocolPolicy: aws_cloudfront_1.OriginProtocolPolicy.HTTP_ONLY,
                    },
                    behaviors: [{ isDefaultBehavior: true }],
                },
            ],
        });
        new aws_route53_1.ARecord(this, 'SiteAliasRecord', {
            recordName: siteDomain,
            target: aws_route53_1.RecordTarget.fromAlias(new aws_route53_targets_1.CloudFrontTarget(distribution)),
            zone,
        });
        new aws_cdk_lib_1.CfnOutput(this, 'Site', { value: 'https://' + siteDomain });
        new aws_cdk_lib_1.CfnOutput(this, 'Bucket', { value: siteBucket.bucketName });
        new aws_cdk_lib_1.CfnOutput(this, 'DistributionId', {
            value: distribution.distributionId,
        });
    }
}
exports.DistributionConstruct = DistributionConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdHJpYnV0aW9uLWNvbnN0cnVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpc3RyaWJ1dGlvbi1jb25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXVDO0FBQ3ZDLDZDQUF1RDtBQUN2RCx5REFBNkU7QUFDN0UsK0NBQTRDO0FBQzVDLHlFQUFtRTtBQUNuRSwrREFBZ0g7QUFVaEgsTUFBYSxxQkFBc0IsU0FBUSxzQkFBUztJQUdsRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWlDO1FBQ3pFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUUzRCxNQUFNLFVBQVUsR0FBRyxHQUFHLFNBQVMsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUVoRCxNQUFNLFVBQVUsR0FBRyxJQUFJLGVBQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ2hELFVBQVUsRUFBRSxVQUFVO1lBQ3RCLG9CQUFvQixFQUFFLFlBQVk7WUFDbEMsb0JBQW9CLEVBQUUsWUFBWTtZQUNsQyxnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGFBQWEsRUFBRSwyQkFBYSxDQUFDLE9BQU87U0FDckMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBRXRDLE1BQU0sWUFBWSxHQUFHLElBQUksMENBQXlCLENBQ2hELElBQUksRUFDSixrQkFBa0IsRUFDbEI7WUFDRSx3QkFBd0I7WUFDeEIsZ0NBQWdDO1lBQ2hDLHlCQUF5QjtZQUN6Qiw4QkFBOEI7WUFDOUIsMERBQTBEO1lBQzFELEtBQUs7WUFDTCxpQkFBaUIsRUFBRSxrQ0FBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQy9GLGFBQWEsRUFBRTtnQkFDYjtvQkFDRSxrQkFBa0IsRUFBRTt3QkFDbEIsVUFBVSxFQUFFLFVBQVUsQ0FBQyx1QkFBdUI7d0JBQzlDLG9CQUFvQixFQUFFLHFDQUFvQixDQUFDLFNBQVM7cUJBQ3JEO29CQUNELFNBQVMsRUFBRSxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUM7aUJBQ3pDO2FBQ0Y7U0FDRixDQUNGLENBQUM7UUFFRixJQUFJLHFCQUFPLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQ25DLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLE1BQU0sRUFBRSwwQkFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHNDQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2xFLElBQUk7U0FDTCxDQUFDLENBQUM7UUFFSCxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUcsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUNoRSxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUNoRSxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3BDLEtBQUssRUFBRSxZQUFZLENBQUMsY0FBYztTQUNuQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF2REQsc0RBdURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBDZm5PdXRwdXQsIFJlbW92YWxQb2xpY3kgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBJSG9zdGVkWm9uZSwgQVJlY29yZCwgUmVjb3JkVGFyZ2V0IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXJvdXRlNTMnO1xuaW1wb3J0IHsgQnVja2V0IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzJztcbmltcG9ydCB7IENsb3VkRnJvbnRUYXJnZXQgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtcm91dGU1My10YXJnZXRzJztcbmltcG9ydCB7IENsb3VkRnJvbnRXZWJEaXN0cmlidXRpb24sIE9yaWdpblByb3RvY29sUG9saWN5LCBWaWV3ZXJDZXJ0aWZpY2F0ZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZGZyb250JztcbmltcG9ydCB7IElDZXJ0aWZpY2F0ZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jZXJ0aWZpY2F0ZW1hbmFnZXInO1xuXG5pbnRlcmZhY2UgRGlzdHJpYnV0aW9uQ29uc3RydWN0UHJvcHMge1xuICBzdWJEb21haW46IHN0cmluZztcbiAgZG9tYWluTmFtZTogc3RyaW5nO1xuICB6b25lOiBJSG9zdGVkWm9uZTtcbiAgY2VydGlmaWNhdGU6IElDZXJ0aWZpY2F0ZTtcbn1cblxuZXhwb3J0IGNsYXNzIERpc3RyaWJ1dGlvbkNvbnN0cnVjdCBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyByZWFkb25seSBidWNrZXRBcm46IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogRGlzdHJpYnV0aW9uQ29uc3RydWN0UHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgY29uc3QgeyBzdWJEb21haW4sIGRvbWFpbk5hbWUsIHpvbmUsIGNlcnRpZmljYXRlIH0gPSBwcm9wcztcblxuICAgIGNvbnN0IHNpdGVEb21haW4gPSBgJHtzdWJEb21haW59LiR7ZG9tYWluTmFtZX1gO1xuICAgIFxuICAgIGNvbnN0IHNpdGVCdWNrZXQgPSBuZXcgQnVja2V0KHRoaXMsICdTaXRlQnVja2V0Jywge1xuICAgICAgYnVja2V0TmFtZTogc2l0ZURvbWFpbixcbiAgICAgIHdlYnNpdGVJbmRleERvY3VtZW50OiAnaW5kZXguaHRtbCcsXG4gICAgICB3ZWJzaXRlRXJyb3JEb2N1bWVudDogJ2luZGV4Lmh0bWwnLFxuICAgICAgcHVibGljUmVhZEFjY2VzczogdHJ1ZSxcbiAgICAgIHJlbW92YWxQb2xpY3k6IFJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgICB9KTtcbiAgICBcbiAgICB0aGlzLmJ1Y2tldEFybiA9IHNpdGVCdWNrZXQuYnVja2V0QXJuO1xuICAgIFxuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbiA9IG5ldyBDbG91ZEZyb250V2ViRGlzdHJpYnV0aW9uKFxuICAgICAgdGhpcyxcbiAgICAgICdTaXRlRGlzdHJpYnV0aW9uJyxcbiAgICAgIHtcbiAgICAgICAgLy8gYWxpYXNDb25maWd1cmF0aW9uOiB7XG4gICAgICAgIC8vICAgYWNtQ2VydFJlZjogY2VydGlmaWNhdGVBcm4sXG4gICAgICAgIC8vICAgbmFtZXM6IFtzaXRlRG9tYWluXSxcbiAgICAgICAgLy8gICBzc2xNZXRob2Q6IFNTTE1ldGhvZC5TTkksXG4gICAgICAgIC8vICAgc2VjdXJpdHlQb2xpY3k6IFNlY3VyaXR5UG9saWN5UHJvdG9jb2wuVExTX1YxXzFfMjAxNixcbiAgICAgICAgLy8gfSxcbiAgICAgICAgdmlld2VyQ2VydGlmaWNhdGU6IFZpZXdlckNlcnRpZmljYXRlLmZyb21BY21DZXJ0aWZpY2F0ZShjZXJ0aWZpY2F0ZSwgeyBhbGlhc2VzOiBbc2l0ZURvbWFpbl0gfSksXG4gICAgICAgIG9yaWdpbkNvbmZpZ3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjdXN0b21PcmlnaW5Tb3VyY2U6IHtcbiAgICAgICAgICAgICAgZG9tYWluTmFtZTogc2l0ZUJ1Y2tldC5idWNrZXRXZWJzaXRlRG9tYWluTmFtZSxcbiAgICAgICAgICAgICAgb3JpZ2luUHJvdG9jb2xQb2xpY3k6IE9yaWdpblByb3RvY29sUG9saWN5LkhUVFBfT05MWSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiZWhhdmlvcnM6IFt7IGlzRGVmYXVsdEJlaGF2aW9yOiB0cnVlIH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICk7XG4gICAgICBcbiAgICBuZXcgQVJlY29yZCh0aGlzLCAnU2l0ZUFsaWFzUmVjb3JkJywge1xuICAgICAgcmVjb3JkTmFtZTogc2l0ZURvbWFpbixcbiAgICAgIHRhcmdldDogUmVjb3JkVGFyZ2V0LmZyb21BbGlhcyhuZXcgQ2xvdWRGcm9udFRhcmdldChkaXN0cmlidXRpb24pKSxcbiAgICAgIHpvbmUsXG4gICAgfSk7XG4gICAgXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCAnU2l0ZScsIHsgdmFsdWU6ICdodHRwczovLycgKyBzaXRlRG9tYWluIH0pO1xuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ0J1Y2tldCcsIHsgdmFsdWU6IHNpdGVCdWNrZXQuYnVja2V0TmFtZSB9KTtcbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdEaXN0cmlidXRpb25JZCcsIHtcbiAgICAgIHZhbHVlOiBkaXN0cmlidXRpb24uZGlzdHJpYnV0aW9uSWQsXG4gICAgfSk7XG4gIH1cbn0gIl19