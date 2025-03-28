import Notification from "../models/notification.js";
export const getAll = async (req, res) => {
    try {
        const { educatorId } = req.query;
        console.log("Received educatorId:", educatorId);

        let query = {};
        if (educatorId && mongoose.Types.ObjectId.isValid(educatorId)) {
            query.educatorId = new mongoose.Types.ObjectId(educatorId);
        }

        const notifications = await Notification.find(query)
            .populate('sendById', '_id name') 
            .populate('course', '_id courseTitle')
            .limit(10)
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, notifications });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



export const createNew = async (req, res) => {
    try {
        const { user, course, mintUserId, utxos, changeAddress, collateral, getAddress } = req.body;

        const notification = new Notification({
            user, course, mintUserId, utxos, changeAddress, status: "pending",
            collateral, getAddress, createdAt: new Date() 
        });

        await notification.save();
        return res.status(201).json({ success: true, message: "Notification Created" }); 
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
export  const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;    

        const notification = await Notification.findById(id);    

        if (!notification) {    
            return res.status(404).json({ success: false, message: "Notification not found" });    
        }    

        notification.status = status;    
        await notification.save();    

        return res.status(200).json({ success: true, message: "Notification status updated" });    
    } catch (error) {    
        return res.status(500).json({ success: false, message: error.message });    
    }    
};
export const deleteNotification = async (req, res) => {
    try {        
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);
        if(notification) {
            await notification.save();
            return res.status(200).json({ success: true, message: "Notification deleted successfully" });
        } else {
            return res.status(404).json({ success: false, message: "Notification not found" }); 
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
