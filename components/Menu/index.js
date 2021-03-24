import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/auth';
import Logo from '../Logo';
import styled from 'styled-components';

const ContainerMenu = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 10vh;
    background: #0B8BD5;
    padding: 10px;

    ul {
        list-style: none;
        li {
            display: inline;
            margin-right: 20px;
            a {
                font-size: 15px;
                text-decoration: none;
                color: #fff;
                transition: 0.2s;

                &:hover {
                    color: yellow;
                }
            }
            button {
                font-size: 15px;
                background: #064C74;
                outline: none;
                cursor: pointer;
                color: #fff;
                padding: 3px;
                border: none;
                border-radius: 4px; 
            }
        }
        .login {
            color: yellow;
            font-weight: 700;
        }
    }
`;

export default function Menu() {

    const { userLogged, Logout } = useAuth();


    function handleLogout() {
        
        Logout();
    }

    return (
        <ContainerMenu>
            <Logo />
            <ul>
                <li className="login">{userLogged}</li>
                <li><Link href="/process">Início</Link></li>
                <li><Link href="/finance/totals">Finanças</Link></li>
                <li><button onClick={handleLogout}>Log Out</button></li>
            </ul>
        </ContainerMenu>
    )
}