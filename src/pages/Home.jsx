import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/home.css"
import { Link } from "react-router-dom";

const Home = () => {
  const [staffs, setStaffs] = useState([]);
  const [isLoading, setisLoadig] = useState(false);
  const [detailPopup, setDetailPopup] = useState(null);
  useEffect(() => {
    //fetchData
    const fetchData = async () => {
      const res = await axios.get(
        "https://649f98cded3c41bdd7a687a3.mockapi.io/api/staffManagement"
      );
      setStaffs(res.data);
      setisLoadig(true);
    };
    fetchData();
  }, []);
  if (!isLoading) {
    return <div className="text-center">...Loading</div>;
  }
  const handleViewPopup = (staff) => {
    setDetailPopup(staff);
}

const handleClosePopup = () => {
    setDetailPopup(null);
}


  return (
    <div className="flex mt-12 justify-center gap-8 flex-wrap">
      {staffs.map((item) => (
        <div
          className="shadow-lg rounded flex flex-col items-center w-60 text-sm "
          key={item.id}
        >
          <img
            src={item.avatar}
            alt={item.name}
            className="rounded-full w-24 h-24"
          />
          <div className=" px-5 py-5 w-30">
            <h3 className="mb-2 h-12 w-40 text-center">{item.name}</h3>
            <button onClick={() => handleViewPopup(item)}
            className="bg-green-500 rounded-lg w-full text-white p-1 hover:bg-green-700">
              <Link to={`/detail/${item.id}`}>  View details</Link>
            
            </button>
          </div>
        </div>
      ))}

{/* {detailPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <div>
                            <span className='close' onClick={handleClosePopup}>
                                &times;
                            </span>
                            <img src={detailPopup.avatar} alt={detailPopup.id} />
                            <h2>ID: {detailPopup.id}</h2>
                            <p>Name: {detailPopup.name}</p>
                            <p>Age: {detailPopup.age}</p>
                            <p>Address: {detailPopup.Address}</p>
                            <p>CreatedAt: {new Date(detailPopup.createdAt * 1000).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            )} */}
    </div>
  );
};

export default Home;
