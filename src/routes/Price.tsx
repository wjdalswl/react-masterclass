import React from 'react';
import { useQuery } from 'react-query';
import { fetchCoinTickers } from './api';
import ApexChart from 'react-apexcharts';

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceProps {
  coinId: string;
}

const Price: React.FC<PriceProps> = ({ coinId }) => {
  const { isLoading, data: priceData } = useQuery<PriceData>(
    ['price', coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 60000,
    }
  );

  return (
    <div>
      <h2>
        Price Data for {priceData?.name} ({priceData?.symbol})
      </h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ApexChart
          options={{
            chart: {
              id: 'price-chart',
            },
            xaxis: {
              categories: ['1h', '24h', '7d', '30d', '1y'],
            },
          }}
          series={[
            {
              name: 'Price (USD)',
              data: [
                priceData?.quotes.USD.percent_change_1h ?? 0,
                priceData?.quotes.USD.percent_change_24h ?? 0,
                priceData?.quotes.USD.percent_change_7d ?? 0,
                priceData?.quotes.USD.percent_change_30d ?? 0,
                priceData?.quotes.USD.percent_change_1y ?? 0,
              ],
            },
          ]}
          type="line"
          height={350}
        />
      )}
    </div>
  );
};

export default Price;
