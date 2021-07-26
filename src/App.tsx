import * as dotenv from 'dotenv';
// import * as Mango from './services/Mango';
import React from 'react';
import './App.css';
import {TokenLiquidationFeesChart} from './components/TokenLiquidationFeesChart';

dotenv.config({path: __dirname+'/.env'});

function App() {
  return (
    <div className='Chart'>
      <TokenLiquidationFeesChart />
    </div>
  );
}

export default App;
