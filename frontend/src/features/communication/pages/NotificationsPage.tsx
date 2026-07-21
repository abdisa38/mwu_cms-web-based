import { useState } from 'react';
import { Bell, Check, Trash2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NotificationsPage = () => {
  const [notifications] = useState([
    { id: '1', title: 'Library Clearance Approved', message: 'Your clearance request has been approved by the Library department.', time: '2 hours ago', read: false, type: 'success' },
    { id: '2', title: 'New Message from Registrar', message: 'The registrar office has requested additional documents.', time: '1 day ago', read: false, type: 'info' },
    { id: '3', title: 'Clearance Rejected: Sports', message: 'You have pending unreturned items at the Sports office.', time: '2 days ago', read: true, type: 'error' },
    { id: '4', title: 'Account Verified', message: 'Your student account has been successfully verified.', time: '1 week ago', read: true, type: 'success' },
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 mt-1">Stay updated on your clearance progress.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-white">
            <Check className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <span className="text-sm font-medium text-slate-700">Recent Notifications</span>
          <button className="text-slate-500 hover:text-slate-700">
            <Filter className="h-4 w-4" />
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {notifications.map((notif) => (
            <div key={notif.id} className={`p-4 flex gap-4 hover:bg-slate-50 transition-colors ${!notif.read ? 'bg-blue-50/50' : ''}`}>
              <div className="shrink-0 mt-1">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center
                  ${notif.type === 'success' ? 'bg-green-100 text-green-600' : 
                    notif.type === 'error' ? 'bg-red-100 text-red-600' : 
                    'bg-blue-100 text-blue-600'}`}
                >
                  <Bell className="h-5 w-5" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm font-semibold ${!notif.read ? 'text-slate-900' : 'text-slate-700'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{notif.time}</span>
                </div>
                <p className={`text-sm mt-1 ${!notif.read ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                  {notif.message}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  {!notif.read && (
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-800">Mark as read</button>
                  )}
                  <button className="text-xs font-medium text-red-500 hover:text-red-700 flex items-center">
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
