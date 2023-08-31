import $api, { API_URL } from '../http/index.js';

export default class AuthService {
   static async signIn(value){
      const res = await $api.post('/signIn',value)
      const {accessToken} = res.data
      localStorage.setItem('accessToken',accessToken)
      return res
   }
   static async signUp(value){
      const ans =await $api.post('/signUp',value)
      return ans
   }
   static async rememberPassword(value){
      const ans =await $api.post('/rememberPassword',value)
      return ans
   }
   static async logOut(){
      const rez = await $api.post('/logOut');
      return rez;
   }
   static async refresh(){
      return await $api.post('/refresh');
   }
   static async getUsers(){
      const ans =  await $api.get('/users');
      return ans
   }
   static async checkAuthUser(){
      if(!localStorage.getItem('accessToken')) return {status:401}
      const response = await $api.get('/checkAuthUser');
      return response
   }
   static async checkChangePassLink(value){
      const response = await $api.post('/checkChangePassLink',value);
      return response
   }
   static async aboutUser(){
      const ans = await $api.get('/aboutUser');
      return ans
   }
   static async changePassword(value){
      const ans =await $api.post('/changePass',value)
      return ans
   }
   static async findUsers(value,h){
      const ans =await $api.post('/user/searchUsers',value,h)
      return ans
   }

   static async getDataUsers(value,h){
      const ans =await $api.post('/user/getDataUsers',value,h)
      return ans
   }

   static async getUserById(value){
      const ans =await $api.post('/user/getUserById',value)
      return ans
   }

   static async addWatchedMessage(value){
      const ans =await $api.post('/user/addWatchedMessage',value)
      return ans
   }
}