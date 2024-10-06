
import {Navigate} from 'react-router-dom'
const ProtectRoute = ({isAuthenticate,children}) => {

 if(!isAuthenticate){
    return Navigate('/login')
}


return children 


}

export default ProtectRoute