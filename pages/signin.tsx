import Head from 'next/head'
import { NextPage } from 'next'
import { Box, Center, Container } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import Cookies from 'js-cookie'
import { addMinutes } from 'date-fns'
import { useRouter } from 'next/router'
import axios from '../requestor/axios'

const SignIn: NextPage = () => {
    const route = useRouter()
    const signIn = async () => {
        const token = await axios.post('/auth', {
            password: '123456',
            identification: 'maxi@gmail.com'
        })
        Cookies.set('token', token.data.access_token, {
            expires: addMinutes(new Date(), 60)
        })
        route.replace('/todo')
    }
    const signOut = () => {
        Cookies.remove('token')
        route.replace('/signin')
    }
    return (
        <div>
            <Head>
                <title>Login to To-do</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Container>
                    <Center h="100vh">
                        <Box>
                            <Button onClick={signIn} marginRight={'3'}>
                                Entrar
                            </Button>
                            <Button onClick={signOut}>Sair</Button>
                        </Box>
                    </Center>
                </Container>
            </main>
        </div>
    )
}

export default SignIn
