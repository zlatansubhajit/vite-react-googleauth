import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardHeader, Center, Container, Flex, FormControl, FormLabel, GridItem, HStack, Heading, IconButton, Input, InputGroup, InputRightElement, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, SimpleGrid, Skeleton, Stack, StackDivider,Text, Tooltip, useBreakpointValue } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import ErrorPage from "./ErrorPage";
import { AddIcon, MinusIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";



export default function ManageMembers() {
  const[data, setData] = useState<any[]>([null])
  const colSpan  = useBreakpointValue({base: 6, sm: 4, md: 2});
  const formSpan = useBreakpointValue({base: 2, md: 1})
  const[error, setError] = useState<any>(null)
  const [isLoading, setLoading] = useState(true)
  const[editMode, setEditMode] = useState(false)
  //const[memberForm, setMemberForm] = useState<any>()
  const memberData = useRef({
    fullName: "",
    email:"",
    phone: "",
    gym: ""
  })
  const memberFormRef = useRef<any>(null)
  const paymentData = useRef({
    date: "",
    amount: "",
    receivedBy: "",
    receivedFrom: "",
    payMethod: "",
    payFor: "",
    ptTrainer: "",
    gym: ""
  })
  const paymentFormRef = useRef<any>(null)
  const subscriptionData = useRef({
    subStart: "",
    subEnd:"",
    due: "",
    ptTrainer: ""
  })
  const subsFormRef = useRef<any>(null)

  function toggleEditMode(){
    setEditMode(!editMode);
  }

  function handleMemberChange(e: React.ChangeEvent<HTMLInputElement>){
    //console.log(e.target.id)
    //console.log(e.target.value)
    switch (e.target.id) {
      case 'fullName':
        memberData.current.fullName = e.target.value
        break;
      case 'gym':
        memberData.current.gym = e.target.value  
        break;
      case 'email':
        memberData.current.email = e.target.value
        break;
      case 'phone':
        memberData.current.phone = e.target.value  
        break;
    }
  }
  function handlePaymentChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>){
    //console.log(e.target.id)
    //console.log(e.target.value)
    switch (e.target.id) {
      case 'paymentDate':
        paymentData.current.date = e.target.value
        break;
      case 'amount':
        paymentData.current.amount = e.target.value  
        break;
      case 'recBy':
        paymentData.current.receivedBy = e.target.value
        break;
      case 'recFrom':
        paymentData.current.receivedFrom = e.target.value  
        break;
      case 'payMethod':
        paymentData.current.payMethod = e.target.value
        break;
      case 'payFor':
        paymentData.current.payFor = e.target.value  
        break;  
    }
  }
  function handleSubsChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>){
    //console.log(e.target.id)
    //console.log(e.target.value)
    switch (e.target.id) {
      case 'subStart':
        subscriptionData.current.subStart = e.target.value
        break;
      case 'subEnd':
        subscriptionData.current.subEnd = e.target.value  
        break;
      case 'dueAmount':
        subscriptionData.current.due = e.target.value
        break;
      case 'ptTrainer':
        subscriptionData.current.ptTrainer = e.target.value  
        break;
    }
  }

  function handleMemberSubmit(e: React.MouseEvent<HTMLElement>){
    e.preventDefault()
    paymentData.current.gym = memberData.current.gym
    paymentData.current.ptTrainer = subscriptionData.current.ptTrainer
    console.log(memberData.current)
    console.log(paymentData.current)
    console.log(subscriptionData.current)
  }

  function resetForm(){
    memberData.current = {
      fullName: "",
      email:"",
      phone: "",
      gym: ""
    }
    paymentData.current = {
      date: "",
      amount: "",
      receivedBy: "",
      receivedFrom: "",
      payMethod: "",
      payFor: "",
      ptTrainer: "",
      gym: ""
    }
    subscriptionData.current = {
      subStart: "",
      subEnd:"",
      due: "",
      ptTrainer: ""
    }
    memberFormRef?.current?.reset()
    paymentFormRef?.current?.reset()
    subsFormRef?.current?.reset()
  }
  

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
<HStack>
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
<Tooltip hasArrow label="Add Member Details">
<IconButton aria-label='Add Member Details' icon={<AddIcon />} size={'xs'} onClick={toggleEditMode}/>
</Tooltip>
</HStack>

{/* Member form collapse */}
{editMode && 
      <Box
      bg={'gray.700'}
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}
          m={1}>
          <Stack spacing={4}>
            <form ref={memberFormRef}>
            <SimpleGrid columnGap={3} rowGap={6}  columns={2} px={4} py={2}>
              <GridItem colSpan={formSpan}>
                <FormControl id="fullName" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input type="text" onChange={handleMemberChange}/>
                </FormControl>
              </GridItem>
              <GridItem colSpan={formSpan}>
                <FormControl id="gym" isRequired>
                  <FormLabel>Gym Name</FormLabel>
                  <Input type="text" onChange={handleMemberChange}/>
                </FormControl>
              </GridItem>
              <GridItem colSpan={formSpan}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={handleMemberChange}/>
            </FormControl>
            </GridItem>
            <GridItem colSpan={formSpan}>
            <FormControl id="phone" isRequired>
              <FormLabel>phone</FormLabel>
                <Input type="text" onChange={handleMemberChange}/>
            </FormControl>
            </GridItem>
            </SimpleGrid>
            </form>
            {/* optional subscription and payments accordions*/}
            <Accordion allowMultiple>
            <AccordionItem>
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton >
                        <Box as="span" flex='1' textAlign='left'>
                          Add Subscription Details
                        </Box>
                        {isExpanded ? (
                          <MinusIcon fontSize='12px' />
                        ) : (
                          <AddIcon fontSize='12px' />
                        )}
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <form ref={subsFormRef}>
                    <SimpleGrid columnGap={3} rowGap={6}  columns={2}>
                          <GridItem colSpan={formSpan}>
                            <FormControl id="subStart" >
                              <FormLabel>Subscription Start</FormLabel>
                              <Input type="datetime-local" onChange={handleSubsChange}/>
                            </FormControl>
                          </GridItem>
                          <GridItem colSpan={formSpan}>
                            <FormControl id="subEnd" >
                              <FormLabel>Subscription End</FormLabel>
                              <Input type="datetime-local" onChange={handleSubsChange}/>
                            </FormControl>
                          </GridItem>
                          <GridItem colSpan={formSpan}>
                        <FormControl id="dueAmount" >
                          <FormLabel>Due Amount</FormLabel>
                          <NumberInput defaultValue={0} >
                            <NumberInputField onChange={handleSubsChange}/>
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                        </GridItem>
                        <GridItem colSpan={formSpan}>
                        <FormControl id="ptTrainer" >
                          <FormLabel>Pt Trainer</FormLabel>
                            <Input type="text" onChange={handleSubsChange}/>
                        </FormControl>
                        </GridItem>
                        </SimpleGrid>
                        </form>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>

              <AccordionItem>
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                          Add Payment Details
                        </Box>
                        {isExpanded ? (
                          <MinusIcon fontSize='12px' />
                        ) : (
                          <AddIcon fontSize='12px' />
                        )}
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <form ref={paymentFormRef}>
                    <SimpleGrid columnGap={3} rowGap={6}  columns={2}>
                          <GridItem colSpan={formSpan}>
                            <FormControl id="paymentDate" >
                              <FormLabel>Payment Date</FormLabel>
                              <Input type="datetime-local" onChange={handlePaymentChange}/>
                            </FormControl>
                          </GridItem>
                          <GridItem colSpan={formSpan}>
                            <FormControl id="amount" >
                              <FormLabel>Amount</FormLabel>
                              <NumberInput defaultValue={0} >
                                <NumberInputField onChange={handlePaymentChange}/>
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            </FormControl>
                          </GridItem>
                          <GridItem colSpan={formSpan}>
                        <FormControl id="recBy" >
                          <FormLabel>Received By</FormLabel>
                          <Input type="text" onChange={handlePaymentChange}/>
                        </FormControl>
                        </GridItem>
                        <GridItem colSpan={formSpan}>
                        <FormControl id="recFrom" >
                          <FormLabel>Received From</FormLabel>
                            <Input type="text" onChange={handlePaymentChange}/>
                        </FormControl>
                        </GridItem>
                        <GridItem colSpan={formSpan}>
                        <FormControl id="payMethod" >
                          <FormLabel>Payment Method</FormLabel>
                          <Select placeholder='Select option' onChange={handlePaymentChange}>
                            <option value='cash'>Cash</option>
                            <option value='card'>Card</option>
                            <option value='upi'>UPI</option>
                            <option value='ass'>ass 🍑</option>
                          </Select>
                        </FormControl>
                        </GridItem>
                        <GridItem colSpan={formSpan}>
                        <FormControl id="payFor" >
                          <FormLabel>Payment For</FormLabel>
                          <Select placeholder='Select option' onChange={handlePaymentChange}>
                            <option value='gym'>Gym membership</option>
                            <option value='pt'>PT training</option>
                            <option value='item'>Items bought</option>
                          </Select>
                        </FormControl>
                        </GridItem>
                        </SimpleGrid>
                        </form>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            </Accordion>
            {/* Accordion end*/}
            <SimpleGrid columnGap={3} rowGap={6}  columns={2} px={4} py={2}>
            <GridItem colSpan={formSpan}>
            <Button
                type="button"
                loadingText="Resetting"
                size="lg"
                bg={'red.400'}
                color={'white'}
                width={'100%'}
                _hover={{
                  bg: 'red.500',
                }}
                onClick={resetForm}
                >
                Reset Form
              </Button>
              </GridItem>
              <GridItem colSpan={formSpan}>
              <Button
                type="button"
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                width={'100%'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleMemberSubmit}
                >
                Submit Details
              </Button>
              </GridItem>
              </SimpleGrid>
          </Stack>
        </Box>
}
{/* member form end */}

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