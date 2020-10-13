import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export interface DBInterfaceListITem extends mongoose.Document {
  name: string;
  tags: string[];
	isFavorite: boolean;
}

export const ListItemSchema = new Schema({
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

const ListItem = mongoose.model<DBInterfaceListITem>('listItems', ListItemSchema);

export default ListItem;
