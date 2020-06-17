import React from 'react'
import { Doughnut } from 'react-chartjs-2';

const _Chart = () => {
  const data = {
    labels: ['Staked', 'Uniswap burn', 'Transfer Burn', 'Block Burn', 'Not Staked'],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
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
  return (
    <Doughnut data={data} options={options}/>
  )
} 
export default _Chart