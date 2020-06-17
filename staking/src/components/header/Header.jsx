import React from 'react'
import { Helmet } from "react-helmet";

export default function Header(props) {
  const { Title, Description } = props
  return(
    <Helmet>
      <title> {Title} </title>
      <meta name="description" content={Description} />
    </Helmet>
  )
}