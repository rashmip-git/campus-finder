// src/Context/AuthContext.jsx
/*
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    //if (savedToken && savedUser) {
    if (storedToken) {
      setToken(storedToken);
      if(storedUser){

      try{
     //const parsedUser= JSON.parse(savedUser);
     setUser(JSON.parse(storedUser));
      }
     //if (parsedUser.id && !parsedUser._id) {
          //parsedUser._id = parsedUser.id;
        //}
       // setUser(parsedUser);
     // }
      catch(e){
        console.log("error",e);
        localStorage.removeItem("user");
        
         
      }
    }
    }
    setLoading(false);
  }, []);

   /*const login = (authData) => {
    const normalizedUser = {
      ...authData.user,
      _id: authData.user.id || authData.user._id
    };

    setToken(authData.token);
    setUser(normalizedUser);

    localStorage.setItem("authToken", authData.token);
    localStorage.setItem("authUser", JSON.stringify(normalizedUser));
  };*/
/*
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData); // 🔒 Store user object (contains _id, username, email, etc.)
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = { user, token, login, logout, loading, isAuthenticated: !!token };
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
*/
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("authUser", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
