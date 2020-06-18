import React from 'react'
import { Doughnut, Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';

const _Chart = (props) => {
  const {totalStakedAmount, userStakeAmount, totalStakingRewards, userStakingRewards, uniswapBurnAmount, transferBurnAmount} = props
  const data = {
    labels: ['Total CHAN stake', 'Your Stake','Total Stake Reward', 'Your Stake Reward', 'Uniswap Burn', 'Transfer Burn'],
    datasets: [{
        label: '# of Votes',
        data: [totalStakedAmount, userStakeAmount,totalStakingRewards, userStakingRewards, uniswapBurnAmount, transferBurnAmount],
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 39, 83, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 39, 83, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1
    }]
  };
  const options = {
    legend: {
      labels: {
          fontColor: "white",
          fontSize: 12,
      }
    }
  }

  const barData = {
    labels: ['Total CHAN stake', 'Your Stake','Total Stake Reward', 'Your Stake Reward', 'Uniswap Burn', 'Transfer Burn'],
    datasets: [{
        label: 'Burns and Stakes',
        data: [totalStakedAmount, userStakeAmount,totalStakingRewards, userStakingRewards, uniswapBurnAmount, transferBurnAmount],
        backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 39, 83, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 39, 83, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
        ],
        borderWidth: 1
    }]
  }
  const barOptions = {
    legend: {
      labels: {
          fontColor: "white",
          fontSize: 12,
      }
    },
    scales: {
        xAxes: [{
            gridLines: {
                offsetGridLines: true
            },
            ticks: {
              fontColor: "white",
            }
            
        }],
        yAxes: [{
          ticks: {
              fontColor: "white",
              stepSize: 100,
              beginAtZero: true
          }
      }]
    }
};

  return (
    <div style={{paddingTop:'10%'}}>
    <Doughnut data={data} options={options}/>
    {/* <Bar data={barData} options={barOptions}/> */}
    </div>
  )
}

function mapStateToProps(state){
  return {
    totalStakedAmount: state.user.totalStakedAmount,
    userStakeAmount: state.user.stakeamount,
    totalStakingRewards: state.user.totalStakingRewards,
    userStakingRewards: state.user.userStakingRewards,
    uniswapBurnAmount: state.user.uniswapBurnAmount,
    transferBurnAmount: state.user.transferBurnAmount,
  }
}
export default connect(mapStateToProps)(_Chart)