import React ,{ useState} from "react";
import styled from "styled-components";
// import Picker from 'emoji-picker-react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { IoIosSend } from "react-icons/io";
import { FaRegSmileBeam } from "react-icons/fa";


export default function ChatInput({handleSendMsg}) {
    
    const [emojiPicker, setEmojiPicker] = useState(false);
    // const [pickerClicked, setPickerClicked] = useState(false);
    const [msg, setMsg] = useState("");
    // const[canSend, setCanSend] = useState(false);
    
    const handleEmojiPickerhideShow = () => {
        console.log("ha bhai change krdo emoji picker ko",emojiPicker);   
        // setPickerClicked(true);
        setEmojiPicker(!emojiPicker);
        console.log(emojiPicker);        
    };

    const handleEmojiClick = (emoji, event) => {
        setMsg(msg + emoji.native);
        handleEmojiPickerhideShow();
        // console.log(emoji.native);
    }

    // const checkCanSend = () => {
    //    if(msg.length > 0){
    //     setCanSend(true);
    //    };
    //    return canSend;
    // }

    // const closePicker = () => {
        // if (pickerClicked && ){
        //     setEmojiPicker(false);
        //     setPickerClicked(false);
            // console.log("picker clicked h aur close kr rha hu")
        // }
    // };

    const sendChat = (event) => {
        event.preventDefault(); 
        if(msg !== ""){
            handleSendMsg(msg);
            // console.log("msg sent: ",msg);
            setMsg("");
        }
    };

    return(                
        // <Container cansend={checkCanSend()}>
        <Container>
            <div className="button-container" > 
                <div className="emoji">
                    <FaRegSmileBeam onClick={handleEmojiPickerhideShow}/>
                    {
                        emojiPicker &&  (
                            <div className="picker-container">
                                <Picker data={data} 
                                    onEmojiSelect={handleEmojiClick}
                                    // onClickOutside={closePicker}
                                    />
                            </div>)
                    }
                </div>
            </div>
            <form className="input-container" onSubmit={(e) => {sendChat(e)}}>
                <input 
                    type='text'
                    placeholder="Type your message here " 
                    value={msg} 
                    onChange={(e)=>{setMsg(e.target.value)}}
                />
                <button className="submit" type="submit">
                    <IoIosSend/>
                </button>
            </form>
        </Container>
    )
};

const Container = styled.div`
// const Container = styled.div.attrs(({cansend, ...props})=>({
  // cansend: props.cansend
//   ...props,
// }))
display: grid;
align-items: center;
grid-template-columns: 5% 95%;
background-color: #f0f8ff;
padding: 0 2rem;
border-top: 1px solid #c4e0f9;
@media screen and (min-width: 720px) and (max-width: 1080px) {
  padding: 0 1rem;
  gap: 1rem;
}
.button-container {
  display: flex;
  align-items: center;
  color: black;
  gap: 1rem;
  .emoji {
    position: relative;
    svg {
      font-size: 1.5rem;
      color: #000039 ;
      cursor: pointer;
    }
    .picker-container {
        position: absolute;
        top: -450px;
        height:800px;
        left: 0;
        z-index: 1;
      }
  }
}
.input-container {
  width: 100%;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: white ;
  input {
    width: 90%;
    height: 60%;
    background-color: transparent;
    color: #000039;
    border: none;
    padding-left: 1rem;
    font-size: 1.3rem;

    &::selection {
      background-color: #87cefa;
    }
    &:focus {
      outline: none;
    }
  }
  button {
    padding: 0.3rem 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffcc99 ;
    border: none;
    cursor:pointer ;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0.3rem 1rem;
      svg {
        font-size: 1rem;
      }
    }
    svg {
      font-size: 2rem;
      color: white;
    }
  }
}

//     // cursor: ${(props)=> (props.cansend ? 'pointer' : 'not-allowed')};

`;