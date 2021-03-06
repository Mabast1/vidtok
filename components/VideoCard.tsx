import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsCheckCircleFill,
} from "react-icons/bs";

import { Video } from "../types";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  return (
    <div className="flex flex-col border-b border-gray-200 pb-6 pt-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="ml-4 md:w-14 md:h-14 w-12 h-12">
            <Link href={`/profile/${post.postedBy?._id}`}>
              <>
                <Image
                  src={post.postedBy.image}
                  width={62}
                  height={62}
                  className="rounded-full"
                  alt="profile photo"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy?._id}`}>
              <div className="flex flex-col mt-3">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary lowercase">
                  {post.postedBy.userName.replaceAll(" ", "")}
                  <BsCheckCircleFill className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 flex-gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <p className="px-3 pb-4 text-gray-600">{post.caption}</p>
          <p>{post.topic}</p>
          <Link href={`/detail/${post._id}`}>
            <video
              src={post.video.asset.url}
              loop
              ref={videoRef}
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            ></video>
          </Link>
          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-10 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-3xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-3xl lg:text-4xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-black text-3xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-black text-3xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
