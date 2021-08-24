import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  addToCart,
  removeFromCart,
  removeAllCartItems,
} from '../actions/cartAction'

const Cart = (props) => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const qty = history.location.search
    ? Number(history.location.search.split('=')[1])
    : 1

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  cartItems.totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)

  cartItems.shippingPrice =
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0) > 200 ? 0 : 9

  cartItems.subTotal = cartItems.totalPrice + cartItems.shippingPrice

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  const handleCheckout = (e) => {
    e.preventDefault()
    history.push('/login?redirect=shipping')
  }

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <Container>
      <InnerContainer>
        <LeftContainer>
          <Title>
            <h1>Item In Cart</h1>
            <h1
              onClick={() => dispatch(removeAllCartItems())}
              className='text-red-400 cursor-pointer hover:text-red-600'
            >
              <i className='far fa-trash-alt px-2'></i>Remove All
            </h1>
          </Title>
          {cartItems.length === 0 ? (
            <EmptyCart>
              <h1>Cart Looks Empty. </h1>
              <div
                onClick={() => history.push('/shopmy-app')}
                className='translate-x-2 hover:translate-x-3'
              >
                <h1>Shop Now</h1>
              </div>
            </EmptyCart>
          ) : (
            <div className='pt-4 overflow-hidden overflow-y-auto scrollbar-hide'>
              {cartItems.map((item) => {
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
                        <div className='flex flex-row md:flex-col'>
                          <h1>$ {price}</h1>
                          <i
                            onClick={() => handleRemoveItem(product)}
                            className='far fa-trash-alt'
                          ></i>
                        </div>
                        <QuantityContainer>
                          <div className='quantity-select'>
                            <i
                              onClick={() =>
                                dispatch(
                                  addToCart(product, Number(quantity - 1))
                                )
                              }
                              className={`fas fa-minus mr-4 ${
                                quantity === 1
                                  ? 'bg-gray-100 pointer-events-none'
                                  : 'bg-gray-200 cursor-pointer hover:bg-gray-400 hover:text-gray-50'
                              }`}
                            ></i>
                            <h5>{quantity}</h5>
                            <i
                              onClick={() =>
                                dispatch(
                                  addToCart(product, Number(quantity + 1))
                                )
                              }
                              className={`fas fa-plus ml-4 ${
                                quantity <= countInStock - 1
                                  ? 'bg-gray-200 cursor-pointer hover:bg-gray-400 hover:text-gray-50'
                                  : 'bg-gray-100 pointer-events-none'
                              }`}
                            ></i>
                          </div>
                        </QuantityContainer>
                      </ItemPriceQty>
                    </ItemCardRight>
                  </ItemCard>
                )
              })}
            </div>
          )}
        </LeftContainer>
        <RightContainer>
          <h1>Order Summary</h1>
          <SummaryList>
            <h3>
              Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)
            </h3>
            <h2>$ {cartItems.totalPrice}</h2>
          </SummaryList>
          <SummaryList>
            <h3>Shipping Fee</h3>
            <h2>$ {cartItems.shippingPrice}</h2>
          </SummaryList>
          <SummaryList className='mt-4'>
            <h3>Total</h3>
            <h1>$ {cartItems.subTotal}</h1>
          </SummaryList>
          <button
            className={`${cartItems.length === 0 && 'pointer-events-none'}`}
            onClick={(e) => handleCheckout(e)}
          >
            {cartItems.length === 0 ? 'CART IS EMPTY' : 'PROCEED TO CHECKOUT'}
          </button>
        </RightContainer>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  ${tw`
    pt-24
    flex
    items-center
    justify-center
  `}
`

const InnerContainer = styled.div`
  ${tw`
    flex
    flex-col
    md:flex-row
    justify-between
    mx-auto
    px-4
    lg:px-0
    w-full
    md:max-w-6xl
  `}
`

const LeftContainer = styled.div`
  ${tw`
    relative
    flex-grow
    flex
    flex-col
    md:max-h-[34rem]
  `}
`

const Title = styled.div`
  ${tw`
    w-full
    flex
    items-center
    justify-between
    px-4
    py-2
    bg-white
    text-gray-400
    shadow-md
  `}
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
        mb-2
        text-xl
        lg:text-2xl
        text-yellow-500
    `}
  }

  i {
    ${tw`
        flex
        items-center
        justify-center
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

const RightContainer = styled.div`
  ${tw`
    flex
    flex-col
    py-3
    px-3
    md:ml-3
    w-full
    md:max-w-xs
    bg-white
  `}

  h1 {
    ${tw`
        pb-4
        text-lg
        md:text-xl
        lg:text-2xl
    `}
  }

  button {
    ${tw`
        mt-auto
        md:mb-3
        w-full
        py-2
        text-white
        font-semibold
        bg-yellow-600
        hover:bg-yellow-500
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
    mb-4
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

const QuantityContainer = styled.div`
  ${tw`
    ml-8
    mt-1
  `}

  .quantity-select {
    ${tw`
      flex
      items-center
    `}

    i {
      ${tw`
        py-1
        px-3
        text-lg
        text-gray-500
        transition
        duration-200
        ease-in-out
      `}
    }

    h5 {
      ${tw`
        px-3
        text-lg
        font-semibold
      `}
    }
  }
`

const EmptyCart = styled.div`
  ${tw`
    flex
    py-4
    px-4
  `}

  h1 {
    ${tw`
        text-lg
        md:text-xl
        lg:text-2xl
    `}
  }

  div {
    ${tw`
        text-lg
        md:text-xl
        lg:text-2xl
        font-semibold
        text-yellow-500
        cursor-pointer
        transition
        duration-200
        ease-in-out
    `}

    :hover {
      ${tw`
            
        `}
    }
  }
`

export default Cart
