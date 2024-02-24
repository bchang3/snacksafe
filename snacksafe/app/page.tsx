"use client"
import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@supabase/supabase-js";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import React, { useState } from "react";

export default async function Index() {
  const [loggedIn, setLoggedIn] = useState(false)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      return user;
  }
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setLoggedIn(true)
        }

        // Do something with the user data
      } catch(error) {
        console.log("error")
      }
    }
      fetchData();
  }, [])
  // const canInitSupabaseClient = () => {
  //   // This function is just for the interactive tutorial.
  //   // Feel free to remove it once you have Supabase connected.
  //   try {
  //     createClient();
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // };

  // const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex  justify-center h-96 w-96 text-white bg-moss_green rounded-lg text-4xl font-grotesk-bold">
        <div className="mt-4">Snacksafe</div>
      </div>
    </div>
  );
}
