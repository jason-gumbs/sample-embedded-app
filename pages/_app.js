import App from 'next/app';
import Head from 'next/head';
import {AppProvider} from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import {Provider} from '@shopify/app-bridge-react';
import Cookies from 'js-cookie';
import ClientRouter from '../components/ClientRouter';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';


const client = new ApolloClient({
    fetchOptions: {
        credentials: 'include'
    },
});


class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props;
        const config = {
            apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY,
            shopOrigin: Cookies.get("shopOrigin"),
            forceRedirect: true
        };
        return (
            <React.Fragment>
                <Head>
                    <title>Sample App</title>
                    <meta charSet="utf-8" />
                </Head>
                <Provider config={config}>
                    <ClientRouter />
                    <AppProvider>
                        <ApolloProvider client={client}>
                            <Component {...pageProps} />
                        </ApolloProvider>
                    </AppProvider>
                </Provider>
            </React.Fragment>
        );
    }
}

export default MyApp;