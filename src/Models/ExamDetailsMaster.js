const mongoose = require('mongoose');

const documentPresetSchema = new mongoose.Schema({
  documentName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: true
  },
  format: {
    type: String, 
    required: true
  },
  maxSize: {
    type: Number, 
    required: true
  },
  minSize: {
    type: Number, 
    required: true
  },
  dimensions: {
    width: Number,
    height: Number
  },
  uploadInstructions: {
    type: String,
    required: true
  }
});

const examMasterSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true
  },
  examCode: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  examDeadlines: {
    registrationStart: {
      type: Date,
      required: true
    },
    registrationEnd: {
      type: Date,
      required: true
    },
    documentSubmissionEnd: {
      type: Date,
      required: true
    }
  },
  documentPresets: [documentPresetSchema], 
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ExamMaster', examMasterSchema);
