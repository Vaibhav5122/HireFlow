import { Webhook } from "svix";
import User from "../models/user.models.js";

export async function clerkWebhook(req, res) {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email.addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        res.json({ message: "User Created" });
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email.addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);

        res.json({ message: "Updated" });
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({ message: "User deleted" });
        break;
      }
      default: {
        break;
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "webhooks error" });
  }
}
