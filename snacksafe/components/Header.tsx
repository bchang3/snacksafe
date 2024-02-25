
import { User, createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Avatar, AvatarImage } from './ui/avatar';
import { getURL, supabase } from '@/utils/supabase/client';

interface HeaderProps {
  loggedin: boolean
  setLoggedIn: Function
  profile?: any
}
 const Header: React.FC<HeaderProps>  = ({
  loggedin,
  setLoggedIn,
  profile = {avatar_url: "", first_name: ""}
}) => { 
  
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: "https://snacksafe.vercel.app",
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
            
          },
      
        },
      })
}
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    setLoggedIn(false)
    // console.log(await supabase.auth.getUser())
}
  return (
    <header className="flex justify-between items-center p-4 bg-moss_green text-white w-full">
      <div className="flex items-center">
        <img src= "https://media.discordapp.net/attachments/863465108026294313/1210846868431704154/snackSafeLogo.png?ex=65ec0c05&is=65d99705&hm=19c48bb1b42b665060edfa7a13d6af662022e45261e11413f1ce48bccd06e5fa&=&format=webp&quality=lossless&width=50&height=50"/>
      </div>
     
        {!loggedin &&
         <div className="bg-beige hover:bg-beige-secondary text-moss_green font-bold py-2 px-4 rounded">
          <button onClick={signInWithGoogle} className="">Log In</button>
        </div>
        }
        {loggedin &&
        <div className="flex flex-row">
          <div className="text-white mr-4 font-grotesk-bold mt-2">Welcome, {profile.first_name}!</div>
           <Avatar className="mr-2"><AvatarImage src={profile.avatar_url}></AvatarImage></Avatar>
         <div className="bg-beige hover:bg-beige-secondary text-moss_green font-bold py-2 px-4 rounded">
        <button onClick={signOut}>
            Sign Out
        </button>
        </div>
        </div>
        }
    </header>
  );
}
export default Header;