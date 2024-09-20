import React from 'react'
import Header from '../header/Header'

const MainLayout = ({ children }) => {
    return (
        <>
            <Header></Header>
            {children}
        </>
    )
}

export default MainLayout