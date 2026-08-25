import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Spinner from "../components/Spinner";
import CoinChart from "../components/CoinChart";
const API_URL = import.meta.env.VITE_COIN_API_URL;

const formatCurrency = (value) =>
  value == null
    ? "N/A"
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }).format(value);

const formatNumber = (value) =>
  value == null ? "N/A" : new Intl.NumberFormat("en-US").format(value);

const CoinDetailsPage = () => {
  const { id } = useParams();

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return (
    <div className="coin-details-container">
      <Link to={"/"}>Go Back to Home</Link>

      <h1 className="coin-details-title">
        {coin ? `${coin.name} (${coin.symbol})` : "Coin Details"}
      </h1>

      {loading && <Spinner />}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <img
            src={coin.image.large}
            alt={coin.name}
            className="coin-details-image"
          ></img>

          <p className="coin-details-description">
            {coin.description?.en?.split(". ")[0] ||
              "No description available."}
          </p>

          <div className="coin-details-info">
            <h4>
              Current Price:{" "}
              {formatCurrency(coin.market_data.current_price.inr)}
            </h4>
            <h4>24h High: {formatCurrency(coin.market_data.high_24h.inr)}</h4>
            <h4>24h Low: {formatCurrency(coin.market_data.low_24h.inr)}</h4>
            <h4
              className={
                coin.market_data.price_change_percentage_24h >= 0
                  ? "positive"
                  : "negative"
              }
            >
              24h Change:{" "}
              {coin.market_data.price_change_percentage_24h?.toFixed(2) ??
                "N/A"}
              %
            </h4>
            <h4>
              Market Cap: {formatCurrency(coin.market_data.market_cap.inr)}
            </h4>
            <h4>Market Cap Rank: #{coin.market_cap_rank ?? "N/A"}</h4>
            <h4>
              24h Volume: {formatCurrency(coin.market_data.total_volume.inr)}
            </h4>
            <h4>
              Circulating Supply:{" "}
              {formatNumber(coin.market_data.circulating_supply)}
            </h4>
          </div>

          <CoinChart coinId={coin.id} />

          <div className="coin-details-links">
            {coin.links.homepage[0] && (
              <a href={coin.links.homepage[0]} target="_blank" rel="noreferrer">
                Official Website
              </a>
            )}
          </div>
          <div className="coin-details-links">
            {coin.links.blockchain_site[0] && (
              <a
                href={coin.links.blockchain_site[0]}
                target="_blank"
                rel="noreferrer"
              >
                Blockchain Explorer
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinDetailsPage;
