import styles from './selectUsers.module.scss';
import Choose from '../Choose/Choose'
import { useContext, useState, useEffect } from 'react';
import axios from "axios";
import UserService from '../../../services/UserService'
import { Context } from '../../../index';
import helper from '../../../helper';
import { Users } from '../../../pages/Account/Account';


const SelectUsers = ({ sock, setCurrentChat }) => {
   const { store } = useContext(Context)
   const { users, setUsers } = useContext(Users)
   const [search, setSearch] = useState('')
   const [dataSearch, setDataSearch] = useState([]);
   const [isDataLoading, setIsDataLoading] = useState(false)
   const [source, setSource] = useState(null);


   useEffect(() => {
      const getDataUsers = async () => {
         try {
            setIsDataLoading(true)
            const users = await UserService.getDataUsers({ id: store.user.id });
            const takeUsersOnline = (arr) => {
               helper.addOnlineUsers(users.data, arr)
               setIsDataLoading(false)
               setUsers(users.data)
            }
            sock.emit('onlineUsers', users.data.map(el => el.id))
            sock.on('onlineUsers', takeUsersOnline)
         }
         catch (e) {
            alert('SystemError Try again Later')
         }
      }
      getDataUsers()
   }, []);

   useEffect(() => {
      const userSearch = async () => {
         try {
            if (search.length < 1) return
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
         }
      }
      userSearch()
   }, [search]);

   const handleSearch = ({ target }) => {
      if (target.value.length > 15) return
      setSearch(target.value)
   }

   const handleSelect = ({ target }) => {
      const main = target.closest('[data-user]')
      if (!main) return
      const userId = main.dataset.user
      setSearch('')
      setCurrentChat(+userId);
   }

   return (
      <section className={styles.select}>
         <div className={styles.search}>
            <input placeholder="Search.."
               onChange={handleSearch}
               value={search} type="search"
               name="search"
               id="search"
            />
         </div>
         <section className={styles.users} onClick={handleSelect}>
            <Choose
               isDataLoading={isDataLoading}
               search={search}
               users={users}
               dataSearch={dataSearch} />
         </section>
      </section >)
}

export default SelectUsers