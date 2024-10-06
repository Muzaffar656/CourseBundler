import {Heading, VStack,Container,Input,Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassoword } from '../../Redux/actions/profile'
import toast from 'react-hot-toast'

const ForgetPassword = () => {
  const {loading,message,error} = useSelector(state => state.profile)
  const dispatch = useDispatch()
  const [email,setEmail]=useState('')
  const submitHandler = e =>{
    e.preventDefault()
    dispatch(forgetPassoword(email))
  }
  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(message){
      toast.success(message)
      dispatch({type:"clearMessage"})
    }
  },[dispatch,message,error])
    return (
        <Container h={'90vh'} py={'16'} justifyContent={'center'} alignItems={'center'}>
            <form onSubmit={submitHandler} >
            <VStack>
                <Heading children={"Forget Password"} />
                <Input
                    placeholder='abc@gmail.com'
                    onChange={(e)=>{setEmail(e.target.value)}}
                    required
                    type={'email'}
                />
                      <Button
 
            type="submit"
            w={'full'}
            colorScheme="yellow"
            isLoading={loading}
          >
            Send Reset Link
          </Button>
            </VStack>
            </form>
        </Container>
  )
}

export default ForgetPassword