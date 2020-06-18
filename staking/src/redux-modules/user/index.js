const userInitialState = {
  account: "",
  balance: 0,
  stakeamount: 0,
  interestearned: 0,
  totalStakedAmount: 0,
  totalStakingRewards: 0,
  userStakingRewards: 0,
  uniswapBurnAmount: 0,
  transferBurnAmount: 0,
};

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case 'LOGIN':
      const { account } = action.payload;
      return {
        ...state,
        account,
      };
    case 'SET_BALANCE':
      const { balance } = action.payload;
      return {
        ...state,
        balance,
      }
    case 'SET_STAKE':
      const { stakeamount } = action.payload;
      return {
        ...state,
        stakeamount,
      }
    case 'SET_INTEREST_EARNED':
      const { interestearned } = action.payload;
      return {
        ...state,
        interestearned,
      }
    case 'SET_TOTAL_STAKED':
      const { totalStakedAmount } = action.payload;
      return {
        ...state,
        totalStakedAmount,
      }
    case 'SET_TOTAL_STAKING_REWARDS':
      const { totalStakingRewards } = action.payload;
      return {
        ...state,
        totalStakingRewards,
      }
    case 'SET_USER_STAKING_REWARDS':
      const { userStakingRewards } = action.payload;
      return {
        ...state,
        userStakingRewards,
      }
    case 'SET_UNISWAP_BURN_AMOUNT':
      const { uniswapBurnAmount } = action.payload;
      return {
        ...state,
        uniswapBurnAmount,
      }
    case 'SET_TRANSFER_BURN_AMOUNT':
      const { transferBurnAmount } = action.payload;
      return {
        ...state,
        transferBurnAmount,
      }
    default:
      return state;
  }
}

export default userReducer;
