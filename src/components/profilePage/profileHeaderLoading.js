export default function ProfileHeaderLoading() {
  return (
    <div className="animate-pulse max-w-5xl mx-auto py-2">
      <div className="w-full h-64 rounded-2xl bg-neutral-300" />
      <div className="flex gap-2 px-2 mt-[-50px] items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="w-[200px] h-[200px] rounded-full bg-neutral-300" />
          <div className="flex flex-col gap-1">
            <div className="w-20 bg-neutral-300 rounded-lg h-5" />
            <div className="w-40 bg-neutral-300 rounded-lg h-8" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className=" w-20 h-10 rounded-lg bg-neutral-300" />
          <div className=" w-10 h-10 rounded-lg bg-neutral-300" />
        </div>
      </div>
      <div className="flex gap-8 p-4 text-neutral-700">
        <div className="flex-1 flex flex-col gap-2">
          <div className="w-full h-4 rounded-lg bg-neutral-300" />
          <div className="w-full h-4 rounded-lg bg-neutral-300" />
          <div className="w-4/5 h-4 rounded-lg bg-neutral-300" />
        </div>
        <div className="flex gap-4">
          <div className="w-12 h-16 rounded-lg bg-neutral-300" />
          <div className="w-12 h-16 rounded-lg bg-neutral-300" />
          <div className="w-12 h-16 rounded-lg bg-neutral-300" />
        </div>
      </div>
      <div className="flex gap-2 p-4">
        <div className="w-24 h-10 rounded-lg bg-neutral-300" />
        <div className="w-28 h-10 rounded-lg bg-neutral-300" />
        <div className="w-10 h-10 rounded-lg bg-neutral-300" />
        <div className="w-10 h-10 rounded-lg bg-neutral-300" />
        <div className="w-10 h-10 rounded-lg bg-neutral-300" />
        <div className="w-10 h-10 rounded-lg bg-neutral-300" />
        <div className="w-10 h-10 rounded-lg bg-neutral-300" />
      </div>
    </div>
  );
}
