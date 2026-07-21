import { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, UserCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const MessagesPage = () => {
  const [conversations] = useState([
    { id: '1', name: 'Registrar Office', lastMessage: 'Please upload the missing document.', time: '10:30 AM', unread: 2 },
    { id: '2', name: 'Library Department', lastMessage: 'Your clearance is approved.', time: 'Yesterday', unread: 0 },
    { id: '3', name: 'Student Cafe', lastMessage: 'No pending items found.', time: 'Oct 12', unread: 0 },
  ]);

  return (
    <div className="h-[calc(100vh-8rem)] min-h-[600px] flex flex-col sm:flex-row bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Sidebar (Conversations List) */}
      <div className="w-full sm:w-80 border-r border-slate-200 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Messages</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <Input placeholder="Search conversations..." className="pl-9 h-9" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-slate-100">
            {conversations.map((chat) => (
              <div key={chat.id} className={`p-4 flex gap-3 cursor-pointer hover:bg-slate-100 transition-colors ${chat.id === '1' ? 'bg-blue-50 border-l-4 border-blue-600' : 'border-l-4 border-transparent'}`}>
                <div className="h-10 w-10 rounded-full bg-slate-200 flex flex-shrink-0 items-center justify-center">
                  <UserCircle2 className="h-6 w-6 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className={`text-sm truncate ${chat.unread ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                      {chat.name}
                    </h3>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{chat.time}</span>
                  </div>
                  <p className={`text-xs truncate ${chat.unread ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div className="h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 self-center mt-3">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
              <UserCircle2 className="h-6 w-6 text-slate-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Registrar Office</h2>
              <p className="text-xs text-green-500 flex items-center mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                Online
              </p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-2">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
          <div className="text-center">
            <span className="text-xs text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100">Today</span>
          </div>
          
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 text-slate-700 p-3 rounded-lg rounded-tl-none max-w-[80%] shadow-sm">
              <p className="text-sm">Hello, we noticed your ID copy is missing from the withdrawal request.</p>
              <span className="text-[10px] text-slate-400 mt-1 block">10:28 AM</span>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 text-slate-700 p-3 rounded-lg rounded-tl-none max-w-[80%] shadow-sm">
              <p className="text-sm">Please upload the missing document so we can proceed with your clearance.</p>
              <span className="text-[10px] text-slate-400 mt-1 block">10:30 AM</span>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-600 text-white p-3 rounded-lg rounded-tr-none max-w-[80%] shadow-sm">
              <p className="text-sm">Okay, I will upload it in the documents section right away.</p>
              <span className="text-[10px] text-blue-200 mt-1 block text-right">Just now</span>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors shrink-0">
              <Paperclip className="h-5 w-5" />
            </button>
            <Input placeholder="Type your message..." className="flex-1 rounded-full bg-slate-50 border-slate-200 focus-visible:ring-blue-100 h-11" />
            <Button size="icon" className="h-11 w-11 rounded-full shrink-0 shadow-md">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};
