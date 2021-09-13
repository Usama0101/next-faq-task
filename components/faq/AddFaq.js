import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addFaqs } from '../../redux/actions/faqActions';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

function AddFaq() {

    const dispatch = useDispatch();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
          name: ''
        },
        validationSchema: Yup.object({
          name: Yup.string()
            .max(30, 'Must be 15 characters or less')
            .required('Enter FAQ')
        }),
        onSubmit: values => {
            dispatch(addFaqs(values));
            router.push("/");
        },
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
      );
}

export default AddFaq
