import styled from 'styled-components';

const Container = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 500px;

    img {
        width: 90px;
        padding: 10px;
        border-radius: 8px;
        transition: 0.2s;

        &:hover {
            background: #0B8BD5;
        }
    } 
`;

export default function AsideMenu() {
    return (
        <Container>
            <a href=""><img src="/add-doc.svg" alt="Inserir nova requisição"/></a>
            <a href=""><img src="/received-doc.svg" alt="Receber documento"/></a>
        </Container>
    )
}