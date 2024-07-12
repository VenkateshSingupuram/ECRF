import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <button
        className="btn-admin"
        onClick={() => {
          navigate("/Cro");
        }}
      >
        CRO
      </button>
      <button
        className="btn-admin"
        onClick={() => {
          navigate("/Sponsor");
        }}
      >
        Sponsor
      </button>
      <button
        className="btn-admin"
        onClick={() => {
          navigate("/Site");
        }}
      >
        Site
      </button>
      <button
        className="btn-admin"
        onClick={() => {
          navigate("/Protocol");
        }}
      >
        Protocol
      </button>
    </div>
  );
};

export default Navbar;
