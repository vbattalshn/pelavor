function Gift({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={ className }
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M19.97 10h-16v8c0 3 1 4 4 4h8c3 0 4-1 4-4v-8zM21.5 7v1c0 1.1-.53 2-2 2h-15c-1.53 0-2-.9-2-2V7c0-1.1.47-2 2-2h15c1.47 0 2 .9 2 2zM11.64 5H6.12a.936.936 0 01.03-1.3l1.42-1.42a.96.96 0 011.35 0L11.64 5zM17.87 5h-5.52l2.72-2.72a.96.96 0 011.35 0l1.42 1.42c.36.36.37.93.03 1.3z"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M8.94 10v5.14c0 .8.88 1.27 1.55.84l.94-.62a1 1 0 011.1 0l.89.6a.997.997 0 001.55-.83V10H8.94z"
      ></path>
    </svg>
  );
}

export default Gift;
