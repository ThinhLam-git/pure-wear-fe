import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const userInfo = localStorage.getItem("userInfo");
    
    const [user,setUser] = useState(userInfo ? JSON.parse(userInfo) : null);

    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        localStorage.removeItem("userInfo");
        setUser(null);
    }

    const userToken = () => {
        return user?.token;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, userToken }}>
            {children}
        </AuthContext.Provider>
    )
}