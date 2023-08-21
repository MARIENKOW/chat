import { useContext } from "react";
import { Context } from "../../index";
import Button from "../../component/Button/Button";
import {observer} from 'mobx-react-lite'
const Account = () => {
   const {store} = useContext(Context)
   return (
      <>
         <section><Button name ="logout" handleClick={store.logOut}/></section>
         <section>username : {store.user.username}</section>
         <section>email : {store.user.email}</section>
      </>
   )
}

export default observer(Account);