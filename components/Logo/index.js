import styled from 'styled-components';

const ContainerLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    color: #fff;

    img {
        width: 35px;
        margin-right: 5px;
    }

    span {
        font-size: 25px;
    }
`;

export default function Logo() {
    return (
        <ContainerLogo>
            <img src="/money-flow.svg" alt="logo-img"/>
            <span>administrex</span>
        </ContainerLogo>
    )
}