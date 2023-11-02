import { Layout as AntdLayout, Menu } from 'antd';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

interface LayoutProps {
  children: React.ReactNode;
}
const { Header, Content, Footer } = AntdLayout;

const Layout = ({ children }: LayoutProps) => (
  <div className="layout">{children}</div>
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AntdLayout>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>

      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          background: '#fff',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
        }}
      >
        <Menu
          theme="light"
          mode="horizontal"
          style={{ width: '100%' }}
          items={[
            {
              key: '/home',
              label: <Link href="/home">Home</Link>,
            },
            {
              key: '/record',
              label: <Link href="/record">Record</Link>,
            },
            {
              key: '/memory',
              label: <Link href="/memory">Memory</Link>,
            },
          ]}
        />
      </Header>
      {/* <Content className={styles.content}> */}

      <div
        style={{
          paddingTop: 64,
          overflowY: 'auto',
          height: 'calc(100vh-64px)',
        }}
      >
        <Component {...pageProps} />
      </div>
      {/* </Content> */}

      {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
    </AntdLayout>
  );
}
