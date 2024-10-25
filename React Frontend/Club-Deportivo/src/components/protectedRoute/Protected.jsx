import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext"

const Protected = ({ children }) => {
    const { user } = useContext(AuthenticationContext)

    if (!user) {
        return (
            <>
                <Navigate to="/login" replace></Navigate>
            </>
        )
    }

    return children
}


export default Protected