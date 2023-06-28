import jwt_decode from "jwt-decode";
import { useAppselector } from '../redux/store'

const useAuth = () => {

    const token = useAppselector((state) => state.auth.token)
    if (token) {
        const decodedToken = jwt_decode(token)
        // console.log("USe auth hook called : ", decodedToken)

        let status = ""

        let role = decodedToken.role
        // console.log("Role : ", role)

        if (role == "Admin") {
            status = "Admin"
        } else {
            status = "Customer"
        }
        return { status }
    } else {
        return { status: "", }
    }

}

export default useAuth