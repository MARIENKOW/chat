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

   const sock = useMemo(() => socketIo.connect('http://localhost:5000', { auth: { username: store.user.username, id: store.user.id } }), [])

   useEffect(() => {
      const webSocket = async () => {
         try {
            // sock.emit('private message', { message: 'Hello', to: 152 })
            sock.on('users', setOnlineUsers);
            sock.on("connect_error", (err) => alert('SystemError Try again Later'));
         }
         catch (e) {
            alert('SystemError Try again Later')
         }
      }
      webSocket()
   }, [])


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
      if(!main) return
      const userInfo = JSON.parse(main.dataset.user)
      if (search.length > 0) {
         setUsers([...users, userInfo])
         setSearch('')
         setCurrentChat(userInfo);
      } else {
         setCurrentChat(userInfo);
      }
   }
   console.log(currentChat);

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
               {currentChat && `username : ${currentChat.username}`}
            </section>
         </section >
      </div >
   )
}

export default observer(Account);