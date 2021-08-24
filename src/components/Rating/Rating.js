import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

const Rating = ({ rating }) => {
  return (
    <Container>
      {rating >= 0.5 ? (
        <i className={rating >= 1 ? 'fas fa-star' : 'fas fa-star-half-alt'}></i>
      ) : (
        <i className='far fa-star'></i>
      )}

      {rating >= 1.5 ? (
        <i className={rating >= 2 ? 'fas fa-star' : 'fas fa-star-half-alt'}></i>
      ) : (
        <i className='far fa-star'></i>
      )}

      {rating >= 2.5 ? (
        <i className={rating >= 3 ? 'fas fa-star' : 'fas fa-star-half-alt'}></i>
      ) : (
        <i className='far fa-star'></i>
      )}

      {rating >= 3.5 ? (
        <i className={rating >= 4 ? 'fas fa-star' : 'fas fa-star-half-alt'}></i>
      ) : (
        <i className='far fa-star'></i>
      )}

      {rating >= 4.5 ? (
        <i className={rating >= 5 ? 'fas fa-star' : 'fas fa-star-half-alt'}></i>
      ) : (
        <i className='far fa-star'></i>
      )}
    </Container>
  )
}

const Container = styled.div`
  ${tw``}

  i {
    ${tw`
        pr-1
        text-yellow-500
    `}
  }
`

export default Rating
