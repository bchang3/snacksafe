"use client";
import LoginBox from "@/components/LoginPage";
import { Input } from "@/components/ui/input";
// import { createClient } from "@/utils/supabase/server";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React, { ReactElement, useState } from "react";
import { createClient } from '@supabase/supabase-js'


export default function Preferences() {
  const options1: string[] = ["Nut Allergy", "Vegan", "Kosher", "Vegetarian"];
  const options2: string[] = [
    "Non-dairy",
    "Egg Allergy",
    "Shellfish",
    "Gluten-free",
  ];
  const supabase = createClient('postgresql://postgres:postgres@127.0.0.1:54322/postgres', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxY3ViaWlkc2dobHdreHVxbGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3MzkyMzIsImV4cCI6MjAyNDMxNTIzMn0.M8TTrya5DWKutPGLKdXcboERP6-b0oY6CjUhZ7phvmU')
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
        .eq('id', userId)

      }
  }

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
        <button className="flex h-14 w-48 bg-moss_green-secondary mt-8 rounded-md justify-center items-center" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
