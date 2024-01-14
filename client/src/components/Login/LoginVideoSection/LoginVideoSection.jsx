import React from "react";
import video from '../../Login/LoginAssets/video.mp4'
import '../LoginVideoSection/LoginVideoSection.css';
import '../../../App.css'
//import { Link } from 'react-router-dom'

const LoginVideoSection = () =>{
    return(
      <div className="videoDiv">
        <video src={video} autoPlay muted loop></video>
        
        <div className="textDiv">
          <h2 className="title">Fazendo a diferença na vida das pessoas,</h2>
          <p>transformando o sistema de saúde e ampliando acesso de qualidade.</p>
        </div>

        {/* botão para a tela de registro
        <div className="footerDiv flex">
          <span className="text">Crie sua conta</span>
          <Link to={'/register'}>
          <button className="btn">Sign Up</button>
          </Link> 
        </div>  */}
      </div>
    )
}

export default LoginVideoSection;