import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Hello from "../assets/hello.gif";

export default function Welcome(){
    const [userName, setUserName] = useState("");

    useEffect( () => {
        setUserName(JSON.parse(localStorage.getItem("baat-cheet-user")).username);
        // setUserName(currentUser.username);
    },[]);

    return(
        <Container>
            <img src={Hello} alt = "hello"/>
            <h1>
                Welcome, <span>{userName} !</span>
            </h1>
            <h2>Please select a contact to start Messaging.</h2>
        </Container>
    )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: #1c2841 ;
img {
  height: 15rem;
  margin: 2rem;
}
span {
  color: #f33e3e;
  text-transform: capitalize;
}
`;