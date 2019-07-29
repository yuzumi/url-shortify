import { Document, Schema, model } from 'mongoose'; 

export interface IUrlModel extends Document {
  code?: string,
  long?: string,
  short?: string,
  date?: Date
};

export const UrlSchema: Schema = new Schema({
  code: String,
  long: String,
  short: String,
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'urls'
});

export default model<IUrlModel>('Url', UrlSchema);