import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("https://api-users-production.up.railway.app/api/v1/users");
      setList(data.users);
    };
    fetchData();
  }, [list]);

  const deleteUser = async (id) => {
    await axios.delete(`https://api-users-production.up.railway.app/api/v1/users/${id}`);
  };

  return (
    <div className="row">
      {list.map((User) => (
        <div className="col-md-4" key={User._id}>
          <div className="card">
            <div className="card-header">
              <h5>Name: {User.name}</h5>
            </div>
            <div className="card-body">
              <p>Lastname: {User.lastname}</p>
              <p>Age: {User.age}</p>
              <p>Number Phone: {User.numberPhone}</p>
              <p>Email: {User.email}</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-danger" onClick={() => deleteUser(User._id)}>Delete User</button>
              <Link className="btn btn-primary m-1" to={`/edit/${User._id}`}>Editar</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
