import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

const OrderPlaceholder = ({ padding }) => {
  const placeholderArray = ['1', '2', '3']

  return (
    <OrdersContainer padding={padding}>
      {placeholderArray &&
        placeholderArray.map((order, index) => {
          return (
            <OrderList key={index}>
              <ListTitle>
                <div className='flex flex-col items-start justify-between'>
                  <h2 className='order-title animated-bg animated-bg-text'>
                    &nbsp;
                  </h2>
                  <h2 className='order-title animated-bg animated-bg-text'>
                    &nbsp;
                  </h2>
                </div>

                <TagContainer>
                  <h3 className='order-tag animated-bg animated-bg-text'>
                    &nbsp;
                  </h3>
                  <h3 className='order-tag animated-bg animated-bg-text'>
                    &nbsp;
                  </h3>
                </TagContainer>
              </ListTitle>

              <OrderItem>
                <ItemLeft>
                  <div className='product-img animated-bg'>&nbsp;</div>
                  <h2 className='product-info-title animated-bg animated-bg-text'>
                    &nbsp;
                  </h2>
                </ItemLeft>
                <ItemRight>
                  <h2 className='product-info animated-bg animated-bg-text'>
                    &nbsp;
                  </h2>
                  <h2 className='product-info animated-bg animated-bg-text'>
                    &nbsp;
                  </h2>
                </ItemRight>
              </OrderItem>
            </OrderList>
          )
        })}
    </OrdersContainer>
  )
}

const OrdersContainer = styled.div`
  padding-top: ${(props) => props.padding}px;

  ${tw`
    flex
    flex-col
    justify-center
  `}

  .animated-bg-text {
    border-radius: 50px;
    display: inline-block;
    width: 100%;
    margin: 0;
    height: 10px;
  }

  .animated-bg {
    background-image: linear-gradient(
      to right,
      #f6f7f8 10%,
      #edeef1 20%,
      #f6f7f8 30%,
      #f6f7f8 100%
    );
    background-size: 200% 100%;
    animation: animate1 1s linear infinite;
  }

  @keyframes animate1 {
    0% {
      background-position: 50% 0;
    }
    100% {
      background-position: -150% 0;
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

  .order-title {
    ${tw`
        w-52
        h-4
        mb-2
    `}

    :nth-child(2) {
      ${tw`
            w-80
        `}
    }
  }

  .order-tag {
    ${tw`
        w-20
        h-6
        ml-2
    `}
  }

  .product-img {
    ${tw`
        h-24
        w-24
        mr-6
    `}
  }

  .product-info-title {
    ${tw`
      w-36
      h-4
    `}
  }

  .product-info {
    ${tw`
        w-14
        md:w-20
        h-4
    `}
  }
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
`

const TagContainer = styled.div`
  ${tw`
      mt-2
      sm:mt-0
      flex
      items-center
      md:justify-center
    `}
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
`

const ItemRight = styled.div`
  ${tw`
    flex
    flex-grow
    items-start
    justify-around
  `}
`

export default OrderPlaceholder
