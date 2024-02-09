// const {
//   IECEA,
//   IECEB,
//   IECEC,
//   IIECEA,
//   IIECEB,
//   IIECEC,
//   IIIECEA,
//   IIIECEB,
//   IIIECEC,
//   IVECEA,
//   IVECEB,
//   IVECEC,
// } = require('./db');
const db = require('./db');
// const Model = db.models[modelName];

const saveStudentsToDatabase = async (modelName, department, year, section) => {
  try {
    const studentsData = [
      {
        department,
        name: 'ABC D',
        section,
        rollNo: '21AB123',
        registerNo: '1234567890',
        mobileNo: '1234567890',
        year,
        departmentId: department + section,
      },
      {
        department,
        name: 'xyz a',
        section,
        rollNo: '21AB123',
        registerNo: '1234567891',
        mobileNo: '1234567890',
        year,
        departmentId: department + section,
      },
      {
        department,
        name: 'mno p',
        section,
        rollNo: '21AB123',
        registerNo: '1234567892',
        mobileNo: '1234567890',
        year,
        departmentId: department + section,
      },
      {
        department,
        name: 'qrs t',
        section,
        rollNo: '21AB123',
        registerNo: '1234567893',
        mobileNo: '1234567890',
        year,
        departmentId: department + section,
      },
      {
        department,
        name: 'uvw x',
        section,
        rollNo: '21AB123',
        registerNo: '1234567894',
        mobileNo: '1234567890',
        year,
        departmentId: department + section,
      },

      {
        department,
        name: 'EFG H',
        section,
        rollNo: '21CD123',
        registerNo: '1234567895',
        mobileNo: '1234567891',
        year,
        departmentId: department + section,
      },
    ];

    // Save data to different collections using different models
    const Model = db.models[modelName];
    await Model.create(studentsData);
    console.log('Students saved successfully.');
  } catch (error) {
    console.error('Error saving Students:', error);
  }
};

const departments = [
  'ECE',
  'MECH',
  'EEE',
  'CSE',
  'IT',
  'ADS',
  'AML',
  'CHEM',
  'CIVIL',
  'BIO',
  'CIVIL',
];
departments.map((item) => {
  saveStudentsToDatabase(`I${item}A`, item, '1', 'A');
  saveStudentsToDatabase(`I${item}B`, item, '1', 'B');
  saveStudentsToDatabase(`I${item}C`, item, '1', 'C');
  saveStudentsToDatabase(`II${item}A`, item, '2', 'A');
  saveStudentsToDatabase(`II${item}B`, item, '2', 'B');
  saveStudentsToDatabase(`II${item}C`, item, '2', 'C');
  saveStudentsToDatabase(`III${item}A`, item, '3', 'A');
  saveStudentsToDatabase(`III${item}B`, item, '3', 'B');
  saveStudentsToDatabase(`III${item}C`, item, '3', 'C');
  saveStudentsToDatabase(`IV${item}A`, item, '4', 'A');
  saveStudentsToDatabase(`IV${item}B`, item, '4', 'B');
  saveStudentsToDatabase(`IV${item}C`, item, '4', 'C');
});

module.exports = saveStudentsToDatabase;
