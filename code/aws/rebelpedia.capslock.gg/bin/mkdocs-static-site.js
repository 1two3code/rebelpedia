#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
const mkdocs_site_stack_1 = require("../lib/mkdocs-site-stack");
const app = new cdk.App();
new mkdocs_site_stack_1.MkDocsSiteStack(app, 'rebelpedia-capslock-gg', {
    env: {
        account: '814967776290',
        region: 'eu-north-1',
    },
    domainName: 'capslock.gg',
    sites: ['rebelpedia'],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWtkb2NzLXN0YXRpYy1zaXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWtkb2NzLXN0YXRpYy1zaXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFxQztBQUNyQyxtQ0FBbUM7QUFDbkMsZ0VBQTJEO0FBRTNELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLElBQUksbUNBQWUsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLEVBQUU7SUFDakQsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFLGNBQWM7UUFDdkIsTUFBTSxFQUFFLFlBQVk7S0FDckI7SUFDRCxVQUFVLEVBQUUsYUFBYTtJQUN6QixLQUFLLEVBQUUsQ0FBQyxZQUFZLENBQUM7Q0FDdEIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IE1rRG9jc1NpdGVTdGFjayB9IGZyb20gJy4uL2xpYi9ta2RvY3Mtc2l0ZS1zdGFjayc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5uZXcgTWtEb2NzU2l0ZVN0YWNrKGFwcCwgJ3JlYmVscGVkaWEtY2Fwc2xvY2stZ2cnLCB7XG4gIGVudjoge1xuICAgIGFjY291bnQ6ICc4MTQ5Njc3NzYyOTAnLFxuICAgIHJlZ2lvbjogJ2V1LW5vcnRoLTEnLFxuICB9LFxuICBkb21haW5OYW1lOiAnY2Fwc2xvY2suZ2cnLFxuICBzaXRlczogWydyZWJlbHBlZGlhJ10sXG59KTsiXX0=