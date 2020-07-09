import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import devices, { sizes } from './breakpoints.jsx'
import tunerConstants from './TunerConstants.jsx'


const translateFunc = (percent) => {
    return (window.innerWidth >= sizes.mobileL)?`translate3d(${percent}, 0, 0)`:`translate3d(0, ${percent}, 0)`;
}
const OrangeLineContainer = styled.div.attrs(({percent}) => ({
    style: {
        transform: translateFunc(percent)
    }
}))`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    transition: transform ease-in-out 333ms, top ease-in-out 333ms;
`
const OrangeLine = styled.div`
    position: absolute;
    background: #f2542c;
    top: 0;
    left: 4px;
    height: 5px;
    width: 80%;
    @media ${devices.mobileL} {
        left: 0;
        top: 4px;
        width: 5px;
        height: 25px;
    }
`
const FrequencyLine = ({freq, loading, staticLevel}) => {
    const { start, end, bigLine } = tunerConstants;
    const [loadingFrequency, setLoadingFrequency] = useState(null);
    const [staticFrequency, setStaticFrequency] = useState(null);
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingFrequency((Math.random() * (end - start)) + start);
            setStaticFrequency(0.5 - Math.random());
        }, 420);
        return () => setInterval(interval);
    }, [])
    const drawFreqLine = () => {
        let frequency = (loading && loadingFrequency) || (Number(freq) + (staticLevel * bigLine * staticFrequency)) || start
        let percent = `${((frequency - start) / (end - start)) * 100}%`
        return <OrangeLineContainer percent={percent}><OrangeLine></OrangeLine></OrangeLineContainer>
    }
    return drawFreqLine();
}

export default FrequencyLine;