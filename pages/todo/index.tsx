import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import jwt_decoder from 'jwt-decode'
import { Container, Flex, GridItem, SimpleGrid } from '@chakra-ui/layout'
import { Table, Tbody, Td, Tr } from '@chakra-ui/table'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from '../../requestor/axios'
import withAuth from '../../utils/WithAuth'
import useSWR, { mutate } from 'swr'

interface IUser {
    id: string
}

interface ITask {
    name: string
    status: string
    user: IUser
}

const Index: NextPage = () => {
    const [tableData, setTableData] = useState([])
    const [inputTask, setInputTask] = useState('')
    const [userId, setUserId] = useState('')
    const [taskForm, setTaskForm] = useState({})

    const config = {
        Authorization: `Bearer ${Cookies.get('token')}`
    }

    const fetcher = url =>
        axios.get(url, { headers: config }).then(res => res.data)

    const { data, error } = useSWR('/users', fetcher)

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
        let tasks = [...data.tasks]
        tasks.push(task)
        mutate('/users', { ...data, tasks }, false)

        axios.post('/task', task, {
            headers: config
        })

        setInputTask('')
        // mutate('/users')
    }

    return (
        <Container paddingLeft="0" maxWidth="100%" height="100vh">
            <SimpleGrid h="100%" columns={12} gap={4}>
                <GridItem colSpan={3} bg="purple.400" height="100%" />
                <GridItem colSpan={9} paddingTop="100">
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
                    <Table variant="simple">
                        <Tbody>
                            {error ? (
                                <div>Error</div>
                            ) : (
                                data &&
                                data.tasks.map(task => (
                                    <Tr>
                                        <Td>{task.name}</Td>
                                        <Td>Buttons</Td>
                                    </Tr>
                                ))
                            )}
                        </Tbody>
                    </Table>
                </GridItem>
            </SimpleGrid>
        </Container>
    )
}

export default withAuth(Index)
