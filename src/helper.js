class Helper {
   toObjec = (ar) => ar.reduce((targ, el) => {
      targ[el.name] = ''
      return targ;
   }, {})
   inputChange = (value,setValue) => {
      return ({ target }) => {
         const { value: inputValue, id } = target;
         setValue({ ...value, [id]: inputValue });
      }
   }
}

const helper = new Helper();

export default helper;