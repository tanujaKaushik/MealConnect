import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Logo from "../assets/logo.webp";
import Illustration from "../assets/Illustration.png"
import SideNav from '../components/HomeSideNav';
import Contacts from '../components/Contacts';
import DonationCard from '../components/DonationCard';


export default function Home() {
   const navigate = useNavigate();

   const [allContacts, setAllContacts] = useState([]);
   const [currentUser, setCurrentUser] = useState(undefined);
   const [isLoaded, setIsLoaded] = useState(false);
   const [donations, setDonations] = useState([]);
   
  const [currentChat, setCurrentChat] = useState(undefined);

   const handleChatChange = (chat) => {
      setCurrentChat(chat);
   }


   useEffect(() => {
   async function checkUser()
   {  
      if (!localStorage.getItem("baat-cheet-user")) {
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
      async function fetchDonations() {
        try {
          const response = await axios.get('http://localhost:5000/api/food/listdonations'); // Update with correct backend route
          console.log(response.data)
          setDonations(response.data.data);
        } catch (error) {
          console.error('Error fetching donations:', error);
        }
      }
      if (isLoaded) {
        fetchDonations();
      }
    }, [isLoaded]);

   return(
   // <>
   <MainContainer>
      
      {/* <div className="nav-bar">
         <img src={Logo} alt="logo"/>
         <h1>Meal Connect</h1> */}
      {/* </div> */}


      <div className="container">
         <div className='side-nav-container'>
            <SideNav currentUser={currentUser}/>
         </div>

         <div className="content">
               {/* <div className="first-div">
                  search bar
               </div> */}
               <div className="mid-div">
               <h1>All Donations</h1>
                  {
                     donations.length === 0 ? (
                     <p>No donations found!</p>
                     ) : (
                     <DonationList>
                           {
                              donations.map((donation, index) => (
                              <DonationCard key={index} donation={donation} />
                              ))
                           }
                     </DonationList>
            )}
               </div>
         </div>
         <div className="contact-container">
            <img src={Illustration} alt="illustration"/>
            {/* <Contacts allContacts = {allContacts} currentUser={currentUser} changeChat = {handleChatChange}/> */}
         </div>
      </div>

      {/* <div className="msg-div">
         <p> "Share kindness, connect communities, and help those in need—together, we can make a difference from anywhere!" </p>
      </div> */}

   </MainContainer>
      // </>
 )
}

const MainContainer = styled.div`
// display:flex;
// flex-direction: column;
// justify-content: center;
// gap:1rem;
// align-items:center;
// background-color: #eff6fd;
// background: linear-gradient(to bottom, #eff6fd, #c4e0f9);
// overflow-x: hidden;

   .nav-bar{
      height: 5rem;
      padding:1rem;
      oveflow:hidden;
      // background-color:#bcd4e6 ;
      background-color:#000036 ;
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      img{
         height:3rem;
         margin-right:0.5rem;
      }
      h1{
         // color:#037dbb;
         color:white;
         font-size:1.5rem;
      }
   }

.container{
   display:grid;
   height:100vh;
   background-color: #eff6fd;
   margin:1.5rem 3rem;
   grid-template-columns:7% 63% 30%;
   // border:solid black 1px;
      @media screen and (max-width:720px) {
         grid-template-columns: 100%; 
      }

   .side-nav-container{
      li:last-child{
      margin-top:auto;
      }
   }
      .button{
            background-color: #000036;
            color:black;
            border:solid 1 px black;
         }

   .content{
      display:grid;
      // grid-template-rows:15% 85% ;
      grid-template-rows:100% ;
      border:solid black 1px;
      text-align:center;
      .mid-div{
         // padding:2rem;
         // width:100%;
         border:solid black 1px;
         height:auto;
         justify-content:center;
        
         h1{
            font-size:2rem;
            font-family:"Poppins";
            margin:1rem ;
         }
         p{
            font-size:2rem;
            margin:1rem 0rem;
            font-family:"Poppins";
         }
         span{
            color:#037dbb;
            font-family:"Poppins";
         }
         @media screen and (max-width:720px){
            padding:2rem;
            text-align:center;
            h1{
               font-size:1.75rem;
            }
            p{
               font-size:1.25rem;
            }
         }
      }
   }
   // button{
   //    background-color:#f33e3e;
   //    margin:1rem;
   //    padding:.75rem 2rem;
   //    border-radius:0.75rem;
   //    color:white;
   //    font-size:1.25rem;
   //    border:none;
   //    cursor: pointer;
   //    &:hover {
   //       background-color: #45b1e8;
   //    }
   //    @media screen and (max-width:720px){
   //       font-size:1rem;
   //    }
   // }
   .contact-container{
      display:grid;
      place-items:top;
      img {
      width: 100%;      // Ensures the image width fits the container
      // max-height: 100%;     // Ensures the image height doesn't overflow
      object-fit: contain;  // Maintains the aspect ratio of the image
   }
   }

   .msg-div{
      // border:2px solid black;
      // text-align:center;
      // background-color:white;
      p{     
         font-size:2rem;
      }
   }
`;

const DonationList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;
