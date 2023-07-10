import { Flex, Box, Heading, Spacer, ButtonGroup, Button, Avatar } from '@chakra-ui/react'
import useAuth from '../hooks/useAuth';
import Logout from '../pages/Logout';
import { useNavigate } from 'react-router';

function Navbar() {
    const {auth} = useAuth()
    const logout = Logout()
    const navigate = useNavigate()
    function handleSignIn(){
        navigate('/home')
    }
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
            {!auth.user && 
            <ButtonGroup gap='2'>
                <Button colorScheme='teal' onClick={handleSignIn}>Sign Up</Button>
                <Button colorScheme='teal' onClick={handleSignIn}>Log in</Button>
            </ButtonGroup>
            }
            {auth.user && 
            <ButtonGroup gap='2'>
            <Button colorScheme='teal' onClick={logout}>Log Out</Button>
            <Avatar name={auth.user?.name} src={auth.user?.picture} />
            </ButtonGroup>
           
            }
        </Flex>
    </div>)
}

export default Navbar;