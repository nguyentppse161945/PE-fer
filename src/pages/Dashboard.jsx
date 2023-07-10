import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/dashboard.css";
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [staffs, setStaffs] = useState();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://649f98cded3c41bdd7a687a3.mockapi.io/api/staffManagement"
      );
      setStaffs(res.data);
      setisLoading(true);
    };
    fetchData();
  },[]);

  const handleDelete = async (id) =>{
    try{
        await axios.delete(
            `https://649f98cded3c41bdd7a687a3.mockapi.io/api/staffManagement/${id}`

        );
        setStaffs(staffs.filter((item)=>item.id !==id));
        toast.success("success");
    }catch(error){
        console.error("Error deleting staff:",error);
        toast.error("error");
    }
  };
  if(!isLoading){
    return <div>...Loading</div>;
  }
  return (
    
    <div>
      <div className="flex justify-end pr-20 m-10">
        <button>
          <Link to='/add'>Add new staff</Link>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Avatar</th>
            <th>Age</th>
            <th>Address</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <img src={item.avatar} alt={item.name} />
              </td>
              <td>{item.age}</td>
              <td>{item.address}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>

              <td>
                <Link to={`/update/${item.id}`}>
                  <button>Edit</button>
                </Link>
                <button
                  className="bg-red-700"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default Dashboard;
