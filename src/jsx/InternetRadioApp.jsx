import React, { Component } from 'react'
import Tuner from './Tuner'
import FrequencyLine from './FrequencyLine'
import FavoriteButton from './FavoriteButton'
import Lamp from './Lamp'
import Button from './Button'
import SegmentTowerController from './SegmentTowerController'
import devices from './breakpoints'
import AudioPlayer from './AudioPlayer'
import styled from 'styled-components'

const DonateLink = styled.a`
    display: inline-block;
    margin-top:12px!important;
`

const ButtonContainer = styled.div`
    width: 100%;
    padding: 0 0 0 12px;
    @media ${devices.mobileL} {
        padding: 12px 0;
        > h3 {
            margin-top: 24px;
        }
    }
`
const ControlButton = styled(Button)`
    height: 46px;
`
const ControlSection = styled.div`
    @media ${devices.mobileL} {
        display: flex;
        > * {
            margin: 0 6px;
        }
    }
`;
const TunerControls = styled.div`
    display: flex;
    flex-direction: column;
    @media ${devices.mobileL} {
        
    }
`
const Radio = styled.section`
    padding: 12px;
    max-width: 1024px;
    margin: 0 auto;
    @media ${devices.mobileL} {
        padding: 30px 12px;
    }
`
const StationContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: right;
    min-height: 72px;
    padding-top: 8px;
    @media ${devices.mobileL} {
        width: 30%;
        padding: 0;
    }
    svg {
        position: absolute;
        left: 10%;
        top: 50%;
        transform: translateY(-45%);
        width: 30px;
        @media ${devices.mobileL} {
            left: 7.5%;
            top: 37.5%;
        }
        @media ${devices.tablet} {
            left: 35%;
            top: 45%;
        }
    }
`
const StationText = styled.h3`
    font-size: 30px;
    color: #39EE8C;
    margin: 0;
    line-height: 1;
    font-weight: 400;
    font-family: t26-carbon, monospace;
    padding-right: 20px;
    @media ${devices.mobileL} {
        padding-right: 6px;
    }
    @media ${devices.tablet} {
        font-size: 36px;
        padding-right: 20px;
    }
    @media ${devices.laptop} {
        padding-right: 40px;
    }
`

const TunerBox = styled.div`
    position: relative;
    min-width: 150px;
    width: 45%;
    border-top: 6px solid rgba(50, 50, 50, 0.9);
    border-right: 6px solid rgba(128, 128, 128, 0.9);
    border-left: 6px solid rgba(100, 100, 100, 0.9);
    border-bottom: 6px solid rgba(200, 200, 200, 0.9);
    background: #111;
    display: flex;
    flex-direction: column;
    height: 75vh;
    @media ${devices.mobileL} {
        flex-direction: row;
        height: 50px;
        width: 100%;
        padding: 20px 10px 90px 10px;
    }
`

const RadioTitle = styled.h2`
    text-align: center;
    font-size: 36px;
    text-shadow: 0px 2px 0px rgba(66,66,66,0.9), 0px 4px 3px rgba(0,0,0,0.3);
    color: rgba(240,240,240,0.9);
    margin: 0;
`

const RadioSubTitle = styled.h3`
    font-size: 14px;
    mix-blend-mode: hard-light;
    color: rgba(33,33,33,0.9);
    font-weight: 700;
    line-height: 24px;
    margin: 0 0 6px 0;
    text-align: center;
    @media ${devices.mobileM} {
        font-size: 16px;
    }
`

const stationsUrl = "stations.json"
class InternetRadioApp extends Component {
    TIME_TIL_SHUFFLE = 5 * 60 * 1000
    TIME_OF_STATIC = 2 * 60 * 1000

    state = {
        justStarted: true,
        shuffling: true,
        paused: false,
        loading: false,
        switchTimer: null,
        staticTimer: null,
        staticInterval: null,
        staticLevel: 0,
        selectedStation: null,
        savedStations: [],
        stations: []
    }
    constructor() {
        super();
        if (window.location.hostname === 'localhost') {
            this.TIME_TIL_SHUFFLE = 1 * 60 * 1000
            this.TIME_OF_STATIC = 1 * 50 * 1000
        }
        this.audioPlayer = new AudioPlayer();
        this.audioPlayer.onError = this.selectRandomStation;
        this.audioPlayer.onPlaying = () => { 
            console.log('STARTED PLAYING')
            this.setState((prevState) => ({
                ...prevState,
                loading: false
            }));
            if (this.state.shuffling) this.startCountdown()
        }
        this.audioPlayer.onLoadStart = () => {
            this.setState((prevState) => ({
                ...prevState,
                loading: true
            }))
        }
        this.audioPlayer.onPause = () => this.pause(true)
    }
    async componentDidMount() {
        let savedStations = []
        const response = await fetch(stationsUrl)
        const json = await response.json()
        if (window.localStorage.getItem('savedStations')) {
            savedStations = JSON.parse(window.localStorage.getItem('savedStations'));
        }
        let stations = this.filterOutBadStations(json);
        console.log(`Total Stations: ${stations.length}`)
        this.setState({
            ...this.state,
            justStarted: (savedStations.length === 0),
            savedStations,
            stations
        })
    }
    filterOutBadStations(stations) {
        return stations.filter((station) => station.streamUrl).filter((station) => {
            return (typeof station.streamUrl === "object" && station.streamUrl.type !== "bad")
                || (typeof station.streamUrl !== "object"
                && station.streamUrl.indexOf('.php') === -1
                && station.streamUrl.indexOf('.html') === -1
                && station.streamUrl.indexOf('http') === 0)
        })
    }
    selectRandomStation = () => {
        console.log('SHUFFLE TIME BAYBEE')
        this.stopCountdown(true)
        this.audioPlayer.setStaticLevel(1);
        this.setState((prevState) => ({
            ...prevState,
            justStarted: false,
            shuffling: true,
            paused: false,
            loading: true
        }))
        let stations = this.state.stations
        let prev = this.state.selectedStation
        if (stations.length === 0) return null
        if (stations.length < 2) return stations[0]
        let selectedStation = stations[Math.floor(Math.random() * stations.length)]
        if (prev && prev === selectedStation) return this.selectRandomStation()
        console.log(`SHUFFLED TO ${selectedStation.callSign}`);
        this.audioPlayer.play(selectedStation.streamUrl)
        this.setState((prevState) => {
            return {
                ...prevState,
                selectedStation
            }
        })
    }
    startCountdown = () => {
        let staticLevel = 0
        let staticTimerStart = this.TIME_TIL_SHUFFLE - this.TIME_OF_STATIC
        if (this.state.switchTimer) clearTimeout(this.state.switchTimer)
        if (this.state.staticTimer) clearTimeout(this.state.staticTimer)
        if (this.state.staticInterval) clearInterval(this.state.staticInterval)
        const staticTimer = setTimeout(() => {
            this.audioPlayer.setStaticLevel(0.01);
            let tracker = 0
            let staticInterval = setInterval(() => {
                tracker += 100
                staticLevel = (tracker / this.TIME_OF_STATIC)
                this.audioPlayer.setStaticLevel(staticLevel);
                this.setState((prevState) => ({
                    ...prevState,
                    staticLevel
                }))
                if (tracker >= this.TIME_OF_STATIC) {
                    clearInterval(staticInterval)
                }
            }, 100)
            this.setState((prevState) => ({
                ...prevState,
                staticInterval
            }))
        }, staticTimerStart);
        const switchTimer = setTimeout(this.selectRandomStation, this.TIME_TIL_SHUFFLE)
        this.setState((prevState) => ({
            ...prevState,
            staticLevel,
            staticTimer,
            switchTimer
        }))
    }
    stopCountdown = (noStaticPause) => {
        clearTimeout(this.state.switchTimer)
        clearTimeout(this.state.staticTimer)
        clearInterval(this.state.staticInterval)
        this.state.switchTimer = null;
        this.state.staticTimer = null;
        this.state.staticInterval = null;
        if (!noStaticPause) this.audioPlayer.setStaticLevel(0);
        this.setState((prevState) => ({
            ...prevState,
            staticLevel: 0,
            switchTimer: null,
            staticTimer: null,
            staticInterval: null
        }))
    }
    toggleLock = () => {
        if (this.state.shuffling) {
            this.stopCountdown()
            this.setState((prevState) => ({
                ...prevState,
                shuffling: false
            }))
        }
        else {
            this.setState((prevState) => ({
                ...prevState,
                shuffling: true
            }))
            this.startCountdown()
        }
    }
    pause = (stateOnly) => {
        this.stopCountdown()
        this.setState((prevState) => ({
            ...prevState,
            paused: true,
        }))
        if (!stateOnly) this.audioPlayer.pause();
    }
    resume = () => {
        console.log(`RESUMING ${this.state.selectedStation.streamUrl}`)
        this.setState((prevState) => ({
            ...prevState,
            paused: false,
        }))
        this.audioPlayer.play(this.state.selectedStation.streamUrl)
    }
    removeFavorite = (index) => {
        const savedStations = this.state.savedStations.slice()
        savedStations[index] = null
        window.localStorage.setItem('savedStations', JSON.stringify(savedStations))
        this.setState((prevState) => ({
            ...prevState,
            savedStations
        }))
    }
    saveStation = (index, callSign) => {
        const savedStations = this.state.savedStations.slice()
        savedStations[index] = callSign
        window.localStorage.setItem('savedStations', JSON.stringify(savedStations))
        this.setState((prevState) => ({
            ...prevState,
            savedStations
        }))
    }
    recallStation = (callSign) => {
        this.stopCountdown()
        let foundStations = this.state.stations.filter((station) => station.callSign === callSign)
        if (foundStations.length > 0) {
            let station = foundStations[0]
            this.audioPlayer.play(station.streamUrl)
            this.setState((prevState) => ({
                ...prevState,
                justStarted: false,
                selectedStation: station,
                shuffling: false
            }))
        }
    }
    render() {
        return <Radio>
            <RadioTitle className="clarendon">TSUCHIBA</RadioTitle>
            <RadioSubTitle className="paralucent">FM STEREO RADIO SYSTEM - BOLBY DIGITAL</RadioSubTitle>
            <TunerControls>
                <TunerBox className="paralucent-condensed">
                    <StationContainer>
                        <SegmentTowerController loading={this.state.loading} staticLevel={this.state.staticLevel}></SegmentTowerController>
                        {this.state.selectedStation && <>
                            <StationText>{this.state.selectedStation.callSign.substring(0, 4)}</StationText>
                            <StationText>{this.state.selectedStation.frequency}</StationText>
                        </>}
                        {!this.state.selectedStation && <>
                            <StationText>TUNE</StationText>
                            <StationText>00.0</StationText>
                        </>}
                    </StationContainer>
                    <Tuner>
                        <FrequencyLine
                            freq={this.state.selectedStation && this.state.selectedStation.frequency}
                            loading={this.state.loading}
                            staticLevel={this.state.staticLevel}
                        ></FrequencyLine>
                    </Tuner>
                </TunerBox>
                <ButtonContainer>
                    {this.state.justStarted && 
                        <ControlSection>
                            <ControlButton onClick={this.selectRandomStation}>Start</ControlButton>
                        </ControlSection>
                    }
                    {!this.state.justStarted && 
                        <ControlSection>
                            <ControlButton onClick={this.selectRandomStation}>Shuffle</ControlButton>
                            <ControlButton onClick={this.toggleLock}><Lamp staticLevel={this.state.staticLevel} shuffling={this.state.shuffling}></Lamp>Lock</ControlButton>
                            {!this.state.paused && <ControlButton onClick={() => this.pause()}>Pause</ControlButton>}
                            {this.state.paused && <ControlButton onClick={this.resume}>Resume</ControlButton>}
                        </ControlSection>
                    }
                    <RadioSubTitle className="paralucent">FAVORITES</RadioSubTitle>
                    <ControlSection>
                        <FavoriteButton
                            index={0}
                            recallStation={this.recallStation}
                            saveStation={this.saveStation}
                            removeFavorite={this.removeFavorite}
                            currentStation={this.state.selectedStation}
                            savedStations={this.state.savedStations}></FavoriteButton>
                        <FavoriteButton
                            index={1}
                            recallStation={this.recallStation}
                            saveStation={this.saveStation}
                            removeFavorite={this.removeFavorite}
                            currentStation={this.state.selectedStation}
                            savedStations={this.state.savedStations}></FavoriteButton>
                        <FavoriteButton
                            index={2}
                            recallStation={this.recallStation}
                            saveStation={this.saveStation}
                            removeFavorite={this.removeFavorite}
                            currentStation={this.state.selectedStation}
                            savedStations={this.state.savedStations}></FavoriteButton>
                        <FavoriteButton
                            index={3}
                            recallStation={this.recallStation}
                            saveStation={this.saveStation}
                            removeFavorite={this.removeFavorite}
                            currentStation={this.state.selectedStation}
                            savedStations={this.state.savedStations}></FavoriteButton>
                    </ControlSection>
                    <ControlSection>
                        <DonateLink target="_blank" rel="noreferrer noopener" href="https://cash.app/$satsukitv"><img alt="Donate" src="https://img.shields.io/badge/Donate-It's%20nice-green?style=social&logo=cash%20app"></img></DonateLink>
                    </ControlSection>
                </ButtonContainer>
            </TunerControls>
        </Radio>
    }
}

export default InternetRadioApp;