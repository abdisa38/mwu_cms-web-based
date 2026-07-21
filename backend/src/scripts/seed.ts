import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Role from '../modules/auth/models/role.model';
import User from '../modules/auth/models/user.model';
import Department from '../modules/departments/department.model';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mwu_cms';

const seedDatabase = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB!');

    // 1. Clear existing core data
    console.log('⏳ Clearing old data...');
    await Role.deleteMany({});
    await User.deleteMany({});
    await Department.deleteMany({});

    // 2. Create Roles
    console.log('⏳ Creating Roles...');
    const roles = await Role.insertMany([
      { name: 'Student', slug: 'student', priority: 1, permissions: ['clearance:create', 'clearance:read'], isSystemRole: true },
      { name: 'Officer', slug: 'officer', priority: 2, permissions: ['clearance:read', 'clearance:approve', 'clearance:reject'], isSystemRole: true },
      { name: 'Department Head', slug: 'department_head', priority: 3, permissions: ['clearance:read', 'clearance:approve', 'clearance:reject'], isSystemRole: true },
      { name: 'Registrar', slug: 'registrar', priority: 4, permissions: ['clearance:read', 'clearance:approve', 'certificate:generate'], isSystemRole: true },
      { name: 'Super Admin', slug: 'super_admin', priority: 5, permissions: ['*'], isSystemRole: true },
      { name: 'Admin', slug: 'admin', priority: 5, permissions: ['*'], isSystemRole: true },
    ]);

    const studentRole = roles.find(r => r.slug === 'student');
    const adminRole = roles.find(r => r.slug === 'super_admin');
    const registrarRole = roles.find(r => r.slug === 'registrar');
    const officerRole = roles.find(r => r.slug === 'officer');

    // 3. Create Departments
    console.log('⏳ Creating Departments...');
    const depts = await Department.insertMany([
      { name: 'Computer Science', code: 'CS', faculty: 'Computing and Informatics' },
      { name: 'Library', code: 'LIB', faculty: 'Administrative' },
      { name: 'Sports', code: 'SPT', faculty: 'Administrative' },
    ]);

    // 4. Create Users
    console.log('⏳ Creating Users...');
    const passwordHash = await bcrypt.hash('password123', 12);

    await User.insertMany([
      {
        userId: 'EMP-001',
        firstName: 'Super',
        lastName: 'Admin',
        email: 'admin@mwu.edu.et',
        passwordHash,
        roleId: adminRole?._id,
        status: 'ACTIVE'
      },
      {
        userId: 'MWU/1234/12',
        firstName: 'Abebe',
        lastName: 'Kebede',
        email: 'abebe@mwu.edu.et',
        passwordHash,
        roleId: studentRole?._id,
        departmentId: depts[0]._id,
        status: 'ACTIVE'
      },
      {
        userId: 'EMP-002',
        firstName: 'Registrar',
        lastName: 'Office',
        email: 'registrar@mwu.edu.et',
        passwordHash,
        roleId: registrarRole?._id,
        status: 'ACTIVE'
      },
      {
        userId: 'EMP-003',
        firstName: 'Library',
        lastName: 'Officer',
        email: 'library@mwu.edu.et',
        passwordHash,
        roleId: officerRole?._id,
        departmentId: depts[1]._id,
        status: 'ACTIVE'
      }
    ]);

    console.log('🎉 Database Seeded Successfully!');
    console.log('\n--- Default Credentials ---');
    console.log('Admin: admin@mwu.edu.et / password123');
    console.log('Registrar: registrar@mwu.edu.et / password123');
    console.log('Staff (Library): library@mwu.edu.et / password123');
    console.log('Student: abebe@mwu.edu.et (or MWU/1234/12) / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
