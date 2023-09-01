import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Context } from "../../index";
import Button from "../../component/Button/Button";
import { observer } from 'mobx-react-lite'
import styles from './Account.module.scss'
import socketIo from 'socket.io-client'
import UserService from '../../services/UserService'
import axios from "axios";
import Choose from "../../component/Account/Choose/Choose"
import helper from "../../helper";
import Chat from '../../component/Account/Chat/Chat'

export const Sock = createContext({ test: 'test' })


const Account = () => {
   const { store } = useContext(Context)
   const [users, setUsers] = useState([])
   const [search, setSearch] = useState('')
   const [source, setSource] = useState(null);
   const [dataSearch, setDataSearch] = useState([]);
   const [isDataLoading, setIsDataLoading] = useState(false)
   const [currentChat, setCurrentChat] = useState(null)
   const [newMessage, setNewMessage] = useState(null)
   const [preUsers, setPreUsers] = useState([])
   const [watchedMess, setWatchedMess] = useState([])
   const [currentMessages,setCurrentMessages] = useState([]);

   const currentUser = useMemo(() => (users.find((el) => el.id === currentChat)), [users, currentChat])

   const sock = useMemo(() => socketIo.connect('http://localhost:5000', { auth: { username: store.user.username, id: store.user.id } }), []);

   useEffect(()=>{
      setCurrentMessages([]);
   },[currentChat])

   useEffect(() => {
      sock.emit('onlineUsers', preUsers.map(el => el.id))
      sock.on('onlineUsers', (arr) => {
         const usersCopy = preUsers.slice();
         helper.addOnlineUsers(usersCopy, arr)
         setUsers(usersCopy)
      })
   }, [preUsers])

   useEffect(() => {
      if (watchedMess === null) return;
      const usersCopy = preUsers.slice()
      usersCopy.forEach((user) => {
         const userWatched = watchedMess.find((obj) => obj.from === user.id)
         if (!userWatched) return
         user.message.forEach(obj => {
            if (watchedMess.find(el => el.id === obj.id)) {
               obj.watched = true
            }
         })
      })
      setPreUsers(usersCopy)
   }, [watchedMess])

   useEffect(() => {
      const getDataUsers = async () => {
         try {
            const users = await UserService.getDataUsers({ id: store.user.id });
            setPreUsers(users.data)
         }
         catch (e) {
            alert('SystemError Try again Later')
         }
      }
      getDataUsers()
   }, []);

   useEffect(() => {
      const webSocket = async () => {
         try {
            if (!sock) return;
            sock.on("connect_error", (err) => alert('SystemError Try again Later'));
            sock.on('private message', setNewMessage)
         }
         catch (e) {
            alert('SystemError Try again Later')
         }
      }
      webSocket()
      return () => {
         sock.disconnect(true)
      }
   }, [sock]);

   useEffect(() => {
      async function changeDataMessage() {
         if (!newMessage) return
         const usersCopy = preUsers.slice()
         const inDataUser = usersCopy.find((el) => el.id === newMessage.user);
         if (inDataUser) {
            inDataUser.message = [...inDataUser.message, newMessage.message];
            setUsers(usersCopy);
         } else {
            const user = await UserService.getUserById({ id: newMessage.user });
            usersCopy.push({ ...user.data, message: [newMessage.message] })
            setPreUsers(usersCopy);
         }
         if(newMessage.user === currentChat){
            setCurrentMessages([...currentMessages,newMessage.message]);
         }
      }
      changeDataMessage()
   }, [newMessage]);

   useEffect(() => {
      const userSearch = async () => {
         try {
            if (search.length < 1) return setDataSearch([])
            if (source) source.cancel();

            const src = axios.CancelToken.source()
            setSource(src);
            setIsDataLoading(true)
            const users = await UserService.findUsers({ search: search.trim(), id: store.user.id }, { cancelToken: src.token })
            sock.emit('findOnlineUsers', users.data.map(el => el.id))
            sock.on('findOnlineUsers', (arr) => {
               helper.addOnlineUsers(users.data, arr)
               setDataSearch(users.data);
               setIsDataLoading(false)
            })
         } catch (e) {
            console.log(e);
            alert('System Error, Try again later')
         }
      }
      userSearch()
   }, [search]);

   const handleSelect = ({ target }) => {
      const main = target.closest('[data-user]')
      if (!main) return
      const userId = main.dataset.user
      setSearch('')
      setCurrentChat(+userId);
   }


   return (
      <Sock.Provider value={sock}>
         <div className={styles.wrapper}>
            <div className={styles.main}>
               <header className={styles.header}>
                  logined as : {store.user.username}
               </header>
               <section className={styles.user}>
                  <section className={styles.select}>
                     <div className={styles.search}>
                        <input placeholder="Search.." onChange={({ target }) => setSearch(target.value)} value={search} type="search" name="search" id="search" />
                     </div>
                     <section className={styles.users} onClick={handleSelect}>
                        <Choose isDataLoading={isDataLoading} search={search} users={users} dataSearch={dataSearch} />
                     </section>
                     <div className={styles.setings}>
                        <Button name="logout" handleClick={store.logOut} />
                     </div>
                  </section >
                  {currentChat && (<Chat
                     // watchedMess={watchedMess}
                     messageLength={currentUser?.message?.length}
                     setWatchedMess={setWatchedMess}
                     currentMessages = {currentMessages}
                     newMessage = {newMessage}
                     currentChat={currentChat}
                     currentUser={currentUser}
                  />)}
               </section>
            </div >
         </div >
      </Sock.Provider>
   )
}

export default observer(Account);