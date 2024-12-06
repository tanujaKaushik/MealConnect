import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import Logo from '../assets/logo.webp';

import { useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import { IoMdChatbubbles } from "react-icons/io";
import { MdAddLocationAlt } from "react-icons/md";

import Profile from "./Profile";
import FoodForm from './FoodForm';

export default function HomeSideNav({ currentUser }) {

    const [userAvatar, setUserAvatar] = useState(undefined);

    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [foodFormModalVisible, setFoodFormModalVisible] = useState(false);

    const openProfileModal = () => {
        setProfileModalVisible(true);
    };

    const closeProfileModal = () => {
        setProfileModalVisible(false);
    };

    const openFoodFormModal = () => {
        setFoodFormModalVisible(true);
    };

    const closeFoodFormModal = () => {
        setFoodFormModalVisible(false);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setUserAvatar(currentUser.avatarImage);
        }
    }, [currentUser]);

    return (
        <NavContainer>
            <ul>
                <li>
                    {userAvatar ?
                        (<img
                            src={`data:image/svg+xml;base64,${userAvatar}`}
                            alt="avatar"
                        />) :
                        (<img src={Logo} alt="avatar" />)
                    }
                </li>
                <li>
                    <button onClick={() => navigate('/home')}><IoHomeOutline /></button>
                </li>
                <li>
                    <button onClick={openProfileModal}><CgProfile /></button>
                    {profileModalVisible && <Profile currentUser={currentUser} onClose={closeProfileModal} />}
                </li>
                <li>
                    <button onClick={() => navigate('/chat')}><IoMdChatbubbles /></button>
                </li>
                <li>
                    <button onClick={openFoodFormModal}> <MdAddLocationAlt /> </button>
                    {foodFormModalVisible && <FoodForm isOpen={foodFormModalVisible} onClose={closeFoodFormModal} currentUser={currentUser} />}
                </li>
                <li><button onClick={() => navigate('/')}><IoNotifications /></button></li>
                <li><Logout /></li> 
            </ul>
        </NavContainer>
    );
}

const NavContainer = styled.div`
  background-color: #000036;
  height: 100%;
  color: white;
  border-top-left-radius: 2rem;
  border-top-right-radius: 0rem;
//   display: flex;
//   flex-direction: column;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li {
    margin:0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 100%;
    // padding: 1rem 0;

    &:last-child{
    margin-top: auto;
    }
  }

  img {
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    @media screen and (max-width: 1080px) {
      height: 3rem;
      width: 3rem;
    }
  }

  button {
    background-color: inherit;
    border: none;
    border-radius: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 1.5rem;
    svg {
      font-size: 1.75rem;
      color: white;
    }

    @media screen and (max-width: 720px) {
      svg {
        font-size: 1.5rem;
      }
    }

    // /* Add more specificity to prevent styles from other components affecting these buttons */
    // &.sidenav-button {
    //   background-color: inherit;
    //   color: white;
    //   width: 100%;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    //   padding: 0.75rem 1.5rem;
    //   border-radius: 2rem;
    // }

    &:hover {
      transition: background-color 0.5s ease-in-out;
      backgroung-color:#000030;
    }
  }

//   li:last-child {
//     margin-top: auto;
//   }
`;
