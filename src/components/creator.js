import Link from "next/link";
import Image from "next/image";
import VerificationBadge from "@/assets/icons/verificationBadge";

export default function Creator({ username, profile, verification = false, className }) {
    return (
      <Link href={"/user/" + username} className={"flex gap-1 items-center justify-center " + className}>
        <Image
          width={24}
          height={24}
          src={profile}
          alt={username + " avatar"}
          className="rounded-full object-cover"
        />
        {username}
        {verification ? <VerificationBadge /> : null}
      </Link>
    );
  }
  