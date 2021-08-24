import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listOrderAll } from '../actions/orderAction'

import { OrderPlaceHolder } from '../components/index'

const OrderAll = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [status, setStatus] = useState('All')

  const orderAllList = useSelector((state) => state.orderAllList)
  const { loading, error, allorders } = orderAllList

  useEffect(() => {
    dispatch(listOrderAll(status))
  }, [dispatch, status])

  const handleOrderDetail = (id) => {
    history.push(`/order/${id}`)
  }

  const handleSort = (e) => {
    setStatus(e.target.value)
  }

  return (
    <Container>
      <InnerContainer>
        <TitleContainer>
          <h1>All Customer Orders</h1>

          <TagContainer>
            <button
              className={`tag ${
                status === 'All' ? 'bg-yellow-400' : 'hover:bg-gray-300'
              }`}
              value='All'
              onClick={(e) => handleSort(e)}
            >
              All
            </button>
            <button
              className={`tag ${
                status === 'isPaid' ? 'bg-yellow-400' : 'hover:bg-gray-300'
              }`}
              value='isPaid'
              onClick={(e) => handleSort(e)}
            >
              Paid
            </button>
            <button
              className={`tag ${
                status === 'isNotPaid' ? 'bg-yellow-400' : 'hover:bg-gray-300'
              }`}
              value='isNotPaid'
              onClick={(e) => handleSort(e)}
            >
              Not Paid
            </button>
            <button
              className={`tag ${
                status === 'isDelived' ? 'bg-yellow-400' : 'hover:bg-gray-300'
              }`}
              value='isDelived'
              onClick={(e) => handleSort(e)}
            >
              Delivered
            </button>
            <button
              className={`tag ${
                status === 'isNotDelived'
                  ? 'bg-yellow-400'
                  : 'hover:bg-gray-300'
              }`}
              value='isNotDelived'
              onClick={(e) => handleSort(e)}
            >
              Not Deliver
            </button>
          </TagContainer>
        </TitleContainer>

        {loading ? (
          <OrderPlaceHolder padding={60} />
        ) : error ? (
          <div className='pt-16'>{error}</div>
        ) : (
          <OrdersContainer>
            {allorders.length === 0 && <div>No Order Yet</div>}
            {allorders &&
              allorders.map((order) => {
                const { _id, orderItems, isPaid, isDelived, createdAt } = order
                return (
                  <OrderList key={_id} onClick={() => handleOrderDetail(_id)}>
                    <ListTitle>
                      <div>
                        <h2>Order ID : {_id}</h2>
                        <h2>Order Placed Date : {createdAt}</h2>
                      </div>

                      <TagContainer>
                        <h3
                          className={`tag ${
                            isPaid
                              ? 'bg-green-100 text-green-600'
                              : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {isPaid ? 'Paid' : 'Not Paid'}
                        </h3>
                        <h3
                          className={`tag ${
                            isDelived
                              ? 'bg-green-100 text-green-600'
                              : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {isDelived ? 'Delivered' : 'Delivering'}
                        </h3>
                      </TagContainer>
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
      </InnerContainer>
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
    h-screen
  `}
`

const InnerContainer = styled.div`
  ${tw`
    relative
    pb-10
    mx-auto
    w-full
    md:max-w-6xl
    h-full
    overflow-hidden
    overflow-y-auto
    scrollbar-hide
  `}
`

const TitleContainer = styled.div`
  ${tw`
    fixed
    top-0
    mt-28
    py-4
    w-full
    md:max-w-6xl
    bg-white
    flex
    flex-col
    md:flex-row
    md:items-center
    justify-between
    shadow-md
  `}

  h1 {
    ${tw`
      pl-4
      text-lg
      md:text-xl
      lg:text-2xl
      font-semibold
    `}
  }

  .tag {
    ${tw`
      text-gray-600
      bg-gray-200
      cursor-pointer
    `}
  }
`

const TagContainer = styled.div`
  ${tw`
      ml-4
      pt-2
      md:ml-0
      flex
      items-center
      md:justify-center
    `}

  .tag {
    ${tw`
        mr-2
        px-3
        font-semibold
        rounded-2xl
        transition
        duration-200
        ease-out
      `}
  }
`

const OrdersContainer = styled.div`
  ${tw`
    pt-20
    md:pt-16
    flex
    flex-col
    justify-center
  `}
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

export default OrderAll
