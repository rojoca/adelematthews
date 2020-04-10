import React from "react";

export default function Item({ item }) {
  return (
    <div class="w-full sm:w-1/2 md:w-1/3">
      <img src={item.src} />
    </div>
  );
}
