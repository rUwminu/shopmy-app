import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <StepContainer>
      <Step className={step1 ? `border-yellow-300 ` : `text-gray-300`}>
        Sign-In{' '}
        <span className={step1 ? `bg-yellow-400` : `bg-gray-300`}></span>
      </Step>
      <Step className={step2 ? `border-yellow-300 ` : `text-gray-300`}>
        Shipping{' '}
        <span className={step2 ? `bg-yellow-400` : `bg-gray-300`}></span>
      </Step>
      <Step className={step3 >= 3 ? `border-yellow-300 ` : `text-gray-300`}>
        Payment{' '}
        <span className={step3 >= 3 ? `bg-yellow-400` : `bg-gray-300`}></span>
      </Step>
      <Step className={step4 >= 4 ? `border-yellow-300 ` : `text-gray-300`}>
        Place Order
        <span className={step4 >= 4 ? `bg-yellow-400` : `bg-gray-300`}></span>
      </Step>
    </StepContainer>
  )
}

const StepContainer = styled.div`
  ${tw`
    mx-auto
    pt-32
    flex
    justify-between
    w-full
    max-w-4xl
  `}
`

const Step = styled.div`
  ${tw`
    relative
    border-t-4
    flex-1
    pt-2
    font-semibold
  `}

  span {
    ${tw`
        absolute
        top-[-10.5px]
        left-0
        w-4
        h-4
        rounded-full
    `}
  }
`

export default CheckoutSteps
