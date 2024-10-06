// /pages/index.js

import { Container, Text, Paper, Group, Title } from '@mantine/core';
import AudioUpload from '../components/AudioUpload';

export default function Home() {
  return (
    <Container>
      {/* Navigation Bar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0' }}>
        <div className="tools">
          <a href="#" className="active">Remover</a>
          <a href="#">Splitter</a>
          <a href="#">Pitcher</a>
          <a href="#">Key BPM Finder</a>
          <a href="/" className="active">Cutter</a>
          <a href="#">Joiner</a>
          <a href="#">Recorder</a>
          <a href="#">Karaoke</a>
        </div>
      </nav>

      <Title align="center" order={1} style={{ margin: '2rem 0' }}>
        Audio Cutter
      </Title>
      <Text align="center" size="lg" mb="xl">Free editor to trim and cut any audio file online</Text>
      <Group position="center">
        <AudioUpload />


        {/* Information Section */}
        <Paper withBorder p="lg" mt="lg" shadow="sm">
          <Title order={2}>How to cut audio</Title>
          <Text>
            This app can be used to trim and/or cut audio tracks, remove an audio fragment, and fade in and out your music.
            It’s fast and easy to use. You can save the audio file in any format (codec parameters can be configured).
            The tool works directly in the browser, so there’s no need to install any software, and it's available on mobile devices too.
          </Text>

          <Text>This is a serverless app. Your files do not leave your device.</Text>
        </Paper>
      </Group>
    </Container>
  );
}
