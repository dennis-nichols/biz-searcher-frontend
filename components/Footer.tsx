import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-24 text-gray-500 border-t border-gray-700">
      <p className="flex items-center justify-center gap-2">
        Built by Dennis Nichols, 2023
      </p>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/dennisgnichols/"
        className="w-5 ml-2"
      >
        {" "}
        <FontAwesomeIcon icon={faLinkedin} size="3x" />
      </a>
      <a
        target="_blank"
        href="https://github.com/dennis-nichols"
        className="w-5 ml-2"
      >
        {" "}
        <FontAwesomeIcon icon={faGithub} size="3x" />
      </a>
    </footer>
  );
}
