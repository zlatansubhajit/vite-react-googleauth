import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export default function Error() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={'red.500'}
          rounded={'50px'}
          w={'55px'}
          h={'55px'}
          textAlign="center">
          <CloseIcon boxSize={'20px'} color={'white'} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Oops something went wrong!
      </Heading>
      <Text color={'gray.500'}>
        Please check if you are connected to a network with internet access. Try navigating to home page and 
        back again. If you cannot seem to troubleshoot the issue, contact the IT support.
      </Text>
    </Box>
  );
}