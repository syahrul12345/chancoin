import React from 'react'
import { Grid, Button } from '@material-ui/core'

// Router
import { useHistory } from "react-router-dom";

// Componetns
import Header from '../../components/header'

export default function Home(){
  let history = useHistory();
  const login = () => {
    history.push("/dashboard");
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