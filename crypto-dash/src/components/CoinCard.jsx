import { Link } from "react-router";

const formatCurrency = (value) =>
  value == null
    ? "N/A"
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }).format(value);

const CoinCard = ({ coin }) => {
  const priceChange = coin.price_change_percentage_24h;

  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="coin-card">
        <div className="coin-header">
          <img src={coin.image} alt={coin.name} className="coin-image"></img>
          <div>
            <h2>{coin.name}</h2>
            <p className="symbol">{coin.symbol.toUpperCase()}</p>
          </div>
        </div>
        <p>Price: {formatCurrency(coin.current_price)}</p>
        <p
          className={
            priceChange == null
              ? ""
              : priceChange >= 0
                ? "positive"
                : "negative"
          }
        >
          {priceChange == null ? "N/A" : `${priceChange.toFixed(2)}%`}
        </p>
        <p>Market Cap: {formatCurrency(coin.market_cap)}</p>
      </div>
    </Link>
  );
};

export default CoinCard;
