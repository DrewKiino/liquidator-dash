import * as DotEnv from 'dotenv';
DotEnv.config();
import {describe, it} from 'mocha';
import {expect} from 'chai';
import * as Mango from '../src/services/Mango';

describe('Get User Balance', () => {
  it('should return and parse correctly', async () => {
    const result = await Mango.getLiquidatorBalances(1, 0);
    expect(result).exist;
    expect(result.length).greaterThanOrEqual(0);
  });
});
