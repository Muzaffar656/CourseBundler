import React, { useEffect, useState } from 'react';
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
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import CourseModal from './CourseModal';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllCourses,
  getCourseLectures,
} from '../../../Redux/actions/course';
import { addLecture, deleteCourse, deleteLecture } from '../../../Redux/actions/admin';
import toast from 'react-hot-toast';

const AdminCourses = () => {
  const dispatch = useDispatch();
  const { courses, lectures } = useSelector(state => state.courses);
  const { message, error, loading } = useSelector(state => state.admin);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [courseID, setCourseID] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  
  const deleteButtonHandler = id => {
    dispatch(deleteCourse(id))
    dispatch(getAllCourses())
  };
  const courseDetailsHandler = (courseID, courseTitle) => {
    dispatch(getCourseLectures(courseID));
    onOpen();
    setCourseID(courseID);
    setCourseTitle(courseTitle);
  };
  const deleteButtonLecturesHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseID, lectureId));
    dispatch(getCourseLectures(courseId));
  };
  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myform = new FormData();
    myform.append('title', title);
    myform.append('description', description);
    myform.append('file', video);
    await dispatch(addLecture(courseId, myform));
    dispatch(getCourseLectures(courseId));
  };
  useEffect(() => {
    dispatch(getAllCourses());
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  }, [dispatch, message, error, onClose]);

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
            <TableCaption>All available Courses in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Posters</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
              </Tr>
            </Thead>

            <Tbody>
              {courses &&
                courses.map(item => (
                  <Row
                    key={item._id}
                    item={item}
                    courseDetailsHandler={courseDetailsHandler}
                    deleteButtonHandler={deleteButtonHandler}
                    loading={loading}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={courseID}
          deleteButtonHandler={deleteButtonLecturesHandler}
          addLectureHandler={addLectureHandler}
          coursetitle={courseTitle}
          lectures={lectures}
          loading={loading}
        />
      </Box>

      <Sidebar />
    </Grid>
  );
};

function Row({ item, courseDetailsHandler, deleteButtonHandler,loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td>{item.category}</Td>

      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => courseDetailsHandler(item._id, item.title)}
            variant={'outline'}
            color="purple.500"
          >
            View Lectures
          </Button>

          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
            isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
export default AdminCourses;
