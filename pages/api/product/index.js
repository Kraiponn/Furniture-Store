// import products from '../../static/products.json'
import connecDb from '../../../utils/connectDb'
import Product from '../../../models/Product'

connecDb()

export default async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products)
}