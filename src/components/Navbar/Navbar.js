import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { signout } from '../../actions/userAction'

const Navbar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [active, setActive] = useState(false)
  const [activeAdmin, setActiveAdmin] = useState(false)
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  const handleUserDropMenu = () => {
    setActive(!active)
    setActiveAdmin(false)
  }

  const handleAdminDropMenu = () => {
    setActiveAdmin(!activeAdmin)
    setActive(false)
  }

  const handleSignOut = () => {
    setActive(false)
    dispatch(signout())
  }

  const handleOrderHistory = () => {
    history.push(`/orderhistory`)
  }

  const handleLikedProduct = () => {
    history.push(`/likedproduct`)
  }

  const handleProfile = () => {
    history.push(`/profile`)
  }

  const handleCustomerOrder = () => {
    history.push(`/allorder`)
  }

  const handleCustomerProfile = () => {
    history.push(`/allprofile`)
  }

  return (
    <Container>
      <Nav>
        <Logo to='/shopmy-app'>Shopmy</Logo>
        <NavLinks>
          <Link
            className='link relative px-4 py-2 hover:bg-gray-200 rounded-lg'
            to='/cart'
          >
            Cart
            {cartItems.length > 0 && (
              <span className='cart-total-item'>{cartItems.length}</span>
            )}
          </Link>
          {userInfo ? (
            <div className='relative'>
              <div className='link ml-6'>
                {userInfo.name}
                <i
                  onClick={handleUserDropMenu}
                  className='fas fa-chevron-down ml-2 px-2 py-[7px] mb-[-3px] cursor-pointer rounded-full hover:bg-gray-200'
                ></i>
              </div>
              <DropdownList
                onMouseLeave={() => setActive(false)}
                className={`${
                  active ? 'h-auto p-2' : 'h-0 border-none overflow-hidden'
                } ${
                  userInfo.isAdmin ? 'bottom-[-13.5rem]' : 'bottom-[-12rem]'
                }`}
              >
                <h1 className='px-2 mb-2'>Option</h1>
                {userInfo.isAdmin && (
                  <ListLink onClick={handleCustomerOrder}>
                    Customer Order
                  </ListLink>
                )}
                <ListLink onClick={handleLikedProduct}>Liked Product</ListLink>
                <ListLink onClick={handleOrderHistory}>Order History</ListLink>
                <ListLink onClick={handleProfile}>User Profile</ListLink>
                <ListLink onClick={handleSignOut}>
                  <h2>Logout</h2>
                  <i className='fas fa-sign-out-alt'></i>
                </ListLink>
              </DropdownList>
            </div>
          ) : (
            <Link
              className='link px-4 py-2 hover:bg-gray-200 rounded-lg'
              to='/login'
            >
              Sign In
            </Link>
          )}
        </NavLinks>
      </Nav>
    </Container>
  )
}

const Container = styled.div`
  ${tw`
    fixed
    top-0
    w-full
    bg-white
    shadow-md
  `}
  z-index: 30;
`

const Nav = styled.div`
  ${tw`
    mx-auto
    px-4
    lg:px-0
    w-full
    md:max-w-6xl
    flex
    items-center
    justify-between
    py-4
  `}
`

const Logo = styled(Link)`
  ${tw`
    text-xl
    md:text-2xl
    font-semibold
    cursor-pointer
  `}
`

const NavLinks = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    font-semibold
  `}

  .cart-total-item {
    ${tw`
      absolute
      top-0
      -right-2
      py-[2.5px]
      px-2
      text-sm
      font-bold
      text-white
      bg-red-400
      rounded-full
    `}
    z-index: 29 !important;
  }

  .link {
    ${tw`
        flex
        items-center
        justify-between
        transition
        duration-200
        ease-in-out
      `}
  }
`

const DropdownList = styled.div`
  ${tw`
      absolute
      right-0
      w-48
      bg-white
      shadow-md
      border
      transition
      duration-200
      ease-in-out
  `}
`

const ListLink = styled.div`
  ${tw`
    w-full
    py-1
    px-2
    flex
    items-center
    justify-between
    text-gray-600
    hover:bg-gray-200
    rounded-md
    cursor-pointer
    transition
    duration-200
    ease-in-out
  `}
`

export default Navbar
