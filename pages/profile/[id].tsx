import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsCheckCircleFill } from "react-icons/bs";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const profile = ({ data }: IProps) => {
  return <div>profile</div>;
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/profile/${id}`);

  return {
    props: { data: res.data },
  };
};

export default profile;