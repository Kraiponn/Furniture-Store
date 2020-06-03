import Product from "../../../models/Product";
import connecDb from "../../../utils/connectDb";

connecDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

async function handleGetRequest(req, res) {
  console.log("api id", req.query);

  const product = await Product.findById(req.query.id);
  // console.log("Result product: ", product);

  res.status(200).json(product);
  // res.status(200).json({ product: {} })
}

async function handleDeleteRequest(req, res) {
  // const { id } = req.query;
  await Product.findByIdAndDelete(req.query.id);

  res.status(204).json({ success: true, data: "Product deleted successfully" });
}

// 5ed549938993d95974c4937a
// export default async (req, res) => {
//   const product = await Product.findById(req.query._id);
//   // console.log('product api')

//   res.status(200).json(product)
// }
