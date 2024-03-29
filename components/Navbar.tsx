import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch, BiUser } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { BsGear } from "react-icons/bs";

import { createOrGetUser } from "../utils";
import logo from "../utils/vidtok-logo.png";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import GoogleAuth from "./GoogleAuth";

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [profileDropdown, setProfileDropdown] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const wrapperRef = useRef(null);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    } else {
      router.push(`/`);
    }
  };

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setProfileDropdown(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="border-b border-gray-200 h-[7vh] flex" ref={wrapperRef}>
      <div className="w-full flex justify-between items-center py-2 px-4 xl:w-[1200px] m-auto">
        <Link href="/">
          <div className="w-[100px] md:w-[130px]">
            <Image
              src={logo}
              className=" cursor-pointer"
              alt="logo"
              layout="responsive"
            />
          </div>
        </Link>
        {/* Search */}
        <div className="relative hidden md:block ">
          <form
            onSubmit={handleSearch}
            className="absolute md:static top-10 -left-20 bg-white"
          >
            <input
              type="text"
              value={searchValue}
              placeholder="Search accounts"
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-primary p-2 md:text-md font-small border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-200 w-[300px] md:w-[350px] rounded-full md:top-0 pl-5"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="absolute md:right-5 right-6 top-[10px] border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
            >
              <BiSearch />
            </button>
          </form>
        </div>
        {/* End of search*/}
        <div>
          {userProfile ? (
            <div className="flex gap-5 md:gap-10">
              <Link href="/upload">
                <button className="border px-2 md:px-4 text-md font-semibold flex items-center gap-2 hover:bg-gray-100">
                  <IoMdAdd className="text-xl" />{" "}
                  <span className="hidden md:block">Upload</span>
                </button>
              </Link>
              {userProfile.image && (
                <div onClick={() => setProfileDropdown((prev) => !prev)}>
                  <>
                    <Image
                      src={userProfile.image}
                      width={40}
                      height={40}
                      className="rounded-full cursor-pointer"
                      alt="profile photo"
                    />
                  </>
                </div>
              )}
              {profileDropdown && (
                <div
                  className="flex flex-col absolute bg-white drop-shadow-lg w-48 top-16 right-auto items-start justify-center p-2 rounded-md font-semibold z-10"
                  onClick={() => setProfileDropdown(false)}
                >
                  <Link href={`/profile/${userProfile?._id}`}>
                    <div className="flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-100 w-full">
                      <BiUser className="text-xl" />
                      <p className="">View Profile</p>
                    </div>
                  </Link>
                  <Link href="/">
                    <div className="flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-100 w-full">
                      <BsGear className="text-xl" />
                      <p className="">Settings</p>
                    </div>
                  </Link>

                  <div className="border-t w-full">
                    <div
                      className="hover:bg-gray-100 w-full p-2 flex gap-2 cursor-pointer"
                      onClick={() => {
                        googleLogout();
                        removeUser();
                        setProfileDropdown(false);
                      }}
                    >
                      <AiOutlineLogout fontSize={21} />
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <GoogleAuth />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
