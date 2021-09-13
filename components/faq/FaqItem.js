import React from 'react';
import Link from 'next/link';
import { deleteFaqs } from '../../redux/actions/faqActions';
import { useDispatch } from 'react-redux';

function FaqItem({ faq }) {

    const dispatch = useDispatch();
    
    const deleteFAQHandle = (faq) => {
        dispatch(deleteFaqs(faq));
    }

    return (
        <div className="alert alert-success">
            {faq.name}
                <span style={{ float: 'right' }}>
                    <Link href={`/faq/${faq._id}`}>
                        <img style={{ cursor: "pointer", width: "20px", marginRight: '10px' }} src="/images/edit.png" alt={faq.name}/> 
                    </Link>
                    <img style={{ cursor: "pointer", width: "20px" }} src="/images/trash.png" alt={faq.name} onClick={(e) => deleteFAQHandle(faq)}/>
                </span>
        </div>
    )
}

export default FaqItem
