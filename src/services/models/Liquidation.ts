import {Balance} from './Balance';

export interface Liquidation {
  balances: Array<Balance>,
  mangoGroup: string,
  blockDatetime: string,
  collateralRatio: number,
  inTokenAmount: number,
  inTokenPrice: number,
  inTokenSymbol: string,
  inTokenUsd: string,
  outTokenAmount: number,
  outTokenPrice: number,
  outTokenSymbol: string,
  outTokenUsd: number,
  liqee: string,
  liqor: string,
  liquidationFeeUsd: number,
  signature: string,
  socializedLosses: boolean
}
