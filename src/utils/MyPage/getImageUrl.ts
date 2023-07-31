export function getImageUrl(image: string) {
  const { VITE_IMAGE_SERVER_URL } = import.meta.env;
  if (!image) return '';
  return `${VITE_IMAGE_SERVER_URL}/${image}`;
}
