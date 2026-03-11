# Deployment Guide

This application is a standalone Express + React app that can be deployed anywhere. No builder.io required!

## Quick Start (Local Production)

```bash
npm install
npm run build
npm start
```

Visit: http://localhost:3000

---

## Deployment Options

### 1. Docker Deployment (Recommended)

**Build and run:**
```bash
docker build -t website-builder .
docker run -p 3000:3000 website-builder
```

**Or use docker-compose:**
```bash
docker-compose up -d
```

---

### 2. Deploy to Render.com (Free Tier Available)

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new "Web Service"
4. Connect your repository
5. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
6. Deploy!

---

### 3. Deploy to Railway.app (Free Tier Available)

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects settings
6. Deploy!

---

### 4. Deploy to Fly.io

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
flyctl auth login

# Launch app
flyctl launch

# Deploy
flyctl deploy
```

---

### 5. Deploy to DigitalOcean App Platform

1. Push code to GitHub
2. Go to [DigitalOcean Apps](https://cloud.digitalocean.com/apps)
3. Create new app from GitHub
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Run Command**: `npm start`
5. Deploy!

---

### 6. Deploy to AWS (EC2 or Elastic Beanstalk)

**EC2:**
```bash
# SSH into EC2 instance
ssh -i your-key.pem ec2-user@your-instance

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo yum install -y nodejs

# Clone and deploy
git clone your-repo
cd website-builder-8ad
npm install
npm run build
npm start
```

**Elastic Beanstalk:**
```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init

# Create environment and deploy
eb create production
eb deploy
```

---

### 7. Deploy to Vercel (Serverless)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

### 8. Deploy to Heroku

```bash
# Install Heroku CLI
# Then:
heroku login
heroku create your-app-name
git push heroku main
```

---

## Environment Variables

Set these in your deployment platform:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Set to "production"
- `PING_MESSAGE` - Custom ping message (optional)

---

## Health Check Endpoint

Use `/api/ping` for health checks in your deployment platform.

---

## Notes

- The app serves both frontend (React SPA) and backend (Express API)
- All API routes are under `/api/*`
- Frontend uses React Router for client-side routing
- Built files are in `dist/` after running `npm run build`
