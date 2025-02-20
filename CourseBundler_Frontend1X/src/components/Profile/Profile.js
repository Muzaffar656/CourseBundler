import React,{useEffect, useState} from 'react'
import {Container,Text,HStack,Avatar,Image,VStack,Button,Heading,Stack,Modal,ModalCloseButton,Input,ModalFooter,ModalBody,useDisclosure,ModalOverlay,ModalHeader,ModalContent} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCss } from '../Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture } from '../../Redux/actions/profile';
import { CancelSubscription, loadUser } from '../../Redux/actions/user';
import toast from 'react-hot-toast';
import { removeFromPlaylist } from '../../Redux/actions/course';

const Profile = ({user}) => {
  const {loading, error,message} = useSelector(state=> state.profile)
 const dispatch = useDispatch()
    const removeFromPlaylistHandler = async(id)=>{
        await dispatch(removeFromPlaylist(id))
         dispatch(loadUser())
    }
  const { isOpen, onClose, onOpen } = useDisclosure();
  const changeImageSubmitHandler = async (e, image) => {
   e.preventDefault()
   const myform = new FormData()
   myform.append('file',image)
   await dispatch(updateProfilePicture(myform))
   dispatch(loadUser())
  };
  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(message){
      console.log(message)
      toast.success(message)
      dispatch({type:"clearMessage"})

    }
  },[dispatch,error,message])
  const handelCancelSubscription = async()=>{
  await  dispatch(CancelSubscription())
   dispatch(loadUser())

  }
  return (
    <Container minH={'95vh'} maxW="container.lg" py="8">
    <Heading children="Profile" m="8" textTransform={'uppercase'} />

    <Stack
      justifyContent={'flex-start'}
      direction={['column', 'row']}
      alignItems={'center'}
      spacing={['8', '16']}
      padding="8"
    >
      <VStack>
        <Avatar boxSize={'48'} src={user?.avatar?.url} />
        <Button onClick={onOpen}  colorScheme={'yellow'} variant="ghost">
          Change Photo
        </Button>
      </VStack>

      <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
        <HStack>
          <Text children="Name" fontWeight={'bold'} />
          <Text children={user.name} />
        </HStack>{' '}
        <HStack>
          <Text children="Email" fontWeight={'bold'} />
          <Text children={user.email} />
        </HStack>
        <HStack>
          <Text children="CreatedAt" fontWeight={'bold'} />
          <Text children={user.createdAt.split('T')[0]} />
        </HStack>
        {
            user.role !== "admin" && (
                <HStack>
              <Text children="Subscription" fontWeight={'bold'} />
              {user.subscription && user.subscription.status === "open" ? (
                <Button
               onClick={handelCancelSubscription}
                  color={'yellow.500'}
                  variant="unstyled"
                >
                  Cancel Subscription
                </Button>
              ) :( <Link to="/subscribe">
                  <Button colorScheme={'yellow'}>Subscribe</Button>
                </Link>)} 
              </HStack>
            )
        }
        <Stack direction={['column', 'row']} alignItems={'center'}>
            <Link to="/updateprofile">
              <Button>Update Profile</Button>
            </Link>

            <Link to="/changepassword">
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
        </Stack>

        <Heading children="Playlist" size={'md'} my="8" />
{
    user.playlist.length > 0 && (
        <Stack
          direction={['column', 'row']}
          alignItems={'center'}
          flexWrap="wrap"
          p="4"
        >
        {
            user.playlist.map((element,index)=>(
                <VStack w="48" m="2" key={element.course}>
              <Image
                boxSize={'full'}
                objectFit="contain"
                src={element.poster}
              />

              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={'ghost'} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>

                <Button
                 
               onClick={()=>{removeFromPlaylistHandler(element.course)}}
                >
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
            ))
        }
        </Stack>
    )
}
<ChangePhotoBox
        isOpen={isOpen}
        onClose={onClose}
        changeImageSubmitHandler={changeImageSubmitHandler}
        loading={loading}
/>
        </Container>
  )
}



export default Profile          

function ChangePhotoBox({ isOpen,onClose,changeImageSubmitHandler,loading})
{
    const [image, setImage] = useState('');
    const [imagePrev, setImagePrev] = useState('');
    const changeImage = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
    
        reader.onloadend = () => {
          setImagePrev(reader.result);
          setImage(file);
        };
      };
      const closeHandler = () => {
        onClose();
        setImagePrev('');
        setImage('');
      };
    return(
        <Modal isOpen={isOpen} onClose={closeHandler} >
        <ModalOverlay backdropFilter={'blur(10px)'} />
        <ModalContent>
          <ModalHeader>Change Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container>
              <form onSubmit={(e)=>{changeImageSubmitHandler(e,image)}}>
                <VStack spacing={'8'}>
             {imagePrev &&   <Avatar src={imagePrev} boxSize={'48'} />}
  
                  <Input
                   type={'file'}
                  css={{ '&::file-selector-button': fileUploadCss }}
                  onChange={changeImage}
                  />

                  <Button
                    
                    w="full"
                    colorScheme={'yellow'}
                    type="submit"
                    isLoading={loading}
                  >
                    Change
                  </Button>
                </VStack>
              </form>
            </Container>
          </ModalBody>
  
          <ModalFooter>
            <Button mr="3" onClick={closeHandler}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}