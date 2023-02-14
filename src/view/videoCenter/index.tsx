import "./index.css";
import { Button, Input } from "antd";
import { Header } from "../../components/header";
import { TopMenu } from "../../components/topMenu";
import { useEffect, useState } from "react";
import * as videoAPI from "../../net/videoAPI";
import { getDateString, getIntRandom, randomColor } from "../../common/utils";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading";

export type Video = {
  id: string;
  name: string;
  user: {
    account: string;
    img: string;
    name: string;
  };
  createTime: number;
  bgi: string;
};

export function VideoCenter() {
  const [videoList, setList] = useState<Video[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoList === null) {
      videoAPI.searchVideo("").then((res) => {
        if (videoList === null) {
          setList(
            res.videos.map((item: any) => {
              let deg = getIntRandom(0, 180);
              let c1 = randomColor(180, 220);
              let c2 = randomColor(180, 220);
              return {
                id: item.id,
                name: item.name,
                user: {
                  account: item.account,
                  img: item.user.img,
                  name: item.user.username,
                },
                createTime: parseInt(item.createTime),
                bgi: `linear-gradient(${deg}deg, ${c1}, ${c2})`,
              };
            })
          );
        }
      });
    }
  }, []);

  return (
    <div className="videoCenter">
      <Header
        content={
          <div className="topMenu">
            <TopMenu></TopMenu>
          </div>
        }
      ></Header>
      <div className="videoCenterContent">
        <div className="left">
          <div className="search">
            <Input.Search></Input.Search>
          </div>
          <div className="all">
            <Button type="text">全部录像</Button>
          </div>
          <div className="mine">
            <Button type="text">我的录像</Button>
          </div>
          <div className="blank"></div>
        </div>
        <div className="right">
          <VideoList list={videoList}></VideoList>
        </div>
      </div>
    </div>
  );
}

function VideoList(props: { list: Video[] | null }) {
  let videos = props.list;
  const navigate = useNavigate();
  return videos ? (
    <div className="videoList">
      {videos.map((item) => {
        return (
          <div
            className="video"
            key={item.id}
            style={{
              backgroundImage: item.bgi,
            }}
          >
            <div className="name">{item.name}</div>
            <div className="control">
              <div className="btns">
                <Button
                  shape="circle"
                  size="large"
                  icon={<EditOutlined />}
                  onClick={() => {
                    navigate(`/videoPlay?id=${item.id}`);
                  }}
                ></Button>
                <Button
                  shape="circle"
                  size="large"
                  icon={<DownloadOutlined />}
                ></Button>
                <Button
                  shape="circle"
                  size="large"
                  icon={<DeleteOutlined />}
                ></Button>
              </div>
            </div>
            <div className="user">
              <div
                className="img"
                style={{ backgroundImage: `url(${item.user.img})` }}
              ></div>
            </div>
            <div className="time">
              创建时间：{getDateString(item.createTime)}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <Loading></Loading>
  );
}
