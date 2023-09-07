import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Users = () => {
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    axios({
      url: "https://jsonplaceholder.typicode.com/users",
      method: "GET",
    }).then((response) => {
      console.log(response.data);
      setDataUser(response.data);
    });
  }, []);

  const handleUserDetail = (i: any) => {
    console.log(i);
    window.location.href = `/users/${i.id}`;
  };

  return (
    <div className="flex flex-col justify-around">
      <h2 className="h2 font-bold text-3xl h-10%">Users</h2>

      <table className="table table-striped table-hover ">
        <thead className="h-[50px]">
          <tr>
            <th>id</th>
            <th>name</th>
            <th>username</th>
            <th>email</th>
            <th>phone</th>
            <th>website</th>
            <th>city</th>
            <th>Company Name</th>
          </tr>
        </thead>

        <tbody>
          {dataUser.map((i: any) => (
            <tr
              className="cursor-pointer w-full px-4 py-4 gap-4 border-b border-gray-300 cursor-pointer
              false h-[50px]"
              onClick={() => handleUserDetail(i)}
            >
              <td>{i.id}</td>
              <td> {i.name}</td>
              <td>{i.username}</td>
              <td>{i.email}</td>
              <td>{i.phone}</td>
              <td>{i.website}</td>
              <td>{i.address.city}</td>
              <td>{i.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Users;
