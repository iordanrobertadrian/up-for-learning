import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run seed:admin -- "your-strong-password"');
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);

console.log("\nADMIN_PASSWORD_HASH=" + hash + "\n");
console.log("Copy the line above into your .env.local file.\n");
