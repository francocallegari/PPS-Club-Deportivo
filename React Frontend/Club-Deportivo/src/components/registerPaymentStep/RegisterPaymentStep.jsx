import React, { useEffect, useState } from 'react'
import PaymentMethod from '../paymentMethod/PaymentMethod'
import { Button, Image } from 'react-bootstrap'

const RegisterPaymentStep = ({ handleResponse }) => {
  const [price, setPrice] = useState(0)

  const getCurrentRatePrice = async () => {
    try {
      const response = await fetch("https://localhost:7081/api/MemberShipFee/CurrentRatePrice", {
        method: "GET",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        const data = await response.json()
        setPrice(data)
      } else {
        throw new Error("Error al obtener el precio de la cuota");
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    getCurrentRatePrice()
  }, [])

  const handleButtonClick = () => {  // simulando obtener respuesta del payment
    const responseFromApi = "OK"
    handleResponse(responseFromApi)
  }

  return (
    <div style={{ minHeight: '600px', display: 'flex', justifyContent: 'center' }}>
      <div className='paymentDiv'>
        <Image className='mp-image' src='data:image/jpeg;base64,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YMNa0ei4trTad57tD2UDivjdXbNrOkRSDLJWsjeAcEtdNgjPpwV1uHWmuLJMffR5skLHg1JK9kUutTyUIXfuq72Oe+NnYNbl+xpxxkN+3ovEcRiI3jHHN5p5Vh6x8NoNRqU69eQ036e3y6zw0yN8vjLXDIJOWg5znOe+VRg1lsV5tMb79yYQs3hXauyRHV9cmtQw9omscCR8nOdhpPqdpKtjX0xxPoscRJt5y2fFenpbalSnedJTMbC2hPDXfM2JrQ1pjIHduNmRkHgcrzorZuebU6+cbk7Oc9ZaVXr0WySdQHWLLyxtOJkxkZWjzl8jgXuI4aG445PrjjoafJe2TaMfLHj07/CEe907TeiI9S6b02ldD4pY4WyxStGJIHOy7se4LXAEH9CARzbam2LUWvTz/lO3RCDwdsyNjr2NdmkpREbYBHKWtA9GsdIWsOPkcK78xrE81ccRPn9wcrqGiaVFQrRVKzNkMLdrRnJPqXE+pJJJ+q518lr2m1u8p2bq8ggICAgICAgICAgICDKAgICAgICAgKBpano9e40Nt1YbDR2E0TJNv0JHH2Xul7U61nYVa34UaTKSfY3RE9/KsTtH2aXED8lprr88dOZG0NL/AOmdLznFn6e08f8Aivf5jn84/g2hu1PCjSYiHexGUjt5tid4+7d2D9wvFtfnn/sbQtWmaTXpt2VK0Ndp7iGJkWfrgc/dZr3tfrad0txeQQEGjc0atYmisT1opZ4MeTLJG174iDkFpPYg8r1W9qxMRPSRvLyCAgjtd0OvqMBr3YGzRE7gHZDmO9HNcOWnk8g+pXvHkvjnmpO0mys6Z4UaXWmbOK75XMcHMZNM6SNpHb3ezvvlaL6/PevLMo2hd1kSICAgICAgICAgICAgICAgygICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDKhIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIMqEiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgygICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD//Z'></Image>
        <h3>Monto a pagar: ${price}</h3>
        <Button variant='dark' onClick={handleButtonClick}>Pagar</Button>
        {/*{price != 0 && <PaymentMethod monto={price}></PaymentMethod>}*/}
        
      </div>
    </div>
  )
}

export default RegisterPaymentStep