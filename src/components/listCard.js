import Image from "next/image";
import Creator from "./creator";
import Link from "next/link";
import ArrowRight from "@/assets/icons/arrowRight";

export default function ListCard({
  title,
  description,
  image,
  date,
  url,
  user = null,
  edit = false,
  new_tab = false,
  bgColor = "bg-neutral-200/50",
}) {
  return (
    <div
      className={
        "max-w-80 h-96 flex rounded-lg overflow-hidden items-center justify-between flex-col " +
        bgColor
      }
    >
      <Image
        src={image}
        width={320}
        height={180}
        className="w-80 h-[180px] cover object-cover"
        alt={title + " adlı listenin görseli"}
      />
      <div className="flex w-full px-4 py-3 gap-2 flex-col">
        {user != null ? (
          <div className="flex gap-4 text-neutral-700">
            <Creator
              username={user.username}
              profile={user.Profile_photo}
              verification={user.User_verification_status}
            />
            {date}
          </div>
        ) : null}

        <h3 className="font-bold text-neutral-800 line-clamp-1" title={title}>{title}</h3>
        <p className="line-clamp-3	text-neutral-700" title={description}>{description}</p>
      </div>
      {new_tab == false ? (
        
        <Link
          href={"/list/" + url}
          className="flex gap-2 px-4 py-2 w-full justify-end text-indigo-600 hocus:gap-4 transition-all"
        >
          İncele
          <ArrowRight />
        </Link>
      ) : (
        <a
          href={url}
          className="flex gap-2 px-4 py-2 w-full justify-end text-indigo-600 hocus:gap-4 transition-all"
          target="_blank"
        >
          Oku
          <ArrowRight />
        </a>
      )}
    </div>
  );
}
