import { Router } from 'express';

import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/users/user.routes';
import studentRoutes from '../modules/students/student.routes';
import staffRoutes from '../modules/staff/staff.routes';
import departmentRoutes from '../modules/departments/department.routes';
import facultyRoutes from '../modules/faculties/faculty.routes';
import programRoutes from '../modules/programs/program.routes';
import academicYearRoutes from '../modules/academic-years/academic-year.routes';

import clearanceRoutes from '../modules/clearance/routes/clearance.routes';
import workflowRoutes from '../modules/clearance/routes/workflow.routes';

import documentRoutes from '../modules/documents/document.routes';
import certificateRoutes from '../modules/certificates/certificate.routes';

import notificationRoutes from '../modules/communication/notifications/notification.routes';
import messageRoutes from '../modules/communication/messages/message.routes';
import appealRoutes from '../modules/communication/appeals/appeal.routes';
import emailRoutes from '../modules/communication/emails/email.routes';

import reportRoutes from '../modules/reports/reports.routes';
import adminRoutes from '../modules/admin/admin.routes';

const router = Router();

// API Health
router.get('/ping', (req, res) => res.json({ message: 'pong' }));

// Auth & Identity
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/students', studentRoutes);
router.use('/staff', staffRoutes);

// Academic Core
router.use('/departments', departmentRoutes);
router.use('/faculties', facultyRoutes);
router.use('/programs', programRoutes);
router.use('/academic-years', academicYearRoutes);

// Clearance Engine
router.use('/clearances', clearanceRoutes);
router.use('/workflows', workflowRoutes);

// Documents & Certificates
router.use('/documents', documentRoutes);
router.use('/certificates', certificateRoutes);

// Communication
router.use('/notifications', notificationRoutes);
router.use('/communication', messageRoutes); // 'conversations' & 'messages'
router.use('/appeals', appealRoutes);
router.use('/emails', emailRoutes);

// Analytics & Reports
router.use('/reports', reportRoutes);

// Admin & Settings
router.use('/admin', adminRoutes);

export default router;
