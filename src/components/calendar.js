function Calendar({ classname }) {
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
          strokeMiterlimit="10"
          strokeWidth="1.5"
          d="M8 2v3M16 2v3M16 3.5c3.33.18 5 1.45 5 6.15v6.18c0 4.12-1 6.18-6 6.18H9c-5 0-6-2.06-6-6.18V9.65c0-4.7 1.67-5.96 5-6.15h8zM20.75 17.6H3.25"
        ></path>
        <path
          fill="currentColor"
          d="M12 8.25c-1.23 0-2.27.67-2.27 1.97 0 .62.29 1.09.73 1.39-.61.36-.96.94-.96 1.62 0 1.24.95 2.01 2.5 2.01 1.54 0 2.5-.77 2.5-2.01 0-.68-.35-1.27-.97-1.62.45-.31.73-.77.73-1.39 0-1.3-1.03-1.97-2.26-1.97zm0 2.84c-.52 0-.9-.31-.9-.8 0-.5.38-.79.9-.79s.9.29.9.79c0 .49-.38.8-.9.8zM12 14c-.66 0-1.14-.33-1.14-.93 0-.6.48-.92 1.14-.92.66 0 1.14.33 1.14.92 0 .6-.48.93-1.14.93z"
        ></path>
      </svg>
    );
  }
  
  export default Calendar;
  