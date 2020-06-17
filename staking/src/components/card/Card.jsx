import React from 'react'
import { Card, CardContent } from '@material-ui/core'

const CustomCard = (props) => {
  const { height } = props
  return(
   <Card style={{height:height}}>
     <CardContent>
       {props.children}
     </CardContent>
   </Card>
  )
}

export default CustomCard