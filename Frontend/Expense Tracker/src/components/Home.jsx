import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'


function Home() {

  const [expenses, setexpenses] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/getexpenses')
    .then(expenses => {
      setexpenses(expenses.data)
    })
    .catch(err => console.log(err))
  }, [])

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className='home_container'>
      <p><a href='/email'>Invite</a></p>
      <p>Total Items: {expenses.length}</p>
      <p>Total Amount: {totalAmount}</p> 
      
      {
        expenses.map(expense => (
          <Link to={`/expense/${expense._id}`} className='expense'> 
          
          <div className='expense_text'>
            <p>{expense.description}</p>
            <p>{expense.amount}</p>
            <p>{expense.createdby}</p>
          </div>
          </Link>
        ))
      }
    </div>
  )
}

export default Home