# Detailed AWS Lambda Deployment Steps

## ✅ Step 1: Build (Already Done!)

You've successfully completed:
```bash
sam build
```

---

## Step 2: First-Time Deployment (Guided)

Run the guided deployment which will ask you questions and save your answers:

```bash
cd backend
sam deploy --guided
```

### What to Enter for Each Prompt:

1. **Stack Name** [portfolio-api]:
   - Press Enter (uses default: `portfolio-api`)
   - Or type a custom name like `my-portfolio-api`

2. **AWS Region** [us-east-1]:
   - Press Enter for `us-east-1` (recommended, fastest)
   - Or choose: `us-west-2`, `eu-west-1`, etc.

3. **Parameter ProjectName** [portfolio-api]:
   - Press Enter (uses default)

4. **#Shows you resources to be created and will prompt "Y" to confirm**:
   - Type `Y` and press Enter

5. **Allow SAM CLI IAM role creation** [Y/n]:
   - Type `Y` and press Enter
   - This allows SAM to create necessary IAM roles

6. **Disable rollback** [y/N]:
   - Press Enter (default is `N` - keep rollback enabled)
   - This allows automatic rollback if deployment fails

7. **PortfolioApiFunction may not have authorization defined, Is this okay?** [y/N]:
   - Type `y` and press Enter
   - Your API is public (which is fine for a portfolio)

8. **Save arguments to configuration file** [Y/n]:
   - Type `Y` and press Enter
   - This creates `samconfig.toml` so you don't need to answer these again

9. **SAM configuration file** [samconfig.toml]:
   - Press Enter (uses default filename)

10. **SAM configuration environment** [default]:
    - Press Enter (uses default environment)

---

## Step 3: Wait for Deployment

The deployment will take 2-5 minutes. You'll see:
- Creating CloudFormation stack
- Creating IAM roles
- Packaging code
- Uploading to S3
- Creating Lambda function
- Creating API Gateway

**Watch for this important output at the end:**

```
Outputs:
  PortfolioApi:
    Description: "API Gateway endpoint URL for Prod stage"
    Value: https://abc123xyz.execute-api.us-east-1.amazonaws.com/Prod/
  PortfolioApiFunction:
    Description: "Portfolio Lambda Function ARN"
    Value: arn:aws:lambda:us-east-1:123456789:function:portfolio-api-PortfolioApiFunction-ABC123
```

**📝 COPY THE API GATEWAY URL** - You'll need this for the frontend!

---

## Step 4: Test Your Backend

### Test Health Endpoint

```bash
# Replace YOUR_API_URL with the URL from Step 3
curl https://YOUR_API_URL/health
```

Expected response:
```json
{"status":"healthy","service":"Portfolio API","version":"1.0.0"}
```

### Test Projects Endpoint

```bash
curl https://YOUR_API_URL/projects
```

Should return your projects array.

### Test Blogs Endpoint

```bash
curl https://YOUR_API_URL/blogs
```

Should return your blog posts metadata.

---

## Step 5: View Logs (Optional but Useful)

To see your Lambda function logs:

```bash
sam logs -n PortfolioApiFunction --stack-name portfolio-api --tail
```

This shows real-time logs. Useful for debugging!

---

## Step 6: Subsequent Deployments

After the first deployment, you can simply run:

```bash
sam build
sam deploy
```

No more prompts needed! Your settings are saved in `samconfig.toml`.

---

## Troubleshooting

### Issue: "Stack already exists"
- **Solution**: The stack name is already in use. Either:
  - Use a different stack name
  - Delete the existing stack: `aws cloudformation delete-stack --stack-name portfolio-api`

### Issue: "Access Denied" or IAM errors
- **Solution**: Your AWS credentials might not have sufficient permissions
- **Solution**: Check your IAM user has these permissions:
  - CloudFormation (full access)
  - Lambda (full access)
  - API Gateway (full access)
  - IAM (create roles)
  - S3 (for SAM to store artifacts)

### Issue: Deployment takes too long
- **Normal**: First deployment takes 3-5 minutes
- Subsequent deployments are faster (1-2 minutes)

### Issue: CORS errors when testing
- **Normal**: CORS is configured for specific origins
- We'll update CORS after frontend deployment

---

## Next: Frontend Deployment

Once your backend is deployed and tested:

1. **Save your API Gateway URL** (from Step 3)
2. **Proceed to Vercel deployment** (see main DEPLOYMENT.md)
3. **Add environment variable** `VITE_API_URL` in Vercel
4. **Update CORS** if needed (add your Vercel domain)

---

## Useful Commands Reference

```bash
# Build
sam build

# Deploy (first time - guided)
sam deploy --guided

# Deploy (subsequent)
sam deploy

# View logs
sam logs -n PortfolioApiFunction --stack-name portfolio-api --tail

# Delete stack (if needed)
sam delete --stack-name portfolio-api

# List stacks
aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE
```

---

## Cost Check

After deployment, check your AWS costs:
- Go to AWS Console → Billing Dashboard
- Lambda free tier: 1M requests/month, 400K GB-seconds
- API Gateway free tier: 1M API calls/month
- **Your portfolio should stay within free tier!**

---

## Security Note

Your API is currently public (no authentication). This is fine for a portfolio site, but if you want to add rate limiting or authentication later, we can configure that.

