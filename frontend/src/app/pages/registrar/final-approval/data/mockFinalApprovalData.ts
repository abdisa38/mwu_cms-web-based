import { FinalApprovalRequest } from './types';

export const mockFinalApprovals: FinalApprovalRequest[] = [
  {
    id: 'req_101',
    studentName: 'Abebe Kebede',
    studentId: 'UGR/18123/13',
    studentPhoto: 'https://i.pravatar.cc/150?u=abebe',
    email: 'abebe.k@student.mwu.edu.et',
    college: 'Computing',
    department: 'Software Engineering',
    program: 'Regular',
    clearanceNumber: 'CLR-2024-8901',
    type: 'Graduation',
    submissionDate: '2024-06-10T08:30:00Z',
    readyDate: '2024-06-15T14:20:00Z',
    status: 'Ready for Review',
    priority: 'High',
    overallProgress: 90,
    physicalIdStatus: 'Verified',
    documentStatus: 'Complete',
    allDepartmentsStatus: 'Completed',
    departments: [
      { id: 'd1', departmentName: 'Library', status: 'Approved', responsibleOfficer: 'Chaltu D.', decisionDate: '2024-06-11T10:00:00Z', remarks: 'No outstanding books.' },
      { id: 'd2', departmentName: 'Dormitory', status: 'Approved', responsibleOfficer: 'Dawit S.', decisionDate: '2024-06-12T09:15:00Z', remarks: 'Keys returned.' },
      { id: 'd3', departmentName: 'Cafeteria', status: 'Approved', responsibleOfficer: 'Helen T.', decisionDate: '2024-06-13T11:45:00Z', remarks: 'Meal card disabled.' },
      { id: 'd4', departmentName: 'Department Head', status: 'Approved', responsibleOfficer: 'Dr. Tadesse', decisionDate: '2024-06-14T16:00:00Z', remarks: 'All academic requirements met.' },
    ],
    documents: [
      { id: 'doc1', title: 'Clearance Application Form', type: 'Application Form', uploadDate: '2024-06-10', uploadedBy: 'Abebe Kebede', status: 'Verified', fileUrl: '#' },
      { id: 'doc2', title: 'Student ID Copy', type: 'Identification', uploadDate: '2024-06-10', uploadedBy: 'Abebe Kebede', status: 'Verified', fileUrl: '#' }
    ],
    timeline: [
      { id: 't1', date: '2024-06-10', time: '08:30', action: 'Clearance Initiated', user: 'Abebe Kebede', role: 'Student' },
      { id: 't2', date: '2024-06-14', time: '16:00', action: 'All Departments Approved', user: 'System', role: 'System' },
      { id: 't3', date: '2024-06-15', time: '14:20', action: 'Ready for Final Review', user: 'System', role: 'System' }
    ],
    auditLogs: [
      { id: 'a1', date: '2024-06-15', time: '14:20:01', user: 'System', role: 'System', action: 'Status changed to Ready for Final Review', ip: '10.0.0.1' }
    ],
    validations: [
      { id: 'v1', label: 'Student Account is Active', status: 'Passed' },
      { id: 'v2', label: 'All Required Departments Responded', status: 'Passed' },
      { id: 'v3', label: 'No Department Rejected', status: 'Passed' },
      { id: 'v4', label: 'All Required Documents Present', status: 'Passed' },
      { id: 'v5', label: 'Physical Student ID Status Valid', status: 'Passed' },
      { id: 'v6', label: 'No Active Appeals', status: 'Passed' },
      { id: 'v7', label: 'No Existing Certificate', status: 'Passed' }
    ],
    activeAppeals: []
  },
  {
    id: 'req_102',
    studentName: 'Betelhem Girma',
    studentId: 'UGR/17456/12',
    studentPhoto: 'https://i.pravatar.cc/150?u=betelhem',
    email: 'betelhem.g@student.mwu.edu.et',
    college: 'Health Sciences',
    department: 'Nursing',
    program: 'Regular',
    clearanceNumber: 'CLR-2024-8902',
    type: 'Graduation',
    submissionDate: '2024-06-11T09:00:00Z',
    readyDate: null,
    status: 'Blocked',
    priority: 'Critical',
    overallProgress: 85,
    physicalIdStatus: 'Not Received',
    documentStatus: 'Incomplete',
    allDepartmentsStatus: 'Completed',
    departments: [
      { id: 'd1', departmentName: 'Library', status: 'Approved', responsibleOfficer: 'Chaltu D.', decisionDate: '2024-06-12T10:00:00Z', remarks: '' },
      { id: 'd2', departmentName: 'Dormitory', status: 'Approved', responsibleOfficer: 'Dawit S.', decisionDate: '2024-06-13T09:15:00Z', remarks: '' },
      { id: 'd3', departmentName: 'Department Head', status: 'Approved', responsibleOfficer: 'Dr. Senait', decisionDate: '2024-06-14T16:00:00Z', remarks: '' },
    ],
    documents: [
      { id: 'doc1', title: 'Clearance Application', type: 'Application Form', uploadDate: '2024-06-11', uploadedBy: 'Betelhem Girma', status: 'Verified', fileUrl: '#' }
    ],
    timeline: [
      { id: 't1', date: '2024-06-11', time: '09:00', action: 'Clearance Initiated', user: 'Betelhem Girma', role: 'Student' }
    ],
    auditLogs: [],
    validations: [
      { id: 'v1', label: 'Student Account is Active', status: 'Passed' },
      { id: 'v2', label: 'All Required Departments Responded', status: 'Passed' },
      { id: 'v3', label: 'No Department Rejected', status: 'Passed' },
      { id: 'v4', label: 'All Required Documents Present', status: 'Failed', details: 'Missing Original Degree verification copy.' },
      { id: 'v5', label: 'Physical Student ID Status Valid', status: 'Failed', details: 'Student ID card has not been submitted.' },
      { id: 'v6', label: 'No Active Appeals', status: 'Passed' },
      { id: 'v7', label: 'No Existing Certificate', status: 'Passed' }
    ],
    activeAppeals: []
  },
  {
    id: 'req_103',
    studentName: 'Chala Tulu',
    studentId: 'UGR/19001/14',
    studentPhoto: 'https://i.pravatar.cc/150?u=chala',
    email: 'chala.t@student.mwu.edu.et',
    college: 'Business & Economics',
    department: 'Accounting',
    program: 'Extension',
    clearanceNumber: 'CLR-2024-8903',
    type: 'Withdrawal',
    submissionDate: '2024-06-15T09:00:00Z',
    readyDate: '2024-06-16T10:00:00Z',
    status: 'Blocked',
    priority: 'Normal',
    overallProgress: 80,
    physicalIdStatus: 'Not Required',
    documentStatus: 'Complete',
    allDepartmentsStatus: 'Rejected',
    departments: [
      { id: 'd1', departmentName: 'Library', status: 'Approved', responsibleOfficer: 'Chaltu D.', decisionDate: '2024-06-15T11:00:00Z', remarks: '' },
      { id: 'd2', departmentName: 'Finance', status: 'Rejected', responsibleOfficer: 'Biniam K.', decisionDate: '2024-06-16T09:00:00Z', remarks: 'Unpaid tuition fee for Semester II.' },
    ],
    documents: [],
    timeline: [],
    auditLogs: [],
    validations: [
      { id: 'v1', label: 'Student Account is Active', status: 'Passed' },
      { id: 'v2', label: 'All Required Departments Responded', status: 'Passed' },
      { id: 'v3', label: 'No Department Rejected', status: 'Failed', details: 'Finance department rejected the clearance.' },
      { id: 'v6', label: 'No Active Appeals', status: 'Failed', details: 'Student appealed the Finance decision.' }
    ],
    activeAppeals: [
      { id: 'app1', appealNumber: 'APP-2024-055', status: 'Open', date: '2024-06-16T14:00:00Z', department: 'Finance', reason: 'Student claims payment was made via bank transfer but not reflected.' }
    ]
  }
];
