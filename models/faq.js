const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter FAQ'],
        trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false
    }
});

module.exports = mongoose.models.Faq || mongoose.model("Faq", faqSchema);