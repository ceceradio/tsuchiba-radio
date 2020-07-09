import React from 'react';
import SegmentTowerIcon from "./SegmentTowerIcon";

const SegmentTowerController = ({loading, staticLevel}) => {
    let start = 4
    let end = 4
    if (staticLevel > 0) {
        if (staticLevel <= 1) {
            start = 0
            end = 1
        }
        if (staticLevel < 0.75) {
            start = 1
            end = 2
        }
        if (staticLevel < 0.5) {
            start = 2
            end = 3
        }
        if (staticLevel < 0.25) {
            start = 3
            end = 4
        }
    }
    if (loading) {
        start = 0
        end = 4
    }
    return <SegmentTowerIcon start={start} end={end}></SegmentTowerIcon>
}
export default SegmentTowerController;