#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MkDocsSiteStack } from '../lib/mkdocs-site-stack';

const app = new cdk.App();
new MkDocsSiteStack(app, 'rebelpedia-capslock-gg', {
  env: {
    account: '814967776290',
    region: 'eu-north-1',
  },
  domainName: 'capslock.gg',
  sites: ['rebelpedia'],
});