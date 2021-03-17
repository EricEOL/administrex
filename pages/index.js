import React, { useState } from 'react';
import api from '../config/api';
import { useRouter } from 'next/router';
import { ContainerBackground } from '../components/ContainerBackground';
import { ContainerContent } from '../components/ContainerContent';
import Logo from '../components/Logo';
import styled from 'styled-components';

const ContainerLogin = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #fff;
  width: 500px;
  padding: 30px;
  margin-top: 10px;

  div {
    display: flex;
    justify-content: center;
    align-items:center;
    width: 270px;
    margin-top: 20px;

    input {
      width: 100%;
      height: 30px;
      border: 1px solid #DDE1E4;
      border-radius: 4px;
      outline: none;
      transition: 0.1s;

      &:focus {
        border: 2px solid #0B8BD5;
      }
    }

    img {
      width: 25px;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 270px;
    height: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-radius: 4px;
    background: #0B8BD5;
    color: #fff;
    cursor: pointer;
    font-weight: 700;
    outline: none;
    transition: 0.2s;

    &:hover {
      background: #064C74;
    }

    img {
      width: 20px;
      margin-right: 5px;
    }
  }

  .notice-register {
    position: absolute;
    font-size: 10px;
    bottom: 0;
  }

  .notice-error {
    font-size: 12px;
    color: red;
    font-weight: 700;
  }
`;

function Login() {

  const route = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    try {
      const { data } = await api.post('/user/login', { email, password });
      const { user, token } = data;

      localStorage.setItem('@Sistem_mar21:token', token);
      localStorage.setItem('@Sistem_mar21:user', user);

      route.push('/process');

    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <ContainerBackground>
      <ContainerContent login>

        <Logo />

        <ContainerLogin>
          <h2>Log In</h2>
          
          <div>
            <img src="/user_blue.svg"/>
            <input type="email" name="email" onChange={(event) => { setEmail(event.target.value) }} />
          </div>

          <div>
            <img src="/padlock.svg"/>
            <input type="password" name="password" onChange={(event) => { setPassword(event.target.value) }} />
          </div>

          <button onClick={handleLogin}>
            <img src="/arrow-right.svg" alt=""/>
            Continuar
          </button>
          <p className="notice-error">{error && error}</p>

          <p className="notice-register">*Para se cadastrar é necessário entrar em contato com o administrador</p>
        </ContainerLogin>
      </ContainerContent>
    </ContainerBackground>
  )
}

export default Login; 
