import Layout from '../../components/layout/Layout'
import { getFAQDetails } from '../../redux/actions/faqDetailsActions';

import { wrapper } from '../../redux/store';
import UpdateFaq from '../../components/faq/UpdateFaq';

export default function FAqUpdatePage() {
  return (
    <Layout>
      <UpdateFaq />
    </Layout>    
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({req, params , store}) => {
    await store.dispatch(getFAQDetails(req, params.id));
})