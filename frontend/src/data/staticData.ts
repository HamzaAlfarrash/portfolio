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
    content: `
      <h2>Introduction</h2>
      <p>Serverless architecture has revolutionized how we build and deploy applications. In this post, I'll share my experience building serverless systems at AWS and key lessons learned.</p>
      
      <h2>Why Serverless?</h2>
      <p>Serverless computing allows you to build applications without thinking about servers. AWS Lambda automatically scales your code in response to each trigger, and you only pay for the compute time you consume.</p>
      
      <h2>Key Components</h2>
      <ul>
        <li><strong>AWS Lambda</strong> - Run code without provisioning servers</li>
        <li><strong>API Gateway</strong> - Create RESTful APIs at any scale</li>
        <li><strong>DynamoDB</strong> - Fast and flexible NoSQL database</li>
        <li><strong>S3</strong> - Object storage for any amount of data</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>The best way to start is with AWS CDK (Cloud Development Kit), which lets you define your infrastructure using familiar programming languages like TypeScript.</p>
      
      <p><em>Stay tuned for more deep dives into cloud architecture patterns!</em></p>
    `,
  },
];
