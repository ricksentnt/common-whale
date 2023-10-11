import { COMPOUND_V3_MARKETS, CompoundV3GraphqlClient } from './graphql/CompoundV3.js';


export const fetchCompoundV3Markets = async () => {
  console.log('fetchCompoundV3Markets')

  const markets = await CompoundV3GraphqlClient.request(COMPOUND_V3_MARKETS)
  return markets.markets
}
