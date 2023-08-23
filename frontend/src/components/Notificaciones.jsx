import PropTypes from "prop-types";
import { IconButton, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const Notificaciones = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={props.switcher}
      onClose={props.close}
      autoHideDuration={3000}
      action={[
        <IconButton
          key="close-button"
          aria-label="Cerrar"
          color="inherit"
          onClick={props.close}
        >
          x
        </IconButton>,
      ]}
    >
      <Alert onClose={props.close} severity={props.nottype}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

Notificaciones.propTypes = {
  switcher: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  nottype: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Notificaciones;
