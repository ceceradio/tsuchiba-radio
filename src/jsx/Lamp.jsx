import React from 'react';
import styled, {css, keyframes} from 'styled-components';

const blink = keyframes`
    0% {
        background: #222;
    }

    50% {
        background: #F91929;
    }

    100% {
        background: #222;
    }
`;

const Lamp = styled.div.attrs(({shuffling, staticLevel}) => {
    let animating = (shuffling && staticLevel > 0);
    if (animating) {
        return {
            style: {
                animationDuration: `${6 - staticLevel * 3}s`
            }
        }
    }
    if (!shuffling) {
        return {
            style: {
                animation: 'none',
                background: '#F91929'
            }
        }
    }
    return {
        style: {
            animation: 'none'
        }
    }
})`
    display: inline-block;
    vertical-align: -5%;
    margin-right: 3px;
    width: 22px;
    height: 22px;
    line-height: 22px;
    background: #222;
    animation: ${blink} 5s ease-in-out infinite;
    border-top: 3px solid rgba(50, 50, 50, 0.9);
    border-right: 3px solid rgba(128, 128, 128, 0.9);
    border-left: 3px solid rgba(100, 100, 100, 0.9);
    border-bottom: 3px solid rgba(200, 200, 200, 0.9);
`

export default Lamp;