import Center from "../components/layout/Center/Center";
import {Login} from "../components/auth/Login/Login";
import {useDispatch} from "react-redux";
import {fetchToken, fetchUser} from "../clients/auth.client";
import {login} from "../reducers/auth.reducer";
import { useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    return (
        <Center useFreeHeightSpace={true}>
            <form onSubmit={e => handleSubmit(e, dispatch, navigate)}>
                <Login/>
            </form>
        </Center>
    )
}

async function handleSubmit(e, dispatch, navigate){
    e.preventDefault()
    const userForm = new FormData(e.target)
    
    const email = userForm.get('email');
    const password = userForm.get('password');

    const loginData = {
        email: email,
        password: password
    };

    const token = await fetchToken(loginData)

    if(token === undefined){
        alert("JWT NOT VALID")
        return
    }

    const user = await fetchUser(token, loginData)

    dispatch(login(user, token))
    navigate('../', { replace: true });
    window.location.reload();
}