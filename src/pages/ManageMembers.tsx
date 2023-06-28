import { Box, Card, CardBody, CardHeader, Container, GridItem, HStack, Heading, SimpleGrid, Stack, StackDivider,Text, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";


export function ManageMembers() {
  const[data, setData] = useState<any[]>([null])
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
        console.log(err.message);
      })
      .finally(() => setLoading(false));
  }, []);
  const colSpan  = useBreakpointValue({base: 6, sm: 4, md: 2});

  if(isLoading) return "loading ...."
    return(
        <Container maxW={'container.lg'}>
           <Card size={'sm'} m={1}>
  <CardHeader>
    <Heading size='md'>MemberName</Heading>
  </CardHeader>

  <CardBody>
  <SimpleGrid columnGap={3} rowGap={6} columns={12}>
    <GridItem colSpan={colSpan}>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Gym
        </Heading>
        <Text pt='2' fontSize='sm'>
          Example Gym
        </Text>
      </Box>
      </GridItem>
      <GridItem colSpan={colSpan}>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Subscription End
        </Heading>
        <Text pt='2' fontSize='sm'>
          25-05-2023
        </Text>
      </Box>
      </GridItem>
      <GridItem colSpan={colSpan}>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          PT Trainer
        </Heading>
        <Text pt='2' fontSize='sm'>
          xyzzz kjslkjlkj
        </Text>
      </Box>
      </GridItem>
      <GridItem colSpan={colSpan}>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Amount Due
        </Heading>
        <Text pt='2' fontSize='sm'>
          1500
        </Text>
      </Box>
      </GridItem>
      <GridItem colSpan={colSpan}>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Email
        </Heading>
        <Text pt='2' fontSize='sm'>
          abcd1234@gmail.com
        </Text>
      </Box>
      </GridItem>
      <GridItem colSpan={colSpan}>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Phone
        </Heading>
        <Text pt='2' fontSize='sm'>
          9999988888
        </Text>
      </Box>
      </GridItem>
      
    </SimpleGrid>
  </CardBody>
</Card>

{
  data[0].name &&
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
      })}
        </Container>
    )
}