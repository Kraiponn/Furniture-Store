import React, { Fragment, useState, useEffect } from "react";
import {
  Header,
  Form,
  Icon,
  Input,
  Image,
  Message,
  Button,
  TextArea,
} from "semantic-ui-react";
import axios from "axios";
import shortId from "shortid";
import CatchErrors from "../../utils/catchErrors";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  description: "",
  mediaUrl: "",
};

export default function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    let isProduct = Object.values(product).every(el => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);

  const handlerChange = (event) => {
    const { name, value, files } = event.target;
    setSuccess(false);

    if (name === "mediaUrl") {
      setMediaPreview(window.URL.createObjectURL(files[0]));
      setProduct((prev) => ({ ...prev, mediaUrl: files[0] }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }

    // console.log(product)
  };

  const handleUploadImage = async () => {
    let data = new FormData();
    data.append("file", product.mediaUrl);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_NAME);

    let mediaUrl;
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_URL,
        data
      );
      mediaUrl = response.data.url;
      // console.log("handleUploadImage", response.data.url);
    } catch (error) {
      mediaUrl = "";
      CatchErrors(error, setError);
    } finally {
      return mediaUrl;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(false);

    try {
      const { name, price, description } = product;
      const mediaUrl = await handleUploadImage();

      if (!mediaUrl) {
        return;
      }

      const sku = shortId.generate();

      const payload = { name, price, description, mediaUrl, sku };

      // console.log("payload", payload);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/product`,
        payload
      );
      // console.log("Result post product", response.data);

      setProduct(INITIAL_PRODUCT);
      setMediaPreview("");
      setSuccess(true);
    } catch (error) {
      CatchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>

      <Form
        success={success}
        loading={loading}
        error={Boolean(error)}
        onSubmit={handleSubmit}
      >
        <Message error header="!Oop something went wrong." content={error} />
        <Message header="Product added successfully" icon="check" success />

        <Form.Group>
          <Form.Field
            control={Input}
            label="Product name"
            name="name"
            value={product.name}
            onChange={handlerChange}
            placeholder="name"
            type="text"
          />
          <Form.Field
            control={Input}
            label="Price"
            name="price"
            value={product.price}
            onChange={handlerChange}
            placeholder="price"
            type="number"
            min="0.00"
            step="0.01"
          />
          <Form.Field
            control={Input}
            label="Media"
            type="file"
            name="mediaUrl"
            onChange={handlerChange}
            content="Select media"
            accept="image/*"
          />
        </Form.Group>

        <Image src={mediaPreview} rounded centered size="small" />

        <Form.Field
          control={TextArea}
          label="Description"
          name="description"
          value={product.description}
          onChange={handlerChange}
          placeholder="description"
        />

        <Form.Field
          control={Button}
          type="submit"
          content="Submit"
          color="blue"
          icon="pencil alternate"
          disabled={disabled || loading}
        />
      </Form>
    </Fragment>
  );
}
