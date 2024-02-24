import LoginBox from "@/components/LoginPage";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React, { ReactElement } from "react";
export default function SignUp() {
  const responseMessage = (response: CredentialResponse) => {
    console.log(response);
  };
  // const errorMessage = (error) => {
  //   console.log(error);
  // };
  return (
    <div className="flex h-screen items-center justify-center">
      <LoginBox />
    </div>
  );
}
