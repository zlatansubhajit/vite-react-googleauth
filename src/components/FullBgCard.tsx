import { Box, Card, CardBody, Center } from "@chakra-ui/react";
type fullBgCardProps = {
    imgUrl?:string;
    title?:string;
}

export function FullBgCard(props: fullBgCardProps){
    return (
        <Box
                    alignItems={'center'}
                    overflow={'hidden'}>
                    <Box
                        bgImage={props.imgUrl}
                        bgSize={'cover'}
                        width={'100%'}
                        height={'300px'}
                        brightness={'30%'}
                        _hover={{

                            transform: 'scale(1.20)',
                            transition: {
                                transitionTimingFunction: 'ease-in-out',
                                duration: '0.5s',
                            },
                        }}>

                        <Center
                            width={'100%'}
                            height={'100%'}
                            fontSize="3xl"
                            fontWeight={'bold'}
                            color="black"
                            _hover={{
                                color: "white",
                                backdropFilter: 'auto',
                                backdropBrightness: '30%',
                            }}
                        >
                            {props.title}
                        </Center>
                    </Box>
                </Box>
    )
}