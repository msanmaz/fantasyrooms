import React from 'react'
import ProductImages from './productImage'

export default function Product({ name, price }) {
  return (
    <React.Fragment>
      {name}: {price.formatted_with_symbol}
    </React.Fragment>
  )
}
