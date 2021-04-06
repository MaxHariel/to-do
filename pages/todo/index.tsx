import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Container, Flex, GridItem, SimpleGrid } from '@chakra-ui/layout'
import { Table, Tbody, Td, Tr } from '@chakra-ui/table'
import { NextPage } from 'next'
import { useState } from 'react'

const Index: NextPage = () => {
    const [tableData, setTableData] = useState([
        { task: 'Nova tarefa' },
        { task: 'Nova tarefa 2' }
    ])
    const [inputTask, setInputTask] = useState('')

    const addTask = () => {
        const arr = [...tableData]
        const task = { task: inputTask }
        arr.push(task)
        setTableData(arr)
        setInputTask('')
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
                            {tableData.map(todo => (
                                <Tr>
                                    <Td>{todo.task}</Td>
                                    <Td>Buttons</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </GridItem>
            </SimpleGrid>
        </Container>
    )
}

export default Index
