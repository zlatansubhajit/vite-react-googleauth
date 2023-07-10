import { Card, CardBody, Container, SimpleGrid,Image, CardFooter,Text, Center} from "@chakra-ui/react";
import memberImage from '../assets/members.jpg'
import rupeeImage from '../assets/rupee.jpg'
import employeesImage from '../assets/employees.jpg'
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export function HomePage() {
const navigate = useNavigate()
const {auth}  = useAuth()
function handleCardClick(card: string) {
switch (card) {
    case 'members':
        navigate('/members')
        break;

    default:
        break;
}
}

    return (
        <Container maxW={'container.lg'} >
            <Center height={'150px'}><Text fontSize={'3xl'}>Welcome {auth.user?.name ?? ""} <br /> Choose an option :- </Text></Center>
            <SimpleGrid spacing={10} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
                <Card align={'center'}
                variant={'filled'}
                _hover={{
                    transform:'scale(1.1)',
                    transition: "all 0.25s ease-in-out",
                    filter: "brightness(120%)"
                }}
                onClick={() => handleCardClick("members")}
                >
                    <CardBody>
                        <Image src={memberImage} alt="image for member management"
                        borderRadius={'lg'}
                        />
                    </CardBody>
                    <CardFooter>
                        <Text fontSize={'2xl'}>Manage Members</Text>
                    </CardFooter>
                </Card>
                <Card align={'center'}
                    _hover={{
                        transform:'scale(1.1)',
                        transition: "all 0.25s ease-in-out",
                        filter: "brightness(120%)"
                        
                    }}
                >
                    <CardBody>
                        <Image src={rupeeImage} alt="image for payment screen"
                        borderRadius={'lg'}
                        />
                    </CardBody>
                    <CardFooter>
                        <Text fontSize={'2xl'}>Payments</Text>
                    </CardFooter>
                </Card>
                <Card align={'center'}
                _hover={{
                    transform:'scale(1.1)',
                    transition: "all 0.25s ease-in-out",
                    filter: "brightness(120%)"
                }}
                >
                    <CardBody>
                        <Image src={employeesImage} alt="image for employee management"
                        borderRadius={'lg'}
                        />
                    </CardBody>
                    <CardFooter>
                        <Text fontSize={'2xl'}>Manage Employees</Text>
                    </CardFooter>
                </Card>
            </SimpleGrid>
        </Container>
    );
}