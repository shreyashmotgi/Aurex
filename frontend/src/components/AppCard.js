import React from "react";
import { Link } from "react-router-dom";

function AppCard({
  title,
  subtitle,
  image,
  link = "#",
  comingSoon = false,
}) {
  const content = (
    <>
      <img src={image} alt={title} width="55" />

      <h6 className="mt-3 mb-1">{title}</h6>

      <small className="text-muted d-block">
        {subtitle}
      </small>

      {comingSoon && (
        <span className="badge bg-warning text-dark mt-2">
          Coming Soon
        </span>
      )}
    </>
  );

  return (
    <div className="col-3 text-center">
      {comingSoon ? (
        content
      ) : (
        <Link
          to={link}
          className="text-decoration-none text-dark"
        >
          {content}
        </Link>
      )}
    </div>
  );
}

export default AppCard;