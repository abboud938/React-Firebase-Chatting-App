import './Chat.css';
import {useState , useRef , useEffect} from "react";

import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../../chatStore';
import { db } from '../../lib/firebase';
import { useUserStore } from '../../userStore';
import Upload from '../../lib/upload';
const Chat = () => {
  const [open , setOpen] = useState(false);
  const [text,setText] = useState('');
  const [chat , setChat] = useState();
  const { chatId , user ,isCurrentUserBlocked , isReceiverBlocked} = useChatStore();
  const {currentUser} = useUserStore();
  const [img , setImg] = useState({
    file : null ,
    url : ''
  });

  const handleImg = (e) => {
    if(e.target.files[0]){
      setImg({
        file : e.target.files[0] ,
        url : URL.createObjectURL(e.target.files[0])
      });
    }
  }
  const endRef = useRef(null);
  useEffect( () => {
    endRef.current?.scrollIntoView({behavior:'smooth'})
  },[]);

  useEffect( () => {
    const unSup = onSnapshot(doc(db,'chats', chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSup();
    }
  },[chatId] );

  const handleEmoji = (e) => {
    setText( (prev) => prev + e.emoji );
    setOpen(false);
  }
  const handleSend = async (e) => {
    e.preventDefault();
    if (text === '' && !img.file) return ;
    let imgUrl = null ;
    if(img.file) imgUrl = await Upload(img.file);
    try {
      await updateDoc(doc(db , 'chats' , chatId),{
        messages: arrayUnion({
          createdAt : new Date(),
          senderId : currentUser.id,
          text,
          ...(imgUrl && {img : imgUrl})
        })
      })
      const userIds = [currentUser.id , user.id];
      userIds.forEach( async (id) => {
        const userChatRef = doc(db,'userchats',id);
        const userChatsSnapshot = await getDoc(userChatRef);
        if(userChatsSnapshot.exists()){
          const userChats = userChatsSnapshot.data();
          const chatIndex= userChats.chats.findIndex( c => c.chatId === chatId );
          userChats.chats[chatIndex].lastMessage = text;
          userChats.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChats.chats[chatIndex].updatedAt =  Date.now();
          await updateDoc(userChatRef , {
            chats : userChats.chats
          });
        }
    } )
    } catch (error) {
      console.log(error);
    }finally{
      setImg({
        file : null,
        url : ''
      });
      setText('');
    }
  }
  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src={user.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span> {user.username} </span>
            {/* <p>Every Thing I wish Will come true soon !</p> */}
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
            <div className={message.senderId === currentUser?.id ? 'message own' : "message"} key={message?.createdAt}>
              <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              {message.text && <p>{message.text}</p>}
              <span></span>
              </div>
            </div>
          ))}
          {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor='file'>
            <img src="./img.png" alt="" />
          </label>
          <input type="file" hidden id='file' onChange={handleImg} />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You Cannot Send Messages" : "Write SomeThing to Send ..."}
          value = {text}
          onChange = { (e) => setText(e.target.value)}
          disabled ={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <img
          src='./emoji.png'
          onClick={ () => setOpen ( (prev) => !prev ) }
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick = {handleEmoji}/>
          </div>
        </div>
        <button className="sendButton" onClick={handleSend} disabled ={isCurrentUserBlocked || isReceiverBlocked}>send</button>
      </div>
    </div>
  )
}

export default Chat
