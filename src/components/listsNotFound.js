import Image from "next/image";
import Link from "next/link";

export default function listsNotFound({title, description, href, linkContent}) {
  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-32px)] gap-4 flex-col p-4">
        <Image
            src="https://files.pelavor.com/list-not-found.png"
            width={450}
            height={480}
            className="w-[300px] h-[320px]"
            alt="Listeler bulunamadı"
            />
        <h1 className="max-w-96 px-2 text-center text-2xl font-semibold text-neutral-800">
            {title}
        </h1>
        <p className="max-w-96 px-2 text-center text-sm text-neutral-700">
            {description}
        </p>
        <Link href={href} className="px-6 py-2 rounded-lg bg-neutral-800 text-neutral-200">
            {linkContent}
        </Link>
    </div>
  );
}
