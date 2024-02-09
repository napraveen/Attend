const express = require('express');

const app = express();
const { User, submittedDates, LeaveForm, models } = require('./db');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
//---- To check ----
// const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
// const data = require('./data');
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
} = { models };

// const Grid = require('gridfs-stream');
const { use } = require('./routes/auth');
const { addListener } = require('nodemon');
app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//---- To check ----
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json)

// const saveStudentsToDatabase = require('./saveStudentsToDatabase');
// saveStudentsToDatabase();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
app.use(cookieParser());
mongoose
  .connect('mongodb://0.0.0.0/test')
  .then(() => console.log('MongoDB is  connected successfully'))
  .catch((err) => console.error(err));

app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));
app.get('/', (req, res) => {
  res.send('Hello');
});

//2nd success -- To get the userName
app.get('/api/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.json(user);
    console.log(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//success -- Retriving All Datas from Student Model
// app.get('/api/students', async (req, res) => {
//   try {
//     const dataIECEA = await IECEA.find();
//     const dataIIECEA = await IIECEA.find();
//     const dataIIIECEA = await IIIECEA.find();

//     const allData = [...dataIECEA, ...dataIIECEA, ...dataIIIECEA];

//     res.json(allData);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

const Model = {
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
};
//2nd success -- update attendance
app.post(
  '/api/updateAttendance/:year/:department/:section',
  async (req, res) => {
    try {
      const { presentStudents, absentStudents } = req.body;
      const dep = req.params.department;
      const year = req.params.year;
      const section = req.params.section;
      const newID = year + dep + section;
      const DepartmentModel = Model[newID];

      const sectionToLoop = await DepartmentModel.find();
      const newDate = new Date().toISOString().slice(0, 10);
      const submittedDepartment = await submittedDates.findOne({
        departmentId: dep + section,
      });

      if (!submittedDepartment.dates.includes(newDate)) {
        for (const student of sectionToLoop) {
          const isPresent = presentStudents.some((presentStudent) => {
            return presentStudent._id == student._id;
          });

          if (isPresent) {
            student.presentDates.push(newDate);
            student.presentCount += 1;
          } else {
            student.absentDates.push(newDate);
            student.unAppliedDates.push(newDate);
            student.absentCount += 1;
          }

          // Save the updated document
          await student.save();
        }

        // No need to create a new instance and save it
        // const departmentInstance = new DepartmentModel();
        // await departmentInstance.save();

        res.status(200).json({ message: 'Attendance updated successfully' });

        // Update the submittedDates document
        await submittedDates.findOneAndUpdate(
          { departmentId: dep + section },
          { $push: { dates: newDate } }
          // upset true
        );
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
      res.status(500).json({ error: 'Failed to update attendance' });
    }
  }
);

//2nd sucess -- Retriving Submission Status
app.get('/api/submissionstatus/:departmentId', async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const newDate = new Date().toISOString().slice(0, 10);

    // Assuming submittedDates is your MongoDB collection
    const submittedDepartment = await submittedDates.findOne({
      departmentId: departmentId, // Use the received departmentId in the query
    });

    if (submittedDepartment && submittedDepartment.dates.includes(newDate)) {
      res.status(200).json({ message: 'true' });
    } else {
      res.status(200).json({ message: 'false' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error('Error fetching submission status:', error);
  }
});

//2nd success -- Add Student in Edit Page
app.post('/api/:year/:department/:section/addstudents', async (req, res) => {
  try {
    const {
      name,
      year,
      department,
      section,
      departmentId,
      category,
      email,
      username,
      rollNo,
      registerNo,
      mobileNo,
    } = req.body;

    const studDepartment = req.params.department;
    const studYear = req.params.year;
    const studSection = req.params.section;
    const newID = studYear + studDepartment + studSection;
    const DepartmentModel = Model[newID];

    // Use the create method to directly create and save the new student
    await DepartmentModel.create({
      name,
      year,
      department,
      section,
      departmentId,
      rollNo,
      registerNo,
      mobileNo,
      category,
      email,
      username,
    });

    res.status(201).json({ message: 'Student added successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//2nd success -- Searching in Remove Student Edit Page
app.get(
  '/api/findstudent/:year/:department/:section/:registerno',
  async (req, res) => {
    const regNo = req.params.registerno;
    const dep = req.params.department;
    const year = req.params.year;
    const section = req.params.section;
    const newID = year + dep + section;
    const DepartmentModel = Model[newID];

    const sectionToLoop = await DepartmentModel.find();
    // console.log(sectionToLoop);
    const student = sectionToLoop.filter((item) => item.registerNo == regNo);
    console.log('student: ' + student);
    // const student = await Student.findOne({ registerNo: registerNumber });
    res.status(200).json({ found: student[0] });
  }
);

//2nd success -- Deletion in Edit Page
app.delete(
  '/api/deletestudent/:year/:department/:section/:studentid',
  async (req, res) => {
    try {
      const studentIdToDelete = req.params.studentid;

      const dep = req.params.department;
      const year = req.params.year;
      const section = req.params.section;
      const newID = year + dep + section;
      const DepartmentModel = Model[newID];

      // Find and remove the student with the specified ID
      const result = await DepartmentModel.findByIdAndDelete(studentIdToDelete);

      if (result) {
        console.log(
          `Student with ID ${studentIdToDelete} deleted successfully.`
        );
        res.status(200).json({ message: `Student deleted successfully.` });
      } else {
        console.log('Student not found or not deleted.');
        res.status(404).json({ message: 'Student not found or not deleted.' });
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
);

//2nd success -- Retriving class details
app.get('/api/:year/:department/:section/classdetails', async (req, res) => {
  const dep = req.params.department;
  const year = req.params.year;
  const section = req.params.section;
  const newID = year + dep + section;
  const DepartmentModel = Model[newID];

  const sectionToLoop = await DepartmentModel.find();
  res.send(sectionToLoop);
});

// app.get('/api/:year/:department/departmentdetails', async (req, res) => {
//   const dep = req.params.department;
//   const year = req.params.year;
//   const newID = year + dep;
//   const collections = await mongoose.connection.db.listCollections().toArray();
//   const collectionNames = collections.map((collection) => collection.name);

//   // Filter matching collections
//   const matchingCollections = collectionNames.filter((collectionName) =>
//     collectionName.startsWith(newID.toLowerCase())
//   );

//   // Remove trailing 's' and then capitalize
//   const formattedCollections = matchingCollections.map((collectionName) =>
//     collectionName.slice(0, -1).toUpperCase()
//   );

//   // Fetch data from all matching models
//   try {
//     const allData = [];
//     for (const modelName of formattedCollections) {
//       const model = mongoose.model(modelName);
//       const data = await model.find();
//       allData.push(...data);
//     }

//     res.status(200).json(allData);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

//2nd success -- Getting All details of a Department in Dashboard Page of HOD --
app.get('/api/:year/:department/departmentdetails', async (req, res) => {
  const dep = req.params.department;
  const year = req.params.year;
  const newID = year + dep;
  const collections = await mongoose.connection.db.listCollections().toArray();
  const collectionNames = collections.map((collection) => collection.name);
  // Filter matching collections
  const matchingCollections = collectionNames.filter((collectionName) =>
    collectionName.startsWith(newID.toLowerCase())
  );
  // Remove trailing 's' and then capitalize
  const formattedCollections = matchingCollections.map((collectionName) =>
    collectionName.slice(0, -1).toUpperCase()
  );
  // Organize data by sections
  const dataBySections = {};
  for (const modelName of formattedCollections) {
    const model = mongoose.model(modelName);
    const data = await model.find();
    data.forEach((entry) => {
      const section = entry.section;
      if (!dataBySections[section]) {
        dataBySections[section] = [];
      }
      dataBySections[section].push(entry);
    });
  }
  res.status(200).json(dataBySections);
});

//2nd -- Student Dashboard Page --
app.get(
  '/api/:year/:department/:section/:email/studentdetails',
  async (req, res) => {
    const email = req.params.email;
    const dep = req.params.department;
    const year = req.params.year;
    const section = req.params.section;
    const newID = year + dep + section;
    const DepartmentModel = Model[newID];

    const sectionToLoop = await DepartmentModel.find();
    const student = sectionToLoop.filter((item) => item.email === email);
    // console.log('hi' + student);
    res.status(200).json(student);
  }
);

// app.post(
//   '/api/:year/:department/:section/submitleaveform',
//   async (req, res) => {
//     try {
//       const { year, department, section, email } = req.body;

//       let dep = await LeaveForm.findOne({ department });

//       if (!dep) {
//         dep = await LeaveForm.create({ department });
//       }

//       dep.students.push({
//         year,
//         department,
//         section,
//         email,
//       });

//       await dep.save();

//       res.status(201).json({ message: 'Student added successfully!' });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }
// );
// const conn = mongoose.connection;
// let gfs;

// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads'); // Specify the directory where you want to store files
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
app.use(express.json());

//2nd success --Leave Form - Student Page --
app.post(
  '/api/:year/:department/:section/submitleaveform',
  async (req, res) => {
    try {
      const {
        year,
        department,
        section,
        email,
        name,
        regNo,
        imgUrl,
        reason,
        appliedDates,
      } = req.body;
      console.log('imgurl ' + imgUrl);
      let dep = await LeaveForm.findOne({ department });

      if (!dep) {
        dep = await LeaveForm.create({ department });
      }
      console.log('hello ');

      const fileData = {
        year,
        department,
        section,
        email,
        regNo,
        name,
        imgUrl,
        appliedDates,
        reason,
      };

      dep.students.push(fileData);

      await dep.save();

      res.status(201).json({ message: 'Student added successfully!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

//2nd success -- Leave Form- Mentor
app.get('/api/files/:year/:department/:section', async (req, res) => {
  try {
    const { year, department, section } = req.params;

    const dep = await LeaveForm.findOne({ department });

    if (!dep) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const files = dep.students
      .filter(
        (student) =>
          student.year === year &&
          student.section === section &&
          student.status == null
      )
      .map((student) => ({
        _id: student._id, // Use the actual identifier for your file
        imgUrl: student.imgUrl,
        email: student.email,
        name: student.name,
        regNo: student.regNo,
        reason: student.reason,
        department: student.department,
        status: student.status,
        dates: student.appliedDates,
      }));

    console.log(files);

    res.json({ files });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//2nd success -- Leave Form- HOD
app.get('/api/hod/files/:year/:department/:section', async (req, res) => {
  try {
    const { year, department, section } = req.params;

    const dep = await LeaveForm.findOne({ department });

    if (!dep) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const files = dep.students
      .filter(
        (student) => student.year === year && student.status === 'verified'
      )
      .map((student) => ({
        _id: student._id, // Use the actual identifier for your file
        imgUrl: student.imgUrl,
        email: student.email,
        name: student.name,
        regNo: student.regNo,
        reason: student.reason,
        year: student.year,
        department: student.department,
        section: student.section,
        status: student.status,
        dates: student.appliedDates,
      }));

    console.log('this file is ', files);

    res.json({ files });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//2nd success -- Verified in Mentor Side
app.post('/api/verified', async (req, res) => {
  try {
    let { id, department } = req.body;
    console.log(id + ' ' + department);
    const dep = await LeaveForm.findOne({ department });

    if (!dep) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const student = dep.students.find((student) => student._id == id);
    console.log(student);
    student.status = 'verified';
    await dep.save();

    res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    console.error('Error in /api/verified:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//2nd success -- Accept in HOD Side
app.post('/api/accepted', async (req, res) => {
  try {
    let { id, year, department, section, regNo, dates } = req.body;
    console.log(id + ' ' + department);
    const dep = await LeaveForm.findOne({ department });

    if (!dep) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const student = dep.students.find((student) => student._id == id);
    console.log(student);
    student.status = 'Accepted';
    await dep.save();

    const newID = year + department + section;
    const DepartmentModel = Model[newID];

    const sectionToLoop = await DepartmentModel.find();

    const stud = sectionToLoop.filter(
      (student) => student.registerNo === regNo
    );
    // const newDate = new Date().toISOString().slice(0, 10);
    // stud[0].acceptedDates.push(dates);
    dates.forEach((date) => {
      stud[0].acceptedDates.push(date);
    });

    stud[0].unAppliedDates = stud[0].unAppliedDates.filter(
      (date) => !dates.includes(date)
    );

    //to change
    await stud[0].save();

    console.log('stud ', stud[0]);

    res.status(200).json({ message: 'Accepted successfuly' });
  } catch (error) {
    console.error('Error in /api/accepted:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 2nd success -- Rejected in HOD And Mentor Side
app.post('/api/rejected', async (req, res) => {
  try {
    let { id, department } = req.body;
    console.log(id + ' ' + department);

    const result = await LeaveForm.findOneAndUpdate(
      { department },
      { $pull: { students: { _id: id } } },
      { new: true } // To return the modified document
    );

    if (!result) {
      // If result is null, the student was not found
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Rejected Successfully' });
  } catch (error) {
    console.error('Error in /api/rejected:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//2nd success --Leave Form Student Page --
app.get(
  '/api/:year/:department/:section/:email/absentdates',
  async (req, res) => {
    const dep = req.params.department;
    const year = req.params.year;
    const section = req.params.section;
    const newID = year + dep + section;
    const DepartmentModel = Model[newID];

    const sectionToLoop = await DepartmentModel.find();
    const email = req.params.email;
    const student = sectionToLoop.filter((student) => student.email === email);
    const unAppliedDates = student[0]?.unAppliedDates;

    res.status(200).json({ unAppliedDates });
  }
);
app.listen(4001, () => {
  console.log('Server running on 4001');
});

//FAILURE : BUT MAY BE USED LATER
// app.get('/api/collegestudents', async (req, res) => {
//   const year = 'I';
//   const department = 'MECH';
//   const section = 'A';
//   const departmentId = 'ECEB';
//   const models = {
//     Student: Student, // Assuming Student is your Mongoose model
//     // Add more models if needed
//   };

//   const modelName = 'Student'; // or any other model name string

//   const Model = models[modelName]; // Access the model using the modelName
//   const dep = await Model.findOne({ department: department });

//   const collegestudents = dep.students[0][year][0][section][0].name;
//   // console.log('college : ' + collegestudents);
//   res.send(collegestudents);
// });
