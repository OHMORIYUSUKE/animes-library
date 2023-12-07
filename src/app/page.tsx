"use client";
import React, { useEffect, useState } from "react";
import {
  FileImageOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Card,
  Drawer,
  Input,
  Select,
  SelectProps,
  Row,
  Col,
  Spin,
  AutoComplete,
  Modal,
  Space,
} from "antd";
import { trpc } from "./utils/trpc";
import { string, z } from "zod";
import { Anime } from "@prisma/client";
import { AnimeCard } from "./component/card";

const { Header, Footer, Content } = Layout;

const { Meta } = Card;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [value, setValue] = useState("");

  const animeList = trpc.getAnimeList.useQuery({
    title: value,
    cool: null,
    sex: null,
    year: null,
    productCompanies: null,
  }).data;

  return (
    <Layout>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            textAlign: "center",
          }}
        >
          <AutoComplete
            value={value}
            options={
              trpc.getAnimeNameList.useQuery({
                title: value,
              }).data
            }
            style={{ width: "50%" }}
            onChange={(data) => setValue(data)}
            placeholder="🔍 アニメのタイトル"
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Row gutter={[16, 16]}>
            {animeList !== undefined ? (
              animeList.map((anime, i) => (
                <Col className="gutter-row" span={6} key={i}>
                  <AnimeCard anime={anime}></AnimeCard>
                </Col>
              ))
            ) : (
              <>
                <Spin size="large" />
              </>
            )}
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} アニメライブラリー
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
