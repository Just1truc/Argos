import {
  Box,
  Flex,
  Link,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import "./Navbar.css";
const logo =  require('../img/white_argos_logo.png');

const Navbar = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
          <Box bg={useColorModeValue('gray.100', 'gray.900')} px="4">
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

              {colorMode === 'light' ?
                <Link href="/">
                  <img src={logo} alt="logo" width={"200px"} className={"navbar_logo_white_mode"}/>
                </Link>
                :
                <Link href="/">
                  <img src={logo} alt="logo" width={"200px"} className={"navbar_logo_dark_mode"}/>
                </Link>
              }

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