import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
// import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, receiveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    async function loadMessages(){
      const data = await JSON.parse(localStorage.getItem('baat-cheet-user'));
      if (currentChat && currentChat._id){
        const response = await 
            axios.post(receiveMessageRoute, {
            from: data._id,
            to: currentChat._id,
        });
        setMessages(response.data);
        // console.log(response.data);
      }
  };
  loadMessages();
  }, [currentChat]);

//   useEffect(() => {
//     const getCurrentChat = async () => {
//       if (currentChat) {
//         await JSON.parse(
//           localStorage.getItem('baat-cheet-user')
//         )._id;
//       }
//     };
//     getCurrentChat();
//   }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem('baat-cheet-user')
    );
    
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
      time: new Date().toISOString(),
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg ,time:new Date().toISOString() });
    setMessages(msgs);
    // console.log(messages);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg ,time:new Date().toISOString() });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
    {
      currentChat && (
    <Container>

      {/* chat -header */}
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,
              ${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}
            </h3>
          </div>
        </div>
        {/* <Logout /> */}
      </div>
   
      {/*  Chat Messages */}
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "received"
                }`}
              >
                  <div className="content ">
                    <p>{message.message}</p>
                    <div className="timestamp">
                      <p>
                          {new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat Input */}
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  )}
  </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    border-bottom: 1px solid #c4e0f9;
    background-color:#f8f8ff ;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #1c2841;
        }
      }
    }
  }
  .chat-messages {
    padding: 0.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        display:flex;
        max-width: 70%;
        overflow-wrap: break-word;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        border-radius: 0.5rem;
        color: #d1d1d1;
        // @media screen and (min-width: 720px) and (max-width: 1080px) {
        //   max-width: 70%;
        // }
        .timestamp{
          display:flex;
          align-items:flex-end;
          margin-left: 0.6rem;
          font-size:0.7rem;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        // background-color: #f33e3e;
        // background-color: #ff7f50 ;
        background-color: #ffcc99   ;
        // background: linear-gradient(to right , #f33e3e, #ff7f50  ,#f33e3e);
        color: #000036 ;
        box-shadow: 0px 2px 3px rgba(100,100,100,.15);
        .timestamp{
          color:gray;
        }
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        color:#1c2841; 
        background-color: #eaf4fa ;
        box-shadow: 0px 2px 3px rgba(100,100,100,.15);
        .timestamp{
          color:#a1a1aa;
      }
    }
  }
`;