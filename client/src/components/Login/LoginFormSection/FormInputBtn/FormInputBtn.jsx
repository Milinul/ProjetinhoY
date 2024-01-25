import React, { useEffect, useState } from "react"
import '../FormInputBtn/FormInputBtn.css'
// import '../../../../App.css'

// Import dos ícones do React
import { FiUser } from 'react-icons/fi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { AiOutlineSwapRight } from "react-icons/ai"

import Axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

const LoginFormInputBtn = () =>{

    // Configuração para armazenar nome de usuário, senha e status de login
    const [loginuserName, setLoginUserName] = useState('')
    const [loginpassword, setLoginPassword] = useState('')

    // Função de navegação para direcionar para diferentes páginas
    const navigateTo = useNavigate()

    // para armazenar mensagens de status e seu estilo de exibição
    const [loginStatus, setLoginStatus] = useState('')
    const [statusHolder, setStatusHolder] = useState('message')

    // Função para lidar com o processo de login
    const loginUser = (e) => {
        e.preventDefault()

        // Verifica se os campos de nome de usuário ou senha estão vazios
        if (loginuserName === '' || loginpassword === '') {
            navigateTo('/')
            setLoginStatus("Preencha todos os campos.")
            return
        }

        // Faz uma requisição para o servidor com as credenciais fornecidas
        Axios.post('http://localhost:3030/login', {
            loginuserName: loginuserName,
            loginpassword: loginpassword
        }).then((response) => {
            // Se a resposta contiver uma mensagem de erro ou se as credenciais estiverem vazias
            if (response.data.message || loginuserName === '' || loginpassword === '') {
                // Redireciona para a página inicial e exibe a mensagem de erro
                navigateTo('/')
                setLoginStatus("Credenciais não existem!")
            } else {
                // Se não houver erros, direciona para a página de dashboard
                navigateTo('/dashboard')
            }
        })
    }

    // Efeito para lidar com a exibição temporária de mensagens de status
    useEffect(() => {
        if (loginStatus !== '') {
            // Define o estilo de exibição da mensagem e redefine o status após um intervalo de tempo
            setStatusHolder('showMessage')
            setTimeout(() => {
                setStatusHolder('message')
                setLoginStatus('')
            }, 1500)
        }
    }, [loginStatus])

    // Função chamada ao enviar o formulário, reinicializa os campos de nome de usuário e senha
    const onSubmit = () => {
        setLoginUserName('')
        setLoginPassword('')
    }


    return(
        <div>

        <div className="inputDiv">
            <label htmlFor="username">Username</label>
            <div className="input flex">
                <FiUser className='icon'/>
                <input type="text" id='username' placeholder="Enter Username"
                onChange = {(event)=>{
                    setLoginUserName(event.target.value)
                }}/>
            </div>
        </div>

        <div className="inputDiv">
            <label htmlFor="password">Password</label>
            <div className="input flex">
                <RiLockPasswordLine className='icon'/>
                <input type="password" id='password' placeholder="Enter Password"
                onChange = {(event)=>{
                    setLoginPassword(event.target.value)
                }}/>
            </div>
        </div>

        <div className="buttonDiv">
            <button type="submit" className="btn flex" onClick={loginUser}>
                <span>Login</span>
                <AiOutlineSwapRight className="icon" />
            </button>
        </div>

        <span className={statusHolder} onSubmit={onSubmit}>{loginStatus}</span>
        
        </div>
    )
}

export default LoginFormInputBtn