import React from "react";
import { useNavigate } from "react-router-dom";
// import { BiPowerOff } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";

import styled from "styled-components";
// import axios from "axios";
// import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  // const handleClick = async () => {
//     const id = await JSON.parse(
//                     localStorage.getItem('baat-cheet-user')
//                 )._id;
//     const data = await axios.get(`${logoutRoute}/${id}`);
//     if (data.status === 200) {
      // localStorage.clear();
      // navigate("/login");
    // }
  // };

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
  
    if (confirmed) {
      localStorage.clear();
      // console.log('User confirmed to log out');
      navigate("/login");
    } 
    // else {
      // User canceled
      // console.log('User canceled log out');
    // }
  };

  return (
    <Button onClick={handleLogout}>
      <IoLogOut />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;