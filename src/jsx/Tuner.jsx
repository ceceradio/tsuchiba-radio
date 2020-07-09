import React, { memo } from 'react'
import styled, { css } from 'styled-components'
import devices from './breakpoints.jsx'
import tunerConstants from './TunerConstants.jsx'

const TunerContainer = styled.div`
    pointer-events: none;
    position: relative;
    height: 100%;
    margin-top: 6px;
    @media ${devices.mobileL} {
        width: 65%;
        margin-top: 10px;
    }
`

const HorizontalLine = styled.div`
    position: absolute;
    background: #39EE8C;
    left: 24px;
    top: 0;
    bottom: 10%;
    width: 4px;
    @media ${devices.mobileL} {
        left: 0;
        right: 0;
        top: 0;
        width: initial;
        height: 4px;
    }
`

const TunerSpace = styled.div`
    position: relative;
    overflow: visible;
    margin-left: 24px;
    margin-right: 24px;
    height: 80%;
    color: #39EE8C;
    @media ${devices.mobileL} {
        width: 90%;
        height: initial;
        height: 4px;
        margin: 0;
    }
`

const BigLine = styled.div`
    position: absolute;
    height: 4px;
    width: 100%;
    top: ${props => props.left};
    left: 0;
    background: #39EE8C;
    ${props => props.odd && css`
        display: none;
    `}
    span {
        display: inline-block;
        padding: 4px 20px;
        font-size: 24px;
    }
    @media ${devices.mobileM} {
        display: block;
    }
    @media ${devices.mobileL} {
        width: 4px;
        height: 50px;
        top: initial;
        left: ${props => props.left};
        ${props => props.odd && css`
            display: none;
        `}
        span {
            padding: 16px 6px;
        }
    }
    @media ${devices.tablet} {
        display: block;
    }
`

const SmallLine = styled.div`
    position: absolute;
    background: #39EE8C;
    ${props => props.odd && css`
        display: none;
    `}
    height: 2px;
    width: 10px;
    top: ${props => props.left};
    @media ${devices.mobileL} {
        width: 2px;
        height: 10px;
        top: initial;
        left: ${props => props.left};
    }
    @media ${devices.laptop} {
        display: block;
    }
`

const Lines = memo(() => {
    const { start, end, bigLine, smallLine } = tunerConstants;
    const drawBigLines = () => {
        let lines = []
        let odd = false;
        for(let i = start; i <= end; i += bigLine) {
            let percent = `${((i - start) / (end - start)) * 100}%`
            lines.push(<BigLine odd={odd} key={i} left={percent}><span>{i}</span></BigLine>)
            odd = !odd;
        }
        lines.push(<BigLine key={end} left={'100%'}><span>{end}</span></BigLine>)
        return lines
    }
    const drawSmallLines = () => {
        let lines = []
        let odd = false;
        for(let i = start; i <= end; i += smallLine) {
            let percent = `${((i - start) / (end - start)) * 100}%`
            lines.push(<SmallLine odd={odd} key={i} left={percent}></SmallLine>)
            odd = !odd;
        }
        return lines;
    }
    return <>
        {drawBigLines()}
        {drawSmallLines()}
    </>
})

const Tuner = memo(({children}) => {
    return (<TunerContainer>
        <HorizontalLine></HorizontalLine>
        <TunerSpace>
            <Lines></Lines>
            {children}
        </TunerSpace>
    </TunerContainer>)
})

export default Tuner