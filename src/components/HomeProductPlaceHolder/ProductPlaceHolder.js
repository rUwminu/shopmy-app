import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

const ProductPlaceHolder = () => {
  const tempArray = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ]

  return (
    <Container>
      <GridContainer>
        {/* <div className='sidebar animated-bg' /> */}
        {tempArray &&
          tempArray.map((temp) => (
            <ProductCard key={temp.id}>
              <ProductImg className='animated-bg'>&nbsp;</ProductImg>
              <ProductInfo>
                <h1 className='animated-bg animated-bg-text'>&nbsp;</h1>
                <div className='short-div animated-bg animated-bg-text'>
                  &nbsp;
                </div>

                <div className='flex items-center'>
                  <p className='animated-bg animated-bg-text'>
                    &nbsp;
                    <span className='animated-bg animated-bg-text'>&nbsp;</span>
                    <span className='animated-bg animated-bg-text'>&nbsp;</span>
                  </p>
                </div>
              </ProductInfo>
            </ProductCard>
          ))}
      </GridContainer>
    </Container>
  )
}

const Container = styled.div`
  ${tw`
    pb-10
    w-full
    flex
    items-center
    justify-center
  `}

  .sidebar {
    ${tw`
      absolute
      top-0
      left-0
      bottom-[3rem]

      w-14
      max-h-[28rem]
      bg-white
      rounded-md
      shadow-md
    `}
  }

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

const GridContainer = styled.div`
  ${tw`
    relative
    grid
    grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    place-items-center
    gap-4
    mx-auto
    px-4
    // pl-20
    // md:pl-24
    w-full
    md:max-w-6xl
  `}
`

const ProductCard = styled.div`
  ${tw`
    p-2
    h-[21rem]
    min-w-[11.5rem]
    md:max-w-[14rem]
    bg-white
    shadow-md
    hover:shadow-xl
    cursor-pointer
  `}
`

const ProductImg = styled.div`
  ${tw`
    mb-3
    flex
    items-center
    justify-center
    h-40
    w-[11rem]
    md:w-52
  `}

  img {
    ${tw`
        w-full
        h-full
        object-cover
    `}
  }
`

const ProductInfo = styled.div`
  ${tw``}

  h1 {
    ${tw`
       py-3
    `}
  }

  .short-div {
    ${tw`
        py-2
        w-14
    `}
  }
`

const LikeIcon = styled.i`
  ${tw`
    pt-2
    pr-2
    text-lg
  `}
`

export default ProductPlaceHolder
