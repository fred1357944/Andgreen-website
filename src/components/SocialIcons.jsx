import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faNewspaper,
  faPodcast,
} from "@fortawesome/free-solid-svg-icons";

function SocialIcons() {
  return (
    <div className="flex items-center space-x-6">
      {" "}
      {/* 確保每個 icon 之間有間距 */}
      <a href="#" aria-label="Instagram">
        <FontAwesomeIcon icon={faInstagram} className="text-black text-2xl" />
      </a>
      <a href="#" aria-label="YouTube">
        <FontAwesomeIcon icon={faYoutube} className="text-black text-2xl" />
      </a>
      <a href="#" aria-label="Email">
        <FontAwesomeIcon icon={faEnvelope} className="text-black text-2xl" />
      </a>
      <a href="#" aria-label="Newsletter">
        <FontAwesomeIcon icon={faNewspaper} className="text-black text-2xl" />
      </a>
      <a href="#" aria-label="Facebook">
        <FontAwesomeIcon icon={faFacebook} className="text-black text-2xl" />
      </a>
      <a href="#" aria-label="LinkedIn">
        <FontAwesomeIcon icon={faLinkedin} className="text-black text-2xl" />
      </a>
      <a href="#" aria-label="Podcast">
        <FontAwesomeIcon icon={faPodcast} className="text-black text-2xl" />
      </a>
    </div>
  );
}

export default SocialIcons;
