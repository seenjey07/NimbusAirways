import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function csrfToken(cookies) {
  const splitCookies = cookies.split('; ');
  return splitCookies.find(cookie => cookie.startsWith("CSRF-TOKEN=")).split('=')[1];

}export default csrfToken;