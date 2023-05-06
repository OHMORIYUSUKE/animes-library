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
} from "antd";
import { trpc } from "./utils/trpc";
import { z } from "zod";
import { Anime } from "@prisma/client";

const { Header, Footer, Content } = Layout;

const { Meta } = Card;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState("");

  const animeList = trpc.getAnimeList.useQuery({
    title: value,
    cool: null,
    sex: null,
    year: null,
    productCompanies: null,
  }).data;

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };

  const [recommends, setRecommends] = useState<{ value: string }[]>([]);

  useEffect(() => {
    const anime = animeList?.map((data) => {
      return { value: data.title };
    })
      ? animeList?.map((data) => {
          return { value: data.title };
        })
      : [];
    setRecommends(anime);
  }, [animeList]);

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
          }}
        >
          <Button
            type="text"
            icon={<SearchOutlined />}
            onClick={showDrawer}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
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
          <Drawer
            title={"検索"}
            placement={"left"}
            onClose={onClose}
            open={open}
          >
            <AutoComplete
              value={value}
              options={recommends}
              style={{ width: "100%" }}
              onSelect={onSelect}
              onSearch={() => setRecommends(recommends)}
              onChange={(data) => setValue(data)}
              placeholder="アニメのタイトル"
            />
            <p>{animeList?.length}件</p>
          </Drawer>
          <Row gutter={[16, 16]}>
            {animeList !== undefined ? (
              animeList.map((anime, i) => (
                <Col className="gutter-row" span={6} key={i}>
                  <Card
                    hoverable={true}
                    cover={
                      <img
                        alt={anime.title}
                        src={
                          anime.ogp_image_url
                            ? anime.ogp_image_url
                            : "/images/no-image.png"
                        }
                      />
                    }
                  >
                    <Meta
                      title={anime.title}
                      description={anime.product_companies}
                    />
                  </Card>
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
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
