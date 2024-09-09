import Cookies from "js-cookie"
import { Navigate} from "react-router-dom"


const ProtectedRoute = (props) => {
    const jwtToken = Cookies.get("jwt_token")
    console.log("in protected route")
    if (jwtToken === undefined){
        return <Navigate to = "/login"/>
    }
        return props.children
}

export default ProtectedRoute