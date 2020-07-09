import React, {useState, useEffect, memo, useRef} from 'react'

const SegmentTowerIcon = memo(({start, end}) => {
    const [segmentCount, setSegmentCount] = useState(0);
    const startRef = useRef();
    const endRef = useRef();
    startRef.current = start;
    endRef.current = end;
    useEffect(() => {
        console.log('Created Interval for Segment Tower');
        const timeout = setInterval(() => {
            if (startRef.current == endRef.current) return setSegmentCount(() => endRef.current);
            setSegmentCount((segmentCount) => (segmentCount >= endRef.current)?startRef.current:segmentCount+1);
        }, 420);
        return () => setInterval(timeout);
    }, [])
    const segmentColor = (stage) => {
        if (segmentCount >= stage) return '#39EE8C';
        return '#333';
    }
    return <svg id="25ccfd7f-7d00-4dc6-9e44-1a8882e29649" data-name="Layer 1" viewBox="0 0 107.17 143.84">
    <defs>
      <clipPath id="87bf89c4-09f6-481a-a651-502c818911a5" transform="translate(-11.34 -9.24)">
        <path d="M37.84,26.26v81.16H92V26.26Zm27,43.33a20,20,0,1,1,20-20A20,20,0,0,1,64.84,69.59Z" fill="none"/>
      </clipPath>
    </defs>
    <title>Untitled-1</title>
    <g>
      <path d="M31,14.4a50,50,0,0,0,0,70.71" transform="translate(-11.34 -9.24)" fill="none" stroke={segmentColor(4)} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10"/>
      <path d="M98.85,14.24a50,50,0,0,1,0,70.71" transform="translate(-11.34 -9.24)" fill="none" stroke={segmentColor(4)} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10"/>
    </g>
    <g>
      <path d="M45.77,36.2a20,20,0,0,0,0,28.28" transform="translate(-11.34 -9.24)" fill="none" stroke={segmentColor(3)} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10"/>
      <path d="M84.07,36a20,20,0,0,1,0,28.28" transform="translate(-11.34 -9.24)" fill="none" stroke={segmentColor(3)} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10"/>
    </g>
    <g>
      <g clipPath="url(#87bf89c4-09f6-481a-a651-502c818911a5)">
        <line x1="53.5" y1="40.36" x2="44.82" y2="89.6" stroke={segmentColor(2)} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10"/>
        <line x1="53.5" y1="40.36" x2="62.18" y2="89.6" stroke={segmentColor(2)} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10"/>
      </g>
      <circle cx="53.5" cy="40.52" r="10" fill={segmentColor(2)}/>
    </g>
    <g>
      <line x1="62.18" y1="89.6" x2="70.87" y2="138.84" stroke={segmentColor(1)} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10"/>
      <line x1="44.82" y1="89.6" x2="36.14" y2="138.84" stroke={segmentColor(1)} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10"/>
      <line x1="40.48" y1="114.22" x2="66.53" y2="114.22" stroke={segmentColor(1)} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10"/>
      <line x1="44.82" y1="89.6" x2="62.18" y2="89.6" stroke={segmentColor(1)} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10"/>
    </g>
  </svg>
})

export default SegmentTowerIcon;