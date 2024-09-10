import Image from "next/image";
import Creator from "./creator";
import Link from "next/link";

export default function ListCard({
  title,
  description,
  image,
  date,
  url,
  user = null,
  edit = false,
}) {
  return (
    <div className="max-w-72 w-full p-2 flex flex-col justify-center gap-2 rounded-xl bg-neutral-200/50 border border-neutral-200 animate-loaded">
      <Image
        width={272}
        height={160}
        className="rounded-xl w-full h-40 object-cover"
        alt={title + " list image"}
        src={image}
      />
      <h2 className="font-medium text-neutral-900">{title}</h2>
      <span className="flex gap-2 text-sm items-center">
        <Creator
          username={user.username}
          profile={user.Profile_photo}
          verification={user.User_verification_status == 1 ? true : false}
        />
        <span>-</span>
        {date}
      </span>
      <p className="text-sm text-neutral-900 font-normal line-clamp-3 min-h-14">
        {description}
      </p>
      <div className="flex gap-2">
        <Link
          href={"/list/" + url}
          className="flex flex-1 border border-transparent text-neutral-700 transition-all p-2 items-center justify-center rounded-lg hocus:bg-indigo-300/25 hocus:text-indigo-600 hocus:border-indigo-600"
        >
          Görüntüle
        </Link>
        {edit ? (
          <Link
            href={"/dashboard/edit-list/" + url}
            className="flex flex-1 border border-transparent text-neutral-700 transition-all p-2 items-center justify-center rounded-lg hocus:bg-orange-300/25 hocus:text-orange-600 hocus:ring-orange-300 hocus:border-orange-600"
          >
            Düzenle
          </Link>
        ) : null}
      </div>
    </div>
  );
}
