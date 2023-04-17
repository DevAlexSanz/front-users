import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CreateUser = () => {
  const initialState = {
    name: "",
    lastname: "",
    age: 18,
    numberPhone: 0,
    email: "",
  };

  let { id } = useParams();

  const [user, setUser] = useState(initialState);
  const [subId, setsubId] = useState(id);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveData = async (event) => {
    event.preventDefault();

    const newUser = {
      name: user.name,
      lastname: user.lastname,
      age: user.age,
      numberPhone: user.numberPhone,
      email: user.email,
    };

    await axios.post("https://api-users-production.up.railway.app/api/v1/users", newUser);
    setUser({ ...initialState });
  };

  const updateUser = async (event) => {
    event.preventDefault();
    const newUser = {
      name: user.name,
      lastname: user.lastname,
      age: user.age,
      numberPhone: user.numberPhone,
      email: user.email,
    };
    await axios.put(`https://api-users-production.up.railway.app/api/v1/users/${subId}`, newUser);
    setUser({ ...initialState });
    setsubId("");
  };


  const getOne = async (id) => {
    const { data } = await axios.get(
      `https://api-users-production.up.railway.app/api/v1/users/${id}`
    );
    setUser({
      name: data.user.name,
      lastname: data.user.lastname,
      age: data.user.age,
      numberPhone: data.user.numberPhone,
      email: data.user.email,
    });
  };

  useEffect(() => {
    if (subId !== "") {
      getOne(subId);
    }
  }, [subId]);

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <form onSubmit={saveData}>
          <h2 className="text-center mb-3">Create a new User</h2>
          <div className="mb-3">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Name"
              required
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label>Lastname:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Lastname"
              required
              name="lastname"
              value={user.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label>Age:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your Age"
              required
              name="age"
              value={user.age}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label>Number phone:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your Number Phone"
              required
              name="numberPhone"
              value={user.numberPhone}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Email"
              required
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-primary form-control">Save user</button>
        </form>
        <form onSubmit={updateUser}>
          <button className="btn btn-success form-control mt-2">Update user</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
