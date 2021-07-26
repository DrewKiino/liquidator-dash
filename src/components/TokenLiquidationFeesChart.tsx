import {Doughnut} from 'react-chartjs-2';
import React, {useEffect, useState} from 'react';
import * as Mango from '../services/Mango';
import {Liquidation} from '../services/models/Liquidation';
import {NumberData} from './models/NumberData';
import ChartDataLabels from 'chartjs-plugin-datalabels';

function createChartData(data: NumberData[]) {
  return {
    labels: ['SOL', 'BTC', 'ETH', 'SRM', 'USDC'],
    datasets: [{
      data: data.map((e) => e.y),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(54, 100, 100)',
        'rgb(54, 162, 100)',
      ],
    }],
  };
}

function aggregateSymbolToLiquidationFee(data: Liquidation[]): NumberData[] {
  const aggregate: any = {
    'SOL': 0.0,
    'BTC': 0.0,
    'ETH': 0.0,
    'SRM': 0.0,
    'USDC': 0.0,
  };
  data.forEach((e) => {
    const key = e.outTokenSymbol;
    aggregate[key] = aggregate[key] + e.liquidationFeeUsd;
  });
  return Object.keys(aggregate).map((key, _) => {
    return {x: key, y: aggregate[key]};
  });
}

const plugins = [ChartDataLabels];

export function TokenLiquidationFeesChart() {
  const [data, setData]: [Array<Liquidation>, any] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Mango.getLiquidatorBalances(10000, 0);
      setData(response);
    };
    fetchData().then();
  }, []);

  const dataset = aggregateSymbolToLiquidationFee(data);
  const chart = createChartData(dataset);

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Total Liquidation Fees by Token',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      datalabels: {
        borderRadius: 4,
        color: 'white',
        font: {
          size: 18,
        },
        formatter: (e: number) => {
          return `$${Math.round(e)}`;
        },
        padding: 6,
      },
    },
  };

  return (
    <Doughnut data={chart} plugins={plugins} options={options}/>
  );
}
