# Wedding Raw Material Aggregator Platform

Monorepo with:
- `client/`: React + Vite frontend
- `server/`: Express + MongoDB backend (Vercel-compatible API entry)

## Local setup

1. Install dependencies:
```bash
npm install
npm --prefix client install
npm --prefix server install
```

2. Create env file at `server/.env`:
```env
MONGO_URI=mongodb://127.0.0.1:27017/wedding_aggregator
JWT_SECRET=replace_with_strong_secret
CLIENT_URL=http://localhost:5173
PORT=3000
```

3. Run both apps:
```bash
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:3000`

## API routes
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/calculate`
- `POST /api/shop/update-price`
- `GET /api/shops`
- `POST /api/order`

## Vercel deployment
- Frontend build output comes from `client/dist`
- API is exposed via `server/api/index.js`
- Set server env vars (`MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`) in Vercel Project settings
