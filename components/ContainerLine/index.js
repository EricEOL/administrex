import styled from 'styled-components';

export const ContainerLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    width: 100%;
    padding: 5px;

    border-top: 1px solid #E6ECEF;

    div {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #999;
    }

    span {
        font-size: 15px;
        width: 80px;
    }

    strong {
        font-size: 12px;
        border-radius: 8px;
        background: yellow;
        padding: 5px;
        width: 80px;
        text-align: center;
    }

    a {
        font-size: 12px;
        text-decoration: none;
        outline: none;
        cursor: pointer;
    }
`;