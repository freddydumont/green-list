import App from 'next/app';
import { ThemeProvider, Styled, ColorMode } from 'theme-ui';
import { Container } from '@theme-ui/components';
import NProgress from 'next-nprogress-emotion';
import 'tailwindcss/dist/base.css';

import Header from '../components/Header';
import theme from '../theme';

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <ColorMode />
        <Header />
        <NProgress />
        <Styled.root>
          <Container
            sx={{
              position: 'relative',
              minHeight: 'calc(100vh - 72px)',
            }}
          >
            <Component {...pageProps} />
          </Container>
        </Styled.root>
      </ThemeProvider>
    );
  }
}

export default MyApp;
