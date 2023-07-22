import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Card, CardHeader, Heading, CardBody, SimpleGrid, GridItem,Box,Text, useBreakpointValue, Stack, IconButton, Tooltip, Flex } from "@chakra-ui/react";
import { useState } from "react";


function GenericCard({x}:{x:any}) {
    const [isExpanded, setIsExpanded] = useState(false)
    const colSpan  = useBreakpointValue({base: 6, sm: 4, md: 2});
    // console.log("try")
    //console.log(x)
    return (
        <Card variant={'filled'} size={'sm'} direction={{ base: 'column', sm: 'row' }}  m={1} onClick={() => setIsExpanded(!isExpanded)}>

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
  {isExpanded && 
  <>
  <GridItem colSpan={colSpan}>
  <Box>
    <Heading size='xs' textTransform='uppercase'>
      Subscription Start
    </Heading>
    <Text pt='2' fontSize='sm'>
    {x.activeSubscription.subStart}
    </Text>
  </Box>
  </GridItem>
  <GridItem colSpan={colSpan}>
  <Box>
    <Heading size='xs' textTransform='uppercase'>
      Address
    </Heading>
    <Text pt='2' fontSize='sm'>
    {x.address}
    </Text>
  </Box>
  </GridItem>

  </>
  }
</SimpleGrid>
</CardBody>
{isExpanded && 
<Box borderRadius='sm' maxW={{base: '100%', sm: '80px'}} bg={'teal.500'}>
<Flex direction={{base: 'row', sm: 'column'}} justify={'space-evenly'}>
<Tooltip hasArrow label={'Edit member Details'} placement='auto-end'>
<IconButton aria-label={'Edit member Details'} icon={ <EditIcon />} size={'md'} fontSize='20px' colorScheme="darkAlpha"/>
</Tooltip>
<Tooltip hasArrow label={'Delete member'} placement='auto-end'>
<IconButton aria-label={'Delete member'} icon={ <DeleteIcon />} size={'md'} fontSize='20px' colorScheme="darkAlpha"/>
</Tooltip>
</Flex>
</Box>
}
</Card>
    );
}

export default GenericCard