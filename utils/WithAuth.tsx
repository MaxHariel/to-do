import { ElementType, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

export default function withAuth(PageComponent: ElementType) {
    const Wrapper = props => {
        const router = useRouter()
        useEffect(() => {
            const token = Cookies.get('token')
            if (!token) {
                router.replace('/signin')
            }
        }, [])
        return <PageComponent {...props} />
    }
    return Wrapper
}
