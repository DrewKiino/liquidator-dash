import * as dotenv from 'dotenv';
import * as Mango from './services/Mango';
import React, {useEffect, useState} from 'react';
import './App.css';
import {Bar} from 'react-chartjs-2';
import {Liquidation} from './services/models/Liquidation';
import {TokenLiquidationFeesChart} from './components/TokenLiquidationFeesChart';
import {StatsView} from './components/StatsView';

dotenv.config({path: __dirname+'/.env'});

function App() {
  return (
    <div className='Chart'>
      <TokenLiquidationFeesChart />
    </div>
  );
}

export default App;
