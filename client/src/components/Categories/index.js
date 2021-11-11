import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const categories = [
  "Electronics",
  "vehicles",
  "Computers",
  "House",
  "Furnitures",
];

const Categories = () => {
  return (
    <div className="categories">
      <ul className="container categories__items">
        <li>
          <strong>CATEGORIES</strong>
        </li>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to="/">{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
