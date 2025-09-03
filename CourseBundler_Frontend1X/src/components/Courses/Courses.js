import React, { useEffect, useState } from 'react';
import {
  HStack,
  Button,
  Text,
  Input,
  Image,
  Heading,
  Stack,
} from '@chakra-ui/react';
import '../Home/Home.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../Redux/actions/course';
import { toast } from 'react-hot-toast';
import { addToPlaylist } from '../../Redux/actions/course';
import { loadUser } from '../../Redux/actions/user';

export const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
  user,
  isLoading
}) => {
  
  return (
    <>
      <div className=" course items-start flex flex-col gap-1 mt-5">
        <Image src={imageSrc} boxSize="40" objectFit={'contain'} />
        <Heading
          textAlign={['center', 'left']}
          maxW="200px"
          size={'sm'}
          fontFamily={'sans-serif'}
          noOfLines={3}
          children={title}
        />
        <Text noOfLines={2} children={description} />
        <HStack>
          <Text
            fontWeight={'bold'}
            textTransform="uppercase"
            children={'Creator'}
          />

          <Text
            fontFamily={'body'}
            textTransform="uppercase"
            children={creator}
          />
        </HStack>
        <Heading
          textAlign={'center'}
          size="xs"
          children={`Lectures - ${lectureCount}`}
          textTransform="uppercase"
        />

        <Heading
          size="xs"
          children={`Views - ${views}`}
          textTransform="uppercase"
        />
        <Stack direction={['column', 'row']} alignItems="center">
          <Link to={`/course/${id}`}>
            <Button colorScheme={'yellow'} >
              Watch Now
            </Button>
          </Link>
          <Button
            isLoading={isLoading == id && isLoading}
            variant={'ghost'}
            colorScheme={'yellow'}
            onClick={() => addToPlaylistHandler(id)}
          >
            Add to playlist
          </Button>
        </Stack>
      </div>
    </>
  );
};
const Courses = () => {
  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];
  const [keyword, setKeyword] = useState();
  const [category, setCategory] = useState();
const [isLoading,setIsLoading]= useState(false)
  const dispatch = useDispatch();
  const { loading, courses, error, message } = useSelector(
    state => state.courses
  );
  const {user} = useSelector(state=>state.user)
  useEffect(() => {
  
    dispatch(getAllCourses(category, keyword,dispatch));
  }, [category, keyword]);
  const addToPlaylistHandler = async id => {
  
    if(!user){
      return toast.error('Please login',{
        duration:1000
      })
    }
      setIsLoading(id)
   await dispatch(addToPlaylist(id));

 setIsLoading(false)

       dispatch(loadUser());
 
  };
  return (
    <div>
      <div className=" max-w-5xl py-8 m-auto  p-5 sm:p-0">
        <h1 className="text-center text-2xl font-bold">All Courses</h1>

        <Input
          value={keyword}
          onChange={e => {
            setKeyword(e.target.value);
          }}
          placeholder="Search a course..."
          type={'text'}
          focusBorderColor="yellow.500"
        />

        <HStack overflowX={'auto'} paddingY="4">
          {categories.map((item, index) => (
            <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
              <Text children={item} />
            </Button>
          ))}
        </HStack>

        <div className=" flex flex-row  sm:grid sm:grid-cols-3  items-center">
          {courses.length > 0 ? (
            courses.map(item => (
              <Course
                key={item._id}
                views={item.views}
                title={item.title}
                imageSrc={item.poster.url}
                id={item._id}
                addToPlaylistHandler={addToPlaylistHandler}
                creator={item.createdBy}
                description={item.description}
                lectureCount={item.numOfVideos}
                loading={loading}
                user={user}
                isLoading={isLoading}
              />
            ))
          ) : (
            <Heading children="Course Not Found" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
