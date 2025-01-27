import React, { useEffect } from "react"
import { Container, Icon, IconContainer } from "./mainPageComponent.style";
import { useNavigate } from "react-router";
import { api } from "../../api/api";
import store from "../../redux/store";
import { setUserToken } from "../../redux/features/userData/userDataSlice";
import { jwtDecode } from "jwt-decode";


export default function MainPageComponent() {

    const navigate = useNavigate();

    useEffect(() => {
      
        const token = localStorage.getItem("userToken");
            
        if(token){
            const decodedToken = jwtDecode(token);
            
              if(decodedToken && decodedToken.exp && (decodedToken?.exp * 1000) > Date.now() ){
                store.dispatch(setUserToken(token));
                navigate("/dashboard");
                return;
              } else 
                localStorage.removeItem("userToken");
        }
        
        navigate('/login');
        
        /*
        api.getAllUsers(false).then((data) => {
            const token = localStorage.getItem("userToken");
            if (data) {
                if (token && token.length > 0) {
                    store.dispatch(setUserToken(token));
                    navigate("/dashboard");
                }
            } else if (token) {
                localStorage.removeItem("userToken");
                navigate("/login");
            } else {
                navigate("/login");
            }
        }
        ); */
    }, );


    return (
        <Container>
            <IconContainer><Icon /></IconContainer>
        </Container>
    );
};
