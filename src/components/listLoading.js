export default function ListLoading() {
  return (
    <div className="animate-pulse">
      <div className="bg-neutral-200 bg-listBgImage bg-center bg-auto">
        <div className="flex max-w-5xl lg:flex-row flex-col mx-auto gap-4 px-2 py-8 justify-center items-center">
          <span className="w-[200px] h-[200px] rounded-lg bg-neutral-300" />
          <div className="flex-1 w-full flex flex-col gap-2">
            <span className="w-full h-9 bg-neutral-300 rounded-lg" />
            <div className="flex gap-2 text-neutral-700 lg:flex-row flex-col">
              <span className="flex-1 h-6 bg-neutral-300 rounded-lg" />
              <span className="flex-1 h-6 bg-neutral-300 rounded-lg" />
              <span className="flex-1 h-6 bg-neutral-300 rounded-lg" />
              <span className="flex-1 h-6 bg-neutral-300 rounded-lg" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="w-full h-6 bg-neutral-300 rounded-lg" />
              <span className="w-full h-6 bg-neutral-300 rounded-lg" />
              <span className="w-full h-6 bg-neutral-300 rounded-lg" />
              <span className="w-2/5 h-6 bg-neutral-300 rounded-lg" />
            </div>
            <div className="flex gap-1">
              <span className="w-20 h-11 rounded-full bg-neutral-300" />
              <span className="w-11 h-11 rounded-full bg-neutral-300" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-2 pb-4">
        <div className=" bg-neutral-200/50 w-full flex p-1 gap-1 rounded-lg border border-neutral-200 my-2">
          <span className="bg-neutral-300/50 h-10 flex-1 rounded-lg" />
          <span className="flex-1" />
          <span className="flex-1" />
        </div>
        <span className="block w-full h-screen bg-neutral-200/50 rounded-lg border border-neutral-200" />
      </div>
    </div>
  );
}
