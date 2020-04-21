import React from "react";
import { useField } from "formik";
import Label from "./Label";

export default function TextField({
  label,
  className,
  required,
  extra,
  help,
  ...props
}) {
  const [field, meta] = useField(props);
  const classes = {
    default: "block w-full pr-10 sm:text-sm sm:leading-5",
    input: "form-input pr-10",
    textarea: "form-textarea mt-1",
    error:
      "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red"
  };

  function clx(name) {
    let arr = [classes.default, classes[name]];
    if (meta.touched && meta.error) {
      arr.push(classes.error || "");
    } else {
      arr.push(classes.valid || "");
    }
    return arr.join(" ");
  }

  if (!extra && !required) {
    extra = "Optional";
  }

  return (
    <div className={className}>
      <Label name={label} field={field} extra={extra} />
      <div className="mt-1 relative rounded-md shadow-sm">
        {props.type !== "textarea" && (
          <input
            id={`id_${field.name}`}
            className={clx("input")}
            {...field}
            {...props}
          />
        )}
        {props.type === "textarea" && (
          <textarea
            rows="3"
            id={`id_${field.name}`}
            className={clx("textarea")}
            {...field}
            {...props}
          ></textarea>
        )}
      </div>
      {meta.touched && meta.error ? (
        <p className="mt-2 text-xs text-red-600">{meta.error}</p>
      ) : null}
      {help && <p className="mt-2 muted">{help}</p>}
    </div>
  );
}
