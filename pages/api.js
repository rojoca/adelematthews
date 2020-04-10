import fetch from "node-fetch";

export async function getItems() {
  console.log(process.env.CLOUDINARY_KEY, process.env.CLOUDINARY_SECRET);
  const response = await fetch(
    `https://${process.env.CLOUDINARY_KEY}:${process.env.CLOUDINARY_SECRET}@api.cloudinary.com/v1_1/rojoca/resources/image/tags/adelematthews?context=true`
  );
  return response.json();
}

export async function getItem(publicId) {
  const response = await fetch(
    `https://${process.env.CLOUDINARY_KEY}:${process.env.CLOUDINARY_SECRET}@api.cloudinary.com/v1_1/rojoca/resources/image/upload/${publicId}?context=true`
  );
  return response.json();
}
