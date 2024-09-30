export default function Qr({ classname }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={classname}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9M15 2h2.5C19.99 2 22 4.01 22 6.5V9M22 16v1.5c0 2.49-2.01 4.5-4.5 4.5H16M9 22H6.5C4.01 22 2 19.99 2 17.5V15M8.5 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM7.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM16.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.5 18a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      ></path>
    </svg>
  );
}