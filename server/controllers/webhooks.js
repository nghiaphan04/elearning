import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
    try {
        const svixHeaders = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        try {
            whook.verify(JSON.stringify(req.body), svixHeaders);
        } catch (err) {
            console.error("Webhook verification failed:", err);
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const { data, type } = req.body;

        if (!data?.id || !data?.email_addresses?.[0]?.email_address) {
            return res.status(400).json({ success: false, message: "Invalid payload" });
        }

        switch (type) {
            case "user.created": {
                await User.create({
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    imageUrl: data.image_url,
                });
                return res.status(200).json({ success: true });
            }

            case "user.updated": {
                await User.findByIdAndUpdate(data.id, {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    imageUrl: data.image_url,
                });
                return res.status(200).json({ success: true });
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                return res.status(200).json({ success: true });
            }

            default:
                return res.status(400).json({ success: false, message: "Unsupported event type" });
        }
    } catch (error) {
        console.error("Webhook error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
