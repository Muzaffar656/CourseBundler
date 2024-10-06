import React from 'react';
import { RiMenu5Fill, RiDashboardFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  // Input,
  VStack,
  HStack,
} from '@chakra-ui/react';
import {useDispatch} from 'react-redux'
import {logout} from '../../../Redux/actions/user'
const LinkButton = ({ url = '/', title = 'Home', onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
);
const Header = ({isAuthenticate = false , user}) => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const logouthandler = () => {
  dispatch(logout())
  };

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        colorScheme={'yellow'}
        width="12"
        height={'12'}
        rounded="full"
        zIndex={'overlay'}
        position={'fixed'}
        top={["2","6"]}
        left={["2","6"]}
    
      >
        <RiMenu5Fill />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>COURSE BUNDLER</DrawerHeader>

          <DrawerBody>
            <VStack spacing={'4'} alignItems="flex-start">
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton
                onClose={onClose}
                url="/courses"
                title="Browse All Courses"
              />
              <LinkButton
                onClose={onClose}
                url="/request"
                title="Request a Course"
              />
              <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
              <LinkButton onClose={onClose} url="/about" title="About" />
            </VStack>
          </DrawerBody>

          <DrawerFooter gap="2" position="absolute" left="4" bottom="4">
            {isAuthenticate ? (
              <>
                <VStack>
                  <HStack>
                    <Link to="/profile">
                      <Button>Profile</Button>
                    </Link>

                    <Button onClick={logouthandler}>Logout</Button>
                  </HStack>

                  {user && user.role === 'admin' && (
                    <Link to="/admin/dashboard">
                      <Button colorScheme={'purple'} variant="ghost">
                        <RiDashboardFill style={{ margin: '4px' }} />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                </VStack>
              </>
            ) : (
              <>
                <Link to="/login" onClick={onClose}>
                  <Button colorScheme={'yellow'}>Login</Button>
                </Link>
                <p>OR</p>
                <Link to="/register" onClick={onClose}>
                  <Button colorScheme={'yellow'} onClick={onClose}>
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
