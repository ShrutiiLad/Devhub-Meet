import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
export default function LandingPage() {


    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2>Devhub</h2>
                </div>
                <div className='navlist'>
                    <p onClick={() => {
                        const code = Math.random().toString(36).slice(2, 8);
                        router(`/${code}`)
                    }}>Join as Guest</p>
                    <p onClick={() => {
                        router("/auth")

                    }}>Register</p>
                    <div onClick={() => {
                        router("/auth")

                    }} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>


            <div className="landingMainContainer">
                <div>
                    <h1><span style={{ color: "#FF9839" }}>Connect</span>, Code, Collaborate</h1>

                    <p>Bring teams together — fast, simple, and secure.</p>
                    <div role='button'>
                        <Link className="ctaButton" to="/auth">Get Started</Link>
                    </div>
                </div>
                <div>

                    <img src="/mobile.png" alt="" />

                </div>
            </div>



        </div>
    )
}
