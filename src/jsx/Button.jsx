import styled from 'styled-components';
const Button = styled.button`
    font-family: paralucent, sans-serif;
    font-weight: 200;
    text-transform: uppercase;
    display: block;
    text-align: center;
    font-size: 30px;
    background: rgb(20,20,20);
    background: linear-gradient(0deg, rgba(20,20,20,1) 0%, rgba(28,28,28,1) 9%, rgba(55,55,55,1) 12%, rgba(10,10,10,1) 13%, rgba(97,97,97,1) 15%, rgba(37,37,37,1) 18%, rgba(97,97,97,1) 84%, rgba(15,15,15,1) 100%);
    text-shadow: 0px 2px 0px rgba(66,66,66,0.9), 0px 3px 1px rgba(0,0,0,0.3);
    box-shadow: 0px 5px 9px 3px rgba(28,28,28,0.69);
    border-right: 3px solid rgba(0,0,0,0.3);
    border-left: 3px solid rgba(0,0,0,0.3);
    color: rgba(230,230,230,0.9);
    padding: 0px 4px 4px;
    width: 100%;
    margin-bottom: 12px;
`;
export default Button;