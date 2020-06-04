import React, { Fragment, useState } from "react";
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

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  description: "",
  mediaUrl: "",
};

export default function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    console.log(product.mediaUrl)

    let data = new FormData();
    data.append("file", product.mediaUrl);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESENT
    );
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_NAME);

    let mediaUrl;
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_URL,
        data
      );
      mediaUrl = response.data.url;
      console.log("handleUploadImage", response.data.url);

      return mediaUrl;
    } catch (error) {
      console.log(error)
      console.log(error.response)
    }
    return 'no mediaUrl';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(false);

    try {
      const { name, price, description } = product;
      const mediaUrl = await handleUploadImage();
      const payload = { name, price, description, mediaUrl };

      console.log("payload", payload);

      setProduct(INITIAL_PRODUCT);
      setMediaPreview("");
      setSuccess(true);
    } catch (error) {
      setError(error.message);
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
      <Form success={success} loading={loading} onSubmit={handleSubmit}>
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
        />
      </Form>
    </Fragment>
  );
}
