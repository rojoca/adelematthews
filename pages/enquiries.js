import React, { useEffect, useState } from "react"
import Head from "next/head"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"

import TextField from "../components/TextField"
import Label from "../components/Label"
import Ripple from "../components/Ripple"

const schema = Yup.object({
  message: Yup.string().required("Required"),
  name: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  workId: Yup.string().notRequired(),
  workCaption: Yup.string().notRequired(),
  workAlt: Yup.string().notRequired(),
})

function Submitting() {
  // Spinner for submitting the form
  return (
    <div className="w-full flex-col items-center">
      <Ripple width="200" height="200" />
      <p className="w-full mt-6 text-center">Submitting...</p>
    </div>
  )
}

function Submitted() {
  // submitted message
  return (
    <div className="w-full flex-col items-center">
      <p className="mb-6 text-2xl">Thank You!</p>
      <p classname="text-xl">Your enquiry has been received</p>
    </div>
  )
}

function Error() {
  // error message
  return (
    <div className="w-full flex-col items-center">
      <p className="mb-6 text-2xl">Error!</p>
      <p className="text-xl">
        Sorry, we could not submit your enquiry at this time. Please try again later.
      </p>
    </div>
  )
}

function ContactForm({ initialValues, handleSubmit }) {
  console.log(initialValues)
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className="w-full lg:w-1/2 xl:w-1/3">
        <h1 className="w-full font-body uppercase text-2xl text-gray-500 mb-4">Enquiries</h1>
        <p className="mb-4">
          You can contact me about my work using the form below or call on{" "}
          <a href="tel:+64212267155">+64 21 226 7155</a>
        </p>
        {initialValues.workId && (
          <div className="rounded shadow p-4 mb-6 flex">
            <img
              src={`https://res.cloudinary.com/rojoca/image/upload/w_50,ar_1/${initialValues.workId}`}
              width="50"
            />
            <div className="flex-grow pl-4">
              <p className="text-xs uppercase">Enquire about:</p>
              <p className="text-sm font-bold">{initialValues.workCaption}</p>
              {initialValues.workAlt && <p className="text-xs">{initialValues.workAlt}</p>}
            </div>
          </div>
        )}
        <TextField type="text" name="name" label="Name" className="mb-6" required={true} />
        <TextField type="email" name="email" label="Email" className="mb-6" required={true} />
        <TextField
          type="textarea"
          name="message"
          label="Message"
          className="mb-6"
          required={true}
        />
        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm uppercase leading-6 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-50 focus:outline-none focus:border-gray-300 focus:shadow-outline-red active:bg-gray-200 transition ease-in-out duration-150"
          >
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  )
}

const vals = query => ({
  name: "",
  message: "",
  email: "",
  workId: query.workId,
  workCaption: query.caption,
  workAlt: !query.alt || query.alt === "undefined" ? "" : query.alt,
})

export default function Contact(props) {
  const { query } = useRouter()
  const [initialValues, setInitialValues] = useState(vals(query))
  const [state, setState] = useState("idle")

  useEffect(() => {
    // Because the HTML for this page is generated statically
    // and then hydrated, initially, the query will be empty.
    // useEffect will update the initialValues of the form
    // once the query params are available.
    //
    // enableReinitialize must be set to true on the Formik
    // component
    setInitialValues(vals(query))
    setState("ready")
  }, [query])

  function handleSubmit(values, { setSubmitting }) {
    setState("submitting")
    fetch("https://submit-form.com/khJco-Sq7ccZx_3y0mD0I", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    })
      .then(function(response) {
        setSubmitting(false)
        setState("submitted")
      })
      .catch(function(error) {
        setState("error")
        setSubmitting(false)
      })
  }

  return (
    <div className="flex flex-col">
      <Head>
        <title>Adele Matthews - Enquiries</title>
        <meta property="og:url" content="https://adelematthews.nz/enquiries" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Adele Matthews - Enquiries" />
        <meta property="og:description" content="Enquire about viewings or commissions." />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/rojoca/image/upload/w_300,ar_1/foreign-tendencies"
        />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Head>
      {state === "submitting" && <Submitting />}
      {state === "submitted" && <Submitted />}
      {state === "error" && <Error />}
      {state === "ready" && (
        <ContactForm initialValues={initialValues} handleSubmit={handleSubmit} />
      )}
    </div>
  )
}
