import axios from 'axios'
import ProductSummary from '../../components/Product/ProductSummary'
import ProductAttributes from '../../components/Product/ProductAttributes'


function Product({ product }) {
  // console.log('client side ', product)

  return (
    <>
      <ProductSummary {...product}/>
      <ProductAttributes {...product}/>
    </>
  )
}


export const getStaticPaths = async () => {
  // console.log('Product getStaticPaths: ')
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products`
  const response = await axios.get(url)

  const paths = response.data.map(product => ({
    params: { id: product._id }
  }))

  // const paths = [ { params: { id: '1' } } ]

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  console.log('Product getStaticProps: ', params)
  
  // const url = `${process.env.NEXT_PUBLIC_API_URL}/product?_id=${params.id}`
  const url = `${process.env.NEXT_PUBLIC_API_URL}/product/${params.id}`
  // const payload = { _id: params.id }

  const response = await axios.get(url) || {}

  console.log('after api: ', response.data)

  return {
    props: {
      product: response.data
    }
  }
}

export default Product;