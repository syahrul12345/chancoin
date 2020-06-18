import axios from 'axios';
import Web3 from 'web3'
import { SetUniswapBurnTx,SetAllTransactions } from '../redux-modules/user/actions';

const development = {
  etherscanURL: "https://ropsten.etherscan.io",
  etherscanAPIURL: "https://api-ropsten.etherscan.io",
  etherscanToken: process.env.REACT_APP_ETHERSCAN_TOKEN,
  fromBlock:"8010000",
  toBlock:"latest",
  tokenAddress:process.env.REACT_APP_TOKEN_ADDRESS,
  uniswapAddress:process.env.REACT_APP_UNISWAP_ADDRESS,
}

const production = {
  etherscanURL: "https://etherscan.io",
  etherscanAPIURL: "https://api.etherscan.io", 
  etherscanToken: process.env.REACT_APP_ETHERSCAN_TOKEN,
  fromBlock:"8010000",
  toBlock:"latest",
  tokenAddress:process.env.REACT_APP_TOKEN_ADDRESS,
  uniswapAddress:process.env.REACT_APP_UNISWAP_ADDRESS,
}

export const GetUniswapBurnsTransactions = (dispatch) => {
  let environements = {}
  if(process.env.NODE_ENV === "production") {
    environements = production
  }else {
    environements = development
  }
  const { etherscanURL, etherscanAPIURL,etherscanToken , fromBlock,toBlock ,tokenAddress,uniswapAddress } = environements
  const topic0 = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
  const url = `${etherscanAPIURL}/api?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${toBlock}&address=${tokenAddress}&topic0=${topic0}&topic1=${uniswapAddress}&apikey=${etherscanToken}`
  
  axios.get(url).then((res) => {
    const queue = []
    const web3 = new Web3()
    const { data: { result }} = res
    while(result.length > 0) {
      var popped = result.pop()
      var tempData = {txHash: popped.transactionHash,data:popped.data,url:`${etherscanURL}/tx/${popped.transactionHash}`,blockNumber:web3.utils.hexToNumber(popped.blockNumber).toLocaleString()}
      queue.push(tempData)
    }
    dispatch(SetUniswapBurnTx(queue))
  }).catch(err => {
    console.log(err)
  })
}

export const GetAllTransactions = (dispatch) => {
  let environements = {}
  if(process.env.NODE_ENV === "production") {
    environements = production
  }else {
    environements = development
  }
  const { etherscanURL, etherscanAPIURL,etherscanToken , fromBlock,toBlock ,tokenAddress,uniswapAddress } = environements
  const topic0 = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
  const url = `${etherscanAPIURL}/api?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${toBlock}&address=${tokenAddress}&topic0=${topic0}&apikey=${etherscanToken}`
  
  axios.get(url).then((res) => {
    const queue = []
    const web3 = new Web3()
    const { data: { result }} = res
    var hold = {}
    while(result.length > 0) {
      var popped = result.pop()
      // Prevent duplicates
      if(popped.transactionHash && hold[popped.transactionHash] == undefined) {
        var tempData = {txHash: popped.transactionHash,data:popped.data,url:`${etherscanURL}/tx/${popped.transactionHash}`,blockNumber:web3.utils.hexToNumber(popped.blockNumber).toLocaleString()}
        console.log(popped.data)
        queue.push(tempData)
        hold[popped.transactionHash] = true
      }
    }
    dispatch(SetAllTransactions(queue))
  }).catch(err => {
    console.log(err)
  })

}