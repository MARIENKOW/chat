import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import socketIo from 'socket.io-client'
import { observer } from 'mobx-react-lite'
import { Context } from "../../index";
import config from "../../config";
import UserService from '../../services/UserService'
import styles from './Account.module.scss'
import Chat from '../../component/Account/Chat/Chat'
import Header from '../../component/Account/Header/Header.jsx'
import SelectUsers from '../../component/Account/SelectUsers/SelectUsers'
import helper from "../../helper";

export const Users = createContext()

const Account = () => {

   const { store } = useContext(Context)
   const usersData = useState([])
   const [currentChat, setCurrentChat] = useState(null)
   const [currentMessages, setCurrentMessages] = useState([]);
   const [adaptive, setAaptive] = useState(false);
   const [wrapperHeight, setWrapperHeigh] = useState(null)
   const wrapper = useRef()
   const [users, setUsers] = usersData;
   const sock = useMemo(() => socketIo.connect(config.SERVER_API, { auth: { username: store.user.username, id: store.user.id } }), []);

   useEffect(() => {
      setCurrentMessages([]);
   }, [currentChat])

   useEffect(() => {
      const checkWindowSize = () => {
         const windowWeight = window.innerWidth;
         const windowHeight = window.innerHeight;
         if (windowWeight <= 700) {
            setAaptive(true)
         } else {
            setAaptive(false)
         }
         setWrapperHeigh(windowHeight)
      }
      checkWindowSize();
      window.addEventListener('resize', checkWindowSize)
      return () => {
         window.removeEventListener('resize', checkWindowSize)
      }
   }, [])

   useEffect(() => {
      sock.on("connect_error", connectionError);
      sock.on('private message', newMessages)
      return () => {
         sock.off("connect_error", connectionError);
         sock.off('private message', newMessages)
         sock.disconnect(true)
      }
   }, [sock]);

   const connectionError = (err) => alert('SystemError Try again Later')

   const newMessages = async (newMessage) => {
      const usersCopy = users.slice()
      const inDataUser = usersCopy.find((el) => el.id === newMessage.user);
      if (inDataUser) {
         inDataUser.message = [...inDataUser.message, newMessage.message];
         setUsers(usersCopy);
      } else {
         const user = await UserService.getUserById({ id: newMessage.user });
         usersCopy.push({ ...user.data, message: [newMessage.message] })
         sock.emit('onlineUsers', usersCopy.map(el => el.id))
         sock.on('onlineUsers', (arr) => {
            helper.addOnlineUsers(usersCopy, arr)
            setUsers(usersCopy)
         })
      }
      if (newMessage.user === currentChat) {
         setCurrentMessages([...currentMessages, newMessage.message]);
      }
   }

   function handleBack() {
      setCurrentChat(null)
   }

   if (adaptive) {
      return (
         <Users.Provider value={{ users, setUsers }}>
            <div style={{ height: wrapperHeight }} className={styles.wrapper}>
               <div className={styles.main}>
                  <Header />
                  <section className={styles.user}>
                     {currentChat ? (<Chat
                        sock={sock}
                        handleBack={handleBack}
                        currentMessages={currentMessages}
                        currentChat={currentChat}
                     />) : (<SelectUsers
                        setCurrentChat={setCurrentChat}
                        sock={sock}
                     />)}
                  </section>
               </div >
            </div >
         </Users.Provider>
      )
   }

   return (
      <Users.Provider value={{ users, setUsers }}>
         <div style={{ height: wrapperHeight }} ref={wrapper} className={styles.wrapper}>
            <div className={styles.main}>
               <Header />
               <section className={styles.user}>
                  <SelectUsers
                     sock={sock}
                     setCurrentChat={setCurrentChat}
                  />
                  {currentChat && (<Chat
                     sock={sock}
                     handleBack={handleBack}
                     currentMessages={currentMessages}
                     currentChat={currentChat}
                  />)}
               </section>
            </div >
         </div >
      </Users.Provider>
   )
}

export default observer(Account);