import { useContext, useEffect, useState } from "react";
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

   // useEffect(() => {
   //    const webSocket = async () => {
   //       const sock = await socketIo.connect('http://localhost:5000');
   //       sock.emit('message', { mes: 'asdasd' })
   //       sock.on('response', (data) => {
   //          // console.log(data);
   //       })
   //    }
   //    webSocket()
   // }, [])
   useEffect(()=>{
      setIsDataLoading(true);
      setTimeout(()=>{
         setIsDataLoading(false)
      },1000)
   },[])

   useEffect(() => {
      const userSearch = async () => {
         try {
            if (search.length < 1) return setDataSearch([])
            if (source) source.cancel();

            const src = axios.CancelToken.source()
            setSource(src);
            setIsDataLoading(true)
            const users = await UserService.findUsers({ search:search.trim(), id: store.user.id }, { cancelToken: src.token })
            setDataSearch(users.data);
            setIsDataLoading(false)

         } catch (e) {
            console.log(e);
         }
      }
      userSearch()
   }, [search])

   const handleWrite = ({target})=>{
      console.dir(target);
      if(target.tagName !=='BUTTON') return
      const userInfo = target.parentElement.dataset.user;
      console.log(userInfo);
      setUsers([...users,JSON.parse(userInfo)])
      setSearch('')
   }

   return (
      <div className={styles.wrapper}>
         <section className={styles.main}>
            <section className={styles.select}>
               <div className={styles.search}>
                  <input placeholder="Search.." onChange={({ target }) => setSearch(target.value)} value={search} type="search" name="search" id="search" />
               </div>
               <section className={styles.users} onClick={handleWrite}>
                  <Choose isDataLoading={isDataLoading} search={search} users={users} dataSearch={dataSearch}/>
               </section>
               <div className={styles.setings}>
                  <Button name="logout" handleClick={store.logOut} />
               </div>
            </section >
            <section className={styles.chat}>

            </section>
         </section >
      </div >
   )
}

export default observer(Account);