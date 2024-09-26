import { Transaction } from 'firebase/firestore'
import React from 'react'
import card from '../card.png'

const NoTransaction = () => {
  return (
    <div
     style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        flexDirection:"column",
        marginBottom:"2rem",
     }}
    >
        <img src={card} style={{width:"440px",margin:"4rem"}}/>
        <p style={{textAlign:"center", fontSize:"1.2rem"}}>You Have No Transaction Currently</p>
        
    </div>
  )
}

export default NoTransaction