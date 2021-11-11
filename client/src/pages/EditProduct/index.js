import React, { useState, useEffect } from "react";
import "./style.css";
import { Button } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { updateProduct } from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const EditProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product } = useSelector((state) => state.productDetails);
  const { user } = useSelector((state) => state.auth);
  const { success, loading, error } = useSelector(
    (state) => state.updateProduct
  );

  const [category, setCategory] = useState(product.category);
  const [name, setName] = useState(product.name);
  const [exchangeWith, setExchangeWith] = useState(product.exchangeWith);
  const [exchangePrice, setExchangePrice] = useState(product.exchangePrice);
  const [estimatedShippingDay, setEstimatedShippingDay] = useState(
    product.estimatedShippingDay
  );
  const [description, setDescription] = useState(product.description);
  const [addressOne, setAddressOne] = useState(product.addressOne);
  const [addressTwo, setAddressTwo] = useState(product.addressTwo);
  const [phone, setPhone] = useState(product.phone);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState(product.images);
  const [previewImages, setPreviewImages] = useState([]);

  const categories = [
    "Electronics",
    "vehicles",
    "Computers",
    "House",
    "Furnitures",
  ];

  useEffect(() => {
    // dispatch(createProduct())
    if (error) {
      alert.error(error);
      // dispatch(clearErrors());
    }
    if (success) {
      history.push(`/profile/${user._id}`);
      alert.success("Product updated successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, history, user, success, error]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setPreviewImages([]);
    setImages([]);
    setOldImages([]);

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
    formData.set("category", category);
    formData.set("name", name);
    formData.set("exchangeWith", exchangeWith);
    formData.set("exchangePrice", exchangePrice);
    formData.set("estimatedShippingDay", estimatedShippingDay);
    formData.set("description", description);
    formData.set("addressOne", addressOne);
    formData.set("addressTwo", addressTwo);
    formData.set("phone", phone);

    images.forEach((img) => {
      formData.append("images", img);
    });

    dispatch(updateProduct(formData, product._id));
  };

  return (
    <section className="section container post">
      <div className="row">
        <div className="">
          <h3 className="text-center">Update Your Product Details</h3>
          <form className="post__form" onSubmit={submitHandler}>
            <h4>Change Anything</h4>
            <div className="form-group">
              <label>Select Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Product Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Exchange With</label>
              <input
                className="form-control"
                type="text"
                placeholder="Exchange for"
                name="exchangeWith"
                value={exchangeWith}
                onChange={(e) => setExchangeWith(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Exchange Price</label>
              <input
                className="form-control"
                type="number"
                placeholder="Exchange price"
                name="exchangePrice"
                value={exchangePrice}
                onChange={(e) => setExchangePrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Estimated day of shipping</label>
              <input
                className="form-control"
                type="date"
                placeholder="Estimated days of shipping"
                name="estimatedShippingDay"
                value={estimatedShippingDay}
                onChange={(e) => setEstimatedShippingDay(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name=""
                id=""
                cols="30"
                rows="5"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <h4>Upload photos</h4>
            <div class="form-group">
              {/* <label>Upload photos</label> */}
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
                name="images"
                onChange={onChange}
                multiple
              />
            </div>

            {oldImages.map((img) => (
              <img
                src={img.url}
                key={img}
                alt="Images preview"
                className="mr-2"
                width="55"
                height="52"
              />
            ))}

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

            <h4>Your address</h4>
            <div className="form-group">
              <label>Address one</label>
              <input
                className="form-control"
                type="text"
                placeholder="Address one"
                name="addressOne"
                value={addressOne}
                onChange={(e) => setAddressOne(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Address two</label>
              <input
                className="form-control"
                type="text"
                placeholder="Address two"
                name="addressTwo"
                value={addressTwo}
                onChange={(e) => setAddressTwo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                className="form-control"
                type="text"
                placeholder="Phone number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button
              disabled={loading ? true : false}
              type="submit"
              className={`button mt-3 ${loading ? "disabled" : ""}`}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
