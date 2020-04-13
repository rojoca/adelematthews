import React from "react";
import { useMachine } from "@xstate/react";
import { Machine, assign } from "xstate";

const formMachine = {
  id: "contact",
  initial: "editable",
  context: {
    email: "",
    name: "",
    message: ""
  },
  states: {
    editable: {
      on: {
        CHANGE_EMAIL: {
          target: ".idle",
          actions: assign({
            email: (ctx, e) => e.value
          })
        },
        CHANGE_NAME: {
          target: ".idle",
          actions: assign({
            name: (ctx, e) => e.value
          })
        },
        CHANGE_MESSAGE: {
          target: ".idle",
          actions: assign({
            message: (ctx, e) => e.value
          })
        },
        SUBMIT: {
          target: "submitting"
        }
      },
      initial: "idle",
      states: {
        idle: {},
        invalid: {}
      }
    },
    submitting: {
      on: {
        SUCCESS: { target: "submitted" },
        ERROR: {
          target: "editable",
          actions: assign({
            submitError: (ctx, error) => error
          })
        }
      }
    },
    submitted: {
      entry: ["onSuccess"],
      on: {
        TIMEOUT: "editable"
      }
    }
  }
};

export default function Contact(props) {
  function handleSubmit() {}

  return (
    <div className="md:flex md:flex-row items-start">
      <form onSubmit={handleSubmit}></form>
    </div>
  );
}
