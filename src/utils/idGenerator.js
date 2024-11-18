const BASE62_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function toBase62(num) {
  let result = '';
  do {
    result = BASE62_CHARS[num % 62] + result;
    num = Math.floor(num / 62);
  } while (num > 0);
  return result.padStart(4, '0'); // Ensure at least 4 chars
}

function toBase62Short(num) {
  let result = '';
  do {
    result = BASE62_CHARS[num % 62] + result;
    num = Math.floor(num / 62);
  } while (num > 0);
  return result.padStart(3, '0'); // Shorter than recipe IDs
}

export function generateRecipeId(productType) {
  // Get timestamp in seconds
  const timestamp = Math.floor(Date.now() / 1000);
  // Get 2 random bytes (0-65535)
  const random = Math.floor(Math.random() * 65536);
  
  // Get product type prefix (e.g., FC for face_cream)
  const [area, product] = productType.split('_');
  const prefix = (area[0] + product[0]).toUpperCase();
  
  return `${prefix}${toBase62(timestamp)}${toBase62(random)}`;
}

export function generateOrderId(recipeId) {
  // Get timestamp in seconds
  const timestamp = Math.floor(Date.now() / 1000);
  // Get 1 random byte (0-255)
  const random = Math.floor(Math.random() * 256);
  
  // Extract product type prefix from recipe ID (first 2 chars)
  const prefix = recipeId.slice(0, 2);
  
  return `${prefix}O${toBase62Short(timestamp)}${toBase62Short(random)}`;
} 