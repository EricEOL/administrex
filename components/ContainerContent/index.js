import styled, {css} from 'styled-components';

export const ContainerContent = styled.div`
    display: flex;

    flex-direction: row;
    flex-direction: ${props => props.login && css`column`};
    
    align-items: center;
    
    justify-content: space-evenly;
    justify-content: ${props => props.login && css`center`};

    width: 100%;
    height: ${props => props.login && css`100vh`};
`;