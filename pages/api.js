import fetch from "node-fetch";

export async function getItems() {
  console.log(process.env.cloudinary_key);
  console.log(process.env.CLOUDINARY_KEY);
  console.log(process.env);
  const response = await fetch(
    `https://${process.env.cloudinary_key}:${process.env.CLOUDINARY_SECRET}@api.cloudinary.com/v1_1/rojoca/resources/image/tags/adelematthews?context=true`
  );
  return response.json();
}

export async function getItem(publicId) {
  const response = await fetch(
    `https://${process.env.cloudinary_key}:${process.env.CLOUDINARY_SECRET}@api.cloudinary.com/v1_1/rojoca/resources/image/upload/${publicId}?context=true`
  );
  return response.json();
}
