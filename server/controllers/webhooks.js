import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
    try {
        // Xác minh webhook
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        try {
            await whook.verify(req.body, {
                "svix-id": req.headers["svix-id"],
                "svix-timestamp": req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"],
            });
        } catch (err) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const { data, type } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!data.id || !data.email_addresses?.[0]?.email_address) {
            return res.status(400).json({ success: false, message: "Invalid payload" });
        }

        // Xử lý sự kiện
        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                };
                await User.create(userData);
                return res.status(200).json({ success: true });
            }

            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                };
                await User.findByIdAndUpdate(data.id, userData);
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