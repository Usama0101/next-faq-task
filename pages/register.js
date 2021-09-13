import Register from '../components/auth/Register';
import Layout from '../components/layout/Layout'
import { getSession } from 'next-auth/client';

export default function RegisterPage() {
  return (
    <Layout>
      <Register />
    </Layout>    
  )
}

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req});
    // if user is not logged in then this session will be empty
    if(session){
        return {
            redirect: {
                destination: '/',
                permanent: false //  redirect only for once
            }
        }
    }

    return {
        props: {}
    }
}
