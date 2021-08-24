import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {
  saveShippingAddress,
  savePaymentMethod,
  removeFromCart,
} from '../actions/cartAction'

import { CheckoutSteps } from '../components/index'
import { createOrder } from '../actions/orderAction'
import { ORDER_CREATE_RESET } from '../constant/orderContant'

const ShippingAddress = () => {
  const userSignIn = useSelector((state) => state.userSignIn)
  const cart = useSelector((state) => state.cart)
  const history = useHistory()
  const [currentStep, setCurrentStep] = useState(2)

  const { userInfo } = userSignIn
  if (!userInfo) {
    history.push('/login')
  }

  const { shippingAddress } = cart

  // Address useState
  const [fullName, setFullName] = useState(shippingAddress.fullName)
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  // Payment useState
  const [paymentMethod, setPaymentMethod] = useState('Paypal')

  const dispatch = useDispatch()

  const handleSubmitAddress = (e) => {
    e.preventDefault()
    const data = {
      fullName,
      address,
      city,
      postalCode,
      country,
    }
    dispatch(saveShippingAddress(data))
    setCurrentStep(3)
  }

  const handleSubmitPayment = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    setCurrentStep(4)
  }

  // Order Detail
  const orderCreate = useSelector((state) => state.orderCreate)
  const { loading, success, error, order } = orderCreate
  const toPrice = (num) => Number(num.toFixed(2))
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  )

  cart.shippingPrice = cart.itemsPrice > 200 ? toPrice(0) : toPrice(9)

  cart.taxPrice = toPrice(0.06 * cart.itemsPrice)

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }))
  }

  const handleEditProfile = () => {
    history.push('/profile')
  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [dispatch, order, success])

  return (
    <Container>
      <CheckoutSteps
        step1={true}
        step2={true}
        step3={currentStep}
        step4={currentStep}
      />
      {currentStep === 2 && (
        <AddressForm onSubmit={(e) => handleSubmitAddress(e)}>
          <h1>Shpping Address</h1>
          <CardContainer>
            <InputContainer>
              <h2>Full Name</h2>
              <input
                type='text'
                placeholder='Enter Full Name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </InputContainer>
            <InputContainer>
              <h2>Address</h2>
              <input
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </InputContainer>
            <InputContainer>
              <h2>City</h2>
              <input
                type='text'
                placeholder='Enter State Name'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </InputContainer>
            <InputContainer>
              <h2>PostalCode</h2>
              <input
                type='text'
                placeholder='Enter Postalcode'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </InputContainer>
            <InputContainer>
              <h2>Country</h2>
              <input
                type='text'
                placeholder='Enter Country Name'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </InputContainer>
            <button>Comfirm And Continue</button>
          </CardContainer>
        </AddressForm>
      )}
      {currentStep === 3 && (
        <PaymentContainer onSubmit={(e) => handleSubmitPayment(e)}>
          <TitleCOntainer>
            <h1>Payment Method</h1>
            <div
              onClick={() => setCurrentStep(currentStep - 1)}
              className='flex items-center back-btn hover:-translate-x-2'
            >
              <i class='fas fa-chevron-left'></i>
              <h2>Back</h2>
            </div>
          </TitleCOntainer>
          <CardContainer>
            <RadioContainer>
              <input
                type='radio'
                id='paypal'
                value='Paypal'
                name='paymentMethod'
                required
                onClick={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor='paypal'>
                Paypal <i className='fab fa-paypal'></i>
              </label>
            </RadioContainer>
            <RadioContainer>
              <input
                type='radio'
                id='stripe'
                value='Stripe'
                name='paymentMethod'
                required
                onClick={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor='stripe'>
                Stripe <i className='fab fa-cc-stripe'></i>
              </label>
            </RadioContainer>
            <button>Comfirm and continue</button>
          </CardContainer>
        </PaymentContainer>
      )}
      {currentStep === 4 && (
        <OrderSumContainer>
          <TitleCOntainer>
            <h1>Order Detail</h1>
            <div
              onClick={() => setCurrentStep(currentStep - 1)}
              className='flex items-center back-btn hover:-translate-x-2'
            >
              <i className='fas fa-chevron-left'></i>
              <h2>Back</h2>
            </div>
          </TitleCOntainer>
          <InnerContainer>
            <OrderLeftInfo className='overflow-hidden overflow-y-auto scrollbar-hide'>
              {cart.cartItems.map((item) => {
                const { name, image, price, quantity, countInStock, product } =
                  item

                return (
                  <ItemCard key={product}>
                    <ItemCardLeft>
                      <ItemImage>
                        <img src={image} alt='' />
                      </ItemImage>
                      <ItemInfo>
                        <h1>{name}</h1>
                        <p>Only {countInStock} in stock</p>
                      </ItemInfo>
                    </ItemCardLeft>
                    <ItemCardRight>
                      <ItemPriceQty>
                        <div className='flex flex-row items-center md:flex-col'>
                          <h1>$ {price}</h1>
                          <h2>Qty: {quantity}</h2>
                          <i
                            onClick={() => handleRemoveItem(product)}
                            className='far fa-trash-alt'
                          ></i>
                        </div>
                      </ItemPriceQty>
                    </ItemCardRight>
                  </ItemCard>
                )
              })}
            </OrderLeftInfo>
            <OrderRightSum>
              <h1>Shipping And Billing</h1>
              <OrderInfoCard>
                <div>
                  <h2>{cart.shippingAddress.fullName}</h2>
                  <p>
                    {cart.shippingAddress.address},{cart.shippingAddress.city},
                    {cart.shippingAddress.postalCode},
                    {cart.shippingAddress.country}
                  </p>
                </div>
                <h3 onClick={() => setCurrentStep(2)}>Edit</h3>
              </OrderInfoCard>
              <OrderInfoCard>
                <h2>{userInfo.email}</h2>
                <h3 onClick={handleEditProfile}>Edit</h3>
              </OrderInfoCard>
              <OrderInfoCard>
                <h2>{cart.paymentMethod}</h2>
                <h3 onClick={() => setCurrentStep(3)}>Edit</h3>
              </OrderInfoCard>
              <h1 className='mt-8'>Order Summary</h1>
              <SummaryList>
                <h3>
                  Subtotal ({cart.cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                  items)
                </h3>
                {/* <h2>${cart.itemsPrice}</h2> */}
              </SummaryList>
              <SummaryList>
                <h3>Shipping Fee</h3>
                <h2>$ {cart.shippingPrice}</h2>
              </SummaryList>
              <SummaryList>
                <h3>Tax Fee</h3>
                <h2>$ {cart.taxPrice}</h2>
              </SummaryList>
              <SummaryList className='mt-4'>
                <h3 className='text-black font-semibold'>Total</h3>
                <h1>$ {cart.totalPrice}</h1>
              </SummaryList>
              <button onClick={(e) => handlePlaceOrder(e)}>Place Order</button>
              {loading && (
                <div className='py-2 text-green-400'>
                  Processing Your order...
                </div>
              )}
              {error && <div>{error}</div>}
            </OrderRightSum>
          </InnerContainer>
        </OrderSumContainer>
      )}
    </Container>
  )
}

const Container = styled.div`
  ${tw`
    px-4
    lg:px-0
    mx-auto
    w-full
    md:max-w-4xl
  `}

  h1 {
    ${tw`
        text-lg
        md:text-xl
        lg:text-2xl
    `}
  }

  button {
    ${tw`
        mt-4
        w-full
        py-1
        text-base
        md:text-lg
        font-semibold
        text-white
        bg-yellow-500
        hover:bg-yellow-400
        transition
        duration-200
        ease-in
    `}
  }
`

const AddressForm = styled.form`
  ${tw`
    pt-16
    mx-auto
    w-full
    md:max-w-xl
  `}
`

const InputContainer = styled.div`
  ${tw`
    mb-5
  `}

  h2 {
    ${tw`
        pb-2
    `}
  }

  input {
    ${tw`
        w-full
        py-1
        px-2
        border
        bg-none
        focus:outline-none
    `}
  }
`

const CardContainer = styled.div`
  ${tw`
    mt-4
    py-6
    px-4
    bg-white
  `}
`

const TitleCOntainer = styled.div`
  ${tw`
    flex
    items-center
    justify-between
  `}

  h2 {
    ${tw`
        text-base
        md:text-lg
        lg:text-xl
        cursor-pointer
    `}
  }

  .back-btn {
    ${tw`
        cursor-pointer
        transition
        duration-200
        ease-in-out
    `}

    h2 {
      ${tw`
        ml-2
        text-base
        md:text-lg
        lg:text-xl
    `}
    }
  }
`

const PaymentContainer = styled.form`
  ${tw`
    pt-16
    mx-auto
    w-full
    md:max-w-xl
  `}
`

const RadioContainer = styled.div`
  ${tw`
    flex
    items-center
    mb-4
  `}

  input {
    ${tw`
        mr-4
    `}
  }

  label {
    ${tw`
        text-lg
        text-gray-600
        font-semibold
    `}

    i {
      ${tw`
        px-2
      `}
    }
  }
`

const OrderSumContainer = styled.div`
  ${tw`
    pt-16
    mx-auto
    w-full
    md:max-w-6xl
    flex
    flex-col
  `}
`

const InnerContainer = styled.div`
  ${tw`
    pt-4
    flex
    flex-col
    md:flex-row
    justify-center
  `}
`

const OrderLeftInfo = styled.div`
  ${tw`
    flex-grow
    md:mr-2
  `}
`

const OrderInfoCard = styled.div`
  ${tw`
    flex
    justify-between
    items-center
    mb-3
  `}

  h2 {
    ${tw`
      font-semibold
    `}
  }

  h3 {
    ${tw`
      py-1
      px-2
      text-blue-700
      cursor-pointer
      rounded-md
      hover:bg-gray-200
      hover:text-blue-400
      transition
      duration-200
      ease-out
    `}
  }
`

const OrderRightSum = styled.div`
  ${tw`
    md:ml-2
    px-2
    py-4
    w-full
    md:max-w-xs
    bg-white
  `}

  h1 {
    ${tw`
      text-base
      md:text-lg
      lg:text-xl
      mb-4
    `}
  }
`

const ItemCard = styled.div`
  ${tw`
    flex
    flex-col
    md:flex-row
    mb-3
    py-2
    bg-white
  `}
`

const ItemCardLeft = styled.div`
  ${tw`
    flex-grow
    py-2
    px-2
    flex
    justify-center
  `}
`

const ItemCardRight = styled.div`
  ${tw`
    px-4
  `}
`

const ItemImage = styled.div`
  ${tw`
    w-28
    h-28
  `}

  img {
    ${tw`
        w-full
        h-full
        object-cover
    `}
  }
`

const ItemInfo = styled.div`
  ${tw`
    px-3
    flex-grow
  `}

  h1 {
    ${tw`
        text-base
        lg:text-xl
    `}
  }

  p {
    ${tw`
        py-2
        text-sm
        lg:text-base
        text-yellow-600
        font-semibold
    `}
  }
`

const ItemPriceQty = styled.div`
  ${tw`
    pt-4
    flex
    justify-between
  `}

  h1 {
    ${tw`
        md:mb-2
        text-xl
        lg:text-2xl
        text-yellow-500
    `}
  }

  h2 {
    ${tw`
      ml-4
      md:ml-0
    `}
  }

  i {
    ${tw`
        flex
        items-center
        justify-center
        md:mt-2
        w-8
        h-8
        ml-4
        md:ml-0
        hover:bg-gray-200
        rounded-sm
        cursor-pointer
        transition
        duration-200
        ease-in-out
    `}
  }
`

const SummaryList = styled.div`
  ${tw`
    flex
    items-center
    justify-between
    text-gray-400
    mb-2
  `}

  h3 {
    ${tw`
        text-base
    `}
  }

  h2 {
    ${tw`
        text-lg
    `}
  }

  h1 {
    ${tw`
        text-lg
        text-yellow-500
    `}
  }
`

export default ShippingAddress
