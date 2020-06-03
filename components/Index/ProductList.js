import { Card, Image } from "semantic-ui-react";
import Link from "next/link";

function ProductList({ products }) {
  const mapProductToItems = () => {
    let productItem = !products ? (
      <div>Loading...</div>
    ) : (
      products.map((p) => (
        <Link href={`/product/${p._id}`} key={p._id}>
        {/* // <Link href="/product/[id]" as={`/product/${p._id}`} key={p._id}> */}
          <Card link={true} color="teal">
            <Image src={p.mediaUrl} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{p.name}</Card.Header>
              <Card.Meta>{p.price}</Card.Meta>
            </Card.Content>
          </Card>
        </Link>
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
