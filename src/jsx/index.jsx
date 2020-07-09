import React from 'react';
import ReactDOM from 'react-dom';
import InternetRadioApp from './InternetRadioApp';

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('app')) {
        ReactDOM.render(
            <InternetRadioApp />,
            document.getElementById('app')
        )
    }
})
