/* --------------------------------- BALANCE -------------------------------- */
const GET_BALANCE_RESPONSE = {
  assets: [
    {
      address: "0x....123",
      token: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
        logo: "https"
      },
      balance: 20,
      balanceUsd: 10000
    }
  ],
  totalBalanceUsd: 10000
}

/* -------------------------- TRANSACTIONS -------------------------- */
// Nerima Signature keknya, JANGAN NEMBAK PRIVATE KEY KE SINI, 
const POST_TRANSACTION = {
  destinationUserId: "",
  chainId: "",
  notes: ""
}

const GET_TRANSACTION = {}


