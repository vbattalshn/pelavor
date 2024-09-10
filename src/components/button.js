import Spinner from "./spinner";

export default function Button({ onClick, loading, loadingLabel = "Loading...", label, className=null}) {
  return (
    <button
      onClick={onClick}
      className={"px-4 py-3 rounded-full bg-indigo-600 border border-indigo-600 hocus:bg-indigo-500 text-neutral-200 flex gap-2 items-center justify-center disabled:opacity-50 disabled:pointer-events-none " + className}
      disabled={loading}
    >
      {loading ? (
        <>
          <Spinner className="w-5 h-5" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}
