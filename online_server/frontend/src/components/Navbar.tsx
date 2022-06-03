import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Link,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
const logo =  require('../img/argos_logo.png');

const Navbar = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
          <Box bg={useColorModeValue('gray.100', 'gray.900')} px="4">
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

              <Link href="/">
                <img src={logo} alt="logo" />
              </Link>

              <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                  <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  </Button>
                </Stack>
              </Flex>
            </Flex>
          </Box>
        </>
    );
}

export default Navbar;