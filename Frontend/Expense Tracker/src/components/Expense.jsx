import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../App'
import './Expense.css'


function Expense() {
    const {id} = useParams()
    const [expense, setexpense] = useState({})
    const navigate = useNavigate()
    const user = useContext(userContext)


    useEffect(() => {
        axios.get('http://localhost:3000/getexpensebyid/'+id)
        .then(result=> setexpense(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/deleteexpense/'+id)
        .then(result=> {
            navigate('/')
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='expense_container'>
        <div className='expense_expense'>
            <p>{expense.description}</p>
            <p>{expense.amount}</p>
            <div>
                {
                    user.email === expense.email ? 
                    <>
                    
                    </> : <><Link to={`/editexpense/${expense._id}`}>Edit</Link>
                    <button onClick={e => handleDelete(expense._id)}>Delete</button></>
                }
                
            </div>
        </div>        
    </div>
  )
}

export default Expense