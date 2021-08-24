import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signin, register } from '../actions/userAction'
import { useSelector } from 'react-redux'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [typeSubmit, setTypeSubmit] = useState(true)
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [comfirmPassword, setComfirmPassword] = useState()
  const [isError, setIsError] = useState()
  const [isSuccess, setIsSuccess] = useState(false)

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo, loading, error } = userSignIn

  const userRegister = useSelector((state) => state.userRegister)

  const redirect = history.location.search
    ? history.location.search.split('=')[1]
    : '/shopmy-app'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSuccess(false)
    setIsError('')

    try {
      if (typeSubmit) {
        const data = {
          email,
          password,
        }
        dispatch(signin(data))
      } else {
        if (
          username.trim() !== '' &&
          email.trim() !== '' &&
          password.trim() !== ''
        ) {
          if (password.length < 6) {
            setIsError('Password Must Be 6 Characters Long')
          } else if (password !== comfirmPassword) {
            setIsError('Comfirm Password Incorrect')
          } else {
            const data = {
              username,
              email,
              password,
            }
            dispatch(register(data))
          }

          const { error } = userRegister
          if (!error) {
            setTypeSubmit(true)
            setIsSuccess(true)
          } else {
            setIsError(error)
          }
        } else {
          setIsError('All Field Must Be Fill')
        }
      }
    } catch (err) {
      console.log(error)
    }
  }

  return (
    <Container>
      <InnerContainer>
        <h1 className='title'>
          {typeSubmit ? 'Welocome to Shopmy!' : 'Create your Shopmy Account'}
        </h1>
        <LoginRegisterCard>
          <LeftCard>
            {isSuccess && (
              <div className='text-green-400'>Account Created! Login Now</div>
            )}
            {!typeSubmit && (
              <InputContainer>
                <h2>Username</h2>
                <input
                  type='text'
                  placeholder='John Doe'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputContainer>
            )}
            <InputContainer>
              <h2>Email</h2>
              <input
                type='email'
                placeholder='john@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <h2>Password</h2>
              <input
                type='password'
                placeholder='Atleast 6'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
            {!typeSubmit && (
              <InputContainer>
                <h2>Comfirm Password</h2>
                <input
                  type='password'
                  placeholder='Atleast 6'
                  value={comfirmPassword}
                  onChange={(e) => setComfirmPassword(e.target.value)}
                />
              </InputContainer>
            )}
            {error && <div className='text-red-400'>{error}</div>}
            {isError && <div className='text-red-400'>{isError}</div>}
            <button onClick={(e) => handleSubmit(e)}>
              {typeSubmit ? 'Login to Shopmy' : 'Register Shopmy Account'}
            </button>
            {typeSubmit ? (
              <SelectLogin>
                Don't have a account?{' '}
                <span onClick={() => setTypeSubmit(false)}>Register here.</span>
              </SelectLogin>
            ) : (
              <SelectLogin>
                Already have a account?{' '}
                <span onClick={() => setTypeSubmit(true)}>Login here.</span>
              </SelectLogin>
            )}
          </LeftCard>
          <RightCard>
            <h1>Shopmy!</h1>
            <p>Shop till your heart content!</p>
          </RightCard>
        </LoginRegisterCard>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  ${tw`
    flex
    items-center
    justify-center
  `}
`

const InnerContainer = styled.div`
  ${tw`
    px-4
    lg:px-0
    pt-28
    mx-auto
    w-full
    md:max-w-6xl
    flex
    flex-col
    justify-start
  `}

  .title {
    ${tw`
        mb-6
        text-lg
        md:text-xl
        lg:text-2xl
    `}
  }
`

const LoginRegisterCard = styled.div`
  ${tw`
    h-full
    flex
    flex-col-reverse
    md:flex-row
    justify-center
    bg-white
  `}
`

const LeftCard = styled.form`
  ${tw`
    w-full
    md:max-w-lg
    py-4
    px-6
    flex
    flex-col
    justify-between
  `}

  button {
    ${tw`
        mt-2
        py-2
        w-full
        md:max-w-sm
        text-base
        md:text-lg
        font-semibold
        text-white
        bg-yellow-500
        hover:bg-yellow-400
        transition
        duration-200
        ease-in-out
    `}
  }
`

const InputContainer = styled.div`
  ${tw`
    mb-4
  `}

  h2 {
    ${tw`
        text-sm
        lg:text-base
    `}
  }

  input {
    ${tw`
        w-full
        md:max-w-sm
        py-1
        px-3
        border
        text-base
        lg:text-lg
    `}
  }
`

const SelectLogin = styled.h1`
  ${tw`
    mt-2
    md:text-lg
  `}

  span {
    ${tw`
        text-yellow-500
        hover:text-yellow-400
        cursor-pointer
    `}
  }
`

const RightCard = styled.div`
  ${tw`
    py-8
    md:py-0
    w-full
    flex
    flex-col
    items-center
    justify-center
  `}

  h1 {
    ${tw`
        pb-4
        text-4xl
        lg:text-5xl
        font-bold
        text-transparent
        bg-clip-text
        bg-gradient-to-br
        from-yellow-300
        via-yellow-400
        to-yellow-500
    `}
  }

  p {
    ${tw`
        text-lg
        md:text-xl
        lg:text-2xl
    `}
  }
`

export default Login
