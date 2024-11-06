import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import "./MainLayout.css"

const MainLayout = ({ children }) => {
    return (
        <div className='layout-container'>
            <Header></Header>
            <div className='content'>{children}</div>
            <Footer></Footer>
        </div>
    )
}

export default MainLayout