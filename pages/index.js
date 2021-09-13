import Home from '../components/Home';
import Layout from '../components/layout/Layout'
import { getFaqs } from '../redux/actions/faqActions';
import { getSession } from 'next-auth/client';
import Script from 'next/script'
import { wrapper } from '../redux/store';

export default function Index() {
  return (
    <Layout>
      <Script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossOrigin="anonymous"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossOrigin="anonymous"></Script>
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