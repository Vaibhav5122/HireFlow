import jwt from "jsonwebtoken";

export async function generateToken(id) {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  } catch (error) {
    throw error;
  }
}
