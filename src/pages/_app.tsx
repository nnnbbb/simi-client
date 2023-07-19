import { Layout as AntdLayout, Menu } from 'antd';
import type { AppProps } from 'next/app';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode
}
const { Header, Content, Footer } = AntdLayout;

const Layout = ({ children }: LayoutProps) => (
  <div className="layout">{children}</div>
)

export default function App({ Component, pageProps }: AppProps) {

  return (
    <AntdLayout>

      <Header style={{ display: 'flex', alignItems: 'center', background: '#fff' }}>
        <Menu
          theme="light"
          mode="horizontal"
          items={[
            {
              key: "/home",
              label: <Link href="/home">Home</Link>,
            },
            {
              key: "/record",
              label: <Link href="/record">Record</Link>,
            },
          ]}
        />
      </Header>
      {/* <Content className={styles.content}> */}

      <Component {...pageProps} />
      {/* </Content> */}

      {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
    </AntdLayout>
  )
}
