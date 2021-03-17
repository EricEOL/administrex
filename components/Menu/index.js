import { useRouter } from 'next/router';
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
    }
`;

export default function Menu() {

    const route = useRouter();

    function handleLogout() {
        localStorage.removeItem('@Sistem_mar21:token');
        localStorage.removeItem('@Sistem_mar21:user');

        route.push('/');
    }

    return (
        <ContainerMenu>
            <Logo />
            <ul>
                <li><a href="/process">Início</a></li>
                <li><a href="">Perfil</a></li>
                <li><button onClick={handleLogout}>Log Out</button></li>
            </ul>
        </ContainerMenu>
    )
}