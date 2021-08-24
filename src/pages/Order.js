import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import tw from 'twin.macro'
import styled from 'styled-components'
import Axios from 'axios'
import { detailsOrder, payOrder, deliverOrder } from '../actions/orderAction'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constant/orderContant'

const Order = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [sdkReady, setSdkReady] = useState(false)

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { error: errorPay, success: successPay } = orderPay

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult))
  }

  const handleUpdateDeliver = () => {
    dispatch(deliverOrder(order))
  }

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal')
      const script = document.createElement('script')

      if (data) {
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
        script.async = true
        script.onload = () => {
          setSdkReady(true)
        }
        document.body.appendChild(script)
      }
    }

    if (!order || successPay || (order && order._id !== id)) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(detailsOrder(id))
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPaypalScript()
        } else {
          setSdkReady(true)
        }
      }
    }
  }, [dispatch, order, id, sdkReady])

  const handleBackPage = () => {
    history.goBack()
  }

  return loading ? (
    <div className='pt-24'>Loading....</div>
  ) : error ? (
    <div className='pt-24'>Error...</div>
  ) : (
    <OrderSumContainer>
      <TitleContainer>
        <h1>Order Detail {order._id}</h1>
        <h1
          onClick={handleBackPage}
          className='back-btn font-semibold hover:-translate-x-2'
        >
          <i className='fas fa-chevron-left mr-2'></i>Back
        </h1>
      </TitleContainer>
      <InnerContainer>
        <OrderLeftInfo className='overflow-hidden overflow-y-auto scrollbar-hide'>
          {order.orderItems.map((item) => {
            const { name, image, price, quantity, countInStock, product } = item

            return (
              <ItemCard key={product} to={`/product/${product}`}>
                <ItemCardLeft>
                  <ItemImage>
                    <img
                      src={process.env.PUBLIC_URL + `/images/${image}`}
                      alt=''
                    />
                  </ItemImage>
                  <ItemInfo>
                    <h1>{name}</h1>
                  </ItemInfo>
                </ItemCardLeft>
                <ItemCardRight>
                  <ItemPriceQty>
                    <div className='flex flex-row items-center md:flex-col'>
                      <h1>$ {price}</h1>
                      <h2>Qty: {quantity}</h2>
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
              <h2>{order.shippingAddress.fullName}</h2>
              <p>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
            </div>
          </OrderInfoCard>
          <OrderInfoCard>
            <h2>{order.paymentMethod}</h2>
          </OrderInfoCard>
          <OrderInfoCard>
            <h2
              className={`${
                order.isPaid
                  ? 'text-green-600 bg-green-100'
                  : 'text-red-600 bg-red-100'
              }`}
            >
              {order.isPaid ? 'Payment Completed' : 'Pending For Payment'}
            </h2>
          </OrderInfoCard>
          <OrderInfoCard>
            <h2
              className={`${
                order.isDelived
                  ? 'text-green-600 bg-green-100'
                  : 'text-red-600 bg-red-100'
              }`}
            >
              {order.isDelived ? 'Delivered' : 'Not Delivered'}
            </h2>
          </OrderInfoCard>
          <h1 className='mt-8'>Order Summary</h1>
          <SummaryList>
            <h3>
              Subtotal ({order.orderItems.reduce((a, c) => a + c.quantity, 0)}{' '}
              items)
            </h3>
            <h2>${order.itemsPrice}</h2>
          </SummaryList>
          <SummaryList>
            <h3>Shipping Fee</h3>
            <h2>$ {order.shippingPrice}</h2>
          </SummaryList>
          <SummaryList>
            <h3>Tax Fee</h3>
            <h2>$ {order.taxPrice}</h2>
          </SummaryList>
          <SummaryList className='mt-4'>
            <h3 className='text-black font-semibold'>Total</h3>
            <h1>$ {order.totalPrice}</h1>
          </SummaryList>
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelived && (
            <ButtonStyle onClick={handleUpdateDeliver}>
              Deliver Order
            </ButtonStyle>
          )}
          {userInfo._id === order.user && !order.isPaid && (
            <div>
              {!sdkReady ? (
                <div>Loading...</div>
              ) : (
                <>
                  {errorPay && <div>{errorPay}</div>}

                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={(paymentResult) =>
                      successPaymentHandler(paymentResult)
                    }
                  ></PayPalButton>
                </>
              )}
            </div>
          )}
        </OrderRightSum>
      </InnerContainer>
    </OrderSumContainer>
  )
}
const TitleContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-between
  `}

  h1 {
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
  }
`

const OrderSumContainer = styled.div`
  ${tw`
    px-4
    md:px-0
    pt-28
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
        px-2
        py-1
      w-full
      font-semibold
    `}
  }

  p {
    ${tw`
        px-2
        py-1
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

  button {
    ${tw`
        w-full
        py-1
        md:text-lg
        font-semibold
        text-white
        bg-yellow-500
        hover:bg-yellow-400
        hover:shadow-md
        transition
        duration
        ease-out
    `}
  }
`

const ItemCard = styled(Link)`
  ${tw`
    flex
    mb-3
    py-2
    bg-white
    hover:shadow-md
    transition
    duration-200
    ease-out
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

const ButtonStyle = styled.div`
  ${tw`
    w-full
    mb-4
    py-2
    md:text-lg
    text-center
    font-semibold
    text-white
    bg-yellow-500
    hover:bg-yellow-400
    hover:shadow-md
    rounded-sm
    transition
    duration-200
    ease-out
    cursor-pointer
  `}
`

export default Order
