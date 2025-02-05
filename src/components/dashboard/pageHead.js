import Head from "next/head";
export default function pageHead({ title, description }) {
  return (
    <>
      <Head>
        <title>{title} | Pelavor</title>
        <meta name="title" content={title} />
        <meta
          name="description"
          content={description}
        />
      </Head>
      <div className="p-4 flex flex-col gap-0">
        <h1 className="font-bold text-3xl text-neutral-800">{title}</h1>
        <p className="text-neutral-600">{description}</p>
      </div>
    </>
  );
}
