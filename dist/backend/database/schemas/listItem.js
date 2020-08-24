const mongoose = require('mongoose');

const { Schema } = mongoose;

const ListItemSchema = new Schema({
	name: {
		type: Number,
		required: true,
		trim: true,
		unique: true,
	},
	tags: {
		type: [String],
		index: true,
	},
	isFavorite: {
		type: Boolean,
		default: false,
	},
});

ListItemSchema.index({ name: 1 });

module.exports = mongoose.model('listItems', ListItemSchema);
