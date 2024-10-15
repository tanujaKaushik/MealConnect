import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.webp";
import SideNavBar from '../components/SideNavBar';


export default function Home() {
   const navigate = useNavigate();

   return(
   // <>
   <Container>
      
      <div className="nav-bar">
         <img src={Logo} alt="logo"/>
         <h1>Meal Connect</h1>
      </div>

      <div className="container">
         <div>
            <SideNavBar/>
         </div>
         <div className="content">
               <div className="first-div">
                  search bar
               </div>
               <div className="mid-div">
                  all posts
               </div>
               <div className="last-div">

               </div>
         </div>
         <div className="contact-container">
               people you may know
         </div>
      </div>

      {/* <div className="msg-div">
         <p> "Share kindness, connect communities, and help those in need—together, we can make a difference from anywhere!" </p>
      </div> */}

   </Container>
      // </>
 )
}

const Container = styled.div`
// display:flex;
// flex-direction: column;
// justify-content: center;
gap:1rem;
// align-items:center;
// background-color: #eff6fd;
// background: linear-gradient(to bottom, #eff6fd, #c4e0f9);
overflow-x: hidden;

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
   height:80vh;
   background-color: #eff6fd;
   margin:1.5rem 3rem;
   grid-template-columns:8% 65% 25%;
   border:solid black 1px;
      @media screen and (max-width:720px) {
         grid-template-columns: 100%; 
      }
   .content{
      display:grid;
      grid-template-rows:15% 85% ;
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
   button{
      background-color:#f33e3e;
      margin:1rem;
      padding:.75rem 2rem;
      border-radius:0.75rem;
      color:white;
      font-size:1.25rem;
      border:none;
      cursor: pointer;
      &:hover {
         background-color: #45b1e8;
      }
      @media screen and (max-width:720px){
         font-size:1rem;
      }
   }
   .contact-container{
      display:grid;
      place-items:center;
      
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
