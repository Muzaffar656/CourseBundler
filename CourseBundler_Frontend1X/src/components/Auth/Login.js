import {React,useState} from 'react'
import {
    Box,
    Button,
    Container,
    FormLabel,
    Heading,
    Input,
    VStack,
  } from '@chakra-ui/react';
  import {Link} from 'react-router-dom'
  import {useDispatch} from 'react-redux'
  import { login } from '../../Redux/actions/user';
const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
const submithandler = (e)=>{
  e.preventDefault();

  dispatch(login(email,password))
}
  return (
    <div className='py-12 sm:p-0'>

<Container h={'95vh'} >
    <VStack h={'full'} justifyContent="center" spacing={'16'} >
        <Heading children={'Welcome to CourseBundler'} mt={['100','0']}/>
        <form style={{ width: '100%' }} onSubmit={submithandler}>
    <Box my={'2'}>
    <FormLabel htmlFor="email" children="Email Address" />
    <Input 
              required
        placeholder='abc@gmail.com'
        id='email'
        onChange={(e)=>{setEmail(e.target.value)}}
        type={'email'}
              focusBorderColor="yellow.500"
    />

    </Box>
    <Box my={'4'}>
    <FormLabel htmlFor="password" children="Password" />
    <Input 
              required
        placeholder='Enter Your Password'
        id='password'
        onChange={(e)=>{setPassword(e.target.value)}}
        type={'password'}
              focusBorderColor="yellow.500"
    />
    </Box>
    <Box>
            <Link to="/forgetpassword">
              <Button fontSize={'sm'} variant="link">
                Forget Password?
              </Button>
            </Link>
          </Box>
          <Button my="4" colorScheme={'yellow'} type="submit">
            Login
          </Button>
          <Box my="4">
            New User?{' '}
            <Link to="/register">
              <Button colorScheme={'yellow'} variant="link">
                Sign Up
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
    </VStack>
</Container>
    </div>
  )
}

export default Login
