import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { listOrderMine } from '../actions/orderAction'

import { OrderPlaceHolder } from '../components/index'

const OrderHistory = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const orderMineList = useSelector((state) => state.orderMineList)
  const { loading, error, orders } = orderMineList

  useEffect(() => {
    dispatch(listOrderMine())
  }, [dispatch])

  const handleOrderDetail = (id) => {
    history.push(`/order/${id}`)
  }

  return (
    <Container>
      <h1>My Orders</h1>
      {loading ? (
        <OrderPlaceHolder padding={0}/>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <OrdersContainer>
          {orders.length === 0 && (
            <div className='empty-order'>
              <p>No Order Yet.</p>
              <p
                className='link hover:translate-x-2'
                onClick={() => history.push('/shopmy-app')}
              >
                Shop Now
              </p>
            </div>
          )}
          {orders
            .slice(0)
            .reverse()
            .map((order) => {
              const { _id, orderItems, totalPrice, isPaid, isDelived } = order
              return (
                <OrderList key={_id} onClick={() => handleOrderDetail(_id)}>
                  <ListTitle>
                    <h2>Order ID : {_id}</h2>
                    <div className='tags'>
                      <h3
                        className={`${
                          isPaid
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {isPaid ? 'Paid' : 'Not Paid'}
                      </h3>
                      <h3
                        className={`${
                          isDelived
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {isDelived ? 'Delivered' : 'Delivering'}
                      </h3>
                    </div>
                  </ListTitle>
                  {orderItems.map((item) => (
                    <OrderItem key={item._id}>
                      <ItemLeft>
                        <img
                          src={process.env.PUBLIC_URL + `/images/${item.image}`}
                          alt=''
                        />
                        <h2>{item.name}</h2>
                      </ItemLeft>
                      <ItemRight>
                        <h2>${item.price.toFixed(2)}</h2>
                        <h2>Qty: {item.quantity}</h2>
                      </ItemRight>
                    </OrderItem>
                  ))}
                </OrderList>
              )
            })}
        </OrdersContainer>
      )}
    </Container>
  )
}

const Container = styled.div`
  ${tw`
    pt-28
    px-4
    lg:px-0
    mx-auto
    w-full
    md:max-w-6xl
  `}

  h1 {
    ${tw`
        text-lg
        md:text-xl
        lg:text-2xl
        font-semibold
    `}
  }
`

const OrdersContainer = styled.div`
  ${tw`
    flex
    flex-col
    justify-center
  `}

  .empty-order {
    ${tw`
      flex
      items-center
    `}

    p {
      ${tw`
        mt-4
        text-base
        md:text-lg
        lg:text-xl
        font-semibold
      `}
    }

    .link {
      ${tw`
        ml-2
        text-yellow-500
        transition
        duration-200
        ease-in-out
        cursor-pointer
      `}
    }
  }
`

const OrderList = styled.div`
  ${tw`
    w-full
    flex
    flex-col
    justify-center
    mt-4
    bg-white
    hover:shadow-sm
    cursor-pointer
  `}
`

const ListTitle = styled.div`
  ${tw`
    py-4
    px-4
    mb-6
    flex
    flex-col
    sm:flex-row
    md:items-center
    justify-between
    border-b
  `}

  h2 {
    ${tw`
        font-semibold
    `}
  }

  .tags {
    ${tw`
        mt-2
        sm:mt-0
        flex
        items-center
        md:justify-center
    `}

    h3 {
      ${tw`
        mr-2
        px-3
        bg-gray-200
        rounded-2xl
      `}
    }
  }
`

const OrderItem = styled.div`
  ${tw`
    pb-4
    px-4
    flex
  `}
`

const ItemLeft = styled.div`
  ${tw`
    flex
    min-w-[20rem]
    md:min-w-[28rem]
  `}

  img {
    ${tw`
        w-24
        h-24
        mr-4
    `}
  }
`

const ItemRight = styled.div`
  ${tw`
    flex
    flex-grow
    items-start
    justify-around
  `}
`

export default OrderHistory
