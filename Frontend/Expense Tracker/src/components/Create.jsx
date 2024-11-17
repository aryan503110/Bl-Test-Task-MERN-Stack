import axios from "axios";
import React, { useContext, useState } from "react";
import { userContext } from "../App";


function Create() {
  const [description, setDescription] = useState();
  const [amount, setamount] = useState()
  const [createdby, setcreatedby] = useState()
  const user = useContext(userContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/create", {description,amount,createdby})
      .then((res) => {
        if (res.data.success) {
          window.location.href = "/";
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="post_container">
      <div className="post_form">
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
          <button>Add Expense</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
