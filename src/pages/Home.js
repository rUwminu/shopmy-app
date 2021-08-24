import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listProducts } from '../actions/productAction'
import { likeProduct, unlikeProduct } from '../actions/userAction'

import {
  Rating,
  Loader,
  Carousel,
  ProductPlaceHolder,
  SideNavbar,
} from '../components/index'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  const history = useHistory()
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  const productReviews = useSelector((state) => state.productReviews)
  const { reviewList } = productReviews
  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn
  const [productReview, setProductReview] = useState([])

  useEffect(() => {
    if (!products || products.length === 0) {
      // This call function in redux to fetch the data
      dispatch(listProducts())
    }

    // if (products) {
    //   productReviewsCount()
    // }
  }, [dispatch, products])

  // const productReviewsCount = () => {
  //   if (reviewList && reviewList.length > 0) {
  //     const result = reviewList.reduce((groupedId, productId) => {
  //       const Id = productId

  //       if (groupedId[Id] == null) {
  //         groupedId[Id] = []
  //       }

  //       groupedId[Id].push(productId)

  //       return groupedId
  //     }, {})

  //     setProductReview(result)
  //   }
  // }

  const handleLike = (product) => {
    if (userInfo) {
      dispatch(likeProduct(product))
    } else {
      history.push('/login')
    }
  }

  const handleUnLike = (product) => {
    if (userInfo) {
      dispatch(unlikeProduct(product))
    }
  }

  const totalReview = (id) => {
    const total = reviewList.filter((x) => x === id)

    return total.length
  }

  return (
    <Container>
      <Carousel />
      {loading ? (
        <ProductPlaceHolder />
      ) : (
        <GridContainer>
          {products.map((product) => {
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
                    {userInfo && userInfo.likeItems.includes(_id) ? (
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
                      {/* {reviewList && reviewList.length > 0 && totalReview(_id)}{' '} */}
                      {numReviews} reviews
                    </p>
                  </div>
                </ProductInfo>
              </ProductCard>
            )
          })}
        </GridContainer>
      )}
      {error && (
        <div>
          <h1>404 PageNot Found...</h1>
          <p>{error}</p>
        </div>
      )}
    </Container>
  )
}

const Container = styled.div`
  ${tw`   
    pb-10
    pt-16
    w-full
    flex
    flex-col
    items-center
    justify-center
  `}
`

const GridContainer = styled.div`
  ${tw`
    relative
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    place-items-center
    gap-4
    w-full
    // flex
    // flex-wrap
    // items-center
    // justify-around
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
    m-2
    p-2
    min-w-[11.5rem]
    md:max-w-[14rem]
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

export default Home
