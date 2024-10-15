import React from 'react';
import styled from 'styled-components';
import { IoMdClose } from "react-icons/io";
import Logo from '../assets/logo.png';

export default function Profile({ currentUser, onClose }) {
//   const [formData, setFormData] = useState({
//     jobTitle: '',
//     company: '',
//     location: '',
//     startDate: '',
//     endDate: '',
//     description: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform further actions, like sending the data to the server
    // console.log(formData);
    // Close the modal after submission
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <form onSubmit={handleSubmit}>
            <div className="image">
            {
                currentUser.avatarImage ? 
                (<img 
                    src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} 
                    alt="avatar" 
                />) : 
            ( <img src={Logo} alt="avatar"/>)
            }
            </div>
            <h2 className="username">{currentUser.username}</h2>
            <h4 className='email'>{currentUser.email}</h4>
            {/* <button type="submit">Close <IoMdClose /></button> */}
            <button type="submit"><IoMdClose/></button>
         </form>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem 4rem;
  border-radius: 1rem;
  display: flex;
  justify-content:center;
  text-align:center;
  .image{
    margin-bottom:1rem;
    height:11rem;
    img{
        height:9rem;
    }
  }
  .username{
    color:black;
  };
  .email{
    margin-top: 0.7rem;
    color:#7f7f7f;
  };
  button {
    margin-top:2rem;
    height:2rem;
    color:white;
    font-size:1rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    align-items:center;
    &:hover {
        opacity: 0.9;
    }
    svg{
        height:100%;
        vertical-align:middle;
        margin-right:0.5rem;
    }
  }
`;