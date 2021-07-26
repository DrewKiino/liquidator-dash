import axios from 'axios';
import {Liquidation} from './models/Liquidation';
import {Balance} from './models/Balance';

export const getLiquidatorBalances = async (
    limit?: number,
    offset?: number,
) => {
  try {
    const params: any = {
      limit: limit,
      offset: offset,
    };
    const queryParams = Object.keys(params)
        .map((key: string) => {
          const value: number = params[key];
          return `${key}=${value}`;
        })
        .join('&');
    let url = 'https://mango-transaction-log.herokuapp.com/stats/all_liquidations';
    if (queryParams.length > 0) {
      url += `?${queryParams}`;
    }
    const response = await axios.get(url);
    return response.data.map((e: any) => {
      return {
        balances: e.balances.map((n: any) => {
          return {
            startAssets: n.start_assets,
            endAssets: n.end_assets,
            price: n.price,
            symbol: n.symbol,
          } as Balance;
        }),
        blockDatetime: e.block_datetime,
        collateralRatio: e.coll_ratio,
        inTokenAmount: e.in_token_amount,
        inTokenPrice: e.in_token_price,
        inTokenSymbol: e.in_token_symbol,
        inTokenUsd: e.in_token_usd,
        liqee: e.liqee,
        liqor: e.liqor,
        liquidationFeeUsd: e.liquidation_fee_usd,
        mangoGroup: e.mango_group,
        outTokenAmount: e.out_token_amount,
        outTokenPrice: e.out_token_price,
        outTokenSymbol: e.out_token_symbol,
        outTokenUsd: e.out_token_usd,
        signature: e.signature,
        socializedLosses: e.socialized_losses,
      } as Liquidation;
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

