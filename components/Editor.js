// /components/Editor.js
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';

import { Button } from '@mantine/core';

export default function Editor() {
    const router = useRouter();
    const { audioUrl } = router.query;
    const waveformRef = useRef(null);
    const [wavesurfer, setWavesurfer] = useState(null);
    const [region, setRegion] = useState(null); // Store the region for cutting

    useEffect(() => {
        if (audioUrl && !wavesurfer) {
            const ws = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#ddd',
                progressColor: '#4f8a8b',
                plugins: [
                    RegionsPlugin.create({
                        dragSelection: true, // Allow region dragging
                    }),
                ],
            });

            ws.load(audioUrl);

            // When region is created, store it in state
            ws.on('region-created', (newRegion) => {
                setRegion(newRegion);
            });

            setWavesurfer(ws);
        }

        // Cleanup on unmount
        return () => {
            if (wavesurfer) {
                wavesurfer.destroy();
            }
        };
    }, [audioUrl, wavesurfer]);

    // Cutting logic
    const handleCut = () => {
        if (region && wavesurfer) {
            const start = region.start;
            const end = region.end;

            // Remove the selected region
            region.remove();

            // Update the audio buffer
            const buffer = wavesurfer.backend.buffer;
            const duration = buffer.duration;

            // Get the buffer data before and after the region
            const beforeCut = buffer.getChannelData(0).slice(0, Math.floor(start * buffer.sampleRate));
            const afterCut = buffer.getChannelData(0).slice(Math.floor(end * buffer.sampleRate));

            // Concatenate the two parts (before and after the cut)
            const newAudioData = new Float32Array(beforeCut.length + afterCut.length);
            newAudioData.set(beforeCut);
            newAudioData.set(afterCut, beforeCut.length);

            // Create a new buffer and replace the existing buffer
            const newBuffer = wavesurfer.backend.ac.createBuffer(1, newAudioData.length, buffer.sampleRate);
            newBuffer.copyToChannel(newAudioData, 0, 0);

            // Load the updated buffer back into wavesurfer
            wavesurfer.loadDecodedBuffer(newBuffer);
        }
    };

    return (
        <div>
            <div ref={waveformRef}></div>
            <Button onClick={handleCut()} style={{ marginTop: '1rem' }}>
                Cut Audio
            </Button>
        </div>
    );
}
