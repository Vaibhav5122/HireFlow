import { Webhook } from "svix";
import User from "../models/user.models.js";

export async function clerkWebhook(req, res) {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body.toString("utf8");

    await webhook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const payloadObject = JSON.parse(payload);

    const { data, type } = payloadObject;

    const firstName = data.first_name || "";
    const lastName = data.last_name || "";
    const fullName = `${firstName} ${lastName}`.trim() || "Clerk User";

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: fullName,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        return res.status(201).json({ message: "User Created" });
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: fullName,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);

        return res.json({ message: "Updated" });
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({ message: "User deleted" });
      }
      default: {
        return res.status(200).json({ message: "Webhook received" });
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: "webhooks error" });
  }
}
