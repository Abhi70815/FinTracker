import React from 'react'
import './style.css'
import { Card, Row } from 'antd'
import Button from '../Button'

const Cards = ({income, expense, totalBalance, showExpenseModel, showIncomeModel}) => {
  return (
    <div>
        <Row className='my-row'>
            <Card  bordered={true} className='my-card'>
                <h2>Current Balance</h2> 
            <p>₹{totalBalance}</p>
            <Button text={"Reset Balance"} blue={true}/>
            </Card>
            <Card  bordered={true} className='my-card'>
                <h2>Total income</h2> 
            <p>₹{income}</p>
            <Button text={"Add Income"} blue={true} onClick={showIncomeModel}/>
            </Card>
            <Card bordered={true} className='my-card'>
                <h2>Total Expenses</h2> 
            <p>₹{expense}</p>
            <Button text={"Add Expanse"} blue={true} onClick={showExpenseModel}/>
            </Card>
        </Row>
    </div>
  )
}

export default Cards