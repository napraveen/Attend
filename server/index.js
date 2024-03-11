const express = require("express");

const app = express();
const { User } = require("./db");
const cors = require("cors");
const mongoose = require("mongoose");
// const multer = require('multer');
const path = require("path");
//---- To check ----
const bodyParser = require("body-parser");

// const bodyParser = require("body-parser")

const cookieParser = require("cookie-parser");
// const data = require('./data');
const {
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
} = require("./db");
// const Grid = require('gridfs-stream');
const { use } = require("./routes/auth");
const { addListener } = require("nodemon");
// const { user } = require('firebase-functions/v1/auth');
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
    origin: "*",
  })
);
app.use(express.json());
app.use(cookieParser());
mongoose
  .connect("mongodb://user:password@mongodb:27017/test")
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));
app.get("/", (req, res) => {
  res.send("Hello");
});

//2nd success -- To get the userName
app.get("/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.json(user);
    console.log(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
});

//success -- Retriving All Datas from Student Model
// app.get('/students', async (req, res) => {
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
};

const departments = [
  "ECEA",
  "ECEB",
  "ECEC",
  "MECHA",
  "MECHB",
  "MECHC",
  "EEEA",
  "EEEB",
  "EEEC",
  "ITA",
  "ITB",
  "ITC",
  "CSEA",
  "CSEB",
  "CSEC",
  "ADSA",
  "ADSB",
  "ADSC",
  "AMLA",
  "AMLB",
  "AMLC",
  "CHEMA",
  "CHEMB",
  "CHEMC",
  "BIOA",
  "BIOB",
  "BIOC",
];

//2nd success -- update attendance
app.post(
  "/updateAttendance/:year/:department/:section/:batch",
  async (req, res) => {
    try {
      const { presentStudents, absentStudents } = req.body;
      const dep = req.params.department;
      const year = req.params.year;
      const section = req.params.section;
      const batch = req.params.batch;
      const newID = year + dep + batch + section;
      const DepartmentModel = Model[newID];

      const sectionToLoop = await DepartmentModel.find();
      const newDate = new Date().toISOString().slice(0, 10);
      const submittedDepartment = await submittedDates.findOne({
        departmentId: dep + section,
      });
      if (!submittedDepartment) {
        departments.map((item) => {
          submittedDates.create({
            departmentId: item,
          });
        });
      }

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

        res.status(200).json({ message: "Attendance updated successfully" });

        // Update the submittedDates document
        await submittedDates.findOneAndUpdate(
          { departmentId: dep + section },
          { $push: { dates: newDate } }
          // upset true
        );
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      res.status(500).json({ error: "Failed to update attendance" });
    }
  }
);

//2nd sucess -- Retriving Submission Status
app.get("/submissionstatus/:departmentId", async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const newDate = new Date().toISOString().slice(0, 10);

    // Assuming submittedDates is your MongoDB collection
    const submittedDepartment = await submittedDates.findOne({
      departmentId: departmentId, // Use the received departmentId in the query
    });

    if (submittedDepartment && submittedDepartment.dates.includes(newDate)) {
      res.status(200).json({ message: "true" });
    } else {
      res.status(200).json({ message: "false" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error fetching submission status:", error);
  }
});

//2nd success -- Add Student in Edit Page
app.post("/:year/:department/:section/:batch/addstudents", async (req, res) => {
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
      batch,
    } = req.body;

    const studDepartment = req.params.department;
    const studYear = req.params.year;
    const studSection = req.params.section;
    const studbatch = req.params.batch;
    const newID = studYear + studDepartment + studbatch + studSection;
    const DepartmentModel = Model[newID];
    // Use the create method to directly create and save the new student
    console.log(batch);
    await DepartmentModel.create({
      name,
      year,
      department,
      section,
      batch,
      departmentId,
      rollNo,
      registerNo,
      mobileNo,
      category,
      email,
      username,
    });

    res.status(201).json({ message: "Student added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//2nd success -- Searching in Remove Student Edit Page
app.get(
  "/findstudent/:year/:department/:section/:batch/:registerno",
  async (req, res) => {
    const regNo = req.params.registerno;
    const dep = req.params.department;
    const year = req.params.year;
    const section = req.params.section;
    const batch = req.params.batch;
    const newID = year + dep + batch + section;
    const DepartmentModel = Model[newID];

    const sectionToLoop = await DepartmentModel.find();
    // console.log(sectionToLoop);
    const student = sectionToLoop.filter((item) => item.registerNo == regNo);
    console.log("student: " + student);
    // const student = await Student.findOne({ registerNo: registerNumber });
    console.log("akbsgkjlasgjiabsjg ", student[0]);
    res.status(200).json({ found: student[0] });
  }
);

//2nd success -- Deletion in Edit Page
app.delete(
  "/deletestudent/:year/:department/:section/:batch/:studentid/:email",
  async (req, res) => {
    try {
      const studentIdToDelete = req.params.studentid;

      const dep = req.params.department;
      const year = req.params.year;
      const section = req.params.section;
      const batch = req.params.batch;
      const userId = req.params.userId;
      const email = req.params.email;
      const newID = year + dep + batch + section;
      const DepartmentModel = Model[newID];

      // Find and remove the student with the specified ID
      const result = await DepartmentModel.findByIdAndDelete(studentIdToDelete);
      // const person = await User.findByIdAndDelete(userId);
      const userToDelete = await User.findOne({ email: email });

      await User.findByIdAndDelete(userToDelete._id);

      // console.log(resultFound);
      if (result) {
        console.log(
          `Student with ID ${studentIdToDelete} deleted successfully.`
        );
        res.status(200).json({ message: `Student deleted successfully.` });
      } else {
        console.log("Student not found or not deleted.");
        res.status(404).json({ message: "Student not found or not deleted." });
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
);

//2nd success -- Retriving class details
app.get("/:year/:department/:section/:batch/classdetails", async (req, res) => {
  const dep = req.params.department;
  const year = req.params.year;
  const section = req.params.section;
  const batch = req.params.batch;
  const newID = year + dep + batch + section;
  const DepartmentModel = Model[newID];
  console.log("deparmentmodel ", dep, year, section, newID, DepartmentModel);

  const sectionToLoop = await DepartmentModel.find();
  res.send(sectionToLoop);
});

// app.get('/:year/:department/departmentdetails', async (req, res) => {
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
app.get("/:year/:department/:batch/departmentdetails", async (req, res) => {
  const dep = req.params.department;
  const year = req.params.year;
  const batch = req.params.batch;
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
  // console.log(dataBySections);
  res.status(200).json(dataBySections);
});

//2nd -- Student Dashboard Page --
app.get(
  "/:year/:department/:section/:batch/:email/studentdetails",
  async (req, res) => {
    const email = req.params.email;
    const dep = req.params.department;
    const year = req.params.year;
    const section = req.params.section;
    const batch = req.params.batch;
    const newID = year + dep + batch + section;
    const DepartmentModel = Model[newID];

    const sectionToLoop = await DepartmentModel.find();
    const student = sectionToLoop.filter((item) => item.email === email);
    // console.log('hi' + student);
    res.status(200).json(student);
  }
);

// app.post(
//   '/:year/:department/:section/submitleaveform',
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
app.post("/:year/:department/:section/submitleaveform", async (req, res) => {
  try {
    const {
      year,
      department,
      section,
      batch,
      email,
      name,
      regNo,
      imgUrl,
      reason,
      appliedDates,
    } = req.body;
    console.log("imgurl " + imgUrl);
    let dep = await LeaveForm.findOne({ department });
    // let dep = await LeaveForm.find();

    if (!dep) {
      dep = await LeaveForm.create({ department });
    }
    // const leaveforms = dep.filter((item) => item.email === email);
    // console.log('leaveforms ', leaveforms);
    console.log("asgagafgdsgsdfg ", dep);

    const fileData = {
      year,
      department,
      section,
      batch,
      email,
      regNo,
      name,
      imgUrl,
      appliedDates,
      reason,
    };

    dep.students.push(fileData);

    await dep.save();

    res.status(201).json({ message: "Student added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(bodyParser.json());

app.get(
  "/mentor/report/date/:year/:department/:section/:batch/:formattedDate",
  async (req, res) => {
    const dep = req.params.department;
    const year = req.params.year;
    const section = req.params.section;
    const batch = req.params.batch;
    const newID = year + dep + batch + section;
    const DepartmentModel = Model[newID];
    console.log("deparmentmodel ", dep, year, section, newID, DepartmentModel);

    const sectionToLoop = await DepartmentModel.find();
    const Date = req.params.formattedDate;
    console.log("Received date on server:", Date);
    console.log("sectionToLoop ", sectionToLoop);
    const simplifiedData = sectionToLoop.map((item) => ({
      name: item.name,
      department: item.department,
      year: item.year,
      section: item.section,
      rollNo: item.rollNo,
      presentStatus: item.presentDates.includes(Date) ? "yes" : "no",
    }));
    console.log("simplifiedData ", simplifiedData);
    res.send(simplifiedData);
  }
);

//2nd success -- Leave Form- Mentor
app.get("/files/:year/:department/:section", async (req, res) => {
  try {
    const { year, department, section } = req.params;

    const dep = await LeaveForm.findOne({ department });

    if (!dep) {
      return res.status(404).json({ message: "Department not found" });
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
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//2nd success -- Leave Form- HOD
app.get("/hod/files/:year/:department/:section", async (req, res) => {
  try {
    const { year, department, section } = req.params;

    const dep = await LeaveForm.findOne({ department });

    if (!dep) {
      return res.status(404).json({ message: "Department not found" });
    }

    const files = dep.students
      .filter(
        (student) => student.year === year && student.status === "verified"
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
        batch: student.batch,
        status: student.status,
        dates: student.appliedDates,
      }));

    console.log("this file is ", files);

    res.json({ files });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//2nd success -- Verified in Mentor Side
app.post("/verified", async (req, res) => {
  try {
    let { id, department } = req.body;
    console.log(id + " " + department);
    const dep = await LeaveForm.findOne({ department });

    if (!dep) {
      return res.status(404).json({ message: "Department not found" });
    }

    const student = dep.students.find((student) => student._id == id);
    console.log(student);
    student.status = "verified";
    await dep.save();

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error("Error in /verified:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//2nd success -- Accept in HOD Side
app.post("/accepted", async (req, res) => {
  try {
    let { id, year, department, section, batch, regNo, dates } = req.body;
    console.log(id + " " + department);
    const dep = await LeaveForm.findOne({ department });

    if (!dep) {
      return res.status(404).json({ message: "Department not found" });
    }

    // const student = dep.students.find((student) => student._id == id);
    // console.log(student);
    // student.status = 'Accepted';
    // await dep.save();
    const studentIndex = dep.students.findIndex((student) => student._id == id);
    if (studentIndex === -1) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Remove the student from the 'students' array
    dep.students.splice(studentIndex, 1);

    // Save the changes to the LeaveForm document
    await dep.save();

    const newID = year + department + batch + section;
    console.log(newID);
    const DepartmentModel = Model[newID];

    const sectionToLoop = await DepartmentModel.find();
    console.log("kjasdhfkjasbd ,", sectionToLoop);
    const stud = sectionToLoop.filter(
      (student) => student.registerNo === regNo
    );
    // const newDate = new Date().toISOString().slice(0, 10);
    // stud[0].acceptedDates.push(dates);
    console.log("hi ", sectionToLoop);
    dates.forEach((date) => {
      stud[0].acceptedDates.push(date);
    });
    console.log(stud);

    stud[0].unAppliedDates = stud[0].unAppliedDates.filter(
      (date) => !dates.includes(date)
    );

    //to change
    await stud[0].save();

    console.log("stud ", stud[0]);

    res.status(200).json({ message: "Accepted successfuly" });
  } catch (error) {
    console.error("Error in /accepted:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 2nd success -- Rejected in HOD And Mentor Side
app.post("/rejected", async (req, res) => {
  try {
    let { id, department } = req.body;
    console.log(id + " " + department);

    const result = await LeaveForm.findOneAndUpdate(
      { department },
      { $pull: { students: { _id: id } } },
      { new: true } // To return the modified document
    );

    if (!result) {
      // If result is null, the student was not found
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Rejected Successfully" });
  } catch (error) {
    console.error("Error in /rejected:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//2nd success --Leave Form Student Page --
app.get(
  "/:year/:department/:section/:batch/:email/absentdates",
  async (req, res) => {
    const dep = req.params.department;
    const year = req.params.year;
    const section = req.params.section;
    const batch = req.params.batch;
    const newID = year + dep + batch + section;
    const DepartmentModel = Model[newID];

    const sectionToLoop = await DepartmentModel.find();
    const email = req.params.email;
    const student = sectionToLoop.filter((student) => student.email === email);
    const unAppliedDates = student[0]?.unAppliedDates;

    res.status(200).json({ unAppliedDates });
  }
);

app.get(
  "/:year/:department/:section/:batch/:email/statuschecker",
  async (req, res) => {
    const dep = req.params.department;
    const year = req.params.year;
    const section = req.params.section;
    const batch = req.params.batch;
    const newID = year + dep + batch + section;
    const DepartmentModel = Model[newID];

    const sectionToLoop = await DepartmentModel.find();
    const email = req.params.email;
    const student = sectionToLoop.filter((student) => student.email === email);
    console.log("hi", student);
    try {
      const datesStatusDictionary = {};

      const absentDates = student[0].absentDates;
      const unAppliedDates = student[0].unAppliedDates;
      // console.log('jasdbfhlabskf', unAppliedDates);
      const acceptedDates = student[0].acceptedDates;
      acceptedDates.forEach((date) => {
        datesStatusDictionary[date] = "Accepted";
      });

      const department = await LeaveForm.findOne({ department: dep });

      // if (!department) {
      //   return res.status(404).json({ message: 'Department not found' });
      // }

      const allAppliedDates =
        department?.students?.filter((student) => student.email === email) ||
        [];

      allAppliedDates.forEach((item) => {
        if (item.status) {
          datesStatusDictionary[item.appliedDates] = item.status;
        } else {
          datesStatusDictionary[item.appliedDates] = "Applied";
        }
      });
      unAppliedDates.forEach((item) => {
        if (!(item in datesStatusDictionary)) {
          datesStatusDictionary[item] = "Not Applied";
        }
      });
      console.log(absentDates, unAppliedDates, acceptedDates, allAppliedDates);

      console.log(datesStatusDictionary);
      res.status(200).json(datesStatusDictionary);
      // console.log('found', found);
    } catch (e) {
      console.log(e);
    }
  }
);

app.post(
  "/:year/:department/:section/:batch/:email/editprofile",
  async (req, res) => {
    const dep = req.params.department;
    const year = req.params.year;
    const section = req.params.section;
    const batch = req.params.batch;
    const email = req.params.email;
    const { mentorData } = req.body;
    console.log(mentorData);
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.name = mentorData.name;
      user.year = mentorData.year;
      user.department = mentorData.department;
      user.section = mentorData.section;
      user.batch = mentorData.batch;
      user.email = mentorData.email;
      console.log(user);
      user.save();
      console.log("User profile updated successfully");
      return res
        .status(200)
        .json({ message: "User profile updated successfully" });
    } catch (error) {
      console.error("Error updating user profile:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);
// app.get('/:department/:email/statuschecker', async (req, res) => {
//   const email = req.params.email;
//   const dep = req.params.department;

//   try {
//     const department = await LeaveForm.findOne({ department: dep });

//     if (!department) {
//       return res.status(404).json({ message: 'Department not found' });
//     }

//     const found =
//       department?.students?.filter((student) => student.email === email) || [];

//     console.log('found ', found);

//     // Handle the found data and send a response
//     res.status(200).json({ found });
//   } catch (error) {
//     console.error('Error in /:department/:email/statuschecker:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

app.listen(4001, () => {
  console.log("Server running on 4001");
});

//FAILURE : BUT MAY BE USED LATER
// app.get('/collegestudents', async (req, res) => {
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
