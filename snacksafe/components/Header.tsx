import Link from 'next/link';


export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-moss_green text-white w-full">
      <div className="flex items-center">
        <img src= "https://media.discordapp.net/attachments/863465108026294313/1210846868431704154/snackSafeLogo.png?ex=65ec0c05&is=65d99705&hm=19c48bb1b42b665060edfa7a13d6af662022e45261e11413f1ce48bccd06e5fa&=&format=webp&quality=lossless&width=50&height=50"/>
      </div>
      <div className="bg-beige text-moss_green font-bold py-2 px-4 rounded">
        <Link href="/login">
            Login
        </Link>
      </div>
    </header>
  );
}
