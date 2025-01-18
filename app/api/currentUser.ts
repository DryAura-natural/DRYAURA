// utils/getCurrentUser.js
import { currentUser } from "@clerk/nextjs/server";

export default async function getCurrentUser() {
  try {
    const user = await currentUser();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;  // Return null if there is an error
  }
}
