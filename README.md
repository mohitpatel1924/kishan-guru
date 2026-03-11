# Website Builder Application

A standalone full-stack web application with Express backend and React frontend. **No builder.io or external dependencies required!**

## 🚀 Quick Start

### Development Mode
```bash
npm install
npm run dev
```
Visit: http://localhost:5173

### Production Mode
```bash
npm install
npm run build
npm start
```
Visit: http://localhost:3000

## 📦 What's Included

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Express 5 + TypeScript
- **Features**:
  - Crop Recommendation System
  - Disease Detection
  - Financial Managment
  - Expert Consultation
  - Multi-language Support (i18n)
  - Responsive Design
  - Crop Managment
  - My Crop

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm test` - Run tests
- `npm run typecheck` - Type checking

## 🌐 API Endpoints

- `GET /api/ping` - Health check
- `GET /api/demo` - Demo endpoint

## 📁 Project Structure

```
├── client/          # React frontend
│   ├── components/  # UI components
│   ├── pages/       # Page components
│   ├── i18n/        # Internationalization
│   └── lib/         # Utilities
├── server/          # Express backend
│   ├── routes/      # API routes
│   └── index.ts     # Server setup
├── shared/          # Shared types
└── dist/            # Build output
    ├── spa/         # Frontend build
    └── server/      # Backend build
```

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- Docker
- Render.com
- Railway.app
- Fly.io
- DigitalOcean
- AWS
- Vercel
- Heroku

## 🔧 Environment Variables

Create a `.env` file:

```env
PORT=3000
NODE_ENV=production
PING_MESSAGE=ping pong
```

## 📝 License

Private

## 🤝 Contributing

This is a standalone application ready for deployment anywhere!
