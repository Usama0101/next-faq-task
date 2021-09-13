import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { updateFaqs } from '../../redux/actions/faqActions';

function UpdateFaq() {

    const dispatch = useDispatch();
    const { faq } = useSelector(state => state.faqDetails);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
          name: faq.name
        },
        validationSchema: Yup.object({
          name: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .required('Enter FAQ')
        }),
        onSubmit: values => {
            dispatch(updateFaqs(values, router.query.id));
            router.push("/");
        },
        enableReinitialize: true
      });

      return (
        <section className="container mt-5" style={{textAlign: 'center'}}>
            <form onSubmit={formik.handleSubmit}>
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control mb-3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className="alert alert-danger mt-3">{formik.errors.name}</div>
                ) : null}

                <Link href="/">
                    <button className="btn btn-secondary" style={{ marginRight: '10px' }}>Back</button>
                </Link>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </section>
      )
}

export default UpdateFaq
