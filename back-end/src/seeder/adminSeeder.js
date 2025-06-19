import {
  createAdminByDefault,
  findUserByEmail,
} from "../repository/userRepo.js";
import { hashPassword } from "../utils/passwordUtils.js";

export const createDefaultAdmin = async () => {
  const adminEmail = "admin@system.com";
  const existingAdmin = await findUserByEmail(adminEmail);

  if (existingAdmin) {
    console.log("Admin already exists.");
    return;
  }

  const hashedPassword = await hashPassword("Admin1234");
  const adminUser = await createAdminByDefault({
    userName: "Super Admin",
    email : adminEmail,
    password : hashedPassword,
    role: "admin",
    confirmEmail: true,
    status: "active",
  });

  console.log("Default Admin Created Successfully:", adminUser.email);
};