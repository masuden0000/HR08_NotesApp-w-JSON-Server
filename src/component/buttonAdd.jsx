import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const buttonAdd = ({ target }) => {
  return (
    <div className="text-start mb-4">
      <Link to={target} className="btn btn-primary">
        <i className="fa-solid fa-plus me-2"></i>
        Add Notes
      </Link>
    </div>
  );
};

buttonAdd.propTypes = {
  target: PropTypes.string.isRequired,
};


export default buttonAdd;
