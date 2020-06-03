import { Item } from "semantic-ui-react";
import AddProductToCart from "./AddProductToCart";

function ProductSummary({ _id, name, price, mediaUrl, sku }) {
  return (
    <Item.Group>
      <Item>
        <Item.Image src={mediaUrl} size="medium" />
        <Item.Content>
          <Item.Header>{name}</Item.Header>
          <Item.Description>
            <p>${price}</p>
            <label>SKU: {sku}</label>
          </Item.Description>

          <Item.Extra>
            <AddProductToCart productId={_id} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default ProductSummary;
