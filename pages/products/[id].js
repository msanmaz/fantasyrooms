import { useState } from 'react'

import commerce from 'lib/commerce'
import { useCartDispatch } from 'lib/context/cart'

export async function getStaticProps({ params }) {
  const { id } = params

  const product = await commerce.products.retrieve(id)

  return {
    props: {
      product
    },
    revalidate: 60
  }
}

export async function getStaticPaths() {
  const { data: products } = await commerce.products.list()

  return {
    paths: products.map((product) => ({
      params: {
        id: product.id
      }
    })),
    fallback: false
  }
}

export default function ProductPage({ product }) {
  const { setCart } = useCartDispatch()
  const {
    variant_groups: variantGroups,
    assets,
    meta,
    related_products: relatedProducts
  } = product
  const [quantity, setQuantity] = useState(0)
console.log(quantity)
  const addToCart = () => {
    if (quantity > 0) {
      commerce.cart.add(product.id, quantity).then(({ cart }) => setCart(cart))
      setQuantity(0)
    }
  }

  const emptyCart = () =>
    commerce.cart.empty().then(({ cart }) => setCart(cart))

  return (
    <>
      <h1>{product.name}</h1>
      <p>{product.price.formatted_with_symbol}</p>
    
      <button
        onClick={() => {
          if (quantity > 0) {
            setQuantity(quantity - 1)
          }
        }}
      >
        -
      </button>
      {quantity}
      <button onClick={() => setQuantity(quantity + 1)}>+</button>
      <button onClick={addToCart}>Add to Cart</button>
      <button onClick={emptyCart}>Empty Cart</button>
    </>
  )
}






