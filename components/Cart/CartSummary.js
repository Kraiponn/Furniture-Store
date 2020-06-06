import React from "react";
// import StripeCheckout from "react-stripe-checkout";
import { Button, Segment, Divider } from "semantic-ui-react";

function CartSummary() {
  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> $99.99
        {/* <StripeCheckout
          name="React Reserve"
          amount={stripeAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ""}
          currency="USD"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          stripeKey="pk_test_t7RpkuOEdeYcNPrzs362Xe6Y00MxwtXekY"
          token={handleCheckout}
          triggerEvent="onClick"
        > */}
          <Button
            icon="cart"
            color="teal"
            floated="right"
            content="Checkout"
          />
        {/* </StripeCheckout> */}
      </Segment>
    </>
  );
}

export default CartSummary;
