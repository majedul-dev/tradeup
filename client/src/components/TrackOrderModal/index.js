import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { trackOffer } from "../../actions/offerActions";

const TrackOrderModal = ({ show, handleClose, offerId }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("pending");
  const { loading, success } = useSelector((state) => state.trackOffer);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(trackOffer({ status: selected }, offerId));
  };

  useEffect(() => {}, [success]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Tracking Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="">Tracking Offer ID</label>
              <input
                type="text"
                placeholder="Tracking ID"
                className="form-control"
                value={offerId}
              />
            </div>
            <div className="mt-4">
              <h4>Shipment status</h4>
              <div class="form-check mt-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value="pending"
                  checked={selected === "pending"}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Pending
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  value="shipped"
                  checked={selected === "shipped"}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  Shipped
                </label>
              </div>
            </div>
            <Button className="button mt-3" onClick={handleClose}>
              Close
            </Button>
            <Button
              type="submit"
              disabled={loading ? true : false}
              className={`button mt-3 ${loading ? "disabled" : ""}`}
              onClick={handleClose}
            >
              Track
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TrackOrderModal;
