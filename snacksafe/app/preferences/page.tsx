"use client";
import LoginBox from "@/components/LoginPage";
import { Input } from "@/components/ui/input";
// import { createClient } from "@/utils/supabase/server";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React, { ReactElement, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase/client";

export default function Preferences() {
  const options1: string[] = ["Nut Allergy", "Vegan", "Kosher", "Vegetarian"];
  const options2: string[] = [
    "Non-dairy",
    "Egg Allergy",
    "Shellfish",
    "Gluten-free",
  ];

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const isSelected = (option: string) => {
    return selectedOptions.some((selected) => selected === option);
  };
  const toggleOption = (option: string) => {
    const selected = isSelected(option);
    const updatedOptions = selected
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    console.log(option);
  };
  const handleSubmit = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const userId = user["id"];
      const { data: profile } = await supabase
        .from("profiles")
        .update({ restrictions: selectedOptions })
        .eq("id", userId);
      console.log(selectedOptions);
      window.location.href = "/";
    }
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const userId = user["id"];
        const { data: restrictions } = await supabase
          .from("profiles")
          .select("restrictions")
          .eq("id", userId)
          .limit(1)
          .single();
          console.log(restrictions.restrictions);
        setSelectedOptions(restrictions.restrictions);
      }
    };
    fetchData();
  }, []);

  const styles = "flex items-center w-96 h-24 rounded-md mt-4 justify-center";
  return (
    <div className="flex flex-col h-screen justify-center text-white font-grotesk-bold text-2xl">
      <div className="text-black text-4xl">
        Fill out your dietary restrictions!
      </div>
      <div className="flex flex-col items-center mt-12">
        <div className="flex flex-row">
          <div>
            {options1.map((option) => (
              <label
                className={
                  isSelected(option)
                    ? `${styles} border-8 bg-moss_green-secondary`
                    : `${styles} bg-moss_green hover:bg-moss_green-secondary`
                }
                key={option}
              >
                <div>{option}</div>
                <input
                  className="opacity-0 text-black "
                  type="checkbox"
                  name="selectQuestion"
                  onChange={() => {
                    toggleOption(option);
                  }}
                  checked={isSelected(option)}
                />
              </label>
            ))}
          </div>
          <div className="ml-4">
            {options2.map((option) => (
              <label
                className={
                  isSelected(option)
                    ? `${styles} border-8 bg-moss_green-secondary`
                    : `${styles} bg-moss_green hover:bg-moss_green-secondary`
                }
                key={option}
              >
                <div>{option}</div>
                <input
                  className="opacity-0 text-black "
                  type="checkbox"
                  name="selectQuestion"
                  onChange={() => {
                    toggleOption(option);
                  }}
                  checked={isSelected(option)}
                />
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="flex h-14 w-48 bg-moss_green-secondary mt-8 rounded-md justify-center items-center"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
