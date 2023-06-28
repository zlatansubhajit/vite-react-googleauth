import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Card, CardBody, CardHeader, Container, GridItem, HStack, Heading, SimpleGrid, Skeleton, Stack, StackDivider,Text, useBreakpointValue } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";


export default function ManageMembers() {
  const[data, setData] = useState<any[]>([null])
  const colSpan  = useBreakpointValue({base: 6, sm: 4, md: 2});
  const[error, setError] = useState<any>(null)
  const [isLoading, setLoading] = useState(true)
  

   useEffect(() => {
    fetch(`https://localhost:7249/members`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        console.log(actualData)
        setData(actualData)
      })
      .catch((err) => {
        console.log(err.message)
        setError(err)
      })
      .finally(() => setLoading(false));
  }, []);
  

  
  if(isLoading) return (<Stack>
    <Skeleton height='200px' />
    <Skeleton height='200px' />
    <Skeleton height='200px' />
  </Stack>)
  if(error) return(<ErrorPage/>)
    return(
        <Container maxW={'container.lg'}>

<Breadcrumb p={2}>
  <BreadcrumbItem>
    <BreadcrumbLink as={Link} to={'/home'}>
      Home
    </BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink as={Link} to={'/about'}>
      About
    </BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink>Member Management</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
{ data &&

  data.map((x,index)=> {
    return(
      <Card size={'sm'} key={index}  m={1}>
<CardHeader>
<Heading size='md'>{x.name}</Heading>
</CardHeader>

<CardBody>
<SimpleGrid columnGap={3} rowGap={6} columns={12}>
<GridItem colSpan={colSpan}>
  <Box>
    <Heading size='xs' textTransform='uppercase'>
      Gym
    </Heading>
    <Text pt='2' fontSize='sm'>
      {x.gymName}
    </Text>
  </Box>
  </GridItem>
  <GridItem colSpan={colSpan}>
  <Box>
    <Heading size='xs' textTransform='uppercase'>
      Subscription End
    </Heading>
    <Text pt='2' fontSize='sm'>
      {x.activeSubscription.subEnd}
    </Text>
  </Box>
  </GridItem>
  <GridItem colSpan={colSpan}>
  <Box>
    <Heading size='xs' textTransform='uppercase'>
      PT Trainer
    </Heading>
    <Text pt='2' fontSize='sm'>
      {x.activeSubscription.ptTrainer}
    </Text>
  </Box>
  </GridItem>
  <GridItem colSpan={colSpan}>
  <Box>
    <Heading size='xs' textTransform='uppercase'>
      Amount Due
    </Heading>
    <Text pt='2' fontSize='sm'>
      {x.activeSubscription.dueAmount}
    </Text>
  </Box>
  </GridItem>
  <GridItem colSpan={colSpan}>
  <Box>
    <Heading size='xs' textTransform='uppercase'>
      Email
    </Heading>
    <Text pt='2' fontSize='sm'>
      {x.email}
    </Text>
  </Box>
  </GridItem>
  <GridItem colSpan={colSpan}>
  <Box>
    <Heading size='xs' textTransform='uppercase'>
      Phone
    </Heading>
    <Text pt='2' fontSize='sm'>
      {x.phone}
    </Text>
  </Box>
  </GridItem>
  
</SimpleGrid>
</CardBody>
</Card>

)

    })
    
}

        </Container>
    )
}