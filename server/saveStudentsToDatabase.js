const {
  IECEA,
  IECEB,
  IECEC,
  IIECEA,
  IIECEB,
  IIECEC,
  IIIECEA,
  IIIECEB,
  IIIECEC,
  IVECEA,
  IVECEB,
  IVECEC,
} = require('./db');

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
        departmentId: 'ECE' + 'B',
      },
      {
        department,
        name: 'xyz a',
        section,
        rollNo: '21AB123',
        registerNo: '1234567891',
        mobileNo: '1234567890',
        year,
        departmentId: 'ECE' + 'B',
      },
      {
        department,
        name: 'mno p',
        section,
        rollNo: '21AB123',
        registerNo: '1234567892',
        mobileNo: '1234567890',
        year,
        departmentId: 'ECE' + 'B',
      },
      {
        department,
        name: 'qrs t',
        section,
        rollNo: '21AB123',
        registerNo: '1234567893',
        mobileNo: '1234567890',
        year,
        departmentId: 'ECE' + 'B',
      },
      {
        department,
        name: 'uvw x',
        section,
        rollNo: '21AB123',
        registerNo: '1234567894',
        mobileNo: '1234567890',
        year,
        departmentId: 'ECE' + 'B',
      },

      {
        department,
        name: 'EFG H',
        section,
        rollNo: '21CD123',
        registerNo: '1234567895',
        mobileNo: '1234567891',
        year,
        departmentId: 'ECE' + 'B',
      },
    ];

    // Save data to different collections using different models
    const Model = eval(modelName); // Use eval to dynamically get the model based on the model name
    await Model.create(studentsData);

    console.log('Students saved successfully.');
  } catch (error) {
    console.error('Error saving Students:', error);
  }
};

saveStudentsToDatabase('IECEA', 'ECE', '1', 'A');
saveStudentsToDatabase('IECEB', 'ECE', '1', 'B');
saveStudentsToDatabase('IECEC', 'ECE', '1', 'C');
saveStudentsToDatabase('IIECEA', 'ECE', '2', 'A');
saveStudentsToDatabase('IIECEB', 'ECE', '2', 'B');
saveStudentsToDatabase('IIECEC', 'ECE', '2', 'C');
saveStudentsToDatabase('IIIECEA', 'ECE', '3', 'A');
saveStudentsToDatabase('IIIECEB', 'ECE', '3', 'B');
saveStudentsToDatabase('IIIECEC', 'ECE', '3', 'C');
saveStudentsToDatabase('IVECEA', 'ECE', '4', 'A');
saveStudentsToDatabase('IVECEB', 'ECE', '4', 'B');
saveStudentsToDatabase('IVECEC', 'ECE', '4', 'C');

module.exports = saveStudentsToDatabase;
