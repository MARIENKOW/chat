import { useContext, useEffect, useMemo, useState } from "react";
import { Context } from "../../index";
import Button from "../../component/Button/Button";
import { observer } from 'mobx-react-lite'
import styles from './Account.module.scss'
import socketIo from 'socket.io-client'
import UserService from '../../services/UserService'
import axios from "axios";
import Choose from "../../component/Account/Choose/Choose"


const Account = () => {
   const { store } = useContext(Context)
   const [users, setUsers] = useState([])
   const [search, setSearch] = useState('')
   const [source, setSource] = useState(null);
   const [dataSearch, setDataSearch] = useState([]);
   const [isDataLoading, setIsDataLoading] = useState(false)
   const [onlineUsers, setOnlineUsers] = useState([])
   const [currentChat, setCurrentChat] = useState(null)
   const [write, setWrite] = useState('');
   const [newMessage, setNewMessage] = useState(null)

   const sock = useMemo(() => socketIo.connect('http://localhost:5000', { auth: { username: store.user.username, id: store.user.id } }), [])

   useEffect(() => {
      const webSocket = async () => {
         try {
            const users = await UserService.getDataUsers({ id: store.user.id });
            setUsers(users.data)
            sock.on('users', setOnlineUsers);
            sock.on("connect_error", (err) => alert('SystemError Try again Later'));
            sock.on('private message', setNewMessage)
         }
         catch (e) {
            alert('SystemError Try again Later')
         }
      }
      webSocket()
   }, [])

   useEffect(changeDataMessage, [newMessage])

   function changeDataMessage() {
      console.log(currentChat);
      if (!newMessage) return
      const usersCopy = users.slice()

      usersCopy.forEach((el) => {
         if (el.id === newMessage.user) {
            if (el.message) return el.message = [...el.message, newMessage.message];
            el.message = [newMessage.message]
         }
      })
      console.log(users);
      setUsers(usersCopy);
   }

   useEffect(() => {
      const userSearch = async () => {
         try {
            if (search.length < 1) return setDataSearch([])
            if (source) source.cancel();

            const src = axios.CancelToken.source()
            setSource(src);
            setIsDataLoading(true)
            const users = await UserService.findUsers({ search: search.trim(), id: store.user.id }, { cancelToken: src.token })
            sock.emit('findOnlineUsers', users.data)
            sock.on('findOnlineUsers', (data) => {
               setDataSearch(data);
               setIsDataLoading(false)
            })

         } catch (e) {
            console.log(e);
         }
      }
      userSearch()
   }, [search])

   const handleWrite = ({ target }) => {
      const main = target.closest('[data-user]')
      if (!main) return
      const userInfo = JSON.parse(main.dataset.user)
      if (search.length > 0) {
         // const 
         setSearch('')
         setCurrentChat(userInfo);
         const isOnUsers = users.find((el) => el.id === userInfo.id);
         if (isOnUsers) return;
         setUsers([...users, userInfo])
      } else {
         setCurrentChat(userInfo);
      }
   }

   const handleSendMessage = (e) => {
      e.preventDefault();
      sock.emit('private message', { message: write, to: currentChat.id });
      setWrite('');
   }

   return (
      <div className={styles.wrapper}>
         <section className={styles.main}>
            <section className={styles.select}>
               <div className={styles.search}>
                  <input placeholder="Search.." onChange={({ target }) => setSearch(target.value)} value={search} type="search" name="search" id="search" />
               </div>
               <section className={styles.users} onClick={handleWrite}>
                  <Choose isDataLoading={isDataLoading} search={search} users={users} dataSearch={dataSearch} />
               </section>
               <div className={styles.setings}>
                  <Button name="logout" handleClick={store.logOut} />
               </div>
            </section >
            <section className={styles.chat}>
               {currentChat && (
                  <section className={styles.currentChat}>
                     <div className={styles.view}>
                        {currentChat && currentChat.message && currentChat.message.map((el, i, arr) => <div key={i}>{el.from === store.user.id ? 'you' : currentChat.username} : {el.value}</div>)}
                     </div>
                     <form onSubmit={handleSendMessage} className={styles.write}>
                        <input onChange={({ target }) => setWrite(target.value)} type="text" name="write" id="write" value={write} />
                     </form>
                  </section>
               )}
            </section>
         </section >
      </div >
   )
}

export default observer(Account);