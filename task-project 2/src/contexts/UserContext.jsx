import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext({
  token: ''
})

export function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('TOKEN') || '')

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
