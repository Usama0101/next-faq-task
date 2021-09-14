import Home from '../components/Home';
import Layout from '../components/layout/Layout'
import { getFaqs } from '../redux/actions/faqActions';
import { getSession } from 'next-auth/client';
import Script from 'next/script'
import { wrapper } from '../redux/store';

export default function Index() {
  return (
    <Layout>
      <Home/>
    </Layout>    
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({req, store}) => {
  const session = await getSession({ req });
  if(!session){
    return {
        redirect: {
            destination: '/login',
            permanent: false //  redirect only for once
        }
    }
  }else {
    await store.dispatch(getFaqs(req));
      return {
        props: {
            session
        }
    }
  }

})