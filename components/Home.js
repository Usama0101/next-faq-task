import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../redux/actions/faqActions'; 
import FaqItem from './faq/FaqItem';
import Link from 'next/link';

function Home() {

    const dispatch = useDispatch();
    const { faqs, error } = useSelector(state => state.faqs);
    
    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
    }, []);

    return (
        <section className="container mt-5">
            <Link href="/faq/add">
                <button
                    id="login_button"
                    className="btn btn-primary mb-2"
                >
                    Add FAQs
                </button>
            </Link> 
            {faqs?.length === 0 ? 
                    <div className="alert alert-danger">No Faqs.</div>
                : 
                    faqs?.map(faq => (
                        <FaqItem key={faq._id} faq={faq} />
                    ))
            }
        </section>
    )
}

export default Home
