import styled from 'styled-components';


export const CheenBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    
    background-color:  ${({ theme }) => theme.firstComponentsColor};
    color:  ${({ theme }) => theme.primaryTextColor};

    width: 97.3%;
    height: 10vh;

    
    position: fixed;
    bottom: 0;
`;