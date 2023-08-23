/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from "uuid";
import Slide from "@material-ui/core/Slide";
import Notificaciones from "./Notificaciones.jsx";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Home = () => {
  const navigate = useNavigate();
  const [preguntas, setPreguntas] = useState({
    id: uuidv4(),
    pregunta: "",
    error: false,
  });

  const [campos, setCampos] = useState([
    { id: uuidv4(), opcion: "", error: false },
    { id: uuidv4(), opcion: "", error: false },
  ]);

  const [toast, setToast] = useState({
    snackbaropen: false,
    msg: "",
    not: "",
    Transition: Slide,
  });

  const showError = (valor, error) => valor.trim().length === 0 && error;

  useEffect(() => {
    if (localStorage.getItem("encuestaEliminada") == 0) {
      setToast({
        snackbaropen: true,
        msg: "Encuesta eliminada",
        not: "success",
      });
      localStorage.removeItem("encuestaEliminada");
    }
  }, []);

  const hadleClick = (Transition) => () => {
    setToast({
      snackbaropen: true,
      msg: "Copiado en memoria",
      not: "info",
      Transition,
    });
  };

  const slideTransition = (props) => {
    return <Slide {...props} direction="down" />;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const preguntaVacia = preguntas.pregunta.trim().length < 4;
    const opcionesVacias = campos.every((obj) => obj.opcion.length > 0);

    if (preguntaVacia || !opcionesVacias) {
      if (preguntaVacia) {
        setToast({
          snackbaropen: true,
          msg: "La pregunta no puede estar vacía",
          not: "error",
        });
      }
      if (!opcionesVacias) {
        setToast({
          snackbaropen: true,
          msg: "Todas las opciones deben estar completas",
          not: "error",
        });
      }

      return;
    }

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const data = {
      id: uuidv4(),
      pregunta: preguntas.pregunta,
      opciones: campos,
    };

    axios
      .post(apiUrl, data)
      .then((res) => {
        localStorage.setItem("encuestaCreada", 0);
        hadleClick(slideTransition);
        navigate(`/new/${res.data.id}`);
      })
      .catch((err) => console.log(err));
  };

  const handlePregunta = (id, e) => {
    setPreguntas({ id, pregunta: e.target.value });
  };
  const handleCambiarCampo = (id, e) => {
    const nuevosCampos = campos.map((i) => {
      if (id === i.id) {
        i[e.target.name] = e.target.value;
      }
      return i;
    });
    setCampos(nuevosCampos);
  };
  const handleBorrarCampo = (id) => {
    const valores = [...campos];
    valores.splice(
      valores.findIndex((valor) => valor.id === id),
      1
    );
    setCampos(valores);
  };

  const handleAgregarCampos = () => {
    setCampos([...campos, { id: uuidv4(), opcion: "", error: false }]);
    setToast({
      snackbaropen: true,
      msg: "Se ha agregado una nueva opción",
      not: "info",
    });
  };

  const closeSnackbar = (e) => {
    setToast({ snackbaropen: false });
  };

  return (
    <div className="ui-outer ">
      <div className="ui-container py-5 px-5">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mx-auto">
            <div className="d-flex justify-content-between flex-column flex-md-row align-items-baseline">
              <div>
                <h3>Crear encuesta</h3>
              </div>
              <Link
                to="/demo/54bf4315-04a5-4b9d-882d-19e147942ed8"
                className="text-decoration-none"
              >
                <span className=" align-self-end font-weight-normal home">
                  Ver encuesta demo
                </span>
              </Link>
            </div>
            <div className="mt-4">
              <div className="d-flex flex-column ">
                <label className="mb-3 w-100 font-weight-bold content-text">
                  Pregunta de la encuesta
                </label>
                <TextField
                  {...(showError(preguntas.pregunta, preguntas.error) && {
                    ...{
                      error: preguntas.error,
                      helperText: "Ingrese la pregunta",
                    },
                  })}
                  id={preguntas.id}
                  name="pregunta"
                  multiline={true}
                  rows={3}
                  className=" w-100 py-4 bg-light rounded-lg px-3 outline-none  border border-gray "
                  placeholder="¿Cuál es su perfil de inversor?"
                  value={preguntas.pregunta}
                  onChange={(event) => handlePregunta(preguntas.id, event)}
                />
              </div>
              <Notificaciones
                switcher={toast.snackbaropen}
                close={closeSnackbar}
                message={toast.msg}
                nottype={toast.not}
              />

              {campos.map((item, index) => (
                <div className="options mt-2 flex-column " key={item.id}>
                  <div className=" mb-3">
                    <div className="d-flex flex-column">
                      <label className="mb-3 w-100 content-text font-weight-bold">
                        Opción {index + 1}
                      </label>
                      <div className="">
                        <TextField
                          {...(showError(item.opcion, item.error) && {
                            ...{
                              error: item.error,
                              helperText: "Ingrese al menos 2 opciones",
                            },
                          })}
                          id={item.id}
                          name="opcion"
                          className=" py-3 rounded-lg px-3 bg-light inputfield focus-shadow  focus-outline-none  border "
                          placeholder={"Opción" + (index + 1)}
                          value={item.opcion}
                          onChange={(event) =>
                            handleCambiarCampo(item.id, event)
                          }
                        />
                        <button
                          hidden={campos.length === 2}
                          onClick={() => handleBorrarCampo(item.id)}
                          className=" delete ml-2"
                        >
                          <FontAwesomeIcon
                            className=" text-danger"
                            icon={faTrashAlt}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAgregarCampos}
                className="btn-custom  mx-3 px-5 py-3 text-white  border-0 rounded-lg"
              >
                <span className="mr-3 ">
                  <FontAwesomeIcon className="ml-2n mx-2" icon={faPlus} />
                  Agrega otra opción
                </span>
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn-custom  mx-3 px-5 py-3 text-white  border-0 rounded-lg"
              >
                <FontAwesomeIcon className="mr-2 px-2" icon={faSave} />
                Crear Encuesta
              </button>
            </div>
          </div>
        </form>
      </div>

      <p className="text-center font-weight-bold nombre">
        <a
          href="https://github.com/JohanaMartinezWeb"
          target="_blank"
          rel="noopener noreferrer"
        >
          Johana Martinez <FontAwesomeIcon icon={faGithub} />
        </a>
      </p>
    </div>
  );
};

export default Home;
