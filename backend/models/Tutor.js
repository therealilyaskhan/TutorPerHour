import mongoose from 'mongoose';
import fetch from 'node-fetch';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;
const model = mongoose.model;

const tutorSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please add first name'],
    trim: true,
    maxlength: [50, 'name can not be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Please add last name'],
    trim: true,
    maxlength: [50, 'name can not be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add email address'],
    unique: true,
    match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'please Enter a valid email address']
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Please enter password'],
    select: false
  },
  hourlyRate: {
    type: Number,
    required: [true, 'Please add a hourly rate']
  },
  experience: {
    type: Number,
    required: [true, 'Please add experience']
  },
  description: {
    type: String,
    trim: true,
    default: "No description",
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  imageURL: {
    type: String,
    default: '/uploads/no-photo.jpg'
  },
  category: {
    type: String,
    default: "tutors"
  },
  categoryName: {
    type: String,
    enum: ['none', 'science', 'design', 'development', 'religious', 'marketing', 'personal', 'business', 'music', 'photography', 'arts', 'language', 'elementary', 'maths', 'ecommerce'],
    default: "none"
  },
  categoryID: {
    type: Number,
    min: 0,
    max: 14,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  totalMeetings: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating can not be more than 5'],
    default: 0
  },
  city: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

// adding instance method to the instances of the Tutor Model:
// Sign JWT and return
tutorSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match tutor entered password to hashed password in database
tutorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Encrypt password using bcrypt
tutorSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Tutor = model('Tutor', tutorSchema);
export default Tutor;
