import { Card, Image } from "semantic-ui-react";

function ProductList({ products }) {
  const mapProductToItems = () => {
    let productItem = !products ? (
      <div>Loading...</div>
    ) : (
      products.map((p) => (
        <Card
          key={p._id}
          link={true}
          color="teal"
          href={`/product?_id=${p._id}`}
        >
          <Image src={p.mediaUrl} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{p.name}</Card.Header>
            <Card.Meta>{p.price}</Card.Meta>
          </Card.Content>
        </Card>
      ))
    );

    return productItem;
  };

  return (
    <Card.Group centered stackable itemsPerRow={3}>
      {mapProductToItems()}
    </Card.Group>
  );
}

export default ProductList;
