import { Button, IconButton } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { HStack, useDisclosure } from '@chakra-ui/react'
import jwt_decoder from 'jwt-decode'
import { Container, Flex, GridItem, SimpleGrid, Text } from '@chakra-ui/layout'
import {
    CheckIcon,
    DeleteIcon,
    EditIcon,
    HamburgerIcon
} from '@chakra-ui/icons'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from '../../requestor/axios'
import withAuth from '../../utils/WithAuth'
import useSWR, { mutate } from 'swr'
import { background } from '@chakra-ui/styled-system'
import SideMenu from '../../components/SideMenu'

interface IUser {
    id: string
}

interface ITask {
    name: string
    status: string
    user: IUser
}

interface IUpdateTask {
    id: string
    name: string
    status: string
    user: IUser
}

const Index: NextPage = () => {
    const [inputTask, setInputTask] = useState('')
    const [userId, setUserId] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef: any = React.useRef()

    const config = {
        Authorization: `Bearer ${Cookies.get('token')}`
    }

    const fetcher = url =>
        axios.get(url, { headers: config }).then(res => res.data)

    const { data, error, isValidating } = useSWR('/users', fetcher)

    useEffect(() => {
        if (Cookies.get('token')) {
            const payload: IUser = jwt_decoder(Cookies.get('token'))
            setUserId(payload.id)
        }
    }, [userId])

    const addTask = async () => {
        const task: ITask = {
            name: inputTask,
            status: 'not_done',
            user: {
                id: userId
            }
        }
        // let tasks = [...data.tasks]
        // tasks.push(task)
        // mutate('/users', { ...data, tasks }, false)

        await axios.post('/task', task, {
            headers: config
        })

        setInputTask('')
        mutate('/users')
    }

    const deleteTask = async (id: string) => {
        await axios.delete(`/task/${id}`, { headers: config })
        mutate('/users')
    }

    const changeTaskStatus = async (task: IUpdateTask) => {
        task.status = 'done'
        await axios.patch(`/task/${task.id}`, task, { headers: config })
        mutate('/users')
    }

    return (
        <Container maxW="container.md" height="100vh" pt="5">
            <SideMenu
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                btnRef={btnRef}
            />
            <Flex>
                <IconButton
                    ref={btnRef}
                    onClick={onOpen}
                    aria-label="open menu"
                    mb="3"
                    icon={<HamburgerIcon />}
                />
                <Text alignSelf="center" fontSize="2xl">
                    Adicionar Nova Tarefa
                </Text>
            </Flex>

            <Flex>
                <Input
                    name="task"
                    value={inputTask}
                    onChange={e => setInputTask(e.target.value)}
                    marginRight="5"
                    placeholder="minha task"
                />
                <Button onClick={addTask} colorScheme="blue">
                    Criar
                </Button>
            </Flex>
            <Table variant="simple" pt="5">
                <Thead>
                    <Tr>
                        <Th>Tarefa</Th>
                        <Th>Completada</Th>
                        <Th>Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {error ? (
                        <div>Error</div>
                    ) : (
                        data &&
                        data.tasks.map(task => (
                            <Tr>
                                <Td width={'container.md'}>{task.name}</Td>
                                <Td>
                                    {task.status === 'done' ? (
                                        <Flex justifyContent="center">
                                            <CheckIcon color="green.400" />
                                        </Flex>
                                    ) : (
                                        ''
                                    )}
                                </Td>
                                <Td>
                                    <HStack spacing="10px">
                                        {task.status === 'not_done' ? (
                                            <Button
                                                onClick={() =>
                                                    changeTaskStatus(task)
                                                }
                                                _hover={{
                                                    background: 'green.500'
                                                }}
                                                background="green.400"
                                                color="white"
                                            >
                                                <CheckIcon />
                                            </Button>
                                        ) : (
                                            ''
                                        )}
                                        <Button
                                            onClick={() => deleteTask(task.id)}
                                            _hover={{
                                                background: 'red.500'
                                            }}
                                            background="red.400"
                                            color="white"
                                        >
                                            <DeleteIcon />
                                        </Button>
                                        <Button
                                            _hover={{
                                                background: 'blue.600'
                                            }}
                                            colorScheme="blue"
                                            color="white"
                                        >
                                            <EditIcon />
                                        </Button>
                                    </HStack>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
        </Container>
    )
}

export default withAuth(Index)
