import postgres from "postgres";
import * as readline from "readline";

const sql = postgres(process.env.DATABASE_URL as string ?? "");

function random_alphaneumeric_string_generator(length: number = 8) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your email ->", async (email: string) => {
  const code = random_alphaneumeric_string_generator(8);
  const createdAt = new Date();
  const updatedAt = new Date();
  const check = await sql`SELECT * FROM otp WHERE email = ${email}`;
  if (check.length > 0) {
    console.log(`OTP already sent to this email. OTP -> ${check[0].otp}`);
    process.exit(0);
  }
  const call = await sql`
        INSERT INTO otp (id, created_At, updated_At, email, otp, wrong_attempts) 
        VALUES 
        (${createdAt}, ${updatedAt}, ${email}, ${code}, 0)`;
  if (!email) {
    console.log("Please enter valid email.");
  } else {
    console.log(`Unique code for ${email} -> ${code} ✨`);
    console.log(call);

    process.exit(0);
  }
  rl.close();
});
