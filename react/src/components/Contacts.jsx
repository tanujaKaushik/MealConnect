import React ,{useEffect, useState}from 'react'
import styled from 'styled-components';
import Logo from "../assets/logo.png";
// import { FaSearch } from "react-icons/fa";


export default function Contacts({allContacts, currentUser, changeChat}) {
    
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [search, setSearch] =useState("");
    const [contacts, setContacts] = useState();

    useEffect(()=>{
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
            setContacts(allContacts);
        }
    },[currentUser, allContacts]);

    // useEffect(async()=>{
    //     const data = await JSON.parse(localStorage.getItem('baat-cheet-user'));
    //     setCurrentUserName(data.username);
    //     setCurrentUserImage(data.avatarImage);
    // },[]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    const searchContact = (value) => {
        setSearch(value);
        if(value){
          const filteredContacts = contacts.filter(c =>
            c.username.toLowerCase().startsWith(value.toLowerCase())
            );
          setContacts(filteredContacts);
        }else{
          setContacts(allContacts);
        }
    }
  
    return (
    <>
      {
        currentUserImage && currentUserName && (
            <Container>
                <div className="search">
                    <img src={Logo} alt="logo" />
                      <input 
                      type="text"
                      placeholder= "Search Username.."
                      value={search}
                      onChange={(e)=>{searchContact(e.target.value)}}
                      />
                </div>

                <div className="contacts" >
                    {
                        contacts.map((contact,index)=>{
                            return(
                              <div className="contact-container" key={index}>
                                <div 
                                  className={`contact ${index === currentSelected ? "selected" : "" }`} 
                                  onClick={()=> changeCurrentChat(index, contact)}>
                                    <div className="avatar">
                                        
                                        {contact.avatarImage ? (<img 
                                            src={`data:image/svg+xml;base64,${contact.avatarImage}`} 
                                            alt="avatar" 
                                        />
                                        ) : (
                                            <img src = {Logo} alt ="avatar"/>
                                        )}
                                    </div>
                                    {/* <div className="user-details"> */}
                                      <div className="username">
                                        <h3>{contact.username}</h3>
                                      </div>
                                      
                                    {/* </div> */}
                                </div>
                                <hr key={`hr-${index}`}/>
                                </div>
                            );
                        })
                    }
                </div>
                {/* <div className="current-user">
                    <div className="avatar">
                         <img 
                            src={`data:image/svg+xml;base64,${currentUserImage}`} 
                            alt="avatar" 
                          />
                    </div>
                    <div className="username">
                        <h2>{currentUserName}</h2>
                    </div>
                </div> */}
            </Container>
        )
      }
    </>
  )
};

const Container = styled.div`
display: grid;
grid-template-rows: 10%  90%  ;
overflow: hidden;
// background-color: #add8e6 ;
background-color: #eaf4fa ;

.search {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width:100%;
  img {
    height: 2rem;
  }
  input{
    font-size:1rem;
    width:70%;
    padding:.5rem;
    // margin-right:0.5rem;
    border-radius:0.5rem;
    border:none;
  }
  button{
    padding:0.25rem 0.5rem;
    font-size:1.25rem;
    border:1px solid #d3d3d3 ;
    cursor:pointer;
    border-radius:0.25rem;
  }
}
.contacts { 
  overflow: auto;
  gap: 0rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .contact-container{
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    hr{
      width:60%;
      border-color:#f0ffff 
    }
  }
  .contact {
    // background-color: #f0f8ff;
    // background-color: #add8e6;
    // background: linear-gradient(to right, #eaf4fa  , #c4e0f9);
    background-color: #eaf4fa ;
    // border:1px solid #c4e0f9;


    min-height: 4.5rem;
    cursor: pointer;
    width: 85%;
    // border-radius: 1rem;
    padding: 0.4rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    transition: 0.5s ease-in-out;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h3 {
        color: #000039;
      }
    }
  }
  .selected {
    // background: linear-gradient(to right, #c4e0f9 ,#eaf4fa , #c4e0f9);
    background-color: #c4e0f9;
    opacity:0.8;
    width:100%;
    border-top-left-radius:2rem;
    border-top-right-radius:0rem;
    border-bottom-left-radius:2rem;
    border-bottom-right-radius:0rem;
    margin-left: 1.5rem;

  }
}
// hr{
//   // display:block;
//   width:60%;
//   border-color:#f0ffff ;
// }

// .current-user {
//   background-color: #0d0d30;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 2rem;
//   .avatar {
//     img {
//       height: 4rem;
//       max-inline-size: 100%;
//     }
//   }
//   .user-details {
//     display: flex;
//     flex-direction: column;
//     margin-left: 10px; 
//   }  
//   .username {
//     h2 {
//       color: white;
//     }
//   }
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     gap: 0.5rem;
//     .username {
//       h2 {
//         font-size: 1rem;
//       }
//     }
//   }
// }
`;
