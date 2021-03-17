import styled, { css } from 'styled-components';

export const ContainerLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    width: 100%;
    padding: 5px;

    border-top: 1px solid #E6ECEF;

    div {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #999;
        background: ${props => props.waiting && css`yellow`};
        background: ${props => props.empenhado && css`green`};
        background: ${props => props.liquidado && css`blue`};
    }

    span {
        font-size: 14px;
        width: 100px;
    }

    strong {
        font-size: 12px;
        border-radius: 8px;
        background: ${props => props.waiting && css`yellow`};
        background: ${props => props.empenhado && css`green`};
        background: ${props => props.liquidado && css`blue`};
        color: #000;
        color: ${props => props.empenhado && css`#fff`};
        color: ${props => props.liquidado && css`#fff`};
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