import { Document, model, Schema } from 'mongoose';
import { TClient } from './client.interface';

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Completed', 'Pending'],
    required: true,
  },
});

const ClientSchema = new Schema<TClient & Document>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  notes: {
    type: String,
  },
  projects: [ProjectSchema],
});

export const Client = model<TClient & Document>('Client', ClientSchema);
