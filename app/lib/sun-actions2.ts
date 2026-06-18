"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sql from "@/app/lib/db";

// Branches
export async function createBranch(formData: FormData) {
  const name = formData.get("name") as string;

  const created = new Date();

  try {
    await sql`INSERT INTO branches (name, created) 
    VALUES (${name}, ${created})`;

    revalidatePath("/dashboard/staff-management");
    return { success: true, message: "Branch created successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Server error occurred" };
  }
}

export async function updateBranch(formData: FormData) {
  const name = formData.get("name") as string;
  const id = formData.get("id") as string;

  try {
    await sql`UPDATE branches SET name = ${name} WHERE id=${id}`;

    revalidatePath("/dashboard/staff-management");
    return { success: true, message: "Branch updated successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Server error occurred" };
  }
}

export async function deleteBranch(id: string) {
  try {
    await sql`DELETE FROM branches WHERE id = ${id}`;
    revalidatePath("/dashboard/staff-management");
    return { success: true, message: "Branch deleted!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Some error occurred" };
  }
}
