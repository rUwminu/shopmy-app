import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userAction'
import { USER_UPDATE_PROFILE_RESET } from '../constant/userContant'

const Profile = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile

  const [isEdit, setIsEdit] = useState(false)
  const [isEditPassword, setIsEditPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setname] = useState('')
  const [password, setPassword] = useState('')
  const [comfirmPassword, setComfirmPassword] = useState('')
  const [isError, setIsError] = useState('')

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(detailsUser(userInfo._id))
      } else {
        setEmail(user.email)
        setname(user.name)
      }
    }
  }, [dispatch, userInfo, user])

  const handleEditProfile = (e) => {
    e.preventDefault()

    dispatch(updateUserProfile({ userId: user._id, name, email }))
    setIsEdit(false)
  }

  const handleChangePassword = (e) => {
    e.preventDefault()

    if (!isEditPassword) {
      setIsEditPassword(true)
    } else {
      if (password.trim() !== '' && password === comfirmPassword) {
        dispatch(updateUserProfile({ userId: user._id, password }))
        setIsError('')
        setIsEditPassword(false)
      } else {
        setIsError('Retype Password Must Match Password')
      }
    }
  }

  const handleCancelChange = (e) => {
    e.preventDefault()

    setIsEdit(false)
    setIsEditPassword(false)
  }

  return (
    <div className='pt-28 px-4 lg:px-0'>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Container>
          <h1>User Profile</h1>
          {!isEditPassword ? (
            <TopContainer>
              <InputContainer>
                <h2>Full Name</h2>
                <input
                  className={`${
                    isEdit ? 'border w-72' : 'pointer-events-none'
                  }`}
                  type='text'
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </InputContainer>
              <InputContainer>
                <h2>Email Adress</h2>
                <input
                  className={`${
                    isEdit ? 'border w-72' : 'pointer-events-none'
                  }`}
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputContainer>
              <InputContainer>
                <h2>Joined Shopmy On :</h2>
                <p>{user.createdAt}</p>
              </InputContainer>
            </TopContainer>
          ) : (
            <BottomContainer>
              <InputContainer>
                <h2>Password</h2>
                <input
                  className={`border w-72 px-2`}
                  type='password'
                  placeholder='Atleast 6 Characters'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputContainer>
              <InputContainer>
                <h2>Comfirm Password</h2>
                <input
                  className={`border w-72 px-2`}
                  type='password'
                  placeholder='Retype New Password'
                  onChange={(e) => setComfirmPassword(e.target.value)}
                />
              </InputContainer>
            </BottomContainer>
          )}

          {isEditPassword ? (
            <button
              onClick={(e) => handleChangePassword(e)}
              className='bg-yellow-500 hover:bg-yellow-400'
            >
              Save New Password
            </button>
          ) : (
            <>
              {isEdit ? (
                <button
                  onClick={(e) => handleEditProfile(e)}
                  className='bg-yellow-500 hover:bg-yellow-400'
                >
                  Save Change
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className='bg-blue-500 hover:bg-blue-400'
                >
                  Edit Profile
                </button>
              )}
              {!isEdit && (
                <button
                  onClick={(e) => handleChangePassword(e)}
                  className='bg-blue-500 hover:bg-blue-400'
                >
                  Change Password
                </button>
              )}
            </>
          )}

          {isEdit ? (
            <button
              onClick={(e) => handleCancelChange(e)}
              className='bg-blue-500 hover:bg-blue-400'
            >
              Cancel Change
            </button>
          ) : (
            isEditPassword && (
              <button
                onClick={(e) => handleCancelChange(e)}
                className='bg-blue-500 hover:bg-blue-400'
              >
                Cancel Change
              </button>
            )
          )}
        </Container>
      )}
    </div>
  )
}

const Container = styled.div`
  ${tw`
    px-4
    py-6
    lg:px-8
    mx-auto
    w-full
    md:max-w-6xl
    bg-white
    flex
    flex-col
  `}

  h1 {
    ${tw`
        text-lg
        md:text-xl
        lg:text-2xl
        mb-4
    `}
  }

  button {
    ${tw`
        self-start
        mb-3
        w-52
        py-2
        text-white
        font-semibold      
        transition
        duration-200
        ease-out
    `}
  }
`

const TopContainer = styled.div`
  ${tw`
    flex
    flex-wrap
    justify-between
    mb-6
  `}
`

const BottomContainer = styled.div`
  ${tw`
    mb-4
  `}
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
        py-1
        text-lg
        lg:text-xl
        focus:outline-none
    `}
  }

  p {
    ${tw`
        py-1
        text-base
        lg:text-lg
    `}
  }
`

export default Profile
