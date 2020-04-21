import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

import TextField from "../components/TextField";
import Label from "../components/Label";
import Ripple from "../components/Ripple";

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
  workAlt: Yup.string().notRequired()
});

export default function Contact(props) {
  const { query } = useRouter();
  const [initialValues, setInitialValues] = useState({
    name: "",
    message: "",
    email: "",
    workId: query.workId,
    workCaption: query.caption,
    workAlt: query.alt
  });
  const [state, setState] = useState("idle");
  console.log("initial query", query);

  useEffect(() => {
    // Because the HTML for this page is generated statically
    // and then hydrated, initially, the query will be empty.
    // useEffect will update the initialValues of the form
    // once the query params are available.
    //
    // enableReinitialize must be set to true on the Formik
    // component
    console.log("effect query", query);
    setInitialValues({
      name: "",
      message: "",
      email: "",
      workId: query.workId,
      workCaption: query.caption,
      workAlt: query.alt
    });
    setState("ready");
  }, [query]);

  function handleSubmit(values, { setSubmitting }) {
    setState("submitting");
    fetch("https://submit-form.com/khJco-Sq7ccZx_3y0mD0I", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(function(response) {
        setSubmitting(false);
        setState("submitted");
      })
      .catch(function(error) {
        setState("error");
        setSubmitting(false);
      });
  }

  return (
    <div className="flex flex-col">
      {state === "submitting" && (
        <div className="w-full flex-col items-center">
          <Ripple width="200" height="200" />
          <p className="mt-6 text-center">Submitting...</p>
        </div>
      )}
      {state === "submitted" && (
        <div className="w-full flex-col items-center">
          <p className="mb-6 text-2xl">Thank You!</p>
          <p classname="text-xl">Your enquiry has been received</p>
        </div>
      )}
      {state === "error" && (
        <div className="w-full flex-col items-center">
          <p className="mb-6 text-2xl">Error!</p>
          <p className="text-xl">
            Sorry, we could not submit your enquiry at this time. Please try
            again later.
          </p>
        </div>
      )}
      {state === "ready" && (
        <>
          <h1 className="w-full font-body uppercase text-2xl text-gray-500 mb-4">
            Enquiries
          </h1>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="w-full lg:w-1/2 xl:w-1/3">
                {initialValues.workId && (
                  <div className="rounded shadow p-4 mb-6 flex">
                    <img
                      src={`https://res.cloudinary.com/rojoca/image/upload/w_50,ar_1/${initialValues.workId}`}
                      width="50"
                    />
                    <div className="flex-grow pl-4">
                      <p className="italic text-xs">Enquire about:</p>
                      <p className="text-sm font-bold">{query.caption}</p>
                      <p className="text-xs">{query.alt}</p>
                    </div>
                  </div>
                )}
                <TextField
                  type="text"
                  name="name"
                  label="Name"
                  className="mb-6"
                  required={true}
                />
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  className="mb-6"
                  required={true}
                />
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
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-50 focus:outline-none focus:border-gray-300 focus:shadow-outline-red active:bg-gray-200 transition ease-in-out duration-150 lowercase"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </>
      )}
    </div>
  );
}
