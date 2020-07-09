import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const StationText = styled.h3`
    color: #39EE8C;
    margin: 0;
    line-height: 1;
    font-weight: 400;
    font-size: 30px;
    font-family: t26-carbon, monospace;
`;

const ButtonCombiner = styled.div`
    display: flex;
    width: 100%;
    button:last-child {
        width: 40px;
        border-left: none;
    }
`

const FavoriteButtonStyle = styled(Button)`
  height: 46px;
`;


const FavoriteButton = ({index, currentStation, recallStation, saveStation, savedStations, removeFavorite}) => {
    return <>
        {!savedStations[index] && <FavoriteButtonStyle onClick={() => saveStation(index, currentStation.callSign)}><StationText>FAV{index+1}</StationText></FavoriteButtonStyle>}
        {savedStations[index] && <ButtonCombiner>
            <FavoriteButtonStyle onClick={() => recallStation(savedStations[index])}><StationText>{savedStations[index].substring(0,4)}</StationText></FavoriteButtonStyle>
            <FavoriteButtonStyle aria-label={`Remove Favorite ${index+1}`} onClick={() => removeFavorite(index)}><StationText>X</StationText></FavoriteButtonStyle>
        </ButtonCombiner>}
    </>
}

export default FavoriteButton;