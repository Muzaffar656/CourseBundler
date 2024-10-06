import React, { useEffect } from 'react';
import axios from 'axios';
import {
  VStack,
  Heading,
  Button,
  Container,
  Text,
  Box,
} from '@chakra-ui/react';
import { server } from '../../Redux/store';
import {useDispatch,useSelector} from 'react-redux'
import { buySubscription } from '../../Redux/actions/user';
import toast from 'react-hot-toast'
const Subscribe = () => {
  const {error,sessionID}= useSelector(state=> state.subscription)
  const dispatch = useDispatch()
const checkout = async () =>{
  dispatch(buySubscription())
}
console.log(sessionID)
useEffect(()=>{
if(error){
  toast.error(error)
  dispatch({type:"clearError"})
}
if(sessionID){
  window.location = sessionID.subscriptionId.url
}
},[dispatch,error,sessionID])
  return (
    <Container h={'90vh'} p={'5'}>
      <Heading children={'Welcome'} my="8" textAlign={'center'} />
      <VStack boxShadow={'lg'} borderRadius={'lg'}>
        <Box
          bg="yellow.400"
          w={'full'}
          p={'4'}
          css={{ borderRadius: '8px 8px 0 0' }}
        >
          <Text children={'Pro Pack - ₹299.00'} />
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} px="8" mt={'4'} spacing="4">
            <Text children={'Join pro pack and get access to all content.'} />
            <Heading size="md" children={'₹299 Only'} />
          </VStack>
          <Button w="full" my="8" colorScheme={'yellow'} onClick={checkout}>
            Buy Now
          </Button>
        </Box>

        <Box p={'2'} bg="blackAlpha.600" w="full">
          <Heading
            color={'white'}
            textTransform="uppercase"
            size="sm"
            children={'100% refund at cancellation'}
          />

          <Text
            fontSize={'xs'}
            color="white"
            children={'*Terms & Conditions Apply'}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
