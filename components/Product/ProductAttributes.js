import { Header, Button, Modal } from "semantic-ui-react";
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

function ProductAttributes({ description, _id }) {
  // console.log('ProductAttributes', description, _id)
  const [modal, setModal] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/product/${_id}`

    const response = await axios.delete(url);
    // console.log('delete product', response.data)

    // setModal(false)
    router.push('/')
  }

  return (
    <>
      <Header as="h1">About This Product</Header>
      <p>{description}</p>
      <Button
        icon="trash alternate outline"
        color="red"
        content="Delete Product"
        onClick={() => setModal(true)}
      />

      <Modal open={modal} dimmer="blurring">
        <Header icon="trash" content="Confirm delete" />
        <Modal.Content>
          <p>Are you sure you want to delete this product?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button 
            onClick={() => setModal(false)}
            content="Cancel" />
          <Button
            negative
            icon="trash"
            content="Delete product"
            labelPosition="right"
            onClick={handleDelete}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ProductAttributes;
