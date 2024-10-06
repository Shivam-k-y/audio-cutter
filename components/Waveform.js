import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

export default function Waveform({ audioUrl }) {
    const waveformRef = useRef(null);

    useEffect(() => {
        if (audioUrl) {
            const wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#ddd',
                progressColor: '#4f8a8b',
            });

            wavesurfer.load(audioUrl);
        }
    }, [audioUrl]);

    return <div ref={waveformRef}></div>;
}
