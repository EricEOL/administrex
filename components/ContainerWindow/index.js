import styled from 'styled-components';

export const ContainerWindow = styled.div`
    position: relative;
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

    h3 {
        text-align: center;
        padding: 5px;
        color: #0B8BD5;
    }

    >input {
        width: 250px;
        height: 30px;
        outline: none;
        border: 3px solid #DDE1E4;
        margin-bottom: 10px;

        &:focus {
            border: 3px solid #0B8BD5;
        }
    }

    .back-button {
        position: absolute;
        top: 0;
        right: 0;
        border: 0;
        margin: 20px;
        padding: 5px;
        border-radius: 4px;
        background: #0B8BD5;
        color: #fff;
        font-weight: 700;
        outline: none;
        cursor: pointer;

        &:hover {
            background: #064C74;
        }
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