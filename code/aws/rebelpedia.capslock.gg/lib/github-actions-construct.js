"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubActionsConstruct = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const constructs_1 = require("constructs");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
class GithubActionsConstruct extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        const { bucketArns } = props;
        const cdUser = new aws_iam_1.User(this, 'GithubActionsUser', {
            passwordResetRequired: false
        });
        const accessKey = new aws_iam_1.CfnAccessKey(this, 'GithubActionsAccessKey', {
            userName: cdUser.userName,
        });
        const s3PutPolicy = new aws_iam_1.PolicyDocument({
            statements: [
                new aws_iam_1.PolicyStatement({
                    resources: bucketArns.map(arn => `${arn}/*`),
                    actions: ['s3:PutObject'],
                }),
                new aws_iam_1.PolicyStatement({
                    resources: ['*'],
                    actions: ['cloudfront:CreateInvalidation']
                })
            ],
        });
        const role = new aws_iam_1.Role(this, 'publish-static-site-role', {
            assumedBy: cdUser.grantPrincipal,
            description: 'Role for running s3 cp from github actions',
            inlinePolicies: {
                S3Put: s3PutPolicy,
            },
        });
        new aws_cdk_lib_1.CfnOutput(this, 'accessKeyId', { value: accessKey.ref });
        new aws_cdk_lib_1.CfnOutput(this, 'secretAccessKey', { value: accessKey.attrSecretAccessKey });
        new aws_cdk_lib_1.CfnOutput(this, 'publishRoleARN', { value: role.roleArn });
    }
}
exports.GithubActionsConstruct = GithubActionsConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aHViLWFjdGlvbnMtY29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2l0aHViLWFjdGlvbnMtY29uc3RydWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUF3QztBQUN4QywyQ0FBdUM7QUFDdkMsaURBQWdHO0FBS2hHLE1BQWEsc0JBQXVCLFNBQVEsc0JBQVM7SUFDbkQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQztRQUMxRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFFN0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQ2pELHFCQUFxQixFQUFFLEtBQUs7U0FDN0IsQ0FBQyxDQUFDO1FBRUgsTUFBTSxTQUFTLEdBQUcsSUFBSSxzQkFBWSxDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUNqRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxXQUFXLEdBQUcsSUFBSSx3QkFBYyxDQUFDO1lBQ3JDLFVBQVUsRUFBRTtnQkFDVixJQUFJLHlCQUFlLENBQUM7b0JBQ2xCLFNBQVMsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztvQkFDNUMsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2lCQUMxQixDQUFDO2dCQUNGLElBQUkseUJBQWUsQ0FBQztvQkFDbEIsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDO29CQUNoQixPQUFPLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztpQkFDM0MsQ0FBQzthQUNIO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxFQUFFLDBCQUEwQixFQUFFO1lBQ3RELFNBQVMsRUFBRSxNQUFNLENBQUMsY0FBYztZQUNoQyxXQUFXLEVBQUUsNENBQTRDO1lBQ3pELGNBQWMsRUFBRTtnQkFDZCxLQUFLLEVBQUUsV0FBVzthQUNuQjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzdELElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztRQUNqRixJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FDRjtBQXRDRCx3REFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZm5PdXRwdXQgfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5pbXBvcnQgeyBVc2VyLCBDZm5BY2Nlc3NLZXksIFBvbGljeVN0YXRlbWVudCwgUG9saWN5RG9jdW1lbnQsIFJvbGUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWlhbVwiO1xuXG5pbnRlcmZhY2UgR2l0aHViQWN0aW9uc0NvbnN0cnVjdFByb3BzIHtcbiAgYnVja2V0QXJuczogc3RyaW5nW107XG59XG5leHBvcnQgY2xhc3MgR2l0aHViQWN0aW9uc0NvbnN0cnVjdCBleHRlbmRzIENvbnN0cnVjdCB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBHaXRodWJBY3Rpb25zQ29uc3RydWN0UHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIGNvbnN0IHsgYnVja2V0QXJucyB9ID0gcHJvcHM7XG5cbiAgICBjb25zdCBjZFVzZXIgPSBuZXcgVXNlcih0aGlzLCAnR2l0aHViQWN0aW9uc1VzZXInLCB7XG4gICAgICBwYXNzd29yZFJlc2V0UmVxdWlyZWQ6IGZhbHNlXG4gICAgfSk7XG5cbiAgICBjb25zdCBhY2Nlc3NLZXkgPSBuZXcgQ2ZuQWNjZXNzS2V5KHRoaXMsICdHaXRodWJBY3Rpb25zQWNjZXNzS2V5Jywge1xuICAgICAgdXNlck5hbWU6IGNkVXNlci51c2VyTmFtZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHMzUHV0UG9saWN5ID0gbmV3IFBvbGljeURvY3VtZW50KHtcbiAgICAgIHN0YXRlbWVudHM6IFtcbiAgICAgICAgbmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgICAgcmVzb3VyY2VzOiBidWNrZXRBcm5zLm1hcChhcm4gPT4gYCR7YXJufS8qYCksXG4gICAgICAgICAgYWN0aW9uczogWydzMzpQdXRPYmplY3QnXSxcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICAgIHJlc291cmNlczogWycqJ10sXG4gICAgICAgICAgYWN0aW9uczogWydjbG91ZGZyb250OkNyZWF0ZUludmFsaWRhdGlvbiddXG4gICAgICAgIH0pXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgY29uc3Qgcm9sZSA9IG5ldyBSb2xlKHRoaXMsICdwdWJsaXNoLXN0YXRpYy1zaXRlLXJvbGUnLCB7XG4gICAgICBhc3N1bWVkQnk6IGNkVXNlci5ncmFudFByaW5jaXBhbCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnUm9sZSBmb3IgcnVubmluZyBzMyBjcCBmcm9tIGdpdGh1YiBhY3Rpb25zJyxcbiAgICAgIGlubGluZVBvbGljaWVzOiB7XG4gICAgICAgIFMzUHV0OiBzM1B1dFBvbGljeSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdhY2Nlc3NLZXlJZCcsIHsgdmFsdWU6IGFjY2Vzc0tleS5yZWYgfSk7XG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCAnc2VjcmV0QWNjZXNzS2V5JywgeyB2YWx1ZTogYWNjZXNzS2V5LmF0dHJTZWNyZXRBY2Nlc3NLZXkgfSk7XG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCAncHVibGlzaFJvbGVBUk4nLCB7IHZhbHVlOiByb2xlLnJvbGVBcm4gfSk7XG4gIH1cbn0iXX0=