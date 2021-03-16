import styled, {css} from 'styled-components';

export const ContainerContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: ${props => props.contentWindow && css`flex-start`};
    flex-direction: column;

    min-height: 100vh;
    width: 100%;
`;