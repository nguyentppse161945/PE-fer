import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const [staff, setStaff] = useState();
  const [isLoading, setisLoading] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchDataId = async (id) => {
      const res = await axios.get(
        `https://649f98cded3c41bdd7a687a3.mockapi.io/api/staffManagement/${id}`
      );
      setStaff(res.data);
      setisLoading(true);
    };
    fetchDataId(id);
  }, [id]);

  if(!isLoading){
    return <div className="text-center">...Loading</div>;
  }
  return ( 
    <div className="flex p-8 mt-8">
       <div className="basis-1/3 flex items-center justify-center">
         <img src={staff.avatar} alt={staff.name} className="flex items-center   rounded-lg w-52 h-52 l-15" />
       </div>
       <div className="basis-2/3">
         <table>
           <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Avatar</th>
            <th>Age</th>
            <th>Address</th>
            <th>Created Date</th>
            
          </tr>
        </thead>
     <tbody>
        <tr>
          <td>{staff.id}</td>
        <td>{staff.name}</td>
        <td className="w-4">{staff.avatar}</td>
        <td>{staff.age}</td>
        <td>{staff.address}</td>
        <td>Created ${staff.createdAt}</td>
       </tr>
     </tbody>
         </table>
       </div>
    </div>
  );
};

export default Detail;
