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
  Descriptions,
  Badge,
  Typography,
} from "antd";
import { Image } from "antd";
import { z } from "zod";
import { Anime } from "@prisma/client";
import Meta from "antd/es/card/Meta";
import { SerializeObject } from "@trpc/server/shared";

const { Title, Paragraph, Text, Link } = Typography;

type AnimeCard = {
  anime: SerializeObject<Anime>;
};

export const getSeasonByNumber = (num: number): string => {
  if (num === 1) return "冬";
  if (num === 2) return "春";
  if (num === 3) return "夏";
  if (num === 4) return "秋";
  throw new Error("");
};

export const AnimeCard: React.FC<AnimeCard> = ({ anime }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title={anime.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={null}
      >
        <div style={{ marginBottom: "20px" }}>
          <Image
            alt={anime.title}
            width={"100%"}
            src={
              anime.ogp_image_url ? anime.ogp_image_url : "/images/no-image.png"
            }
          />
        </div>
        <Descriptions bordered>
          <Descriptions.Item label="タイトル" span={2}>
            {anime.title}
          </Descriptions.Item>
          <Descriptions.Item label="略称" span={1}>
            {anime.title_short1}
          </Descriptions.Item>
          <Descriptions.Item label="英語タイトル" span={3}>
            {anime.title_en}
          </Descriptions.Item>
          <Descriptions.Item label="説明" span={3}>
            {anime.ogp_description}
          </Descriptions.Item>
          <Descriptions.Item label="放送年" span={2}>
            {anime.year}
          </Descriptions.Item>
          <Descriptions.Item label="放送時期" span={1}>
            {getSeasonByNumber(anime.cool)}
          </Descriptions.Item>
          <Descriptions.Item label="制作" span={1}>
            {anime.product_companies ? anime.product_companies : "不明"}
          </Descriptions.Item>
          <Descriptions.Item label="シリーズ" span={1}>
            {anime.sequel !== 0 ? anime.sequel : "なし"}
          </Descriptions.Item>
          <Descriptions.Item label="性別" span={1}>
            {anime.sex === 0 ? "男性向け" : "女性向け"}
          </Descriptions.Item>
          <Descriptions.Item label="公式サイト" span={3}>
            <Link href={anime.public_url}>{anime.public_url}</Link>
          </Descriptions.Item>
          <Descriptions.Item label="公式Twitter" span={1}>
            <Link href={`https://twitter.com/${anime.twitter_account}`}>
              {anime.twitter_account}
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label="Twitterハッシュタグ" span={3}>
            <Link
              href={`https://twitter.com/hashtag/${anime.twitter_hash_tag}`}
            >
              {anime.twitter_hash_tag}
            </Link>
          </Descriptions.Item>
        </Descriptions>
      </Modal>
      <Card
        onClick={showModal}
        hoverable={true}
        cover={
          <Image
            preview={false}
            alt={anime.title}
            src={
              anime.ogp_image_url ? anime.ogp_image_url : "/images/no-image.png"
            }
          />
        }
      >
        <Meta title={anime.title} />
      </Card>
    </>
  );
};
