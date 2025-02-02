import React from 'react'
import {  Heading, HStack, } from '@chakra-ui/react';
import {
    TiSocialYoutubeCircular,
    TiSocialInstagramCircular,
  } from 'react-icons/ti';
  import { DiGithub } from 'react-icons/di';
  import { Box, Stack,VStack } from '@chakra-ui/react';
const Footer = () => {
  return (
    <Box padding={'4'} bg="blackAlpha.900" minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading children="All Rights Reserved" color={'white'} />
          <Heading
            fontFamily={'body'}
            size="sm"
            children="@6 Pack Programmer"
            color={'yellow.400'}
          />
        </VStack>

        <HStack
          spacing={['2', '10']}
          justifyContent="center"
          color={'white'}
          fontSize="50"
        >
          <a href="https://youtube.com/@zafargaming0505" target={'blank'}>
            <TiSocialYoutubeCircular />
          </a>
          <a href="https://instagram.com/muzaffar_hussain_00" target={'blank'}>
            <TiSocialInstagramCircular />
          </a>
          <a href="https://github.com/Muzaffar656" target={'blank'}>
            <DiGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  )
}

export default Footer
