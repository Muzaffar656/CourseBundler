import React, { useEffect ,useState} from 'react';
import {
  Container,
  VStack,
  Box,
  Text,
  Heading,
  Button,
} from '@chakra-ui/react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../Redux/store';
import { useSelector,useDispatch } from 'react-redux';
import { loadUser } from '../../Redux/actions/user';

const PaymentSuccess = () => {
  const dispatch = useDispatch()
const [id,setId] = useState()
const {user} = useSelector(state=>state.user)
let sessionID = user.subscription.session_id
const data = axios.post(`${server}/paymentverfication`,{sessionID},{
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
}).then(({data})=>{
  setId(data.subcriptionID)
  // dispatch(loadUser())
})

  return (
    <Container h={'90vh'} p={['5', '16']} mt={['8', '0']}>
      <Heading children={'You Have Pro Pack'} mb={'2'} textAlign={'center'} />
      <VStack boxShadow={'lg'} borderRadius={'lg'} pb={['10', '16']}>
        <Box
          w={'full'}
          bg={'yellow.400'}
          p={'2'}
          css={{ borderRadius: '8px 8px 0 0' }}
        >
          <Text children={'Payment Success'} />
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} px="8" mt="4" spacing={['2', '8']}>
            <Text>
              Congratulation you're a pro member. You have access to premium
              content.
            </Text>
            <Heading size={'4xl'}>
              <RiCheckboxCircleFill />
            </Heading>
          </VStack>
        </Box>
        <Link to="/profile">
          <Button variant={'ghost'}>Go to profile</Button>
        </Link>

        <Heading size={'xs'}>Reference: {id}</Heading>
      </VStack>
    </Container>
  );
};

export default PaymentSuccess;
