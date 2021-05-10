import { useState } from 'react'

import { Button, IconButton } from '@chakra-ui/button'
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    Box,
    Heading,
    Link,
    useMediaQuery,
    Divider,
    List
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

const SideMenu = ({ isOpen, onClose, onOpen, btnRef }) => {
    const [isMobile] = useMediaQuery('(max-width: 600px)')

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
                size={isMobile ? 'full' : 'xs'}
                closeOnOverlayClick={false}
            >
                <DrawerContent shadow="sm">
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Heading>Menu</Heading>
                    </DrawerHeader>

                    <DrawerBody>
                        <Divider />
                        <List
                            width="100%"
                            textAlign={isOpen ? 'left' : 'center'}
                        ></List>
                    </DrawerBody>

                    <DrawerFooter p="0">
                        <Box
                            display="flex"
                            flex="1"
                            flexDirection="column"
                            alignItems="flex-end"
                            justifyContent="flex-end"
                            w="100%"
                        >
                            <Button
                                size="lg"
                                minH="16"
                                borderRadius="0"
                                colorScheme="red"
                                isFullWidth
                            >
                                Sair
                            </Button>
                        </Box>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideMenu
