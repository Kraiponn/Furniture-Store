import {
  Header,
  Segment,
  Button,
  Icon,
  Item,
  Message
} from "semantic-ui-react";
import { useRouter } from "next/router";

function CartItemList() {
  const router = useRouter();
  let user = false;

  return (
    <Segment secondary color="teal" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          No products in your cart. Add some!
        </Header>
        <div>
          {user ? (
            <Button color="orange" onClick={() => router.push("/")}>
              View Products
            </Button>
          ) : (
            <Button color="blue" onClick={() => router.push("/login")}>
              Login to Add Products
            </Button>
          )}
        </div>
      </Segment>
  )
}

export default CartItemList;
