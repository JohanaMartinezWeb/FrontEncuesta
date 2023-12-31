/* eslint-disable no-unused-vars */
import {
  faLinkedin,
  faTelegramPlane,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  LinkedinShareButton,
} from "react-share";

const SocialShare = (props) => {
  return (
    <div className="d-flex flex-row flex-md-column">
      <TwitterShareButton
        url={props.url}
        title={JSON.stringify(props.pregunta)}
        via="opinion poll"
        className="bg-secondary text-decoration-none font-weight-bold mb-4 py-2 rounded-lg text-center  text-white w-50 mx-auto"
      >
        <FontAwesomeIcon className="ml-3 mr-3" icon={faTwitter} />
        <span className="d-none d-md-inline-block">Compartir on Twitter</span>
      </TwitterShareButton>

      <WhatsappShareButton
        url={props.url}
        title={JSON.stringify(props.pregunta)}
        separator=" "
        className="bg-secondary text-decoration-none font-weight-bold mb-4 py-2 rounded-lg text-center  text-white w-50 mx-auto"
      >
        <FontAwesomeIcon className="ml-3 mr-3" icon={faWhatsapp} />
        <span className="d-none d-md-inline-block">Compartir en Whatsapp</span>
      </WhatsappShareButton>

      <TelegramShareButton
        url={props.url}
        title={JSON.stringify(props.pregunta)}
        className="bg-secondary text-decoration-none font-weight-bold mb-4 py-2 rounded-lg text-center  text-white w-50 mx-auto"
      >
        <FontAwesomeIcon className="ml-3 mr-3" icon={faTelegramPlane} />
        <span className="d-none d-md-inline-block">Compartir en Telegram</span>
      </TelegramShareButton>

      <LinkedinShareButton
        url={props.url}
        title={JSON.stringify(props.pregunta)}
        summary="Opinion poll is a poll app made using react.js. You have been invited to vote! "
        className="bg-secondary text-decoration-none font-weight-bold mb-4 py-2 rounded-lg text-center  text-white w-50 mx-auto"
      >
        <FontAwesomeIcon className="ml-3 mr-3" icon={faLinkedin} />
        <span className="d-none d-md-inline-block">Compartir en LinkedIn</span>
      </LinkedinShareButton>
    </div>
  );
};

export default SocialShare;
