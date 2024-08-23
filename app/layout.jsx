"use client";

import Navbar from "../Components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import Footer from "../Components/Footer";
import NProgress from "nprogress";
import Router from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  NProgress.configure({showSpinner:false})

  Router.events.on('routerChangeStart',()=>{
    NProgress.start();
  });

  Router.events.on('routerChangeComplete',()=>{
    NProgress.done();
  });
  return (
    <html lang="en">
      <head>
      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==' crossOrigin='anonymous' referrerPolicy='no-referrer' />
      </head>
      <body className={inter.className}>
        <ChakraProvider>
          <header><Navbar /></header>
          {children}
          <footer><Footer/></footer>
        </ChakraProvider>
      </body>
    </html>
  );
}
