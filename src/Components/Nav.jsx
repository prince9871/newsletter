'use client'

import {
  Box,
  Flex,
  Icon,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  useBreakpointValue 
} from '@chakra-ui/react'
import { AtSignIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
// import NewsIcon from '../../public/googlenews.svg' // Adjust the path as needed

const NavLink = ({ children, href }) => {
  return (
    <Box
      as='a'
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700')
      }}
      href={href}
    >
      {children}
    </Box>
  )
}

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Flex alignItems={'center'}>
          <Icon
            as={AtSignIcon} // Use your SVG icon here
            w={6} // Adjust size as needed
            h={6} // Adjust size as needed
            color={useColorModeValue('gray.800', 'white')} // Icon color
            mr={2} // Margin right to space out from the text
          />
          <NavLink href="/">
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
              fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })} // Font size increased
              fontWeight='bold' // Bold font
              letterSpacing='wide' // Letter spacing for better look
              textTransform='uppercase' // Transform text to uppercase
            >
              Nex Newsletter
            </Text>
          </NavLink>
        </Flex>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}
