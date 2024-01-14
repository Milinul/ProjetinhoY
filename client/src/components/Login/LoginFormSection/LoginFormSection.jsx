import React from "react";
import '../LoginFormSection/LoginFormSection.css';
import '../../../App.css'

import logo from '../../Login/LoginAssets/logo_m_boi_mirim.png'

import LoginFormInputBtn from '../LoginFormSection/FormInputBtn/FormInputBtn.jsx'

const LoginForm = () => {
    return (
        <div className="login-form">
            <img src={logo} alt="Logo img" />

            <form action="" className="form grid">
                {/*<span className="message">Login Status</span>*/}
                
                <LoginFormInputBtn />
                {/*<FormBtn /> */}

                {/* <span className="forgotPassword">
                    Forgot your password? <a href="">Click Here</a>
                </span> */}
            </form>
        </div>
    );
}

export default LoginForm;
