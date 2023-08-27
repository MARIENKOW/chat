import { makeAutoObservable } from 'mobx'
import userService from '../services/UserService';

class User {
   isAuth = false
   user = {}
   constructor() {
      makeAutoObservable(this)
   }
   setAuth(value) {
      this.isAuth = value
   }
   setUser(value) {
      this.user = value
   }

   async signInUser(value) {

      try {
         const ans = await userService.signIn(value)
         if (ans.status !== 200) return ans;
         this.setAuth(true)
         this.setUser(ans.data.user)
         return ans
      } catch (e) {
         alert('Server Error. Try again later')
         return e
      }
   }
   logOut = async () => {
      try {
         await userService.logOut();
         localStorage.removeItem('accessToken')
         this.setAuth(false)
         this.setUser({})
      } catch (e) {
         localStorage.removeItem('accessToken')
         this.setAuth(false)
         this.setUser({})
      }
   }
   aboutUser = async () => {
      try {
         const res = await userService.aboutUser()
         if (res.status !== 200) {
            this.setUser({})
            this.setAuth(false)
            return localStorage.removeItem('accessToken')
         }
         this.setUser(res.data)
         this.setAuth(true)
      }
      catch (e) {
         alert('Server Error. Try again later')
      }
   }
}

export default User;