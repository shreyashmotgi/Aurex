import React from "react";
import { Link } from "react-router-dom";

function MenuSection({ title, links }) {
  return (
    <div className="col-4">

      <h5>{title}</h5>

      <ul className="list-unstyled mt-3">

        {links.map((item) => (
          <li key={item.name} className="mt-2">

            <Link
              to={item.link}
              className="text-decoration-none text-dark"
            >
              {item.name}
            </Link>

          </li>
        ))}

      </ul>

    </div>
  );
}

export default MenuSection;