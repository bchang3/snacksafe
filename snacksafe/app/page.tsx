"use client";

import Header from "@/components/Header";
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { supabase } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import RestaurantCard from "@/components/RestaurantCard";
import { Button } from "@/components/ui/button";
import { LiaStarSolid } from "react-icons/lia";
import { IoShieldCheckmark } from "react-icons/io5";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
interface Review {
  reviewer: string;
  review: string;
  safety: number;
  rating: number;
}
interface Restaurant {
  restaurantName: string;
  restaurantImage: string;
  distance: string;
  safety: number;
  rating: number;
  address: string;
  phone: string;
  description: string;
  reviews: Review[];
}

export default function Index() {
  const handleSubmit = async () => {
    console.log("hi");
  };


  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
  const [profileData, setProfileData] = useState<any>();
  const getColorRating = (num: number, rating: number) => {
    return num <= rating;
  };
  const getColorSafety = (num: number, safety: number) => {
    return num <= safety;
  };
  let RestaurantData: Restaurant[] = []


  React.useEffect(() => {
    const fetchData = async () => {
      const { data: restaurants } = await supabase.from("Restaurants").select();
      let tempRestaurantData: Restaurant[] = []
      if (restaurants) {
        console.log(restaurants)
        restaurants.map((restaurant) => (
          tempRestaurantData.push({restaurantName: restaurant.name, restaurantImage: restaurant.image_url, distance: "0.5mi", safety:3, rating:restaurant.rating, address:restaurant.address, phone:restaurant.phone, description:"test",reviews:[{reviewer:"Claire", review:"good", safety:2, rating: 3}]})
        ))
        console.log(tempRestaurantData);
        setRestaurantData(tempRestaurantData);
        setRestaurants(restaurants);
      }
      
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
      <div className="flex justify-center items-center mt-8 h-full">
        <div className="flex justify-center h-full w-full text-beige bg-moss_green">
          <div className="flex flex-col justify-center">
            <div className="flex justify-center mt-4  text-4xl font-grotesk-bold">
              Snacksafe
            </div>
            <div>
              {restaurantData.map((restaurant) => (
                <div>
                  <Dialog>
                    <DialogTrigger className="">
                      <RestaurantCard
                        key={restaurant.restaurantName}
                        restaurantName={restaurant.restaurantName}
                        distance={restaurant.distance}
                        restaurantImage={restaurant.restaurantImage}
                        safety={restaurant.safety}
                        rating={restaurant.rating}
                      ></RestaurantCard>
                    </DialogTrigger>

                    <DialogContent className="w-full h-5/6 bg-beige rounded-xl">
                      <ScrollArea>
                        <DialogHeader className="rounded-xl">
                          <div className="flex flex-col">
                            <div className="flex flex-row">
                              <DialogTitle className="text-black font-grotesk-bold text-5xl mt-6">
                                {restaurant.restaurantName}
                              </DialogTitle>
                              <div className="flex w-full justify-end">
                                <div className="flex items-center ml-4 h-14 w-14 rounded-xl object-contain">
                                  <img
                                    className="rounded-xl border-black border-1 h-30 w-30"
                                    src={restaurant.restaurantImage}
                                  ></img>
                                </div>
                              </div>
                            </div>
                            <div className="text-sm font-grotesk-regular text-black mt-1">
                              {restaurant.address}
                            </div>
                            <div className="text-xs font-grotesk-regular text-black mt-1">
                              {restaurant.phone}
                            </div>
                          </div>
                          <DialogDescription className="text-black mt-8 font-grotesk-regular text-lg">
                            <div className="mt-4">
                              {restaurant.description}{" "}
                              <a
                                href={"https://laoszechuanusa.com/menu/"}
                                className="text-moss_green-secondary"
                              >
                                SEE MENU
                              </a>
                            </div>
                          </DialogDescription>
                          <div className="flex justify-center mt-6">
                            <ScrollArea className="text-justify h-36 w-5/6 border-black text-black rounded-md border-2 p-2 mt-4">
                              {restaurant.reviews.map((review) => (
                                <>
                                  <div
                                    key={review.reviewer}
                                    className="text-sm"
                                  >
                                    <div className="font-grotesk-bold">
                                      {review.reviewer}:
                                    </div>
                                    <div className="flex flex-row">
                                      <div className="font-grotesk-regular">
                                        {review.review}
                                      </div>
                                      <div className="flex w-full items-center justify-end">
                                        <div className="flex flex-col">
                                          <div className="flex flex-row">
                                            <IoShieldCheckmark
                                              className={
                                                getColorSafety(1, review.safety)
                                                  ? "fill-moss_green-secondary"
                                                  : "fill-red"
                                              }
                                            ></IoShieldCheckmark>
                                            <IoShieldCheckmark
                                              className={
                                                getColorSafety(2, review.safety)
                                                  ? "fill-moss_green-secondary"
                                                  : "fill-red"
                                              }
                                            ></IoShieldCheckmark>
                                            <IoShieldCheckmark
                                              className={
                                                getColorSafety(3, review.safety)
                                                  ? "fill-moss_green-secondary"
                                                  : "fill-red"
                                              }
                                            ></IoShieldCheckmark>
                                          </div>
                                          <div className="flex flex-row">
                                            <LiaStarSolid
                                              className={
                                                getColorRating(1, review.rating)
                                                  ? "fill-bronze"
                                                  : ""
                                              }
                                            ></LiaStarSolid>
                                            <LiaStarSolid
                                              className={
                                                getColorRating(2, review.rating)
                                                  ? "fill-bronze"
                                                  : ""
                                              }
                                            ></LiaStarSolid>
                                            <LiaStarSolid
                                              className={
                                                getColorRating(3, review.rating)
                                                  ? "fill-bronze"
                                                  : ""
                                              }
                                            ></LiaStarSolid>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <Separator className="my-2 fill-black bg-black" />
                                </>
                              ))}
                            </ScrollArea>
                          </div>
                          <div className="flex items-center flex-col w-full justify-center border-black text-black mt-18">
                            <Input
                              className="mt-10 rounded-xl border-2"
                              type="review"
                              placeholder="Leave a review ... "
                            />
                            <button
                              className="flex items-center justify-center text-white border-moss_green border-4 hover:border-2 font-grotesk-bold w-full h-10 bg-moss_green hover:bg-moss_green-secondary rounded-xl mt-2"
                              type="submit"
                              onClick={handleSubmit}
                            >
                              Send
                            </button>
                          </div>
                        </DialogHeader>
                      </ScrollArea>
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
