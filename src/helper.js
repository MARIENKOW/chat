class Helper {
   toObjec = (ar) => ar.reduce((targ, el) => {
      targ[el.name] = ''
      return targ;
   }, {})
   inputChange = (value, setValue) => {
      return ({ target }) => {
         const { value: inputValue, id } = target;
         setValue({ ...value, [id]: inputValue });
      }
   }
   checkValid = (key, value) => {
      if (value[key].length === 0) return false

      if (key === 'password') {
         if (value[key].length < 5) return true
      }
      else if (key === 'username') {
         if (value[key].length < 3) return true
      }
      else if (key === 'name') {
         if (value[key].length < 3) return true
      }
      else if (key === 're-enter password') {
         if (value[key] !== value.password) return true
      }
      else if (key === 'email') {
         return !String(value[key])
            .toLowerCase()
            .match(
               /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
      }

      return false
   }
   wrongClientValidMessage(key) {
      if (key === 'email') return 'email must be format like example@mail.com'
      if (key === 'password') return 'password must be more then 4 characters'
      if (key === 'username') return 'username must be more then 2 characters'
      if (key === 'name') return 'name must be more then 2 characters'
      if (key === 're-enter password') return 're-entered password is not correct'
   }
   showCorrectTime(user){
      const now = new Date()
      const lastMessageTime = user.message[user.message.length-1].time.slice(0,5)
      const lastMessageDate = user.message[user.message.length-1].date
      const lastMessageYear = user.message[user.message.length-1].date.slice(6);
      const nowDate = `${`${now.getDate()}`.length !== 1 ? now.getDate() : `0${now.getDate()}`}.${`${now.getMonth()}`.length !== 1 ? now.getMonth() : `0${now.getMonth()}`}.${now.getFullYear()}`;
      const nowYear = `${now.getFullYear()}`
      return lastMessageDate === nowDate ? lastMessageTime :(nowYear === lastMessageYear ? lastMessageDate.slice(0,5):lastMessageDate);
   }
   addOnlineUsers(users,arr){
      users.forEach(element => {
         if (arr.includes(element.id)) return element.online = true;
         element.online = false;
      });
   }
}

const helper = new Helper();

export default helper;