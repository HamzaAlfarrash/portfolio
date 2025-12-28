import type { Project, BlogDetail } from '@/lib/api';

export const projects: Project[] = [
  {
    id: "1",
    title: "CloudAsset",
    description: "A serverless digital asset management platform built at AWS that reduced manual processing time by 95%, saving teams 20+ hours per week. Features drag-and-drop uploads, AI-powered thumbnail generation using Amazon Bedrock, and real-time processing.",
    technologies: ["AWS CDK", "Lambda", "React", "DynamoDB", "S3", "Amazon Bedrock"],
  },
  {
    id: "2",
    title: "Online Game Shop",
    description: "Full-stack game shop management system with a dynamic React frontend and Java Spring Boot backend. Features RESTful APIs, secure data persistence with PostgreSQL, and 89% code coverage with JUnit tests.",
    technologies: ["Java Spring Boot", "React", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/McGill-ECSE321-Fall2024/GameHub360",
  },
  {
    id: "3",
    title: "Recipizer",
    description: "Recipe recommendation engine built at McHacks hackathon. Features a user-friendly frontend and Python backend integrated with Edamam's API to generate personalized recipes based on user inputs.",
    technologies: ["Python", "HTML", "CSS", "JavaScript", "Edamam API"],
    github: "https://github.com/HamzaAlfarrash/recipizer",
  },
];

export const blogPosts: BlogDetail[] = [
  {
    id: "getting-started-aws-serverless",
    slug: "getting-started-aws-serverless",
    title: "Getting Started with AWS Serverless Architecture",
    excerpt: "A beginner's guide to building scalable serverless applications on AWS using Lambda, API Gateway, and DynamoDB.",
    date: "2025-01-15",
    readTime: "5 min read",
    tags: ["AWS", "Serverless", "Cloud"],
    content: `## Introduction

Serverless architecture has revolutionized how we build and deploy applications. In this post, I'll share my experience building serverless systems at AWS and key lessons learned.

## Why Serverless?

Serverless computing allows you to build applications without thinking about servers. AWS Lambda automatically scales your code in response to each trigger, and you only pay for the compute time you consume.

## Key Components

- **AWS Lambda** - Run code without provisioning servers
- **API Gateway** - Create RESTful APIs at any scale
- **DynamoDB** - Fast and flexible NoSQL database
- **S3** - Object storage for any amount of data

## Getting Started

The best way to start is with AWS CDK (Cloud Development Kit), which lets you define your infrastructure using familiar programming languages like TypeScript.

Here's a simple example of creating a Lambda function with CDK:

\`\`\`typescript
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class MyStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
    });
  }
}
\`\`\`

*Stay tuned for more deep dives into cloud architecture patterns!*
    `,
  },
];
