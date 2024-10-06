// /components/AudioUpload.js
import { useState } from 'react';
import { FileInput, Button, Group, Container } from '@mantine/core';
import { useRouter } from 'next/router';

export default function AudioUpload() {
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleFileChange = (event) => {
    setFile(event);
  };

  const handleProcessAudio = () => {
    if (file) {
      const audioUrl = URL.createObjectURL(file); // Create URL for the file
      router.push({
        pathname: '/editor',
        query: { audioUrl } // Passing audioUrl as a query parameter
      });
    }
  };

  return (
    <Container>
      <FileInput
        placeholder="Browse your audio file"
        value={file}
        onChange={handleFileChange}
        accept="audio/*"
      />
      {file && (
        <Group position="center" style={{ marginTop: '1rem' }}>
          <Button color="blue" onClick={handleProcessAudio}>
            Process Audio
          </Button>
        </Group>
      )}
    </Container>
  );
}
