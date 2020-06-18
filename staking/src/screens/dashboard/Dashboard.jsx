import React , { useState }from 'react'
import { Grid, Typography, Button, Link } from '@material-ui/core'

// Redux stuff
import { connect } from 'react-redux';
import { MetamaskLogIn } from '../../redux-modules/user/actions';

// Componetns
import Header from '../../components/header'
import CustomCard from '../../components/card'
import Chart from '../../components/chart'
import Table from '../../components/table'
import FormDialog from '../../components/formdialog'
// Web3API
import { 
  HasMetamask, 
  GetBalance, 
  GetStakingAmount, 
  GetInterest, 
  SubmitStake,
  SubmitUnstake, 
  GetTotalStake,
  GetTotalStakingRewards,
  GetUserStakingRewards,
  GetUniswapBurns,
  GetTransferBurns,
 } from '../../web3/web3'

const Dashboard = (props) => {
  const { account, balance, stakeamount, interestearned } = props
  const [open, setOpen] = useState(false);
  const [error,setError] = useState(false)
  const [stakeValue,setStakeValue] = useState(0)
  const [stakeDisabled,setStakeDisabled] = useState(true)
  
  const [unstakeOpen, setUnstakeOpen] = useState(false);
  const [unstakeError,setUnstakeError] = useState(false)
  const [unstakeValue,setUnstakeValue] = useState(0)
  const [unstakeDisabled,setUnstakeDisabled] = useState(true)

  var hasMetamask = HasMetamask()
  if (hasMetamask) {
    // Trigger Auth flow
    window.ethereum.enable().then((accounts) => {
      const account = accounts[0];
      props.dispatch(MetamaskLogIn(account))
      const provider = window['ethereum'];
      // Sets it in redux
      GetBalance(props.dispatch,provider, account)
      GetStakingAmount(props.dispatch,provider, account)
      GetInterest(props.dispatch,provider,account)
      GetTotalStake(props.dispatch,provider)
      GetTotalStakingRewards(props.dispatch,provider)
      GetUserStakingRewards(props.dispatch,provider,account)
      GetUniswapBurns(props.dispatch,provider)
      GetTransferBurns(props.dispatch,provider)
      
    })
  }else {
    window.alert("Please install metamask")
  }

  // Staking stuff
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const stakeHandler = () => {
    // Staking logic here
    setOpen(false)
    SubmitStake(props.dispatch,window['ethereum'],account,stakeValue)
  }

  const stakeInput = () => event => {
    const val = event.target.value
    if(val > parseInt(balance)) {
      setError(true)
      // DIsabled the button
      setStakeDisabled(true)
    }else {
      setError(false)
      // Enable the button
      setStakeDisabled(false)
      setStakeValue(val)
    }
  }

  // Unstaking stuff
  const handleClickUnstakeOpen = () => {
    setUnstakeOpen(true);
  };

  const handleUnstakeClose = () => {
    setUnstakeOpen(false);
  };

  const unStakeHandler = () => {
    // UnstakingStaking logic here
    setUnstakeOpen(false)
    console.log("unstaking value is",unstakeValue)
    SubmitUnstake(props.dispatch,window['ethereum'],account,unstakeValue)
  }

  const unstakeInput = () => event => {
    const val = event.target.value
    if(val > parseInt(stakeamount)) {
      setUnstakeError(true)
      // DIsabled the button
      setUnstakeDisabled(true)
    }else {
      setUnstakeError(false)
      // Enable the button
      setUnstakeDisabled(false)
      setUnstakeValue(val)
    }
  }

  return(
    <div>
      <Header Title="Dashboard" Description="Staking dashboard"/>
        <Grid 
        justify="center"
        alignItems="center"
        alignContent="center"
        spacing={2}
        style={{marginTop:'5%',paddingLeft:'7%',paddingRight:'7%'}}
        container>
          {/* Address info */}
          <Grid item xs={12} md={4}>
            <Grid container spacing = {1}>
              <Grid item xs={12}>
                <CustomCard height="33vh">
                  <Grid container justify="center" alignItems="flex-end" alignContent="space-between">
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="h5"> Address </Typography>
                          <Typography variant="body1"> {account} </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6"> Total Balance:</Typography>
                          <Typography variant="body1"> {parseInt(balance,10).toLocaleString()} CHAN</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6"> Staked Balance:</Typography>
                          <Typography variant="body1"> {parseInt(stakeamount,10).toLocaleString()} CHAN</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6"> Interest Earned:</Typography>
                          <Typography variant="body1"> {parseInt(interestearned,10).toLocaleString()} CHAN</Typography> 
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container justify="space-between" alignItems="flex-end" alignContent="space-between">
                            <Typography variant="body1"></Typography> 
                            <Grid item>
                              <Grid container spacing={3}>
                                <Grid item xs={6}>
                                  <FormDialog header="Unstake" buttonText="Unstake" label="Amount of tokens to unstake" open={unstakeOpen} error={unstakeError} stakeDisabled={unstakeDisabled} balance={stakeamount} handleClickOpen={handleClickUnstakeOpen} handleClose={handleUnstakeClose} stakeHandler={unStakeHandler} stakeInput={unstakeInput} />
                                </Grid>
                                <Grid item xs={6}>
                                <FormDialog header="Stake" buttonText="Stake" label="Amount of tokens to stake" open={open} error={error} stakeDisabled={stakeDisabled} balance={balance} handleClickOpen={handleClickOpen} handleClose={handleClose} stakeHandler={stakeHandler} stakeInput={stakeInput} />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CustomCard>
              </Grid>
              <Grid item xs={12}>
                <CustomCard height="9vh">
                  <Grid container justify="flex-end">
                    <Link href="//uniswap.exchange">
                    <Button color="primary" variant="contained"> Buy now on uniswap </Button>
                    </Link>
                  </Grid>
                </CustomCard>
              </Grid>
            </Grid>
          </Grid>
          {/* Stake info */}
          <Grid item xs={12} md={4}>
            <CustomCard height="42vh" >
              <Chart/>
            </CustomCard>
          </Grid>
          {/* Burn transactions */}
          <Grid item xs={12} md={4}>
              <Table RightHeader="Transaction Burn ID" LeftHeader="CHAN Burnt"/>
          </Grid>
          <Grid item xs={12} md={12}>
            <Table RightHeader="Latest Transactions" LeftHeader="CHAN"/>
          </Grid>
        </Grid>
        
    </div>
  )
}

function mapStateToProps(state){
  return {
    account: state.user.account,
    balance: state.user.balance,
    stakeamount: state.user.stakeamount,
    interestearned: state.user.interestearned,
    totalStakedAmount: state.user.totalStakedAmount,
    totalStakingRewards: state.user.totalStakingRewards,
    userStakingRewards: state.user.userStakingRewards,
    uniswapBurnAmount: state.user.uniswapBurnAmount,
    transferBurnAmount: state.user.transferBurnAmount,
  }
}

export default connect(mapStateToProps)(Dashboard)