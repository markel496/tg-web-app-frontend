import { useState, useEffect, useCallback } from 'react'
import './ProductList.css'
import ProductItem from '../ProductItem/ProductItem'
import { useTelegram } from '../../hooks/useTelegram'

const products = [
  {
    id: '1',
    title: 'Джинсы',
    price: 5000,
    description: 'Синего цвета, прямые'
  },
  {
    id: '2',
    title: 'Куртка',
    price: 12000,
    description: 'Зеленого цвета, теплая'
  },
  {
    id: '3',
    title: 'Джинсы 2',
    price: 5000,
    description: 'Синего цвета, прямые'
  },
  {
    id: '4',
    title: 'Куртка 8',
    price: 122,
    description: 'Зеленого цвета, теплая'
  },
  {
    id: '5',
    title: 'Джинсы 3',
    price: 5000,
    description: 'Синего цвета, прямые'
  },
  {
    id: '6',
    title: 'Куртка 7',
    price: 600,
    description: 'Зеленого цвета, теплая'
  },
  {
    id: '7',
    title: 'Джинсы 4',
    price: 5500,
    description: 'Синего цвета, прямые'
  },
  {
    id: '8',
    title: 'Куртка 5',
    price: 12000,
    description: 'Зеленого цвета, теплая'
  }
]

const getTotalPrice = (products) => {
  return products.reduce((sum, current) => sum + current.price, 0)
}

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([])
  const { tg, queryId } = useTelegram()

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id)
    let newItems = []

    newItems = alreadyAdded
      ? addedItems.filter((item) => item.id !== product.id)
      : [...addedItems, product]

    setAddedItems(newItems)

    if (newItems.length) {
      tg.MainButton.show()
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`
      })
    } else {
      tg.MainButton.hide()
    }
  }

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId
    }

    fetch(`${process.env.REACT_APP_API_URL}/web-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' //Отправляю данные в формате JSON
      },
      body: JSON.stringify(data)
    })
  }, [addedItems])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)

    //отписываюсь от слушателя события при демонтировании компонента
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  return (
    <div className="list">
      {products.map((item) => (
        <ProductItem
          key={item.id}
          product={item}
          onAdd={onAdd}
          className="item"
        />
      ))}
    </div>
  )
}

export default ProductList
