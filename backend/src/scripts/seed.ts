import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User, { UserRole } from '../modules/users/user.model';
import Department from '../modules/departments/department.model';
import Staff from '../modules/staff/staff.model';
import Student, { AcademicStatus } from '../modules/students/student.model';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mwu_cms';

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected!');

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Department.deleteMany({});
    await Staff.deleteMany({});
    await Student.deleteMany({});

    console.log('Creating Departments...');
    const libDept = await Department.create({ name: 'Library', code: 'LIB', faculty: 'University-wide' });
    const finDept = await Department.create({ name: 'Finance', code: 'FIN', faculty: 'University-wide' });
    const regDept = await Department.create({ name: 'Registrar', code: 'REG', faculty: 'University-wide' });

    console.log('Creating Users & Profiles...');

    // 1. Registrar User
    const registrarUser = await User.create({
      email: 'admin.registrar@mwu.edu',
      password: 'password123',
      role: UserRole.REGISTRAR
    });
    console.log(`Created Registrar: ${registrarUser.email}`);

    // 2. Officer User (Library)
    const officerUser = await User.create({
      email: 'library.officer@mwu.edu',
      password: 'password123',
      role: UserRole.OFFICER
    });
    
    await Staff.create({
      user: officerUser._id,
      firstName: 'Alemayehu',
      lastName: 'Kebede',
      department: libDept._id,
      title: 'Chief Librarian'
    });
    console.log(`Created Library Officer: ${officerUser.email}`);

    // 3. Student User
    const studentUser = await User.create({
      email: 'student@mwu.edu',
      password: 'password123',
      role: UserRole.STUDENT
    });

    await Student.create({
      user: studentUser._id,
      studentId: 'UGR/1234/12',
      firstName: 'Abebe',
      lastName: 'Bikila',
      department: regDept._id, // Assume they belong to a general dept for now
      enrollmentYear: 2020,
      academicStatus: AcademicStatus.ACTIVE
    });
    console.log(`Created Student: ${studentUser.email} (UGR/1234/12)`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
