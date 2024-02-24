import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return( 
    <div className="h-screen w-full flex flex-col">
      <Header />
      <div className="flex justify-center items-center pt-12 pb-8">
          <SearchBar />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-center h-96 w-96 text-beige bg-moss_green rounded-lg text-4xl font-grotesk-bold">
          <div className="mt-4">Snacksafe</div>
        </div>
      </div>
    </div>
    );
}
