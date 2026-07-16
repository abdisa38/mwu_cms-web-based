import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { 
  ChevronRight, 
  Search, 
  RefreshCw, 
  Archive,
  HelpCircle,
  MessageSquare,
  Edit,
  Filter,
  Check,
  CheckCircle2,
  Paperclip,
  Send,
  MoreVertical,
  X,
  PhoneCall,
  Image as ImageIcon,
  FileText,
  Users,
  ShieldCheck,
  AlertCircle,
  Pin,
  CornerUpLeft,
  Smile,
  Info,
  Building2,
  Clock,
  Download,
  Printer,
  FileBadge,
  GraduationCap
} from "lucide-react";

export function OfficerMessages() {
  const [activeChat, setActiveChat] = useState<any>(null);
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [isMobileListOpen, setIsMobileListOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showTemplates, setShowTemplates] = useState(false);

  const kpis = [
    { label: "Unread", count: 4, color: "text-blue-600" },
    { label: "Today's", count: 12, color: "text-slate-900" },
    { label: "Students", count: 8, color: "text-slate-900" },
    { label: "Registrar", count: 2, color: "text-slate-900" },
    { label: "Departments", count: 2, color: "text-slate-900" },
  ];

  const conversations = [
    {
      id: "conv-1",
      student: "John Doe",
      studentId: "UGR/1234/12",
      department: "Computer Science",
      subject: "Clearance Requirement: Introduction to Algorithms",
      lastMessage: "I returned it last week. I can send the receipt.",
      time: "10:35 AM",
      unread: 2,
      priority: "high",
      status: "In Progress",
      type: "student",
      avatar: "JD",
      bg: "bg-blue-100",
      color: "text-blue-700",
      online: true,
      pinned: true
    },
    {
      id: "conv-2",
      student: "Dawit Tadesse",
      studentId: "UGR/6543/11",
      department: "Civil Engineering",
      subject: "Appeal: Outstanding Fees",
      lastMessage: "Here is the bank transfer receipt for the late fee.",
      time: "09:15 AM",
      unread: 1,
      priority: "high",
      status: "Waiting Response",
      type: "student",
      avatar: "DT",
      bg: "bg-amber-100",
      color: "text-amber-700",
      online: false,
      pinned: false
    },
    {
      id: "conv-3",
      student: "Registrar Office",
      studentId: "System",
      department: "Admin",
      subject: "Clarification on REQ-2024-8750",
      lastMessage: "Please verify if the student has returned the lab equipment.",
      time: "Yesterday",
      unread: 0,
      priority: "medium",
      status: "Open",
      type: "registrar",
      avatar: "RO",
      bg: "bg-emerald-100",
      color: "text-emerald-700",
      online: true,
      pinned: false
    },
    {
      id: "conv-4",
      student: "Betelhem Alemu",
      studentId: "UGR/7654/12",
      department: "Computer Science",
      subject: "Clearance Approved",
      lastMessage: "Thank you for the quick approval!",
      time: "Oct 24",
      unread: 0,
      priority: "low",
      status: "Resolved",
      type: "student",
      avatar: "BA",
      bg: "bg-purple-100",
      color: "text-purple-700",
      online: false,
      pinned: false
    }
  ];

  const chatHistory = [
    { id: "msg-1", sender: "officer", name: "You", text: "Hello John, we noticed you have an unreturned book: 'Introduction to Algorithms, 3rd Edition'. You need to return this before we can approve your clearance.", time: "10:30 AM", status: "read" },
    { id: "msg-2", sender: "student", name: "John Doe", text: "I actually returned it last week to the science campus library branch. Could you please check?", time: "10:35 AM", status: "read" },
    { id: "msg-3", sender: "system", text: "Clearance status updated to: Rejected", time: "10:40 AM" },
    { id: "msg-4", sender: "officer", name: "You", text: "I will check with the science campus branch. In the meantime, the status will remain rejected. Please upload the physical return receipt if you have it.", time: "10:45 AM", status: "delivered" }
  ];

  const templates = [
    "Please upload the missing document to proceed.",
    "Your clearance is approved from our department.",
    "You have an outstanding library book. Please return it.",
    "We have received your appeal and are reviewing it."
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setMessageInput("");
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1500);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat, chatHistory, isTyping]);

  const selectChat = (chat: any) => {
    setActiveChat(chat);
    setIsMobileListOpen(false);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-4 pb-20 md:pb-0 h-[calc(100vh-5rem)] flex flex-col animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <div className="flex items-center text-sm text-slate-500 mb-1">
            <Link to="/officer" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">Messages</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Communication Center</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm px-4 flex-1 sm:flex-none">
            <Edit className="w-4 h-4 mr-2" /> New Conversation
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <RefreshCw className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Refresh</span>
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <Archive className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Archive</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 shrink-0">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">{kpi.label}</span>
            <span className={`text-xl font-bold ${kpi.color}`}>{kpi.count}</span>
          </div>
        ))}
      </div>

      {/* Main Communication Interface */}
      <div className="flex flex-1 overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm">
        
        {/* LEFT PANEL: Conversation List */}
        <div className={`w-full md:w-80 lg:w-96 flex flex-col border-r border-slate-200 shrink-0 ${!isMobileListOpen && activeChat ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-slate-200 bg-slate-50/50">
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto no-scrollbar">
              <button className="px-3 py-1 bg-slate-900 text-white text-xs font-medium rounded-full shrink-0">All</button>
              <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-full shrink-0">Unread</button>
              <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-full shrink-0">Students</button>
              <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-full shrink-0">Registrar</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.map((conv) => (
              <div 
                key={conv.id}
                onClick={() => selectChat(conv)}
                className={`p-4 cursor-pointer transition-colors hover:bg-slate-50 relative group ${activeChat?.id === conv.id ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-3 overflow-hidden relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border border-white shadow-sm ${conv.bg} ${conv.color}`}>
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <span className="absolute bottom-0 left-7 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className={`text-sm truncate ${conv.unread > 0 ? 'font-bold text-slate-900' : 'font-semibold text-slate-800'}`}>
                        {conv.student}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate">{conv.department}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs whitespace-nowrap ${conv.unread > 0 ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                      {conv.time}
                    </span>
                    {conv.pinned && <Pin className="w-3 h-3 text-slate-400" />}
                  </div>
                </div>
                
                <div className="pl-12 mt-1">
                  <p className={`text-xs truncate ${conv.unread > 0 ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                    {conv.lastMessage}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-2">
                      {conv.priority === 'high' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">Urgent</span>
                      )}
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">{conv.status}</span>
                    </div>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm animate-pulse">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER PANEL: Chat Window */}
        <div className={`flex-1 flex flex-col min-w-0 bg-slate-50/30 ${!activeChat && 'hidden md:flex items-center justify-center'}`}>
          {!activeChat ? (
            <div className="text-center p-8 max-w-sm animate-in zoom-in-95">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border-8 border-white shadow-sm">
                <MessageSquare className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Select a Conversation</h3>
              <p className="text-slate-500 mb-6">Choose a message from the sidebar or start a new conversation to communicate with students or staff.</p>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full shadow-sm">
                <Edit className="w-4 h-4 mr-2" /> Start New Conversation
              </Button>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="h-16 px-4 sm:px-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 shadow-sm z-10">
                <div className="flex items-center gap-3 overflow-hidden">
                  <button onClick={() => setIsMobileListOpen(true)} className="md:hidden p-1.5 -ml-2 text-slate-500 hover:bg-slate-100 rounded-md">
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </button>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm font-bold text-sm ${activeChat.bg} ${activeChat.color}`}>
                    {activeChat.avatar}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h2 className="text-base font-bold text-slate-900 truncate flex items-center gap-2">
                      {activeChat.student}
                      {activeChat.online && <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>}
                    </h2>
                    <span className="text-xs text-slate-500 truncate flex items-center">
                      {activeChat.studentId} • {activeChat.department}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors hidden sm:block">
                    <Search className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setShowRightPanel(!showRightPanel)}
                    className={`p-2 rounded-lg transition-colors hidden lg:block ${showRightPanel ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'}`}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors md:hidden lg:block">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                <div className="flex justify-center my-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    Today
                  </span>
                </div>

                {chatHistory.map((msg) => {
                  if (msg.sender === "system") {
                    return (
                      <div key={msg.id} className="flex justify-center my-4">
                        <div className="bg-amber-50 border border-amber-100 px-4 py-2 rounded-xl flex items-center gap-2 text-xs text-amber-800 shadow-sm">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span className="font-medium">{msg.text}</span>
                          <span className="text-amber-600/60 ml-2">{msg.time}</span>
                        </div>
                      </div>
                    );
                  }

                  const isMe = msg.sender === "officer";
                  
                  return (
                    <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                      {!isMe && (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mb-1 border border-white shadow-sm ${activeChat.bg} ${activeChat.color}`}>
                          <span className="text-xs font-bold">{msg.name?.charAt(0)}</span>
                        </div>
                      )}
                      
                      <div className={`flex flex-col max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-2 mb-1 px-1">
                          <span className="text-[10px] font-semibold text-slate-500">{msg.name}</span>
                          <span className="text-[10px] text-slate-400">{msg.time}</span>
                        </div>
                        
                        <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm ${
                          isMe 
                            ? 'bg-blue-600 text-white rounded-br-sm' 
                            : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
                        }`}>
                          <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        </div>
                        
                        {isMe && (
                          <div className="flex items-center mt-1 mr-1">
                            {msg.status === "read" ? (
                              <div className="flex" title="Read">
                                <Check className="w-3 h-3 text-blue-500" />
                                <Check className="w-3 h-3 text-blue-500 -ml-1.5" />
                              </div>
                            ) : (
                              <Check className="w-3 h-3 text-slate-400" title="Delivered" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-end gap-2 justify-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mb-1 border border-white shadow-sm ${activeChat.bg} ${activeChat.color}`}>
                      <span className="text-xs font-bold">{activeChat.student.charAt(0)}</span>
                    </div>
                    <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Composer Area */}
              <div className="p-4 bg-white border-t border-slate-200 shadow-sm shrink-0 relative">
                
                {/* Templates Popover */}
                {showTemplates && (
                  <div className="absolute bottom-full left-4 mb-2 bg-white border border-slate-200 rounded-xl shadow-xl w-72 overflow-hidden animate-in slide-in-from-bottom-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message Templates</span>
                      <button onClick={() => setShowTemplates(false)} className="text-slate-400 hover:text-slate-700"><X className="w-3.5 h-3.5" /></button>
                    </div>
                    <div className="max-h-48 overflow-y-auto p-2">
                      {templates.map((tpl, i) => (
                        <button 
                          key={i}
                          type="button"
                          onClick={() => { setMessageInput(tpl); setShowTemplates(false); }}
                          className="w-full text-left p-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors truncate"
                        >
                          {tpl}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSendMessage} className="flex flex-col gap-2">
                  <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-sm">
                    <div className="flex flex-col gap-1 shrink-0">
                      <button type="button" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Attach File">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button type="button" onClick={() => setShowTemplates(!showTemplates)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Templates">
                        <FileText className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <textarea 
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type your message here..." 
                      className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[40px] text-sm py-2 px-1 text-slate-900"
                      rows={1}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                    />
                    
                    <div className="flex flex-col justify-end shrink-0 gap-2">
                      <button type="button" className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors self-end hidden sm:block">
                        <Smile className="w-4 h-4" />
                      </button>
                      <Button 
                        type="submit" 
                        disabled={!messageInput.trim()}
                        className={`h-10 w-12 p-0 rounded-lg transition-all ${messageInput.trim() ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}
                      >
                        <Send className="w-4 h-4 ml-0.5" />
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>

        {/* RIGHT PANEL: Conversation Details */}
        {activeChat && showRightPanel && (
          <div className="hidden lg:flex w-80 flex-col bg-slate-50 border-l border-slate-200 overflow-y-auto shrink-0 animate-in slide-in-from-right-8 duration-300">
            <div className="p-6 border-b border-slate-200 flex flex-col items-center text-center bg-white">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow-md mb-4 text-2xl font-bold ${activeChat.bg} ${activeChat.color}`}>
                {activeChat.avatar}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{activeChat.student}</h3>
              <p className="text-sm text-slate-500 mb-1">{activeChat.studentId}</p>
              <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded shadow-sm mb-4">
                <ShieldCheck className="w-3 h-3 mr-1" /> Verified Student
              </span>
              
              <div className="flex gap-2 w-full">
                <Link to="/officer/students" className="flex-1">
                  <Button variant="outline" className="w-full bg-white h-9 shadow-sm border-slate-200">
                    <Users className="w-4 h-4 mr-2" /> Profile
                  </Button>
                </Link>
                <Link to="/officer/pending" className="flex-1">
                  <Button variant="outline" className="w-full bg-white h-9 shadow-sm border-slate-200">
                    <FileBadge className="w-4 h-4 mr-2" /> Request
                  </Button>
                </Link>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Context Block */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Clearance Context</h4>
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-sm">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Clearance Request</p>
                    <Link to="/officer/pending" className="text-sm font-semibold text-blue-600 hover:underline flex items-center">
                      REQ-2024-8932
                    </Link>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Clearance Type</p>
                    <p className="text-sm font-medium text-slate-900 flex items-center">
                      <GraduationCap className="w-4 h-4 mr-1.5 text-slate-400" /> Graduation
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Conversation Status</p>
                    <span className="inline-flex items-center text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                      {activeChat.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shared Files Block */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Shared Files (1)</h4>
                </div>
                <div className="space-y-2">
                  <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3 hover:border-blue-300 transition-colors cursor-pointer shadow-sm group">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">Book_Return_Proof.jpg</p>
                      <p className="text-xs text-slate-500">1.2 MB • Oct 24</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Officer Actions */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full bg-white text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 border-emerald-200 shadow-sm h-10 justify-start">
                    <CheckCircle2 className="w-4 h-4 mr-3 text-emerald-500" /> Approve Clearance
                  </Button>
                  <Button variant="outline" className="w-full bg-white text-red-700 hover:text-red-800 hover:bg-red-50 border-red-200 shadow-sm h-10 justify-start">
                    <XCircle className="w-4 h-4 mr-3 text-red-500" /> Reject Clearance
                  </Button>
                  <Button variant="outline" className="w-full bg-white text-slate-700 hover:text-blue-700 hover:bg-blue-50 border-slate-200 shadow-sm h-10 justify-start">
                    <Printer className="w-4 h-4 mr-3 text-slate-400" /> Print Conversation
                  </Button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
