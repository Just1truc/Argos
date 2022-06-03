import { Heading, Text, Button, Center, Stack } from '@chakra-ui/react';
import Navbar from '../components/Navbar';

const NotFound = (): JSX.Element => {
  return (
    <>
        <Navbar />
        <Center textAlign={'center'} h={'50vh'} py={10} px={6} >
            <Stack spacing={6} direction={'column'} >
                <Heading display="inline-block" as="h2" size="2xl" bgGradient="linear(to-r, cyan.500, cyan.700)" backgroundClip="text">
                    404
                </Heading>
                <Text fontSize="18px" mt={3} mb={2}>
                    Page Not Found
                </Text>
                <Text color={'gray.500'} mb={6}>
                    The page you're looking for does not seem to exist
                </Text>

                <Button onClick={() => window.location.href = '/'}
                    colorScheme="blue"
                    bgGradient="linear(to-r, cyan.500, cyan.700)"
                    color="white"
                    variant="solid">
                    Go to Home
                </Button>
            </Stack>
        </Center>
    </>
  );
}

export default NotFound;