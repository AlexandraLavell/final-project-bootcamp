// style
import styled from "styled-components";

export const EmployeeDashWrapper = styled.div`
   position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
    padding: 15px;
    background: var(--color-main-yellow);    
    /* border-top: 1px solid black; */
`;

export const EmployeeDashForm = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
    padding: 15px;
    background: lemonchiffon;
    /* border-top: 1px solid black; */
`;

export const SubsectionHeader = styled.div`    
    height: fit-content;
    display: flex; 
    justify-content: space-between;
    color:black;
    font-family: var(--font-main);
    width: 100%;
    padding: 15px;
    background: var(--color-main-yellow);
    /* border: 1px solid black; */
`;

export const FormInput = styled.input`
    position: relative;
    display: flex;
    border: 1px solid black;
    background: transparent;
    margin: 10px 15px;
    border-radius: 0px;
    &.pointer{
        cursor: pointer;
    }
`;

