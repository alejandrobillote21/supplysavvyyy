import { Navigate } from "react-router-dom";


export const OpenRoutes=({children}) => {
    const getTokenFromlLocalStorage=JSON.parse(localStorage.getItem("customer"))
    console.log(getTokenFromlLocalStorage?.token);
    return getTokenFromlLocalStorage?.token === undefined ? children : (<Navigate to="/" replace={true} />);
}