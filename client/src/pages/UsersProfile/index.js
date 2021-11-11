import React, { useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../actions/usersAction";
import { usersProducts } from "../../actions/productActions";
import Loader from "../../components/Loader";
import avatar from "../../images/no-image.JPG";

const UsersProfile = ({ match }) => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.getUserById);
  const { products, loading: productsLoading } = useSelector(
    (state) => state.usersProducts
  );

  useEffect(() => {
    dispatch(getUserById(match.params.profileId));
    dispatch(usersProducts(match.params.profileId));
  }, [dispatch, match]);
  return (
    <section className="section profile">
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <div className="profile__userInfo">
            <img src={user ? user.avatar.url : avatar} alt="" />
            <div>
              <h3>{user ? user.username : "Mazedul Islam"}</h3>
              <p>Location: Magura Khulna Bangladesh</p>
            </div>
          </div>
        )}
        <div className="profile__postedAd">
          <div className="row">
            <h4 className="mb-3">Published Exchanges</h4>
            {productsLoading ? (
              <Loader />
            ) : (
              products &&
              products.map((product) => (
                <div className="col-md-3 col-sm-6">
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className="col-md-3 my-2"
                  >
                    <div className="card product">
                      <div className="product--top">
                        {/* {product.images.map((img, index) => ( */}
                        <img
                          src={product.images[0].url}
                          alt=""
                          className="product--img"
                        />
                      </div>
                      <div className="card-body product--content">
                        <h3>Exchange with R15 V4</h3>
                        <p className="card-text text-muted">{product.name}</p>
                      </div>

                      <div className="product--footer">
                        <small>Today</small>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsersProfile;
