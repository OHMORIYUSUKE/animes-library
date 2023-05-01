"use client";
import React, { useState } from "react";
import {
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
} from "antd";

const { Header, Footer, Content } = Layout;

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const { Meta } = Card;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
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
            <Input.Search size="large" placeholder="input here" enterButton />
            <div style={{ margin: 20 }}></div>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              defaultValue={["a10", "c12"]}
              onChange={handleChange}
              options={options}
              size={"large"}
            />
          </Drawer>
          <Row gutter={[16, 16]}>
            {[...Array(16)].map((_, i) => (
              <Col className="gutter-row" span={6} key={i}>
                <Card
                  hoverable={true}
                  cover={
                    <img
                      alt="Europe Street beat"
                      src="https://otonari-anime.com/ogp.png?0127"
                    />
                  }
                >
                  <Meta
                    title="Europe Street beat"
                    description="www.instagram.com"
                  />
                </Card>
              </Col>
            ))}
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
