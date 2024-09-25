import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        products: [{
            type: mongoose.ObjectId,
            ref: 'Product',
        },
        ],
        payment: {},
        buyers: {
            type: mongoose.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            default: 'Not Processed',
            enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Cancel"]
        }
    }, { timestamps: true }
);

export default mongoose.model('Order', orderSchema);