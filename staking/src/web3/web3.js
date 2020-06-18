import tokenABI from './contractabi.json'
import Web3 from 'web3'

// Redux actions
import { 
  SetBalance,
  SetStakingAmount,
  SetInterestEarned, 
  SetTotalStaked,
  SetTotalStakingRewards,
  SetUserStakingRewards,
  SetUniswapBurn,
  SetTransferBurnAmount } from '../redux-modules/user/actions'

const contractAddress = "0xE908b0Ef400B7df6939be9641092F7c1f4866e17"

export const HasMetamask = () => {
  if (typeof window.ethereum !== 'undefined') {
    return true
  }
  return false
}

export const GetBalance = (dispatch,provider,account) => {
  var web3 = new Web3(provider)
  var tokenInst = new web3.eth.Contract(tokenABI.abi,contractAddress);
  tokenInst.methods.balanceOf(account).call().then((bal) => {
    dispatch(SetBalance(web3.utils.fromWei(bal)))
  }).catch((err) => {
    console.log(err)
  })
}

export const GetStakingAmount = (dispatch,provider,account) => {
  var web3 = new Web3(provider)
  var tokenInst = new web3.eth.Contract(tokenABI.abi,contractAddress);
  tokenInst.methods.getStake(account).call().then((stakeBal) => {
    dispatch(SetStakingAmount(web3.utils.fromWei(stakeBal)))
  }).catch((err) => {
    console.log(err)
  })
}

export const GetInterest = (dispatch,provider,account) => {
  var web3 = new Web3(provider)
  var tokenInst = new web3.eth.Contract(tokenABI.abi,contractAddress);
  tokenInst.methods.getInterest(account).call().then((interestBal) => {
    dispatch(SetInterestEarned(web3.utils.fromWei(interestBal)))
  }).catch((err) => {
    console.log(err)
  })
}

export const SubmitStake = (dispatch,provider,from,stakeValue) => {
  var web3 = new Web3(provider)
  var tokenInst = new web3.eth.Contract(tokenABI.abi,contractAddress);
  tokenInst.methods.stake(web3.utils.toWei(stakeValue)).send({from}).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}

export const SubmitUnstake = (dispatch,provider,from,unstakeValue) => {
  var web3 = new Web3(provider)
  var tokenInst = new web3.eth.Contract(tokenABI.abi,contractAddress);
  tokenInst.methods.unstake(web3.utils.toWei(unstakeValue)).send({from}).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}

export const GetTotalStake = (dispatch,provider) => {
  var web3 = new Web3(provider)
  var tokenInst = new web3.eth.Contract(tokenABI.abi,contractAddress);
  tokenInst.methods.totalStaked().call().then((totalStaked) => {
    dispatch(SetTotalStaked(parseInt(web3.utils.fromWei(totalStaked)),10))
  }).catch((err) => {
    console.log(err)
  })
}


export const GetTotalStakingRewards = (dispatch,provider) => {
  var web3 = new Web3(provider)
  var tokenInst = new web3.eth.Contract(tokenABI.abi,contractAddress);
  tokenInst.methods.getTotalStakingReward().call().then((totalStakingRewards) => {
    dispatch(SetTotalStakingRewards(parseInt(web3.utils.fromWei(totalStakingRewards)),10))
  }).catch((err) => {
    console.log(err)
  })
}

export const GetUserStakingRewards = (dispatch,provider,account) => {
  var web3 = new Web3(provider)
  var tokenInst = new web3.eth.Contract(tokenABI.abi,contractAddress);
  tokenInst.methods.stakingRewards(account).call().then((userStakingReward) => {
    dispatch(SetUserStakingRewards(parseInt(web3.utils.fromWei(userStakingReward)),10))
  }).catch((err) => {
    console.log(err)
  })
}

export const GetUniswapBurns = (dispatch,provider) => {
  var web3 = new Web3(provider)
  var tokenInst = new web3.eth.Contract(tokenABI.abi,contractAddress);
  tokenInst.methods.getUniswapBurns().call().then((uniswapBurntAmount) => {
    dispatch(SetUniswapBurn(parseInt(web3.utils.fromWei(uniswapBurntAmount)),10))
  }).catch((err) => {
    console.log(err)
  })
}

export const GetTransferBurns = (dispatch,provider) => {
  var web3 = new Web3(provider)
  var tokenInst = new web3.eth.Contract(tokenABI.abi,contractAddress);
  tokenInst.methods.getTransferBurns().call().then((transferBurnAmount) => {
    dispatch(SetTransferBurnAmount(parseInt(web3.utils.fromWei(transferBurnAmount)),10))
  }).catch((err) => {
    console.log(err)
  })
}