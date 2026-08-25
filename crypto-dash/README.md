# Crypto D

Crypto D is a React dashboard for browsing cryptocurrency market data in INR. It uses the CoinGecko API to display a searchable, sortable list of coins and a detail view with market statistics and a seven-day price chart.

## Features

- View the leading coins by market capitalization
- Search coins by name or symbol
- Sort by market cap, price, or 24-hour change
- Choose how many coins to display
- Open a detailed view for each coin
- View current price, market cap, supply, volume, and 24-hour statistics
- View a seven-day price history chart
- Follow links to the coin's official website and blockchain explorer

## Tech Stack

- React 19
- Vite
- React Router
- Chart.js with `react-chartjs-2`
- CoinGecko API

## Prerequisites

- Node.js 18 or later
- npm

## Getting Started

1. Clone the repository and move into the project directory.

   ```bash
   git clone <repository-url>
   cd crypto-dash
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   VITE_API_URL=/api/coingecko/api/v3/coins/markets?vs_currency=inr
   VITE_COIN_API_URL=/api/coingecko/api/v3/coins
   ```

   During development, Vite proxies `/api/coingecko` to `https://api.coingecko.com`.

4. Start the development server.

   ```bash
   npm run dev
   ```

   Open the local URL printed by Vite, usually `http://localhost:5173`.

## Available Scripts

| Command           | Description                                       |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Start the Vite development server with hot reload |
| `npm run build`   | Create a production build in `dist/`              |
| `npm run preview` | Preview the production build locally              |
| `npm run lint`    | Run ESLint                                        |

## Routes

| Path        | Description                            |
| ----------- | -------------------------------------- |
| `/`         | Cryptocurrency market dashboard        |
| `/about`    | About page                             |
| `/coin/:id` | Details and seven-day chart for a coin |

## API Notes

The dashboard depends on CoinGecko availability and rate limits. The API values are configured through Vite environment variables, which are exposed to the browser at build time. Do not put private credentials in these variables.

For a production deployment, configure the hosting platform or backend to provide equivalent API routing. The proxy in `vite.config.js` is a Vite development-server proxy and is not automatically available from the generated static files.
