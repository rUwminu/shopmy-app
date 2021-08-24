import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

const Loader = () => {
  return (
    <LoaderCard>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <h3>Loading...</h3>
    </LoaderCard>
  )
}

const LoaderCard = styled.div`
  ${tw`
    relative
    w-52
    h-52
    bg-gray-700
    flex
    items-center
    justify-center
    transition
    duration-500
    ease-in-out
    overflow-hidden
    hover:text-black
  `}

  :hover {
    background: #03e9f4;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
      0 0 200px #03e9f4;
  }

  span {
    position: absolute;
    display: block;

    ${tw`rounded-full`}
  }

  span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: animate1 2s linear infinite;
    animation-delay: 0s;
  }
  @keyframes animate1 {
    0% {
      left: -100%;
    }
    50%,
    100% {
      left: 100%;
    }
  }

  span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 5px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: animate2 2s linear infinite;
    animation-delay: 1s;
  }
  @keyframes animate2 {
    0% {
      right: -100%;
    }
    50%,
    100% {
      right: 100%;
    }
  }

  span:nth-child(2) {
    top: -100%;
    right: 0%;
    width: 5px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: animate3 2s linear infinite;
    animation-delay: 0.5s;
  }
  @keyframes animate3 {
    0% {
      top: -100%;
    }
    50%,
    100% {
      top: 100%;
    }
  }

  span:nth-child(4) {
    bottom: -100%;
    left: 0%;
    width: 5px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: animate4 2s linear infinite;
    animation-delay: 1.5s;
  }
  @keyframes animate4 {
    0% {
      bottom: -100%;
    }
    50%,
    100% {
      bottom: 100%;
    }
  }

  h3 {
    ${tw`
        text-3xl
        text-center
        font-semibold
        transition
        duration-500
        ease-in-out
        overflow-hidden
        tracking-widest
    `}

    color: #03e9f4;
    border-right: 2px solid #03e9f4;
    animation: typing 5s steps(10) infinite;
  }

  :hover h3 {
    ${tw`
        text-black
    `}

    border-right: 2px solid black;
  }

  @keyframes typing {
    0% {
      width: 0px;
    }
    30% {
      width: 163.09px;
    }
  }
`

export default Loader
