import Logo from "@/assets/logo";
import Link from "next/link";

export default function LeftBar({img, logoColor}) {
    return (
      <div className="w-2/6 lg:block hidden">
        <Link href="/">
          <Logo color={logoColor} className="absolute block top-6 left-8 " />
        </Link>
        <img
          className="w-full min-h-screen h-full object-cover"
          src={img}
        />
      </div>
    );
  }
  