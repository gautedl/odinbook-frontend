const AcceptButton = ({ click }) => {
  return (
    <svg
      onClick={click}
      className="accept"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 6 9 17l-5-5"></path>
    </svg>
  );
};

const DeclineButton = ({ click }) => {
  return (
    <svg
      onClick={click}
      className="decline"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 6 6 18"></path>
      <path d="m6 6 12 12"></path>
    </svg>
  );
};

export { AcceptButton, DeclineButton };
