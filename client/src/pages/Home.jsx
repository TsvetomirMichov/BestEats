import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HeadlineCards from '../components/HeadlineCards '
import Food from '../components/Food'
import Category from '../components/Category'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <Hero />
            <HeadlineCards />
            <Food />
        </div>
    )
}

export default Home