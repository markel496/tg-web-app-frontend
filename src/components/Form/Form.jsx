import { useEffect, useCallback, useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import './Form.css'

const Form = () => {
  const [country, setCountry] = useState('')
  const [street, setStreet] = useState('')
  const [subject, setSubject] = useState('')

  const { tg } = useTelegram()

  const changeCountry = (e) => {
    setCountry(e.target.value)
  }

  const changeStreet = (e) => {
    setStreet(e.target.value)
  }

  const changeSubject = (e) => {
    setSubject(e.target.value)
  }

  //useCallback - для сохранения ссылки на функцию, чтобы при каждой перерисовке функция не создавалась снова
  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject
    }
    //Передаю в бота преобразованные к строке данные
    tg.sendData(JSON.stringify(data))
  }, [country, street])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)

    //отписываюсь от слушателя события при демонтировании компонента
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить'
    })
  }, [])

  useEffect(() => {
    !country || !street ? tg.MainButton.hide() : tg.MainButton.show()
  }, [country, street])

  return (
    <div className="form">
      <h3>Введите свои данные</h3>
      <input
        value={country}
        onChange={changeCountry}
        type="text"
        className="input"
        placeholder="Страна"
      />
      <input
        value={street}
        onChange={changeStreet}
        type="text"
        className="input"
        placeholder="Улица"
      />
      <select value={subject} onChange={changeSubject} className="select">
        <option value="physical">Физ. лицо</option>
        <option value="legal">Юр. лицо</option>
      </select>
    </div>
  )
}

export default Form
