import React, { useEffect, useState } from "react";
import "../ProductDetail/style.css";
import "./style.css";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { offerDetails } from "../../actions/offerActions";
import Loader from "../../components/Loader";
import TrackOrderModal from "../../components/TrackOrderModal";

const MyOfferDetails = ({ match }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const { offer, loading } = useSelector((state) => state.offerDetails);
  const { success } = useSelector((state) => state.trackOffer);

  useEffect(() => {
    dispatch(offerDetails(match.params.id));
  }, [dispatch, match, success]);

  return (
    <section className="container section">
      <h2>My Offer </h2>
      <div className="row my-4">
        {loading ? (
          <Loader />
        ) : (
          <div className="col-md-8">
            <Carousel pause="hover" className="productdetail__carousel">
              {offer.images &&
                offer.images.map((img) => (
                  <Carousel.Item
                    key={img}
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
              <p>{offer.description}</p>
            </div>
          </div>
        )}
        <div className="col-md-4">
          <div className="user-info box-wrapper">
            <h4>User Info</h4>
            <div className="mt-2">
              <img
                src={offer.user && offer.user.avatar}
                alt="avatar"
                className="mr-2"
              />
              <div>
                <h3 className="mb-2">{offer.user.username}</h3>
                <h4>Phone: {offer.phone}</h4>
              </div>
            </div>
          </div>
          <div className="product-info box-wrapper">
            <h3>Name: {offer.name}</h3>
            <div className="my-2 offer--status">
              Status:{" "}
              <p className={offer.status === "pending" ? "red" : "green"}>
                {offer.status}
              </p>
            </div>
            <h4>Offer ID: {offer._id}</h4>
          </div>
        </div>
        <TrackOrderModal
          show={show}
          handleClose={handleClose}
          offerId={offer._id}
        />
      </div>

      <hr />

      <h2>Offerd Product</h2>
      <div className="row my-4">
        {loading ? (
          <Loader />
        ) : (
          <div className="col-md-8">
            <Carousel pause="hover" className="productdetail__carousel">
              {offer.product.images &&
                offer.product.images.map((img) => (
                  <Carousel.Item
                    key={img}
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
              <p>{offer.product.description}</p>
            </div>
          </div>
        )}
        <div className="col-md-4">
          <div className="product-info box-wrapper">
            <h3>Name: {offer.product.name}</h3>

            <h4>Offer ID: {offer.product._id}</h4>
          </div>
        </div>
        <TrackOrderModal
          show={show}
          handleClose={handleClose}
          offerId={offer._id}
        />
      </div>
    </section>
  );
};

export default MyOfferDetails;
