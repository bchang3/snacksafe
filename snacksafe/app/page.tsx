"use client";

import Header from "@/components/Header";
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { supabase } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function Index() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [profileData, setProfileData] = useState<any>();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setUserData(user);
          setLoggedIn(true);
          const userId = user["id"];
          const { data: profile } = await supabase
            .from("profiles")
            .select()
            .eq("id", userId)
            .limit(1)
            .single();
          setProfileData(() => {
            return profile;
          });
          const currentTime = new Date();
          const createdTime = new Date(user.created_at);
          const currentTimeSeconds = Math.floor(currentTime.getTime() / 1000);
          const createdTimeSeconds = Math.floor(createdTime.getTime() / 1000);
          if (currentTimeSeconds - createdTimeSeconds < 10) {
            window.location.href = "/preferences";
          }
        }

        // Do something with the user data
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="h-screen w-full flex flex-col">
      <Header
        loggedin={loggedIn}
        setLoggedIn={setLoggedIn}
        profile={profileData}
      ></Header>
      <div className="flex justify-center items-center pt-12 pb-8">
        <SearchBar />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-center h-fit w-4/5 text-beige bg-moss_green rounded-lg text-4xl font-grotesk-bold">
          <div className="mt-4">Snacksafe</div>
        </div>
      </div>
    </div>
  );
}
