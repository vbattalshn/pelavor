import Github from "@/assets/icons/github";

export default function signinWithGoogle({ type }) {
  return (
    <button
      type="submit"
      className="hidden items-center justify-center gap-2 px-4 py-3 w-96 border border-neutral-300 rounded-full text-base hocus:bg-neutral-200/50 transition"
    >
      <Github className="w-5 h-5" />
      <span>{type} with Github</span>
    </button>
  );
}
