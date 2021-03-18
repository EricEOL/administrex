import styled from 'styled-components';

export const ContainerWindow = styled.div`
    width: 70%;
    min-height: 80vh;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px;

    background: #fff;

    h2 {
        text-align: center;
        margin: 5px;
    }

    .ancor-button {
            width: 270px;
            height: 30px;
            border: 0;
            border-radius: 4px;
            background: #0B8BD5;
            color: #fff;
            cursor: pointer;
            font-weight: 700;
            outline: none;
            margin-top: 30px;
            text-decoration: none;
            font-size: 14px;
            transition: 0.2s;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;

        &:hover {
            background: #064C74;
        }
    }
`;