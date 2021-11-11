import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { FiHeart } from "react-icons/fi";
import { GrNext } from "react-icons/gr";
import map from "../../images/staticmap.png";
import { OfferModal } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { productDetailsAction } from "../../actions/productActions";
import { getUserById } from "../../actions/usersAction";
import {
  myProductOffersAction,
  offerDetails,
} from "../../actions/offerActions";
import Loader from "../../components/Loader";
import { useAlert } from "react-alert";
import { Button } from "../../components";
import DeleteModal from "../../components/Modals/DeleteModal";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { createConversation } from "../../actions/conversationAction";

const ProductDetail = ({ match, history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const productId = match.params.productId;

  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { success } = useSelector((state) => state.deleteProduct);
  const { offers, loading: offersLoading } = useSelector(
    (state) => state.myProductOffers
  );

  const { error: createOfferError } = useSelector((state) => state.createOffer);
  const { success: conversationSuccess } = useSelector(
    (state) => state.createConversation
  );

  useEffect(() => {}, [conversationSuccess]);

  useEffect(() => {
    if (createOfferError) {
      alert.error(createOfferError);
    }
  }, [alert, createOfferError]);

  useEffect(() => {
    if (success) {
      history.push(`/profile/${user._id}`);
      alert.success("Product deleted successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [success, dispatch, history, user, alert]);

  useEffect(() => {
    dispatch(productDetailsAction(productId));
    dispatch(myProductOffersAction(productId));
    if (error) {
      return alert.error(error);
    }
  }, [dispatch, productId, alert, error, success]);

  return (
    <section className="container section productdetail">
      <div className="row">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="col-md-8">
              <Carousel pause="hover" className="productdetail__carousel">
                {product &&
                  product.images.map((img) => (
                    <Carousel.Item
                      key={img._id}
                      className="productdetail__carouselItem"
                    >
                      <img
                        className="d-block w-100"
                        src={img.url}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
              <div className="productdetail__description">
                <h4>Description</h4>
                <p>{product && product.description}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="productdetail__info">
                <div className="info--top">
                  <div>
                    <h2>Exchange with - {product && product.exchangeWith}</h2>
                    <p>{product && product.name}</p>
                    <p>Exchange Price: ${product && product.exchangePrice}</p>
                  </div>
                  {user && user._id === product.user._id ? (
                    ""
                  ) : (
                    <FiHeart className="product--saveicon" />
                  )}
                </div>
                {user && user._id === product.user._id ? (
                  <div className="py-2"></div>
                ) : (
                  <div className="info--bottom">
                    <small>{product && product.addressOne}</small>
                    <small>Today</small>
                  </div>
                )}

                {user && user._id === product.user._id ? (
                  <>
                    <Link to={`/edit/product/${product._id}`}>
                      <Button className="button mt-2">Edit</Button>
                    </Link>
                    <Button className="button mt-2" onClick={handleShowDelete}>
                      Delete
                    </Button>
                  </>
                ) : isAuthenticated ? (
                  <button
                    className="sellerInfo--chatBtn mt-2"
                    onClick={handleShow}
                  >
                    Make Offer
                  </button>
                ) : (
                  <Link to="/login">
                    <button className="sellerInfo--chatBtn mt-2">
                      Make Offer
                    </button>
                  </Link>
                )}

                <OfferModal
                  show={show}
                  handleClose={handleClose}
                  productId={product._id}
                  history={history}
                />
                <DeleteModal
                  showDelete={showDelete}
                  handleCloseDelete={handleCloseDelete}
                  productId={productId}
                  userId={user && user._id}
                />
              </div>
              <div className="productdetail__sellerInfo">
                <h3>Seller Description</h3>
                <div className="sellerInfo--user">
                  <div>
                    <img
                      src={product.user && product.user.avatar}
                      alt="avatar"
                    />
                    <div>
                      <h3>{product.user && product.user.username}</h3>
                      <small>Member since Sep 2020</small>
                    </div>
                  </div>
                  <Link
                    to={`/profile/user/${product.user._id}`}
                    onClick={() => dispatch(getUserById(product.user._id))}
                  >
                    <GrNext className="user--profile" />
                  </Link>
                </div>
                {user && user._id === product.user._id ? (
                  ""
                ) : isAuthenticated ? (
                  <Link
                    to="/chat"
                    onClick={() =>
                      dispatch(
                        createConversation({
                          senderId: user._id,
                          receiverId: product.user._id,
                        })
                      )
                    }
                    className="sellerInfo--chatBtn text-center"
                  >
                    Chat with exchanger
                  </Link>
                ) : (
                  <Link to="/login" className="sellerInfo--chatBtn text-center">
                    Chat with exchanger
                  </Link>
                )}
              </div>
              <div className="productdetail__sellerLocation">
                <h4>Posted in</h4>
                <small>{product && product.addressOne}</small>
                <img src={map} alt="Map" />
              </div>
              <h5>AD ID: {product._id}</h5>
            </div>
          </>
        )}
      </div>

      {user && user._id === product.user._id ? (
        <>
          <hr />
          <div className="row my-5">
            <h2>
              Custommer Offers for <strong>"{product && product.name}"</strong>
              {user && user._id === product.user._id
                ? offers.product && (
                    <small className="d-block my-3">
                      You have {offers.product.custommerOffers.length} offers
                    </small>
                  )
                : ""}
            </h2>
            <div className="col-md-10 mt-3">
              {offersLoading ? (
                <Loader />
              ) : user && user._id === product.user._id ? (
                offers.product &&
                offers.product.custommerOffers.map((offer) => (
                  <div className="card mb-3 offer_card">
                    <div className="card-body d-flex">
                      <img
                        src={offer.images[0].url}
                        alt=""
                        width="250"
                        height="180"
                        className="mr-2"
                      />
                      <div className="ml-2">
                        <h3>Offerd for: {offer.name}</h3>
                        <p className="py-3">
                          Phone: <strong>{offer.phone}</strong>
                        </p>
                        <p className="mb-4">
                          {offer.description.slice(0, 150)}...
                        </p>
                        <Link to={`/offer/${offer._id}`} className="py-2">
                          <Button
                            className="button-sm"
                            onClick={() => dispatch(offerDetails(offer._id))}
                          >
                            View Offer
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>noo</p>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </section>
  );
};

export default ProductDetail;
