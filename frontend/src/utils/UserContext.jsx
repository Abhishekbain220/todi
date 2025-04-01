import axios from "./axios";
import { createContext, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";

export let UserContext = createContext()
export let UserProvider = (props) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState(null)
    useEffect(() => {
        let storeToken = JSON.parse(localStorage.getItem("authToken"))
        setToken(storeToken)

    }, [])
    let logout = async () => {
        try {
            let response=await axios.get("/user/logout",{
                withCredentials:true
            })
            console.log(response)
            localStorage.removeItem("authToken");
            setToken(null)
            setTimeout(() => {
                toast.success(response.data.message)
            }, 1000);
        } catch (error) {
            console.log(error)
        }
    }
    console.log(token)
    return (
        <UserContext.Provider value={{ username, setUsername, email, setEmail, password, setPassword, token, setToken, logout }}>
            {props.children}
        </UserContext.Provider>
    )
}