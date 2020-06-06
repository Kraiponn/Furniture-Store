// import products from '../../static/products.json'
import connecDb from '../../../utils/connectDb'
import Product from '../../../models/Product'

connecDb()

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

async function handlePostRequest(req, res) {
  const { name, price, description, mediaUrl } = req.body;

  if(!name || !price || !description || !mediaUrl) {
    return res.status(422).json('Invalid some field value');
  }

  const payload = req.body;
  const product = await Product.create(payload);

  res.status(201).json(product);
}

async function handleGetRequest(req, res) {
  const product = await Product.find();
  res.status(200).json(product);
}

// export default async (req, res) => {
//   const products = await Product.find();

//   res.status(200).json(products)
// }