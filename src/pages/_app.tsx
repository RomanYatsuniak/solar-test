import { wrapper } from '@/redux/store';
import '@/styles/globals.css';
import { Container } from '@mui/material';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}

export default wrapper.withRedux(App);
