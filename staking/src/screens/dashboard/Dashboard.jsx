import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'

// Redux stuff
import { connect } from 'react-redux';
import { MetamaskLogIn } from '../../redux-modules/user/actions';

// Componetns
import Header from '../../components/header'
import CustomCard from '../../components/card'
import Chart from '../../components/chart'
import Table from '../../components/table'

// Web3API
import { HasMetamask } from '../../web3/web3'
const Dashboard = (props) => {
  const { account } = props
  var hasMetamask = HasMetamask()
  if (hasMetamask) {
    // Trigger Auth flow
    window.ethereum.enable().then((accounts) => {
      const account = accounts[0];
      props.dispatch(MetamaskLogIn(account))
    })
  }else {
    window.alert("Please install metamask")
  }
  return(
    <div>
      <Header Title="Dashbaord" Description="Staking dashboard"/>
        <Grid 
        justify="center"
        alignItems="center"
        alignContent="center"
        spacing={2}
        style={{marginTop:'5%',paddingLeft:'7%',paddingRight:'7%'}}
        container>
          {/* Address info */}
          <Grid item xs={12} md={4}>
            <CustomCard height="42vh">
              <Grid container justify="center" alignItems="flex-end" alignContent="space-between">
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant="h5"> Address </Typography>
                      <Typography variant="body1"> {account} </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6"> Total Balance:</Typography>
                      <Typography variant="body1"> 20000 CHAN</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6"> Staked Balance:</Typography>
                      <Typography variant="body1"> 20000 CHAN</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6"> Interest Earned:</Typography>
                      <Typography variant="body1"> 20000 CHAN</Typography> 
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{paddingTop:'7vh'}}>
                  <Grid container justify="flex-end" alignItems="center" alignContent="center">
                    <Grid item>
                      <Button variant="contained"> Start Staking </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CustomCard>
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
    account: state.user.account
  }
}

export default connect(mapStateToProps)(Dashboard)