import React from "react";

export default function Label({ name, field, extra }) {
  return (
    <div className="flex justify-between">
      <label
        htmlFor={`id_${field.name}`}
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        {name}
      </label>
      {extra && (
        <span className="text-xs leading-5 text-gray-500">{extra}</span>
      )}
    </div>
  );
}
