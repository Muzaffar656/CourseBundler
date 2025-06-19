import React,{useState} from 'react'
import {Grid,Box,Heading, VStack,Button,Text} from '@chakra-ui/react'
import introVideo from '../../assets/videos/intro.mp4';
import { Navigate } from 'react-router-dom';

const CoursePage = ({user}) => {
    const [lectureNumber, setLectureNumber] = useState(0);
  if (!user) return <Navigate to="/login" replace />;

if (
  user.role !== 'admin' &&
  (!user.subscription || user.subscription.status !== 'open')
) {
  return <Navigate to="/subscribe" replace />;
}

    const lectures = [
        {
            _id:"fgdfg",
            title:"sample",
            description:"smaple sdfsdf sdfsd dsfsdf",
            video:{
                url:"dfgfd"
            }
        },
        {
            _id:"fgdfg2",
            title:"sample",
            description:"smaple sdfsdf sdfsd dsfsdf",
            video:{
                url:"dfgfd"
            }
        },
        {
            _id:"fgdfg3",
            title:"sample",
            description:"smaple sdfsdf sdfsd dsfsdf",
            video:{
                url:"dfgfd"
            }
        }
    ]
  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
        <Box>
        <video
              width={'100%'}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={introVideo}
            ></video>
                <Heading
              m="4"
              children={`#${lectureNumber + 1} ${
                lectures[lectureNumber].title
              }`}
            />
        </Box>
        <VStack>
            {
                lectures.map((element,index)=>(
                    <Button
                    onClick={()=>{setLectureNumber(index)}}
                         style={{
                  width: '100%',
                  padding: '1rem',
                  textAlign: 'center',
                  margin: 0,
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
                     key={element._id}>
                        <Text noOfLines={1}>
                        #{index + 1} {element.title}
                        </Text>
                    </Button>
                ))
            }
        </VStack>
    </Grid>
  )
}

export default CoursePage