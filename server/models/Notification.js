import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
    sendById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, 
    educatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    utxos: [{ type: String, required: true }], 
    changeAddress: { type: String, required: true },
    status: { type: String, enum: ['pending', 'minted', 'failed'], default: 'pending' },
    collateral: { type: String, required: true },
    getAddress: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, 
}, { timestamps: true, minimize: false });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;