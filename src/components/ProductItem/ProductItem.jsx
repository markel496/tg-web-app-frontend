import { useState } from 'react'
import Button from '../Button/Button'
import './ProductItem.css'

const ProductItem = ({ product, className, onAdd }) => {
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const onAddHandler = () => {
    onAdd(product)
    setAlreadyAdded(!alreadyAdded)
  }

  return (
    <div className={className ? 'product ' + className : 'product'}>
      <div className="img" />
      <h3 className="title">{product.title}</h3>
      <p className="description">{product.description}</p>
      <div className="price">
        <span>
          Стоимость: <b>{product.price}</b>
        </span>
      </div>
      <Button className="add-btn" onClick={onAddHandler}>
        {!alreadyAdded ? 'Добавить в корзину' : 'Удалить из корзины'}
      </Button>
    </div>
  )
}

export default ProductItem
