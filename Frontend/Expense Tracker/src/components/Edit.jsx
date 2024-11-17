import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Edit.css'


function Edit() {
    const [description, setDescription] = useState()
    const [amount, setamount] = useState()
    const [createdby, setcreatedby] = useState()
    const {id} = useParams()
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put('http://localhost:3000/editexpense/'+id, {description,amount,createdby})
        .then(res => {
            if(res.data.success) {
                navigate('/')
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('http://localhost:3000/getexpensebyid/'+id)
        .then(result=> {
            setDescription(result.data.description)
            setamount(result.data.amount)
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <div className="edit_container">
      <div className="edit_form">
      <form onSubmit={handleSubmit}>
          <h2>Create Expense</h2>
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="number"
            placeholder="Enter Amount"
            onChange={(e) => setamount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your Name" required
            onChange={(e) => setcreatedby(e.target.value)}
          />
          <button>Edit Expense</button>
        </form>
      </div>
    </div>
  );
}

export default Edit;