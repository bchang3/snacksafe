"use client"
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeMinimal } from "@supabase/auth-ui-shared";
import { supabase } from "@/utils/supabase/client";
// import { createClient } from "@supabase/supabase-js";

function LoginBox () {
    
    const responseMessage = (response: CredentialResponse) => {

        console.log(response);
    };
    // const errorMessage = (error) => {
    //     console.log(error);
    // };
    const signInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              queryParams: {
                access_type: 'offline',
                prompt: 'consent',
                
              },
              
          
            },
          })
    }
    const signin = () => {
        window.location.href = '/preferences'

    };
	return (
        <div className="flex h-full items-center justify-center">
      <div className="flex w-[400px] h-[300px] bg-moss_green text-white rounded-md font-grotesk-bold font-bold text-2xl">
        <div className="flex flex-col w-full">
          <div className="flex justify-center">
            <div className="mt-4">Create an Account</div>
          </div>
          <div className="flex justify-center">
            <div className="font-grotesk-regular font-thin text-sm">
              Enter your email below to create an account
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <Input
              placeholder="Enter your email here"
              className="w-3/4 font-grotesk-regular font-thin text-black"
            ></Input>
            
          </div>
          <div className="flex justify-center mt-2">
            <Button className="bg-white w-3/4 text-black hover:bg-slate-200" onClick={signin}>Sign up with email </Button>
          </div>
          <div className="flex justify-center mt-8">
            {/* <Auth supabaseClient={supabase} appearance={{theme:ThemeMinimal}} theme="light" providers={["google"]}></Auth> */}
            <button onClick={signInWithGoogle} className="h-8 w-24 bg-white"></button>
          {/* <GoogleOAuthProvider clientId = "664128447145-oli15ris18qh9hqitkclibencdld2ohe.apps.googleusercontent.com">
            <GoogleLogin text="signup_with" onSuccess={responseMessage}></GoogleLogin>
            </GoogleOAuthProvider> */}
            </div>
          <div>
          </div>
        </div>
      </div>
    </div>
		
	);
}
export default LoginBox;
