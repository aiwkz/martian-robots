import styled from "styled-components";

export const InstructionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 20vw;
    margin-right: 2rem;
`;

export const InstructionsLabel = styled.h1`
    margin-bottom: 1rem;
    font-size: 1.2rem;
`;

export const InstructionsButton = styled.input`
    display: flex;
    align-self: flex-end;
    margin-top: 1rem;
    width: max-content;
    text-align: center;
    cursor: pointer;
    border: 1px solid transparent;
    padding: .85em 1em;
    font-size: .9rem;
    background-color: #2199e8;
    color: #FEFEFE;
`;

export const InstructionsFailedMessage = styled.div`
    color: red;
    margin-top: .3rem;
`;
