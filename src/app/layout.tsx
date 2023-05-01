"use client";
import { Inter } from "next/font/google";
import { trpc } from "./utils/trpc";

const inter = Inter({ subsets: ["latin"] });

const Meta = ({
  title = "アニメライブラリ",
  description = "アニメライブラリ アニメの情報を検索できます",
}) => {
  return (
    <>
      <head>
        <title>{title}</title>

        <meta property="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </head>
    </>
  );
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <Meta />
      <body className={inter.className} style={{ padding: 0, margin: 0 }}>
        {children}
      </body>
    </html>
  );
};

export default trpc.withTRPC(RootLayout);
