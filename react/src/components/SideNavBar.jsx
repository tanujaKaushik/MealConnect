import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Logout from "./Logout";
import Logo from'../assets/logo.webp';
import { useNavigate} from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import { IoMdChatbubbles } from "react-icons/io";

import Profile from "./Profile";


export default function SideNavBar({currentUser}){
    const [userAvatar, setUserAvatar] = useState(undefined);
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    
    const navigate = useNavigate();

    useEffect( ()=> {
        if(currentUser){
            setUserAvatar(currentUser.avatarImage);    
        }
    },[currentUser]);

    return(
        <Container>
            <ul>
                <li>
                    {
                        userAvatar ? 
                        (<img 
                            src={`data:image/svg+xml;base64,${userAvatar}`} 
                            alt="avatar" 
                        />) : 
                    ( <img src={Logo} alt="avatar"/>)
                    }
                </li>
                <li>
                    <button onClick={()=> navigate('/home')}><IoHomeOutline/></button>
                </li>
                <li>
                    <button onClick={openModal}><CgProfile/></button>
                    {
                        modalVisible && <Profile currentUser={currentUser} onClose={closeModal}/>
                    }
                </li>
                <li>
                    <button onClick={()=> navigate('/chat')}><IoMdChatbubbles />
                    </button>
                </li>
                <li><button onClick={()=> navigate('/')}><IoNotifications/></button></li>
                <li><Logout/></li>
            </ul>
        </Container>
    )
}

const Container = styled.div`
background-color:#000036;
height: 100%;
color:white;
border-top-right-radius: 0rem;
border-top-left-radius: 2rem;
overflow:hidden;
ul{
    list-style:none;
    align-items:center;
    display:flex;
    flex-direction:column;
    height:100%;
    // padding-bottom: 2rem;
}
li{
    margin:0.5rem 1rem;
    display:flex;
    align-items:center;
    justify-content:center;

    img{
        margin-top:1.5rem;
        height:5rem;
        border-radius:1rem;
        @media screen and (max-width:1080px) {
            height:3rem;
        }
    }

    &:last-child{
        margin-top: auto;
    }
}
button{
    padding:0.5rem 1.5rem;
    background-color: #000036;
    border:none;
    border-radius:2rem;
    svg{
        font-size:1.75rem;
        color:white;
    }
    &:hover{
        background-color:#000080 ;
        transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
    }
    @media screen and (max-width:720px) {
        svg{
            font-size:1.5rem;
        }
}

`;
