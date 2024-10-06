import {
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  Text,
  Input,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Box,
  Heading,
  Stack,
  Button,
  VStack,
} from '@chakra-ui/react';
import { React, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC94B',
  backgroundColor: 'white',
};
const CourseModal = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  coursetitle,
  addLectureHandler,
  lectures=[],
  loading
}) => {
  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');
  const handleclose = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleclose}
      size="full"
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{coursetitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p="16">
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my={'5'}>
                <Heading>{coursetitle}</Heading>
                <Heading children={`${id}`} size="sm" opacity={0.4} />
              </Box>

              <Heading children={'Lectures'} size="lg" />
{
    lectures.map((item,i)=>(

              <VideoCard
              key={i}
                num={i + 1}
                title={item.title}
                deleteButtonHandler={deleteButtonHandler}
                description={item.description}
                courseId={id}
                lectureId={item._id}
              />
    ))
}
            </Box>
            <Box>
              <form
                onSubmit={(e) => addLectureHandler(e,id,title, description, video)}
              >
                <VStack spacing={'4'}>
                  <Heading
                    children="Add Lecture"
                    size={'md'}
                    textTransform="uppercase"
                  />

                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                  <Input
                    accept="video/mp4"
                    required
                    type={'file'}
                    focusBorderColor="purple.300"
                    css={{
                      '&::file-selector-button': {
                        ...fileUploadCss,
                        color: 'purple',
                      },
                    }}
                    onChange={changeVideoHandler}
                  />
                  {videoPrev && (
                    <video
                      controlsList="nodownload"
                      controls
                      src={videoPrev}
                    ></video>
                  )}
                  <Button w="full" colorScheme={'purple'} type="submit" isLoading={loading}>
                    Upload
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleclose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>
      <Button onClick={() => deleteButtonHandler(courseId, lectureId)}>
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
