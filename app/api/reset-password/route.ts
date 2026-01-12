import sql from "@/app/lib/db";
import bcrypt from "bcryptjs";

async function resetPassword() {
  const email = "henryomosh7@gmail.com";
  const password = process.env.ADMIN_PASSWORD as string;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`UPDATE users SET password=${hashedPassword} WHERE email=${email}`;
  } catch (error) {
    console.log(error);
  }
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [resetPassword()]);

    return Response.json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
