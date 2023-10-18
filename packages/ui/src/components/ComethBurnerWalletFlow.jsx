import React from 'react'
import { ethers } from 'ethers'
import axios from 'axios'

export default function ComethBurnerWalletFlow() {
  const startFlow = async ({
    address = '',
    privateKey = '',
  }) => {
    /* ----------------- 1. EOA Wallet Creation ----------------- */
    let _address;
    let _privateKey;

    if (!address && !privateKey) {
      const newSignerWallet = ethers.Wallet.createRandom()
      console.log('newSignerWallet', {
        address: newSignerWallet.address,
        privateKey: newSignerWallet.privateKey
      })

      _address = newSignerWallet.address
      _privateKey = newSignerWallet.privateKey
    } else {
      console.log('using existing address and private key')
      _address = address
      _privateKey = privateKey
    }

    /* ----------------- 2. Cometh Wallet Creation ----------------- */
    // Create a new wallet instance on Cometh, with the created regular EOA wallet
    const createComethWallet = await axios({
      method: 'POST',
      url: 'https://api.connect.cometh.io/wallets/init',
      headers: {
        'apiKey': import.meta.env.VITE_COMETH_API_KEY
      },
      data: {
        ownerAddress: _address,
      }
    })
    console.log('createComethWallet', {
      address: createComethWallet.data.walletAddress
    })

    // Test to see the wallet is created, this can be used to predict the wallet address, but to to actually use it, need to init the wallet first
    const getComethWallet = await axios({
      method: 'GET',
      url: `https://api.connect.cometh.io/wallets/${_address}/wallet-address`,
      headers: {
        'apiKey': import.meta.env.VITE_COMETH_API_KEY
      },
    })
    console.log('getComethWallet', {
      address: getComethWallet.data.walletAddress
    })
  }

  return (

    <div className='flex flex-row items-center gap-4'>
      <button
        onClick={startFlow}
        className='btn btn-primary'
      >
        Run ComethBurnerWalletFlow
      </button>

      <button
        onClick={() => startFlow({
          address: "0xF6d7ef7A0808dAe6830EAC8CB346Fa68E3f35856",
          privateKey: "0x66f4c4ed2b569690a42f3ee092e009513eec57bfc70995d16a2120c3779083c3"
        })}
        className='btn btn-primary'
      >
        Run ComethBurnerWalletFlow with address
      </button>
    </div>
  )
}
