import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createOfferAction } from "../../actions/offerActions";
import { useAlert } from "react-alert";
import { Button } from "../../components";

const OfferModal = ({ show, handleClose, productId, history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const { success, loading, error } = useSelector((state) => state.createOffer);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (success) {
      history.push("/offers");
    }
  }, [success, history, alert, error]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setPreviewImages([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImages((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("phone", phone);
    formData.set("description", description);

    images.forEach((img) => {
      formData.append("images", img);
    });

    dispatch(createOfferAction(formData, productId));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create an offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitHandler}>
            <div className="form-group mb-3">
              <label htmlFor="">Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                width="100%"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Phone</label>
              <input
                className="form-control"
                type="text"
                placeholder="Mobile Number"
                width="100%"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Description</label>
              <textarea
                rows="5"
                className="form-control"
                placeholder="Description"
                style={{ width: "100%" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <h4 className="text-muted mb-2">Upload pictures of product</h4>
              <input
                type="file"
                className="form-control-file"
                multiple
                name="images"
                onChange={onChange}
              />
            </div>
            {previewImages.map((img) => (
              <img
                src={img}
                key={img}
                alt="Images preview"
                className="mr-2"
                width="55"
                height="52"
              />
            ))}
            <div className="mt-4">
              <button
                type="submit"
                disabled={loading ? true : false}
                className={`button mt-3 ${loading ? "disabled" : ""}`}
                onClick={success ? handleClose : ""}
              >
                Send Offer
              </button>
              <Button className="button" onClick={handleClose}>
                Close
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OfferModal;
