import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../lib/theme";
import type { EmotionCache } from "@emotion/cache";
import createEmotionCache from "../lib/create-emotion-cache";
import { CacheProvider } from "@emotion/react";
import TableProvider from "../contexts/pages/table.context";
import ConfirmProvider from "../contexts/components/confirm.context";
import Header from "../components/header";
import Navbar from "../components/navBar";
import SettingsProvider from "../contexts/pages/settings/settings.context";
import RedirectProvider from "../contexts/redirect.context";
import AuthProvider from "../contexts/components/auth.context";
import ManageProvider from "../contexts/pages/management/manage.context";
import DialogProvider from "../contexts/components/dialog.context";
import AdminProvider from "../contexts/pages/management/admin.context";
import { useRouter } from "next/router";
import SheetsProvider from "../contexts/components/sheets.context";
import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

export default function MyApp(props: MyAppProps) {
  const pathname = useRouter().pathname;
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;
  // console.log(pathname);
  if (pathname !== "/home") {
    return (
      <CacheProvider value={emotionCache}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <ThemeProvider theme={theme}>
          <TableProvider>
            <ConfirmProvider>
              <ManageProvider>
                <DialogProvider>
                  <AdminProvider>
                    <AuthProvider>
                      <RedirectProvider>
                        <SettingsProvider>
                          <Header />
                          <CssBaseline />
                          <Component {...pageProps} />
                          <Navbar />
                        </SettingsProvider>
                      </RedirectProvider>
                    </AuthProvider>
                  </AdminProvider>
                </DialogProvider>
              </ManageProvider>
            </ConfirmProvider>
          </TableProvider>
        </ThemeProvider>
      </CacheProvider>
    );
  }
  return (
    <>
      <Head>
        <title>Church Table</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TableProvider>
        <ConfirmProvider>
          <SheetsProvider>
            <AuthProvider>
              <Header />
              <Component {...pageProps} />
            </AuthProvider>
          </SheetsProvider>
        </ConfirmProvider>
      </TableProvider>
    </>
  );
}
