import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <Container>
      <i className='fas fa-link fa-10x'></i>
      <h1>Seen Like This Page Is Not Available</h1>
      <HomeLink to='/shopmy-app'>Back To Safety</HomeLink>
    </Container>
  )
}

const Container = styled.div`
  ${tw`
    h-screen
    w-screen
    flex
    flex-col
    items-center
    justify-center
  `}

  i {
    ${tw`
        mb-4
        text-9xl
        text-red-400
    `}
  }

  h1 {
    ${tw`
        mb-4
        text-3xl
        font-semibold
    `}
  }
`
const HomeLink = styled(Link)`
  ${tw`
    py-2
    w-72
    text-xl
    text-center
    font-semibold
    text-gray-100
    bg-gradient-to-br
    from-yellow-500
    to-yellow-400
    hover:shadow-md
    transition
    duration-200
    ease-out
  `}
`

export default Error
