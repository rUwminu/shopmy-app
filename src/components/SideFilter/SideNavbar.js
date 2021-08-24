import React, { useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

const SideNavbar = () => {
  const [isActive, setIsActive] = useState(false)
  const [isSelected, setIsSelected] = useState('All')

  const navArray = [
    { icon: 'fas fa-home fa-lg', title: 'All' },
    { icon: 'far fa-copyright fa-lg', title: 'Brand' },
    { icon: 'fas fa-layer-group fa-lg', title: 'Catergories' },
  ]

  const handleClick = (e) => {
    setIsSelected(e.target.value)
    setIsActive(false)
  }

  return (
    <SideNavContainer
      onMouseLeave={() => setIsActive(false)}
      className={`${isActive ? 'w-56 shadow-md' : 'w-10 md:w-14'}`}
    >
      <NavListContainer>
        <i
          onClick={() => setIsActive(!isActive)}
          className='fas fa-bars fa-lg ml-[5px] flex justify-center items-center text-white mb-6 w-8 h-8 rounded-md hover:bg-gray-50 hover:text-black'
        ></i>
        {navArray.map((link, index) => {
          const { icon, title } = link
          return (
            <NavlistItem
              onClick={(e) => handleClick(e)}
              className={` ${isSelected == title && 'bg-gray-50 hover:none'}`}
              value={title}
              key={index}
            >
              <ListRoundedOuter
                className={`${isSelected == title ? '' : 'hidden'}`}
              />
              <ListRoundedOuter
                className={`${isSelected == title ? '' : 'hidden'}`}
              />
              <Iconlist
                className={`${icon} ${
                  isSelected !== title ? 'text-white' : 'text-yellow-500'
                }`}
              />
              <TitleText
                className={`${
                  isSelected !== title ? 'text-white' : 'text-yellow-500'
                } ${isActive ? 'block' : 'hidden'}`}
              >
                {title}
              </TitleText>
            </NavlistItem>
          )
        })}
      </NavListContainer>
    </SideNavContainer>
  )
}

const SideNavContainer = styled.div`
  ${tw`
    absolute
    top-0
    left-0
    bottom-[3rem]
    flex
    flex-col
    justify-center
    items-center
    bg-yellow-500
    rounded-lg
    py-10
    ml-4
    lg:ml-0
    max-h-[28rem]
    
    transition-all
    duration-75
    ease-in-out
    cursor-pointer
    overflow-x-hidden
    scrollbar-hide
    z-10
  `}
`

const NavListContainer = styled.div`
  ${tw`
    absolute
    top-0
    left-0
    w-full
    pl-2
    pt-9
  `}
`
const NavlistItem = styled.button`
  ${tw`
    relative
    flex
    h-full
    w-full
    items-center
    cursor-pointer
    mb-4
    rounded-l-xl
  `}
`

const ListRoundedOuter = styled.b`
  ${tw``}

  :nth-child(1) {
    ${tw`
        absolute
        top-[-24px]
        h-6
        w-full
        bg-gray-50
    `}
  }

  :nth-child(1)::before {
    content: '';

    ${tw`
        absolute
        top-0
        left-0
        w-full
        h-full
        bg-yellow-500
        rounded-br-xl
    `}
  }

  :nth-child(2) {
    ${tw`
        absolute
        bottom-[-24px]
        h-6
        w-full
        bg-gray-50
    `}
  }

  :nth-child(2)::before {
    content: '';

    ${tw`
        absolute
        top-0
        left-0
        w-full
        h-full
        bg-yellow-500
        rounded-tr-xl
    `}
  }
`

const Iconlist = styled.i`
  ${tw`
    relative
    flex
    justify-center
    items-center
    h-[60px]
    min-w-[60px]
    text-center
    pointer-events-none
    -ml-2
    z-20
  `}
`

const TitleText = styled.h2`
  ${tw`
    relative
    h-full
    w-full
    -ml-10
    text-lg
    text-center
    font-semibold
    transition-all
    duration-75
    ease-in-out
    pointer-events-none
  `}
`

export default SideNavbar
