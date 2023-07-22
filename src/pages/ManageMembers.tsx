import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardHeader, Center, Container, Flex, FormControl, FormLabel, GridItem, HStack, Heading, IconButton, Input, InputGroup, InputRightElement, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, SimpleGrid, Skeleton, Spacer, Stack, StackDivider,Text, Tooltip, useBreakpointValue } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import ErrorPage from "./ErrorPage";
import { AddIcon, CloseIcon, MinusIcon, ViewIcon, ViewOffIcon, Icon } from "@chakra-ui/icons";
import { BsFilter } from 'react-icons/bs'
import GenericCard from "../components/GenericCard";



export default function ManageMembers() {
  const[data, setData] = useState<any[]>([null])
  const colSpan  = useBreakpointValue({base: 6, sm: 4, md: 2});
  const formSpan = useBreakpointValue({base: 2, md: 1})
  const[error, setError] = useState<any>(null)
  const [isLoading, setLoading] = useState(true)
  const[editMode, setEditMode] = useState(false)
  const[filterMode, setFilterMode] = useState(false)
  //const[memberForm, setMemberForm] = useState<any>()
  const memberData = useRef({
    name: "",
    phone: 0,
    email: "",
    address: "",
    gymName: "",
    activeSubscription: {
      subStart: "2023-07-22",
      subEnd: "2023-07-22",
      paidAmount: 0,
      dueAmount: 0,
      ptTrainer: ""
    }
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

  function handleMemberChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>){
    //console.log(e.target.id)
    //console.log(e.target.value)
    switch (e.target.id) {
      case 'fullName':
        memberData.current.name = e.target.value
        break;
      case 'gym':
        memberData.current.gymName = e.target.value  
        break;
      case 'email':
        memberData.current.email = e.target.value
        break;
      case 'phone':
        memberData.current.phone = Number(e.target.value)
        break;
      case 'subStart':
        memberData.current.activeSubscription.subStart = e.target.value
        break;
      case 'subEnd':
        memberData.current.activeSubscription.subEnd =  e.target.value  
        break;
      case 'dueAmount':
        memberData.current.activeSubscription.dueAmount = Number(e.target.value)
        break;
      case 'ptTrainer':
        memberData.current.activeSubscription.ptTrainer = e.target.value  
        break;  
    }
  }
  // function handlePaymentChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>){
  //   //console.log(e.target.id)
  //   //console.log(e.target.value)
  //   switch (e.target.id) {
  //     case 'paymentDate':
  //       paymentData.current.date = e.target.value
  //       break;
  //     case 'amount':
  //       paymentData.current.amount = e.target.value  
  //       break;
  //     case 'recBy':
  //       paymentData.current.receivedBy = e.target.value
  //       break;
  //     case 'recFrom':
  //       paymentData.current.receivedFrom = e.target.value  
  //       break;
  //     case 'payMethod':
  //       paymentData.current.payMethod = e.target.value
  //       break;
  //     case 'payFor':
  //       paymentData.current.payFor = e.target.value  
  //       break;  
  //   }
  // }
  // function handleSubsChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>){
  //   //console.log(e.target.id)
  //   //console.log(e.target.value)
  //   switch (e.target.id) {
  //     case 'subStart':
  //       subscriptionData.current.subStart = e.target.value
  //       break;
  //     case 'subEnd':
  //       subscriptionData.current.subEnd = e.target.value  
  //       break;
  //     case 'dueAmount':
  //       subscriptionData.current.due = e.target.value
  //       break;
  //     case 'ptTrainer':
  //       subscriptionData.current.ptTrainer = e.target.value  
  //       break;
  //   }
  // }

  async function handleMemberSubmit(e: React.MouseEvent<HTMLElement>){
    e.preventDefault()
    setLoading(true)
    //paymentData.current.gym = memberData.current.gymName
    //paymentData.current.ptTrainer = memberData.current.activeSubscription.ptTrainer
    console.log(memberData.current)
    //console.log(paymentData.current)
    //console.log(subscriptionData.current)

    const response = await fetch(`https://localhost:7249/members`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(memberData.current)
    })
    console.log(response.json())
    fetchMemberData()
  }

  function resetForm(){
    memberData.current = {
      name: "",
      phone: 0,
      email: "",
      address: "",
      gymName: "",
      activeSubscription: {
        subStart: "2023-07-22",
        subEnd: "2023-07-22",
        paidAmount: 0,
        dueAmount: 0,
        ptTrainer: ""
      }
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

  async function fetchMemberData(){
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
  }
  

   useEffect(() => {
    fetchMemberData()
  }, []);
  

  
  if(isLoading) return (<Stack>
    <Skeleton height='200px' />
    <Skeleton height='200px' />
    <Skeleton height='200px' />
  </Stack>)
  if(error) return(<ErrorPage/>)
    return(
        <Container maxW={'container.lg'}>
<Flex alignItems={'center'} m={1}>
<Breadcrumb px={3}>
  <BreadcrumbItem>
    <BreadcrumbLink as={Link} to={'/home'}>
      Home
    </BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink>Member Management</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
<Tooltip hasArrow label={editMode? 'Collapse Member Form':'Add Member Details'}>
<IconButton aria-label={editMode? 'Collapse Member Form':'Add Member Details'} icon={editMode? <CloseIcon />: <AddIcon />} size={'xs'} onClick={toggleEditMode}/>
</Tooltip>
<Spacer />
<Button rightIcon={<Icon as={BsFilter}/>} onClick={() => setFilterMode(!filterMode)}>Filter</Button>
</Flex>

{/* Member form collapse */}
{editMode && 
      <Card
          variant={'filled'}
          rounded={'md'}
          p={8}
          m={1}>
          <Stack spacing={4}>
            <form ref={memberFormRef}>
            <SimpleGrid columnGap={3} rowGap={6}  columns={2} px={4} py={2}>
              <GridItem colSpan={formSpan}>
                <FormControl id="fullName" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input border={"2px solid gray"} type="text" placeholder="Enter Full Name" onChange={handleMemberChange}/>
                </FormControl>
              </GridItem>
              <GridItem colSpan={formSpan}>
                <FormControl id="gym" isRequired>
                  <FormLabel>Gym Name</FormLabel>
                  <Input border={"2px solid gray"} type="text" placeholder="Enter Gym Name" onChange={handleMemberChange}/>
                </FormControl>
              </GridItem>
              <GridItem colSpan={formSpan}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input border={"2px solid gray"} type="email" placeholder="Enter Email ID" onChange={handleMemberChange}/>
            </FormControl>
            </GridItem>
            <GridItem colSpan={formSpan}>
            <FormControl id="phone" isRequired>
              <FormLabel>phone</FormLabel>
                <Input border={"2px solid gray"} type="text" placeholder="Enter Phone Number" onChange={handleMemberChange}/>
            </FormControl>
            </GridItem>
            </SimpleGrid>
            </form>
            {/* optional subscription and payments accordions*/}
            {/* <Accordion allowMultiple>
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
                              <Input type="date" onChange={handleMemberChange}/>
                            </FormControl>
                          </GridItem>
                          <GridItem colSpan={formSpan}>
                            <FormControl id="subEnd" >
                              <FormLabel>Subscription End</FormLabel>
                              <Input type="date" onChange={handleMemberChange}/>
                            </FormControl>
                          </GridItem>
                          <GridItem colSpan={formSpan}>
                        <FormControl id="dueAmount" >
                          <FormLabel>Due Amount</FormLabel>
                          <NumberInput defaultValue={0} >
                            <NumberInputField onChange={handleMemberChange}/>
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
                            <Input type="text" onChange={handleMemberChange}/>
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
                              <Input type="date" onChange={handlePaymentChange}/>
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
            </Accordion> */}
            {/* Accordion end*/}
            <SimpleGrid columnGap={3} rowGap={6}  columns={2} px={4} py={2}>
            <GridItem colSpan={formSpan}>
            <Button
                type="button"
                loadingText="Resetting"
                size="lg"
                colorScheme={'red'}
                width={'100%'}
                variant={'outline'}
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
                colorScheme={'teal'}
                width={'100%'}
                onClick={handleMemberSubmit}
                >
                Submit Details
              </Button>
              </GridItem>
              </SimpleGrid>
          </Stack>
        </Card>
}
{/* member form end */}

{/* filter form collapse */}
{filterMode && 
      <Box
      bg={'gray.700'}
          rounded={'md'}
          boxShadow={'lg'}
          p={8}
          m={1}>
          <Stack spacing={4}>
            <form ref={memberFormRef}>
            <SimpleGrid columnGap={3} rowGap={6}  columns={2} px={4} py={2}>
              <GridItem colSpan={formSpan}>
                <FormControl id="fullNameFilter" isRequired>
                  <FormLabel>Filter by Name</FormLabel>
                  <Input type="text" onChange={handleMemberChange}/>
                </FormControl>
              </GridItem>
              <GridItem colSpan={formSpan}>
                <FormControl id="gymFilter" isRequired>
                  <FormLabel>Filter by Gym</FormLabel>
                  <Input type="text" onChange={handleMemberChange}/>
                </FormControl>
              </GridItem>
              <GridItem colSpan={formSpan}>
            <FormControl id="emailFilter" isRequired>
              <FormLabel>Filter by Email</FormLabel>
              <Input type="email" onChange={handleMemberChange}/>
            </FormControl>
            </GridItem>
            <GridItem colSpan={formSpan}>
            <FormControl id="phoneFilter" isRequired>
              <FormLabel>Filter by phone</FormLabel>
                <Input type="text" onChange={handleMemberChange}/>
            </FormControl>
            </GridItem>
            </SimpleGrid>
            </form>
            
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
{/* filter form end */}

{ data &&

  data.map((x,index)=> {
    
    return(
      <GenericCard x={x} key={index} />
    )
  })
    
}

        </Container>
    )
}