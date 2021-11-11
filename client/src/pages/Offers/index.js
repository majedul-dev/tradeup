import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { myOffers, deleteOffer } from "../../actions/offerActions";
import { Button } from "../../components";
import { Link } from "react-router-dom";

const Offers = () => {
  const dispatch = useDispatch();
  const { offers, loading } = useSelector((state) => state.myOffers);
  const { success } = useSelector((state) => state.deleteOffer);

  useEffect(() => {
    dispatch(myOffers());
  }, [dispatch, success]);

  return (
    <section className="container section">
      <h3 className="my-3">Your Offers</h3>
      {loading ? (
        <Loader />
      ) : (
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">Offer ID</th>
              <th scope="col">You Offerd</th>
              <th scope="col">Offerd for</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers &&
              offers.map((offer) => (
                <tr key={offer._id}>
                  <th scope="row">{offer._id}</th>
                  <td>{offer.name}</td>
                  <td>{offer.product.name}</td>
                  <td className={offer.status === "pending" ? "red" : "green"}>
                    {offer.status}
                  </td>
                  <td>
                    <Link to={`/offer/my/${offer._id}`}>
                      <Button className="button-sm">View</Button>
                    </Link>
                    <Button
                      className="button-sm"
                      onClick={() => dispatch(deleteOffer(offer._id))}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Offers;
