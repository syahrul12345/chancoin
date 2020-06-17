import React from 'react'
import { Grid, Button } from '@material-ui/core'

// Router
import { useHistory } from "react-router-dom";

// Componetns
import Header from '../../components/header'

// API
import { HasMetamask } from '../../web3/web3'

// Redux
import { connect } from 'react-redux';
import { MetamaskLogIn } from '../../redux-modules/user/actions';

function Home(props){
  let history = useHistory();
  const login = async() => {
    var hasMetamask = HasMetamask()
    if (hasMetamask) {
      // Trigger Auth flow
      const accounts = await window.ethereum.enable();
      const account = accounts[0];
      props.dispatch(MetamaskLogIn(account))
      history.push("/dashboard");
    } else {
      window.alert("Please install metamask")
    }
  }
  return (
    <div>
      <Header Title="Stake" Description="Start staking your chan coins"/>
        <Grid 
        justify="center"
        alignItems="center"
        alignContent="center"
        style={{minHeight:'100vh'}}
        container>
          <Button variant="outlined" onClick={() => login()}>
            Login with metamask
          </Button>
        </Grid>
    </div>
  )
}

function mapStateToProps(state) {
  return {}
}


export default connect(mapStateToProps)(Home)