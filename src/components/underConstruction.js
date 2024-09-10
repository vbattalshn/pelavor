import Hammer from "@/assets/icons/hammer";

export default function UnderConstruction(params) {
  return (
    <div className="w-full py-8 flex items-center justify-center flex-col gap-4">
      <div className="relative">
        <span className="w-full h-full bg-yellow-500/50 rounded-full absolute block animate-pulse -z-10" />
        <div className="p-3 m-2 bg-yellow-500 rounded-full z-10 text-neutral-200">
          <Hammer className="w-8 h-8" />
        </div>
      </div>
      <h2 className="font-semibold text-neutral-800 text-xl">
        Yapım Aşamasında
      </h2>
    </div>
  );
}
