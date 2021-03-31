import Head from 'next/head'
import { NextPage } from 'next'
import { Box, Center, Container } from '@chakra-ui/layout'
import withAuth from '../utils/WithAuth'

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Container>
                    <Center h="100vh">
                        <Box>Max Hariel</Box>
                    </Center>
                </Container>
            </main>
        </div>
    )
}

export default withAuth(Home)
