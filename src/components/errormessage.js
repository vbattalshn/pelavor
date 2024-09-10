export default function ErrorMessage({ error, className }) {
    return (
      error ? (
        <div className={"px-4 py-3 rounded-lg bg-red-600 text-neutral-200 w-96 min-w-96 animate-shake " + className}>
          {error}
        </div>
      ) : (
        null
      )
    );
  }
  