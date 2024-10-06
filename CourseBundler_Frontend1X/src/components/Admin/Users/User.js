import React,{useEffect} from 'react'
import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar'
import {useSelector,useDispatch} from 'react-redux'
import toast from 'react-hot-toast'
import { changeRole, deleteUser, getAllUsers } from '../../../Redux/actions/admin';
const User = () => {
  const dispatch = useDispatch()
  const updateHandler = (id)=>{
    dispatch(changeRole(id))
  }
  const deleteButtonHandler = (id)=>{
    dispatch(deleteUser(id))
  }
  const {users,message,error} = useSelector(state=>state.admin) 
  useEffect(()=>{
    if(message){
      toast.success(message)
      dispatch({type:'clearMessage'})
    }
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    dispatch(getAllUsers())
  },[dispatch,message,error])
  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '16']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="All Users"
          my="16"
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All available users in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {users &&
                users.map(item => (
                  <Row
                   
                    key={item._id}
                  item={item}
                  updateHandler={updateHandler}
                  deleteButtonHandler={deleteButtonHandler}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default User;

function Row({ item,updateHandler,deleteButtonHandler  }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>
        {item.subscription && item.subscription.status === 'open'
          ? 'Active'
          : 'Not Active'}
      </Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => updateHandler(item._id)}
            variant={'outline'}
            color="purple.500"
         
          >
            Change Role
          </Button>

          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
          
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
