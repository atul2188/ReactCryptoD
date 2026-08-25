import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
);

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinChart = async () => {
      try {
        const res = await fetch(
          `${API_URL}/${coinId}/market_chart?vs_currency=inr&days=7`,
        );
        if (!res.ok) throw new Error("Failed to fetch chart data");
        const data = await res.json();

        const prices = data.prices.map(([timestamp, value]) => ({
          x: timestamp,
          y: value,
        }));

        setChartData({
          datasets: [
            {
              label: "Price (INR)",
              data: prices,
              fill: true,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123,255,0.1)",
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinChart();
  }, [coinId]);

  return (
    <div style={{ marginTop: "30px" }}>
      {loading && <p>Loading chart...</p>}
      {error && <p className="error">{error}</p>}
      {chartData && !error && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { mode: "index", intersect: false },
            },
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 7,
                },
              },
              y: {
                ticks: {
                  callback: (value) => `₹${value.toLocaleString()}`,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default CoinChart;
