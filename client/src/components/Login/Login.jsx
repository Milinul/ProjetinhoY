import React from "react"
import './Login.css'
import '../../App.css'

import LoginVideoSection from './LoginVideoSection/LoginVideoSection.jsx'
import LoginFormSection from './LoginFormSection/LoginFormSection.jsx'

const Login = () => {
    return (
        <div className='loginPage flex'>
            <div className='container flex'>
                
                {/* Seção do video */}
                <LoginVideoSection />

                {/* Seção da logo e user*/}
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <LoginFormSection />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login