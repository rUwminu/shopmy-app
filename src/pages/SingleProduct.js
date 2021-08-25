import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { detailProducts } from '../actions/productAction'
import {
  getProductComment,
  createProductComment,
  checkIsPurchase,
  checkIsComment,
} from '../actions/commentAction'

import { Rating, Loader } from '../components/index'

const SingleProduct = () => {
  const [qty, setQty] = useState(1)
  const [isError, setIsError] = useState('')
  const [commentBody, setCommentBody] = useState('')
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const orderMineList = useSelector((state) => state.orderMineList)
  const { orders } = orderMineList
  const productComment = useSelector((state) => state.productComment)
  const { comments } = productComment

  const checkCommented = useSelector((state) => state.checkCommented)
  const { isPurchased } = checkCommented

  useEffect(() => {
    const firstFunction = () => {
      dispatch(detailProducts(id))
      dispatch(getProductComment(id))
    }

    const secondFunction = async () => {
      await firstFunction()

      dispatch(checkIsPurchase(id))
    }
    secondFunction()

    console.log(CheckIsComment())
  }, [dispatch, id])

  const CheckIsComment = () => {
    if (comments) {
      const tempC = comments.map((comment) => {
        if (comment.user.includes(userInfo._id)) {
          return true
        } else {
          return false
        }
      })

      if (tempC.includes(true) && isPurchased) {
        return true
      } else {
        return false
      }
    }
    return
  }

  const handleAddTocart = () => {
    history.push(`/cart/${id}?qty=${qty}`)
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()

    const { numReviews } = product

    setIsError('')

    if (commentBody.trim() !== '') {
      const data = {
        id,
        commentBody,
        numReviews: numReviews + 1,
      }
      dispatch(createProductComment(data))
    } else {
      setIsError('Review is Empty. Too existed to review and forgot to type?')
    }
  }

  return (
    <Section>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <ErrorMessage>
              <i className='fas fa-exclamation-circle'></i>
              <h1>Product Not Found</h1>
            </ErrorMessage>
          ) : (
            <Container>
              <LeftContainer>
                <Image>
                  <img
                    src={process.env.PUBLIC_URL + `/images/${product.image}`}
                    alt=''
                  />
                </Image>
                <Info>
                  <h1>{product.name}</h1>
                  <div className='flex items-center pt-2 pb-4 md:py-6'>
                    <Rating rating={product.rating} />
                    <div>{product.rating} Rating</div>
                  </div>
                  <p>{product.description}</p>
                  <h3>$ {product.price}</h3>
                  {product.countInStock > 0 && (
                    <QuantityContainer>
                      <h2>Quantity</h2>
                      <div className='quantity-select'>
                        <i
                          onClick={() => setQty(qty - 1)}
                          className={`fas fa-minus mr-4 ${
                            qty === 1
                              ? 'bg-gray-100 pointer-events-none'
                              : 'bg-gray-200 cursor-pointer hover:bg-gray-400 hover:text-gray-50'
                          }`}
                        ></i>
                        <h5>{qty}</h5>
                        <i
                          onClick={() => setQty(qty + 1)}
                          className={`fas fa-plus ml-4 ${
                            qty <= product.countInStock - 1
                              ? 'bg-gray-200 cursor-pointer hover:bg-gray-400 hover:text-gray-50'
                              : 'bg-gray-100 pointer-events-none'
                          }`}
                        ></i>
                      </div>
                    </QuantityContainer>
                  )}
                  <button
                    onClick={handleAddTocart}
                    className={`${
                      product.countInStock == 0
                        ? 'bg-yellow-400 pointer-events-none'
                        : 'bg-yellow-600 hover:bg-yellow-500'
                    }`}
                  >
                    {product.countInStock == 0 ? 'Out of Stock' : 'Add To Cart'}
                  </button>
                </Info>
              </LeftContainer>
              <ProductAvailability>
                <div className='border-b-2 border-gray-300 mb-4'>
                  <h4>Available Delivery</h4>
                  <div className='flex items-center py-2'>
                    <i className='fas fa-map-marker-alt py-2 px-2'></i>
                    <p>West Malaysia only</p>
                  </div>
                </div>
                <div className='stock-info'>
                  <h4>Status</h4>
                  <div className='flex items-center py-2'>
                    <p>
                      {product.countInStock == 0
                        ? 'Out of stock'
                        : `${product.countInStock} in stocks`}
                    </p>
                  </div>
                </div>
              </ProductAvailability>
            </Container>
          )}
        </>
      )}
      {isPurchased &&
        !CheckIsComment() &&(
          <CommentInputContainer>
            {isError && (
              <div className='w-full py-1 px-4 text-red-400 bg-red-200'>
                {isError}
              </div>
            )}
            <CommentInput
              rows='4'
              cols='50'
              placeholder='Comment your reviews here'
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
            />
            <button onClick={(e) => handleSubmitComment(e)}>Post Review</button>
          </CommentInputContainer>
        )}
      {comments && comments.length > 0 && (
        <CommentContainer>
          <h1>Customer Reviews</h1>
          {comments &&
            comments.map((comment) => (
              <CommentCard>
                <CardTitle>
                  <h3>by {comment.username}</h3>
                  <h3>{comment.createdAt}</h3>
                </CardTitle>
                <CardBody>
                  <p>{comment.commentbody}</p>
                </CardBody>
              </CommentCard>
            ))}
        </CommentContainer>
      )}
    </Section>
  )
}

const CommentInputContainer = styled.div`
  ${tw`
    mx-auto
    w-full
    md:max-w-6xl
    flex
    flex-col
    items-center
    p-4
    mt-10
    bg-white
  `}

  button {
    ${tw`
      ml-auto
      mt-2
      py-2
      px-10
      font-semibold
      text-white
      bg-yellow-600
      hover:bg-yellow-500
      transition
      duration-200
      ease-out
    `}
  }
`

const CommentInput = styled.textarea`
  ${tw`
    py-2
    px-2
    h-20
    w-full
    bg-gray-100
    focus:outline-none
  `}
`

// ---------------------------------------------------------
const Section = styled.section`
  ${tw`
    pt-24
    pb-10
    px-4
    lg:px-0
    flex
    flex-col
    items-center
    justify-center
  `}
`

const Container = styled.div`
  ${tw`
    mx-auto
    w-full
    md:max-w-6xl
    bg-white
    flex
    flex-col
    md:flex-col
    lg:flex-row
    items-center
    justify-between
    md:items-stretch
    md:flex-row
    shadow-md
  `}
`

const LeftContainer = styled.div`
  ${tw`
    flex
    flex-col
    md:flex-row
    items-center
    md:items-stretch
    justify-center
  `}
`

const Image = styled.div`
  ${tw`
    w-52
    h-52
    lg:h-72
    lg:w-72
    xl:h-96
    xl:w-96
  `}

  img {
    ${tw`
        h-full
        w-full
    `}
  }
`

const Info = styled.div`
  ${tw`
    max-w-xl
    md:w-auto
    pt-4
    md:pt-0
    px-4
    flex
    flex-col
    justify-start
  `}

  h1 {
    ${tw`
        text-xl
        md:text-2xl
        lg:text-3xl
        font-semibold
    `}
  }

  p {
    ${tw`
        text-lg
    `}
  }

  h3 {
    ${tw`
        mt-auto
        pt-4
        pb-4
        text-2xl
        md:text-3xl
        lg:text-4xl
        text-red-400
    `}
  }

  button {
    ${tw`
        mb-4
        py-2
        font-semibold
        text-white
        transition
        duration-200
        ease-in-out
        hover:shadow-md
    `}
  }
`

const ProductAvailability = styled.div`
  ${tw`
    py-2
    px-4
    w-full
    md:max-w-xs
    bg-gray-100
  `}
`

const ErrorMessage = styled.div`
  ${tw`
    mt-20
    flex
    flex-col
    items-center
    justify-center
  `}

  i {
    ${tw`
      py-4
      text-7xl
      md:text-9xl
      text-red-600
    `}
  }

  h1 {
    ${tw`
      text-4xl
      md:text-5xl
      lg:text-6xl
      font-semibold
    `}
  }
`

const QuantityContainer = styled.div`
  ${tw`
    pt-2
    pb-4
    flex
    items-center
  `}

  h2 {
    ${tw`
      mr-4
    `}
  }

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

const CommentContainer = styled.div`
  ${tw`
    mt-10
    mx-auto
    w-full
    md:max-w-6xl
    bg-white
    py-4
    px-6
  `}

  h1 {
    ${tw`
      pb-2
      text-xl
      lg:text-2xl
      border-b
    `}
  }
`

const CommentCard = styled.div`
  ${tw`
    flex
    flex-col
    items-start
    justify-start
    py-2
    border-b
  `}
`

const CardTitle = styled.div`
  ${tw`
    w-full
    flex
    items-center
    justify-between
    mb-4
    text-sm
    md:text-base
  `}
`

const CardBody = styled.div`
  ${tw`
    w-full
    text-base
    md:text-lg
  `}
`

export default SingleProduct
