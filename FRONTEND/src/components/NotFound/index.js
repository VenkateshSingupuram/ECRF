import "./index.css";

const NotFound = () => {
  return (
    <div className="not-found-page">
      {/* <img
        src="https://cdnl.iconscout.com/lottie/premium/thumb/error-404-5631133-4699352.gif"
        alt="no-found"
      /> */}
      {/* <h1>Page Not Found</h1> */}
      <img
        className="not-found"
        src="https://assets-v2.lottiefiles.com/a/23535dd0-117d-11ee-a59a-3bae0125838c/lZLD0w04Rr.gif"
        alt="no-found"
      />
      <h1>Page Not Found</h1>
    </div>
  );
};

export default NotFound;
