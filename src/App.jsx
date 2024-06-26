import { useEffect } from "react";
import Chat from "./Components/chat/Chat";
import Detail from "./Components/details/Details";
import List from "./Components/list/List";
import Notification from "./Components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./userStore";
import Login from "./Components/login/Login";
import { useChatStore } from "./chatStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const {chatId} = useChatStore();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;
  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat/>}
          {chatId && <Detail/>}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;