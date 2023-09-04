import Sending from "../../Sending/Sending"
import User from "../../../component/Account/User/User"
import SearchDataUser from '../SearchDataUser/SearchDataUser'

const Choose = ({isDataLoading,users,dataSearch,search})=>{

   if(isDataLoading) return <div style={{display:'flex',justifyContent:'center'}}><Sending width='30px'/></div>

   if(search.length>0 && dataSearch.length === 0) return <div style={{display:'flex',justifyContent:'center'}}>NO RESULT</div>

   return search.length>0 ? dataSearch?.map((el, i) => <SearchDataUser key={i} user={el}/>) : users.map((el, i) => <User key={i} user={el} />)
}

export default Choose