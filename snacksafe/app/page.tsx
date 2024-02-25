"use client";

import Header from "@/components/Header";
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { supabase } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import RestaurantCard from "@/components/RestaurantCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CopyIcon } from "lucide-react";
import { Input } from "postcss";
interface Restaurant {
  restaurantName: string;
  restaurantImage: string;
  distance: string;
  safety: number;
  rating: number;
}
export default function Index() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [profileData, setProfileData] = useState<any>();
  const RestaurantData: Restaurant[] = [
    {
      restaurantName: "Lao Szechuan",
      restaurantImage:
        "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_300,q_100,fl_lossy,dpr_2.0,c_fit,f_auto,h_300/dylnzqqelzndrukmpwqi",
      distance: "1.0mi",
      safety: 0,
      rating: 3,
    },
    {
      restaurantName: "Shawarma Joint",
      restaurantImage:
        "https://popmenucloud.com/eydxgclt/0a14d4b9-94e1-4682-911c-2dcbffb64335.png",
      distance: "2.0mi",
      safety: 3,
      rating: 3,
    },
    {
      restaurantName: "Teamoji",
      restaurantImage:
        "https://lh3.googleusercontent.com/p/AF1QipM9JR4QVjRkF0yPSZ_owZft69EGePUeeIzlC34f=w768-h768-n-o-v1",
      distance: "0.2mi",
      safety: 3,
      rating: 3,
    },
    {
      restaurantName: "Brewlab Coffee",
      restaurantImage:
        "data:image/jpeg;base64,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",
      distance: "0.4mi",
      safety: 3,
      rating: 2,
    },
  ];

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
          if (profile) {
            setProfileData(() => {
              return profile;
            });
          } else {
            console.log(profileData);
            setLoggedIn(false);
          }

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
        <div className="flex justify-center h-full w-full text-beige bg-moss_green">
          <div className="flex flex-col justify-center">
            <div className="flex justify-center mt-4  text-4xl font-grotesk-bold">
              Snacksafe
            </div>
            <div>
              {RestaurantData.map((restaurant) => (
                <div>
                <Dialog>
                <DialogTrigger className=""><RestaurantCard
                  key={restaurant.restaurantName}
                  restaurantName={restaurant.restaurantName}
                  distance={restaurant.distance}
                  restaurantImage={restaurant.restaurantImage}
                  safety={restaurant.safety}
                  rating={restaurant.rating}
                ></RestaurantCard></DialogTrigger>
                <DialogContent className="w-screen h-3/4 bg-beige">
                  <DialogHeader>
                    <DialogTitle className="text-black">Are you absolutely sure?</DialogTitle>
                    <DialogDescription className="text-black">
                      This action cannot be undone. This will permanently delete your
                      account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              </div>
                
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
