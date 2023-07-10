import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/form.css";

const error_init = {
  name_err: "",
  avatar_err: "",
  age_err: "",
  address_err: "",
};
const FormModal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState(error_init);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://649f98cded3c41bdd7a687a3.mockapi.io/api/staffManagement/${id}`
        );
        setName(res.data.name);
        setAvatar(res.data.avatar);
        setAge(res.data.age);
        setAddress(res.data.address);
        setIsEditing(true);
      } catch (error) {
        console.error("Error fetch data", error);
      }
    };
    fetchData(id);
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    const staffData = { name, avatar, age, address };
    try {
      if (isValid) {
        if (isEditing) {
          await axios.put(
            `https://649f98cded3c41bdd7a687a3.mockapi.io/api/staffManagement/${id}`,
            staffData
          );
        } else {
          await axios.post(
            "https://649f98cded3c41bdd7a687a3.mockapi.io/api/staffManagement",
            staffData
          );
        }
        navigate("/dashboard");
        toast.success("success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const validateForm = () => {
    let isValid = true;
    let errors = { ...error_init };

    if (name.trim() === "" || name.length < 2) {
      errors.name_err = "Name is Required";
      if (name.length < 2) {
        errors.name_err = "Name must be more than 2 words";
      }
      isValid = false;
    }

    if (avatar.trim() === "") {
      errors.avatar_err = "Avatar is required";
      isValid = false;
    }

    if (isNaN(age) || parseInt(age) < 1 || age === "") {
      errors.age_err = "Age must be a positive number and more than 0";
      isValid = false;
    }

    if (address.trim() === "") {
      errors.address_err = "Address is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div className="container mt-5">
      <div className="form">
        <h2>{isEditing ? "Update Form" : "Add New Staff"}</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name_err && <p className="error">{errors.name_err}</p>}
          </div>
          <div>
            <label htmlFor="avatar">Avatar: </label>
            <input
              type="text"
              name="avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            {errors.avatar_err && <p className="error">{errors.avatar_err}</p>}
          </div>
          <div>
            <label htmlFor="age">Age: </label>
            <input
              type="number"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          {errors.age_err && <p className="error">{errors.age_err}</p>}
          <div>
            <label htmlFor="address">Address: </label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {errors.address_err && <p className="error">{errors.address_err}</p>}
          {/* {id && (
                <div>
                    <label htmlFor="createdAt">Created At: </label>
                    <input type="text" name='createdAt' value={new Date(state.createdAt * 1000).toLocaleDateString()} readOnly />
                </div>
            )}
            <button type='submit' className='form-button'>{id ? "Update" : "Submit"}</button> */}
          <button type="submit">{isEditing ? "Update" : "Submit"}</button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
