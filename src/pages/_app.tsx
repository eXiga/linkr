import "@/styles/globals.css";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import type { AppProps, AppType } from "next/app";
import { trpc } from "@/utils/trpc";
import RootLayout from "@/components/RootLayout";

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <RootLayout>{page}</RootLayout>);

  return getLayout(<Component {...pageProps} />);
}) as AppType;

export default trpc.withTRPC(App);
