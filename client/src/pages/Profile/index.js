import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { myProducts } from "../../actions/productActions";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products, loading } = useSelector((state) => state.myProducts);

  useEffect(() => {
    dispatch(myProducts());
  }, [dispatch]);

  return (
    <section className="section container profile">
      <div className="row">
        <div className="col-md-4">
          <div className="profile__info">
            <img src={user.avatar && user.avatar} alt="" />
            <div>
              <h2>{user.username}</h2>
              <small>Member since Sep 2020</small>
            </div>
            <Link to="/edit-profile" className="profile__btn">
              Edit Profile
            </Link>
          </div>
        </div>
        <div className="col-md-8">
          <h3>Your all AD</h3>
          {!loading && products.length === 0 && (
            <h2 className="display-2 text-muted mt-5">
              You have no Exchanges!
            </h2>
          )}
          <div className="row py-3">
            {loading ? (
              <Loader />
            ) : (
              products &&
              products.map((product) => (
                <>
                  <Link
                    to={`/product/${product._id}`}
                    className="col-md-4"
                    key={product.id}
                  >
                    <div className="card mb-4">
                      <div className="product--top">
                        <img
                          src={product.images[0].url}
                          alt="avatar"
                          className="product--img"
                        />
                        {/* <HiOutlineDotsVertical
                          onClick={productActions(product._id)}
                          className="product--saveicon"
                        /> */}
                      </div>
                      <div className="card-body product--content">
                        <h3>{product.name}</h3>
                        {/* <p>2006 - 90,000 km</p> */}
                        <p className="card-text text-muted">
                          {product.description.slice(0, 25)}...
                        </p>
                      </div>
                      <div className="product--footer">
                        <small>{product.addressOne}</small>
                        {/* <small>{product.postedAt}</small> */}
                      </div>
                    </div>
                  </Link>
                </>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
