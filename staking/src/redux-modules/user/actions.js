export const MetamaskLogIn = (account) => ({
  type: 'LOGIN',
  payload: {
    account,
  }
})

export const SetBalance = (balance) => ({
  type: 'SET_BALANCE',
  payload: {
    balance,
  }
})

export const SetStakingAmount = (stakeamount) => ({
  type: 'SET_STAKE',
  payload: {
    stakeamount,
  }
})

export const SetInterestEarned = (interestearned) => ({
  type: 'SET_INTEREST_EARNED',
  payload: {
    interestearned,
  }
})

export const SetTotalStaked = (totalStakedAmount) => ({
  type: 'SET_TOTAL_STAKED',
  payload: {
    totalStakedAmount
  }
})

export const SetTotalStakingRewards = (totalStakingRewards) => ({
  type: 'SET_TOTAL_STAKING_REWARDS',
  payload: {
    totalStakingRewards,
  }
})

export const SetUserStakingRewards = (userStakingRewards) => ({
  type: 'SET_USER_STAKING_REWARDS',
  payload: {
    userStakingRewards,
  }
})

export const SetUniswapBurn = (uniswapBurnAmount) => ({
  type: 'SET_UNISWAP_BURN_AMOUNT',
  payload: {
    uniswapBurnAmount,
  }
})

export const SetTransferBurnAmount = (transferBurnAmount) => ({
  type: 'SET_TRANSFER_BURN_AMOUNT',
  payload: {
    transferBurnAmount,
  }
})

export const SetUniswapBurnTx = (uniswapBurnTx) => ({
  type: 'SET_UNISWAP_BURN_TX',
  payload: {
    uniswapBurnTx,
  }
})

export const SetAllTransactions = (transactions) => ({
  type: 'SET_ALL_TRANSACTIONS',
  payload: {
    transactions,
  }
})

