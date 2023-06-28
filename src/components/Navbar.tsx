import { Flex, Box, Heading, Spacer, ButtonGroup, Button, Wrap, Avatar, WrapItem } from '@chakra-ui/react'
import { useContext } from 'react';
import { userContext } from '../App';

function Navbar() {
    const  {user} = useContext(userContext);
    return (<div>
        <Flex
            minWidth={'max-content'}
            alignItems={'center'}
            gap={'2'}
            p={'2'}
        >

            <Box p='2'>
                <Heading size='md'>Gym Admin App</Heading>
            </Box>
            <Spacer />
            {!user && 
            <ButtonGroup gap='2'>
                <Button colorScheme='teal'>Sign Up</Button>
                <Button colorScheme='teal'>Log in</Button>
            </ButtonGroup>
            }
            {user && 
            <Wrap>
                <WrapItem>
                    <Avatar name={user?.name} src={user?.picture} />
                </WrapItem>
            </Wrap>
            }
        </Flex>
    </div>)
}

export default Navbar;