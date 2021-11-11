import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { FiHeart } from "react-icons/fi";
// import { Banner } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  getAllProducts,
  productDetailsAction,
} from "../../actions/productActions";
import Loader from "../../components/Loader";
import Pagination from "react-js-pagination";

const Home = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  const categories = [
    "Electronics",
    "vehicles",
    "Computers",
    "camera",
    "House",
    "Furnitures",
  ];

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const keyword = match.params.keyword;

  useEffect(() => {
    dispatch(getAllProducts(keyword, currentPage, category));
    if (error) {
      return alert.error(error);
    }
  }, [dispatch, alert, error, keyword, currentPage, category]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      <div className="categories">
        <ul className="container categories__items">
          <li>
            <strong>CATEGORIES</strong>
          </li>
          {categories.map((category, index) => (
            <li key={index} onClick={() => setCategory(category)}>
              {category}
            </li>
          ))}
        </ul>
      </div>
      <section>
        {/* <div className="hero">
        <div className="container hero--content">
          <h3>Exchange everything you want</h3>
          <h2>pakistan's first</h2>
          <h1>goods exchange platform</h1>
          <button>learn more</button>
        </div>
      </div>
      <Banner className="hero--banner" /> */}
        <div className="container section">
          <h2 className="pt-4 text-dark">
            Let's See What You are Looking for Today
          </h2>
          <div className="row py-3">
            {loading ? (
              <Loader />
            ) : (
              products &&
              products.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  className="col-md-3 my-2"
                  key={product._id}
                  onClick={() => dispatch(productDetailsAction(product._id))}
                >
                  <div className="card product">
                    <div className="product--top">
                      <img
                        src={product.images[0].url}
                        alt=""
                        className="product--img"
                      />
                      <FiHeart className="product--saveicon" />
                    </div>
                    <div className="card-body product--content">
                      <h3>{product.name}</h3>
                      {/* <p>2006 - 90,000 km</p> */}
                      <p className="card-text text-muted">
                        {product.description.slice(0, 30)}...
                      </p>
                    </div>
                    <div className="product--footer">
                      <small>{product.addressOne}</small>
                      {/* <small>{product.postedAt}</small> */}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {resPerPage <= productsCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page__item"
            linkClass="page__link"
          />
        </div>
      )}
    </>
  );
};

export default Home;
