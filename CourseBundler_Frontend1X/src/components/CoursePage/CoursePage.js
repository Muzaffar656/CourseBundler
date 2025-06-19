import React,{useState} from 'react'
import {Grid,Box,Heading, VStack,Button,Text} from '@chakra-ui/react'
import introVideo from '../../assets/videos/intro.mp4';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CoursePage = () => {
  const { user, loading } = useSelector(state => state.user);
  const [lectureNumber, setLectureNumber] = useState(0);

  // ✅ Handle loading state properly
  if (loading) return <p>Loading...</p>;

  // ✅ Safe null check BEFORE accessing user.role
  if (!user) return <Navigate to="/login" replace />;

  const isSubscribed = user.subscription && user.subscription.status === 'open';

  if (user.role !== 'admin' && !isSubscribed) {
    return <Navigate to="/subscribe" replace />;
  }

  const lectures = [
    {
      _id: '1',
      title: 'Intro',
      description: 'Intro lecture',
      video: { url: 'https://example.com/video1.mp4' },
    },
  ];

  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      <Box>
        <video
          width="100%"
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={lectures[lectureNumber].video.url}
        ></video>
        <Heading m="4">
          #{lectureNumber + 1} {lectures[lectureNumber].title}
        </Heading>
      </Box>
      <VStack>
        {lectures.map((lecture, index) => (
          <Button
            key={lecture._id}
            onClick={() => setLectureNumber(index)}
            style={{
              width: '100%',
              padding: '1rem',
              textAlign: 'center',
              margin: 0,
              borderBottom: '1px solid rgba(0,0,0,0.2)',
            }}
          >
            <Text noOfLines={1}>
              #{index + 1} {lecture.title}
            </Text>
          </Button>
        ))}
      </VStack>
    </Grid>
  );
};
export default CoursePage