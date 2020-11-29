import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const ListItemSchema = new Schema({
	name: {
		type: String,
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

ListItemSchema.index({ _id: 1, name: 1 });

module.exports = mongoose.model('listItems', ListItemSchema);
