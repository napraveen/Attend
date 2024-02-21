const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: [true, 'Your email address is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Your username is required'],
  },
  password: {
    type: String,
    required: [true, 'Your password is required'],
  },
  category: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
  section: {
    type: String,
    required: false,
  },
  batch: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const publicPosts = [
  {
    title: 'Free Tips on Development',
    content: 'These are some tips',
  },
];

const privatePosts = [
  {
    title: 'Paid Tips on Development',
    content: 'These are some tips',
  },
];

const StudentSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
  section: {
    type: String,
    required: false,
  },
  batch: {
    type: String,
    required: false,
  },
  departmentId: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  rollNo: {
    type: String,
    required: false,
  },
  registerNo: {
    type: String,
    required: false,
  },
  mobileNo: {
    type: String,
    required: false,
  },
  presentCount: {
    type: Number,
    default: 0,
  },
  absentCount: {
    type: Number,
    default: 0,
  },
  medicalLeave: {
    type: Number,
    default: 0,
  },
  previledgeLeave: {
    type: Number,
    default: 0,
  },
  presentDates: [
    {
      type: String,
    },
  ],
  absentDates: [
    {
      type: String,
    },
  ],
  unAppliedDates: [
    {
      type: String,
    },
  ],
  acceptedDates: [
    {
      type: String,
    },
  ],
});

const leaveFormSchema = mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  students: [
    {
      year: {
        type: String,
        required: false,
      },
      department: {
        type: String,
        required: false,
      },
      section: {
        type: String,
        required: false,
      },
      batch: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
      regNo: {
        type: String,
        required: false,
      },
      imgUrl: {
        type: String,
        required: false,
      },
      reason: {
        type: String,
        required: false,
      },
      status: {
        type: String,
        required: false,
      },
      appliedDates: [
        {
          type: String,
        },
      ],

      // file: {
      //   data: Buffer,
      //   contentType: String,
      //   filename: String,
      // },
    },
  ],
});

const submittedDatesSchema = mongoose.Schema({
  departmentId: {
    type: String,
    required: false,
  },
  dates: [
    {
      type: String,
    },
  ],
});
const submittedDates = mongoose.model('SubmittedDates', submittedDatesSchema);
const departments = [
  'ECEA',
  'ECEB',
  'ECEC',
  'MECHA',
  'MECHB',
  'MECHC',
  'EEEA',
  'EEEB',
  'EEEC',
  'ITA',
  'ITB',
  'ITC',
  'CSEA',
  'CSEB',
  'CSEC',
  'ADSA',
  'ADSB',
  'ADSC',
  'AMLA',
  'AMLB',
  'AMLC',
  'CHEMA',
  'CHEMB',
  'CHEMC',
  'BIOA',
  'BIOB',
  'BIOC',
];
// departments.map((item) => {
//   submittedDates.create({
//     departmentId: item,
//   });
// });

const User = mongoose.model('User', userSchema);

// const departments = ['IECEA', 'IECEB', 'IECEC', 'IIECEA', 'IIECEB', 'IIECEC', 'IIIECEB2021', 'IVECEB2020'];

// departments.map((department) => {
//   department = mongoose.model(department, StudentSchema);
// });
const IECE2023A = mongoose.model('IECE2023A', StudentSchema);
const IECE2023B = mongoose.model('IECE2023B', StudentSchema);
const IECE2023C = mongoose.model('IECE2023C', StudentSchema);
const IIECE2022A = mongoose.model('IIECE2022A', StudentSchema);
const IIECE2022B = mongoose.model('IIECE2022B', StudentSchema);
const IIECE2022C = mongoose.model('IIECE2022C', StudentSchema);
const IIIECE2021A = mongoose.model('IIIECE2021A', StudentSchema);
const IIIECE2021B = mongoose.model('IIIECE2021B', StudentSchema);
const IIIECE2021C = mongoose.model('IIIECE2021C', StudentSchema);
const IVECE2020A = mongoose.model('IVECE2020A', StudentSchema);
const IVECE2020B = mongoose.model('IVECE2020B', StudentSchema);
const IVECE2020C = mongoose.model('IVECE2020C', StudentSchema);

const LeaveForm = mongoose.model('LeaveForm', leaveFormSchema);
module.exports = {
  User,
  publicPosts,
  privatePosts,

  IECE2023A,
  IECE2023B,
  IECE2023C,
  IIECE2022A,
  IIECE2022B,
  IIECE2022C,
  IIIECE2021A,
  IIIECE2021B,
  IIIECE2021C,
  IVECE2020A,
  IVECE2020B,
  IVECE2020C,
  submittedDates,
  LeaveForm,
};
