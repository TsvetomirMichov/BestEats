import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from '../redux/store'

type DecodedTokenType={
    name:string,
    role:string,
    phone:string,
}

const useAuth = () => {
    const token = useSelector((state:RootState) => state.auth.token)
    
    if (token) {
        const decodedToken:DecodedTokenType = jwt_decode(token)
        // console.log("USe auth hook called : ", decodedToken)

        let status = ""

        let role = decodedToken.role
        // console.log("Role : ", role)

        if (role == "Admin") {
            status = "Admin"
        } else {
            status = "Customer"
        }
        
        // console.log("Status :", status)
        return { status} 
    } else {
        return { status: "", }
    }
}

export default useAuth