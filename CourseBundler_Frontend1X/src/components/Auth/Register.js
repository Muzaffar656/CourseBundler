import {React,useState} from 'react'

import {
  Avatar,
    Box,
    Button,
    Container,
    FormLabel,
    Heading,
    Input,
    VStack,
  } from '@chakra-ui/react';
  import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../Redux/actions/user';
  export const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: '#ECC94B',
    backgroundColor: 'white',
  };
  
  const fileUploadStyle = {
    '&::file-selector-button': fileUploadCss,
  };

const Register = () => {
const dispatch = useDispatch()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [imagePrev,setImagePrev] = useState('')
    const [image,setImage] = useState('')
    
    const changeImageHandler = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
  
        reader.readAsDataURL(file);
  
        reader.onloadend = () => {
        setImagePrev(reader.result);
        setImage(file)
      };
    };
    const submitHandler  = (e)=>{
      e.preventDefault()
      const myform = new FormData()
      myform.append('name',name)
      myform.append('email',email)
      myform.append('password',password)
      myform.append('file',image)

dispatch(register(myform))

    }
  return (
    <Container h={'100vh'} mt={'0'}>
      <VStack h={'full'} justifyContent="center" >
        <Heading textTransform={'uppercase'} ml={['4','0']} children={'REGISTRATION'} />

        <form  style={{ width: '100%' }} onSubmit={submitHandler}>
          <Box  display={'flex'} justifyContent="center">
            <Avatar  src={imagePrev} size={'xl'} />
          </Box>
    <Box>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="abc"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>

 
          <Box>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={'email'}
              focusBorderColor="yellow.500"
            />
          </Box>

          <Box >
            <FormLabel htmlFor="password" children="Password" />
            <Input
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              type={'password'}
              focusBorderColor="yellow.500"
            />
          </Box>

       <Box>
            <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
            <Input
              accept="image/*"
              required
              id="chooseAvatar"
              type={'file'}
              focusBorderColor="yellow.500"
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
          </Box>

          <Button my={'1'}  colorScheme={'yellow'} type="submit">
            Sign Up
          </Button>

          <Box>
            Already Signed Up?{' '}
            <Link to="/login">
              <Button colorScheme={'yellow'} variant="link">
                Login
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  )
}


export default Register                 