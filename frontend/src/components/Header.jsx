import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";
import banner from "./../assets/banner.png";

const Header = () => {
  return (
    <header style={{ backgroundColor: "#F2F2F2" }}>
      <img className="w-100" src={banner} alt="iimagen de introduccion" />
      <div className="header">
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex align-items-baseline">
            <Link className="page-link" to="/">
              <FontAwesomeIcon className="mr-2 mt-3" icon={faCommentsDollar} />
              ¿Cuánto sabes sobre finanzas?
            </Link>
          </div>
          <p className="mt-2 mb-0 fst-italic" style={{ fontSize: "1.125rem" }}>
            Crea y responde encuestas Financieras
          </p>
        </div>
      </div>

      <nav
        className="navbar navbar-expand-lg "
        style={{ backgroundColor: "#0B0B3B" }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <Link to="/" className="nav-link text-white">
                  Crea una Encuesta
                </Link>
              </li>
              <li>
                <Link to="/demo/prueba" className="nav-link text-white">
                  Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
