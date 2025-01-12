import styled from 'styled-components';


export const TopBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    background-color:  ${({theme})=>theme.firstComponentsColor};
    color:  ${({theme})=>theme.primaryTextColor};

    /* width: 100%; */
    height: 10vh;

    position: sticky;
    top: 0;
    `;