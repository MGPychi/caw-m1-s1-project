"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/passwords";

export async function signUp(data: {
  name: string;
  email: string;
  password: string;
}) {
  const { name, email, password } = data;

  const existingUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (existingUser) {
    return { error: "User with this email already exists" };
  }

  const hashedPassword = await hashPassword(password);

  try {
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create user" };
  }
}
