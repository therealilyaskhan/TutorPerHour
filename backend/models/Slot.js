import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const slotSchema = new Schema({
  tutorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor',
    required: [true, 'Please provide tutor ID']
  },
  day: {
    type: String,
    required: [true, 'Please add a day for the meeting'],
    trim: true,
    lowercase: true,
    enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  },
  slot: {
    type: Number,
    required: [true, 'Please add a slot for meeting'],
    enum: [0, 1, 2]
  }
});

//by setting timestamps to true, any student document pushed into the mongoDB via the mongoose will implicitly add-onto the the document being inserted two extra fields: 1) createdAt 2) updatedAt fields; the createdAt is going to have the timestamp for when the document was inserted , and the updatedAt is going to have the timestamp for when the record was last updated in the database;

const Slot = model('Slot', slotSchema);
export default Slot;