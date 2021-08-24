import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listProducts } from '../actions/productAction'
import { likeProduct, unlikeProduct } from '../actions/userAction'

import { Rating, Loader, productPlaceHolder } from '../components/index'

const LikedProduct = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products } = productList
  const productReviews = useSelector((state) => state.productReviews)
  const { reviewList } = productReviews
  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn
  const [isLoading, setIsLoading] = useState(true)
  const [filterProduct, setFilterProduct] = useState([])

  const getFilterProduct = () => {
    setIsLoading(true)

    const likeProductId = userInfo.likeItems
    const filter = products.filter((product) => {
      return likeProductId.includes(product._id)
    })

    if (filter) {
      setFilterProduct(filter)
      setIsLoading(false)
    }
  }

  const handleLike = (product) => {
    dispatch(likeProduct(product))
  }

  const handleUnLike = (product) => {
    dispatch(unlikeProduct(product))
  }

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(listProducts())
    }

    if (products && products.length !== 0) {
      getFilterProduct()
    }
  }, [dispatch, products])

  const totalReview = (id) => {
    const total = reviewList.filter((x) => x === id)

    return total.length
  }

  return (
    <Container>
      <h1 className='title'>Liked Product</h1>
      <GridContainer>
        {isLoading ? (
          <productPlaceHolder />
        ) : (
          <>
            {filterProduct.map((product) => {
              const { _id, name, image, price, rating, numReviews } = product
              return (
                <ProductCard key={_id}>
                  <ProductImg to={`/product/${_id}`}>
                    <img
                      src={process.env.PUBLIC_URL + `/images/${image}`}
                      alt=''
                    />
                  </ProductImg>
                  <ProductInfo>
                    <div className='flex items-center justify-between'>
                      <h1>{name}</h1>
                      {userInfo.likeItems.includes(_id) ? (
                        <LikeIcon
                          onClick={() => handleUnLike(_id)}
                          className='fas fa-heart text-red-400'
                        />
                      ) : (
                        <LikeIcon
                          onClick={() => handleLike(_id)}
                          className='far fa-heart text-gray-400'
                        />
                      )}
                    </div>
                    <h3>$ {price}</h3>
                    <div className='flex items-center'>
                      <Rating rating={rating} />
                      <p>
                        {reviewList &&
                          reviewList.length > 0 &&
                          totalReview(_id)}{' '}
                        reviews
                      </p>
                    </div>
                  </ProductInfo>
                </ProductCard>
              )
            })}
          </>
        )}
      </GridContainer>
    </Container>
  )
}

const Container = styled.div`
  ${tw`
    pt-28
    mx-auto
    flex
    flex-col
    items-center
    justify-center
    px-4
    lg:px-0
    w-full
    md:max-w-6xl
  `}

  .title {
    ${tw`
      self-start
      text-xl
      md:text-2xl
      font-semibold
      mb-4
    `}
  }
`

const GridContainer = styled.div`
  ${tw`
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    place-items-center
    gap-4
  `}
`

const ProductCard = styled.div`
  ${tw`
    p-2
    max-w-[14rem]
    bg-white
    shadow-md
    hover:shadow-xl
    cursor-pointer
  `}
`

const ProductImg = styled(Link)`
  ${tw`
    flex
    items-center
    justify-center
    h-52
    w-52
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
        pt-2
        text-lg
        md:text-xl
        lg:text-2xl
    `}
  }

  h3 {
    ${tw`
        py-2
        text-lg
        md:text-xl
        lg:text-2xl
        text-red-400
        font-semibold
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

export default LikedProduct
