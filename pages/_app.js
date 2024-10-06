// /pages/_app.js

import { MantineProvider } from '@mantine/core'; // Import MantineProvider
import Layout from '../components/Layout'; // Import your global Layout

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}

export default MyApp;
