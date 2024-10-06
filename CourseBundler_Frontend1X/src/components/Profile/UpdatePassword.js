import React,{useState} from 'react'
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../Redux/actions/profile';
import { loadUser } from '../../Redux/actions/user';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = ({user}) => {
  const {loading} = useSelector(state=>state.profile)
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
const dispatch = useDispatch()
const navigate = useNavigate()
  const submitHandler = async (e)=>{
    e.preventDefault()
    await dispatch(updateProfile(name,email))
    dispatch(loadUser())
    navigate('/profile')
  }
  return (
    <Container py="16" minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          textTransform={'uppercase'}
          children="Update Profile"
          my="16"
          textAlign={['center', 'left']}
        />

        <VStack spacing={'8'}>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            type={'text'}
            focusBorderColor="yellow.500"
          />{' '}
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type={'email'}
            focusBorderColor="yellow.500"
          />
          <Button
            w="full"
            colorScheme={'yellow'}
            type="submit"
            isLoading={loading}
          >
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  )
}

export default UpdatePassword