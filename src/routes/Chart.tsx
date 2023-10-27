import { useQuery } from 'react-query';
import { fetchCoinHistory } from './api';
import ApexChart from 'react-apexcharts';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(`${coinId}`),
    {
      refetchInterval: 10000,
    }
  );

  interface ICandlestickData {
    x: string;
    y: number[];
  }

  const candlestickData: ICandlestickData[] = (data || []).map((price) => ({
    x: new Date(parseInt(price.time_close) * 1000).toString(),
    y: [price.open, price.high, price.low, price.close],
  }));

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: candlestickData,
            },
          ]}
          options={{
            theme: { mode: 'dark' },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: { show: false },
            xaxis: {
              type: 'datetime',
              labels: {
                datetimeUTC: false,
              },
            },
            yaxis: {
              labels: {
                minWidth: 40,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#0be881',
                  downward: '#ff3f34',
                },
              },
            },
            tooltip: {
              x: {
                format: 'dd MMM yyyy HH:mm',
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
