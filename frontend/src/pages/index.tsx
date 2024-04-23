import react, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from 'next/image';
import { FloatButton, Grid, Layout, Space, Typography, Row, Col } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
// import BasicCard from "@/components/basic-card";
import HomeCardList from "@/components/home-card-list";
import ThemeContext from '@/contexts/theme';
import { MessageContext } from '@/contexts/message';
import { getShownPages } from '@/services/pages';
import { PageEntry } from '@/models/page';
import BgLight from '../../assets/bg-light.png';
import BgDark from '../../assets/bg-dark.png';

const { useBreakpoint } = Grid;
const { Header, Footer, Content, Sider } = Layout;

export default function HomePage() {
  const screens = useBreakpoint();
  const message = useContext(MessageContext);
  const themeCtx = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>SJMC Landing Page</title>
      </Head>
      <Layout className="lp-layout">
        {!screens.lg && /* For mobile devices */
          <><Header className="layout-header">
            <Image src={themeCtx.userTheme === 'light' ? BgLight : BgDark} 
              alt="Background" unoptimized layout="fill" objectFit="cover"
            />
          </Header>
          <Content className="layout-content">
            <HomeCardList/>
          </Content></>
        }
        {screens.lg && /* For desktop devices */
          <Layout>
            <Sider width="60%">
              <Image src={themeCtx.userTheme === 'light' ? BgLight : BgDark} 
              alt="Background" unoptimized layout="fill" objectFit="cover"
            />
            </Sider>
            <Content className="layout-content-desktop">
              <HomeCardList/>
            </Content>
          </Layout>
        }
        <Footer className="layout-footer">
            上海交通大学 Minecraft 社 | 沪ICP备05052060号-7
        </Footer>
      </Layout>
      <FloatButton
        shape="square"
        style={{ right: 24 }}
        onClick={() => {themeCtx.changeTheme(themeCtx.userTheme === 'light' ? 'dark' : 'light')}}
        icon = {themeCtx.userTheme === 'light' ? <MoonOutlined /> : <SunOutlined />}
      />
    </>
  );
}
