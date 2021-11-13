import { auth, signOut } from '../configs/firebase'
import {useHistory} from 'react-router-dom'
export default function Logout(){
    let history = useHistory();
const logout = async () => {
    try {

        await signOut(auth);
        history.push('/')
      
    } catch (error) {
        console.log(error)
    }
}


return(
    <>
    <button className="btn btn-warning my-2 my-sm-0 shadow-none" onClick={logout} style={{marginLeft:"10px"}}>Log Out</button>
</>
)


}