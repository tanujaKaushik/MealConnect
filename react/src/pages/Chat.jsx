import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components';
import axios from "axios";
import {useNavigate} from"react-router-dom";
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import SideNavBar from '../components/SideNavBar';
import {io} from 'socket.io-client'

export default function Chat() {

  const navigate = useNavigate();
  const [allContacts, setAllContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  const socket = useRef();

  useEffect(() => {
    async function checkUser()
    {  if (!localStorage.getItem("baat-cheet-user")) {
          navigate("/login");
      } else{
        setCurrentUser(
          await JSON.parse(localStorage.getItem("baat-cheet-user"))
          );
          setIsLoaded(true);
      }
    }
    checkUser();
  }, [navigate]);

  useEffect(() => {
    async function fetchData()
    {  if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setAllContacts(data.data);
        }
        else{
          navigate("/setAvatar");
        }
      }
    }
    fetchData();
  },[currentUser, navigate])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  
const handleChatChange = (chat) => {
  setCurrentChat(chat);
}

  return (
    <Container>
      <div className="container">
          <SideNavBar currentUser ={currentUser}/>
          <Contacts allContacts = {allContacts} currentUser={currentUser} changeChat = {handleChatChange}/>
          {
            isLoaded && currentChat===undefined ? 
              <Welcome /> :
              <ChatContainer currentChat={currentChat} socket={socket}/>
          }
      </div>    
    </Container>
  )
}

const Container = styled.div`
height: 100vh;
width: 100vw; 
display:flex;
flex-direction:column;
justify-content: center;
gap:1rem;
align-items:center;
background-color:#f4f0ec ;
// background-color:#bcd4e6;
// background: linear-gradient(to bottom, #b3d7f5, #6ba7e4);

.container{
  height:95vh;
  width:95vw;
  // background-color:#e2eff6;
  background-color:white;
  border-radius: 2rem;
  display:grid;
  grid-template-columns: 8% 27% 65%;
}
`;