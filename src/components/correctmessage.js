export default function CorrectMessage({ message, className }) {
    return (
      message ? (
        <div className={"px-4 py-3 rounded-lg bg-green-600 text-neutral-200 w-96 min-w-96 " + className}>
          {message}
        </div>
      ) : (
        null
      )
    );
  }
  