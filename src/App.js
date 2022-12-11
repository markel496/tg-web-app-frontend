import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTelegram } from './hooks/useTelegram'
import './App.css'
import Form from './components/Form/Form'
import Header from './components/Header/Header'
import ProductList from './components/ProductList/ProductList'

function App() {
  const { tg } = useTelegram()
  useEffect(() => {
    tg.ready() //Приложение полностью проинициализировалось и его можно отрисовывать
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path="form" element={<Form />} />
      </Routes>
    </div>
  )
}

export default App

//После подключения скрипта в head в глобальное поле window добавилось поле telegram. С помощью него буду взаимодействовать с ботом
