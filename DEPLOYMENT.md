# Deployment Guide

This guide walks you through deploying your portfolio to production using **AWS Lambda** (backend) and **Vercel** (frontend).

## Prerequisites

- AWS Account (free tier eligible)
- GitHub account
- Node.js and npm installed
- AWS CLI installed and configured
- AWS SAM CLI installed

---

## Part 1: Backend Deployment (AWS Lambda)

### Step 1: Install AWS SAM CLI

```bash
# macOS
brew install aws-sam-cli

# Or follow official guide: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html
```

### Step 2: Configure AWS Credentials

```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter your default region (e.g., us-east-1)
# Enter default output format (json)
```

### Step 3: Build and Deploy Backend

```bash
cd backend

# First time deployment (guided)
sam build
sam deploy --guided

# Follow the prompts:
# - Stack Name: portfolio-api
# - AWS Region: us-east-1 (or your preferred region)
# - Confirm changes before deploy: Y
# - Allow SAM CLI IAM role creation: Y
# - Disable rollback: N
# - Save arguments to configuration file: Y
```

### Step 4: Get Your API Gateway URL

After deployment, SAM will output your API Gateway URL:

```
Outputs:
  PortfolioApi:
    Description: "API Gateway endpoint URL for Prod stage"
    Value: https://abc123xyz.execute-api.us-east-1.amazonaws.com/Prod/
```

**Save this URL** - you'll need it for the frontend deployment.

### Step 5: Test Your Backend

```bash
# Test the health endpoint
curl https://YOUR_API_GATEWAY_URL/health

# Should return: {"status":"healthy","service":"Portfolio API","version":"1.0.0"}
```

---

## Part 2: Frontend Deployment (Vercel)

### Step 1: Push Code to GitHub

```bash
# If not already done, initialize git and push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (if your frontend is in a subdirectory)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variable

In Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add a new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Your AWS API Gateway URL (from Part 1, Step 4)
   - **Environment**: Production, Preview, Development (select all)

Example:
```
VITE_API_URL=https://abc123xyz.execute-api.us-east-1.amazonaws.com/Prod
```

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete
3. Vercel will provide you with a URL (e.g., `https://your-portfolio.vercel.app`)

### Step 5: Update Backend CORS (if needed)

If you get CORS errors, update `backend/app/core/config.py`:

```python
cors_origins: list[str] = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8080",
    "https://your-portfolio.vercel.app",  # Add your Vercel URL
]
```

Then redeploy:
```bash
cd backend
sam build
sam deploy
```

---

## Part 3: Custom Domain (Optional)

### Vercel Custom Domain

1. In Vercel project settings, go to **Domains**
2. Add your custom domain (e.g., `portfolio.yourdomain.com`)
3. Follow DNS configuration instructions
4. Update `VITE_API_URL` if needed

### Update CORS for Custom Domain

Add your custom domain to `backend/app/core/config.py`:

```python
cors_origins: list[str] = [
    # ... existing origins ...
    "https://portfolio.yourdomain.com",
]
```

Redeploy backend after updating.

---

## Troubleshooting

### Backend Issues

**Issue**: `sam build` fails
- **Solution**: Ensure you're in the `backend` directory and all dependencies are in `requirements.txt`

**Issue**: CORS errors in browser
- **Solution**: Check that your frontend URL is in `cors_origins` or matches `cors_origin_regex`

**Issue**: Lambda timeout
- **Solution**: Increase timeout in `template.yaml` (currently 30 seconds)

### Frontend Issues

**Issue**: API calls fail
- **Solution**: Verify `VITE_API_URL` environment variable is set correctly in Vercel

**Issue**: Build fails
- **Solution**: Check build logs in Vercel dashboard, ensure all dependencies are in `package.json`

---

## Cost Estimation

### AWS Lambda (Backend)
- **Free Tier**: 1M requests/month, 400K GB-seconds compute
- **Typical Portfolio**: ~$0/month (well within free tier)

### Vercel (Frontend)
- **Free Tier**: Unlimited bandwidth, 100GB bandwidth/month
- **Typical Portfolio**: ~$0/month (well within free tier)

**Total Estimated Cost: $0/month** 🎉

---

## Useful Commands

### Backend

```bash
# Build
sam build

# Deploy
sam deploy

# View logs
sam logs -n PortfolioApiFunction --stack-name portfolio-api --tail

# Delete stack
sam delete --stack-name portfolio-api
```

### Frontend

```bash
# Local development
cd frontend
npm install
npm run dev

# Build locally
npm run build

# Preview production build
npm run preview
```

---

## Next Steps

- Set up a custom domain
- Configure CloudWatch alarms for monitoring
- Set up CI/CD with GitHub Actions (optional)
- Add analytics (optional)

---

## Support

For issues:
- AWS SAM: [AWS SAM Documentation](https://docs.aws.amazon.com/serverless-application-model/)
- Vercel: [Vercel Documentation](https://vercel.com/docs)

