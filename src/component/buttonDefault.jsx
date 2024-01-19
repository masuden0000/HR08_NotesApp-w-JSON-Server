import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "../style/notes.css";

const ButtonDefault = ({ functionButton, name, target, style, styleContainer, text, icon }) => {
    let content;
    if (name == "button") {
        content = (
            <Link to={target} className={`buttonDefault text-center ${style}`}>
                <i className={`me-2 ${icon}`}></i>
                {text}
            </Link>
        );
    } else if (name == "submit") {
        content = (
            <button onClick={functionButton} type="submit" to={target} className={`buttonDefault text-center ${style}`}>
                <i className={`me-2 ${icon}`}></i>
                {text}
            </button>
        );
    };

    return (
        <div className={styleContainer}>
            {content}
        </div>
    );
};

ButtonDefault.propTypes = {
    name: PropTypes.string,
    target: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.string,
    styleContainer: PropTypes.string,
    text: PropTypes.string.isRequired,
    icon: PropTypes.string,
    functionButton: PropTypes.func,
};

export default ButtonDefault;
