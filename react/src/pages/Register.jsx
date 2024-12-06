import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logo.webp";
import { ToastContainer ,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    useEffect(()=> {
        if(localStorage.getItem('baat-cheet-user')){
          navigate('/home');
        }
      },[navigate]);
      
    const handleChange = (event) => {
        setValues({...values,[event.target.name]:event.target.value});
    };

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        hideProgressBar: true,
    };

    const handleValidation = () => {
        const  { username, email, password, confirmPassword} = values;

        if(password !== confirmPassword){
            toast.error(
                "Passwords do not match",
                toastOptions
            );
            return false;
        }else if(username.length < 3){
            toast.error(
                "Username should be greater than 3 characters.",
                toastOptions
            );
            return false;
        }else if(password.length < 8){
            toast.error(
                "Password should have minimum 8 characters",
                toastOptions
            );
            return false;
        }else if(email === ""){
            toast.error("Email is required",
            toastOptions);
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()){
            const {email, username, password} = values;
            const {data} = await axios.post(registerRoute, {
                username,
                email,
                password
            });
            if(data.status===false){
                toast.error(data.msg, toastOptions);
            }
            if(data.status===true){
                localStorage.setItem('baat-cheet-user',JSON.stringify(data.user));
                navigate("/setAvatar");
            }
        }
    };

    return (
    <>
      <FormContainer>
            <form onSubmit = {(event)=>handleSubmit(event)}>
                <div className='brand'>
                    <img src = {Logo} alt="logo"/>
                </div>
                <input 
                    type = "text" 
                    placeholder='UserName' 
                    name="username" 
                    onChange={(e)=>{handleChange(e)}}
                />
                <input 
                    type = "email" 
                    placeholder='Email' 
                    name="email" 
                    onChange={(e)=>{handleChange(e)}}
                />
                <input 
                    type = "password" 
                    placeholder='Password' 
                    name="password" 
                    onChange={(e)=>{handleChange(e)}}
                />
                <input 
                    type = "password" 
                    placeholder='Confirm Password' 
                    name="confirmPassword" 
                    onChange={(e)=>{handleChange(e)}}
                />
                <button type='submit'>Create User</button>
                <span>Already a user ? <Link to={"/login"}>Login here!</Link></span>
            </form>
        </FormContainer>
        <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  // background-color: #bcd4e6 ;
  background: linear-gradient(to bottom, #b3d7f5, #6ba7e4);

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 6rem;
      background-color: #e2eff6;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    // background-color: #e2eff6;
    background-color: white;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color:#003153 ;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #1c2841;
      outline: none;
    }
  }
  button {
    background-color: #f33e3e;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #45b1e8;
    }
  }
  span {
    color: #003153;
    text-transform: uppercase;
    a {
      color: #45b1e8;
      text-decoration: none;
      font-weight: bold;
    }
  }
`; 
