import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { 
  ChevronRight, 
  Search, 
  HelpCircle,
  MessageSquare,
  Edit,
  Filter,
  Check,
  CheckCircle2,
  Clock,
  Paperclip,
  Send,
  MoreVertical,
  X,
  PhoneCall,
  Image as ImageIcon,
  FileText,
  Building2,
  Users,
  ShieldCheck,
  AlertCircle,
  Pin,
  Archive,
  CornerUpLeft,
  Smile,
  RefreshCw,
  Info,
  ExternalLink
} from "lucide-react";

export function MessagesCenter() {
  const [activeChat, setActiveChat] = useState<any>(null);
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [isMobileListOpen, setIsMobileListOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations = [
    {
      id: "conv-1",
      department: "Library",
      officer: "Sarah Officer",
      subject: "Unreturned Book - Introduction to Algorithms",
      lastMessage: "Please return the book to the main desk by tomorrow.",
      time: "10:45 AM",
      unread: 2,
      priority: "high",
      status: "Waiting Response",
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      id: "conv-2",
      department: "Registrar",
      officer: "System",
      subject: "Clearance Initiated",
      lastMessage: "Your clearance request REQ-2024-8932 has been submitted successfully.",
      time: "Yesterday",
      unread: 0,
      priority: "normal",
      status: "Closed",
      icon: ShieldCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      id: "conv-3",
      department: "Dormitory",
      officer: "Abebe Kebede",
      subject: "Room Key Return",
      lastMessage: "Thank you, I have uploaded the receipt for the room key.",
      time: "Oct 24",
      unread: 0,
      priority: "normal",
      status: "In Progress",
      icon: Building2,
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ];

  const chatHistory = [
    { id: "msg-1", sender: "officer", name: "Sarah Officer", text: "Hello John, we noticed you have an unreturned book: 'Introduction to Algorithms, 3rd Edition'. You need to return this before we can approve your clearance.", time: "10:30 AM", status: "read" },
    { id: "msg-2", sender: "student", name: "John Doe", text: "I actually returned it last week to the science campus library branch. Could you please check?", time: "10:35 AM", status: "read" },
    { id: "msg-3", sender: "system", text: "Clearance status updated to: Rejected", time: "10:40 AM" },
    { id: "msg-4", sender: "officer", name: "Sarah Officer", text: "I will check with the science campus branch. In the meantime, the status will remain rejected. Please upload the physical return receipt if you have it.", time: "10:45 AM", status: "delivered" }
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
  }, [activeChat, chatHistory]);

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
            <Link to="/student" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-900 font-medium">Messages</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Message Center</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm px-4 flex-1 sm:flex-none">
            <Edit className="w-4 h-4 mr-2" /> New Message
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm px-3 flex-1 sm:flex-none">
            <RefreshCw className="w-4 h-4 sm:mr-2 text-slate-500" /> <span className="hidden sm:inline text-slate-600">Refresh</span>
          </Button>
        </div>
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
                placeholder="Search messages..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1 overflow-x-auto no-scrollbar">
                <button className="px-3 py-1 bg-slate-900 text-white text-xs font-medium rounded-full shrink-0">All</button>
                <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-full shrink-0">Unread</button>
                <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-full shrink-0">High Priority</button>
              </div>
              <button className="p-1 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-md shadow-sm shrink-0 ml-2">
                <Filter className="w-4 h-4" />
              </button>
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
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${conv.bg} ${conv.color}`}>
                      <conv.icon className="w-4 h-4" />
                    </div>
                    <span className={`text-sm truncate ${conv.unread > 0 ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                      {conv.department}
                    </span>
                  </div>
                  <span className={`text-xs whitespace-nowrap ml-2 ${conv.unread > 0 ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                    {conv.time}
                  </span>
                </div>
                
                <div className="pl-10">
                  <p className="text-xs font-semibold text-slate-800 truncate mb-0.5">{conv.subject}</p>
                  <p className={`text-xs truncate ${conv.unread > 0 ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                    {conv.lastMessage}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-2">
                      {conv.priority === 'high' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-1.5 py-0.5 rounded">Urgent</span>
                      )}
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{conv.status}</span>
                    </div>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">
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
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Conversation Selected</h3>
              <p className="text-slate-500 mb-6">Select a conversation from the sidebar or start a new one to get help with your clearance process.</p>
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
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${activeChat.bg} ${activeChat.color}`}>
                    <activeChat.icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h2 className="text-base font-bold text-slate-900 truncate flex items-center gap-2">
                      {activeChat.department} Department
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>
                    </h2>
                    <span className="text-xs text-slate-500 truncate flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> Avg. response time: 2 hours
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors hidden sm:block">
                    <PhoneCall className="w-4 h-4" />
                  </button>
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    Today
                  </span>
                </div>

                {chatHistory.map((msg) => {
                  if (msg.sender === "system") {
                    return (
                      <div key={msg.id} className="flex justify-center my-4">
                        <div className="bg-slate-100/80 border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-2 text-xs text-slate-600 shadow-sm">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span className="font-medium">{msg.text}</span>
                          <span className="text-slate-400 ml-2">{msg.time}</span>
                        </div>
                      </div>
                    );
                  }

                  const isMe = msg.sender === "student";
                  
                  return (
                    <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                      {!isMe && (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mb-1">
                          <span className="text-xs font-bold text-blue-700">{msg.name?.charAt(0)}</span>
                        </div>
                      )}
                      
                      <div className={`flex flex-col max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-2 mb-1 px-1">
                          <span className="text-[10px] font-semibold text-slate-500">{msg.name}</span>
                          <span className="text-[10px] text-slate-400">{msg.time}</span>
                        </div>
                        
                        <div className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm ${
                          isMe 
                            ? 'bg-blue-600 text-white rounded-br-sm' 
                            : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
                        }`}>
                          <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        </div>
                        
                        {isMe && (
                          <div className="flex items-center mt-1 mr-1">
                            {msg.status === "read" ? (
                              <div className="flex">
                                <Check className="w-3 h-3 text-blue-500" />
                                <Check className="w-3 h-3 text-blue-500 -ml-1.5" />
                              </div>
                            ) : (
                              <Check className="w-3 h-3 text-slate-300" />
                            )}
                            <span className="text-[10px] text-slate-400 ml-1">{msg.status === "read" ? "Read" : "Sent"}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-end gap-2 justify-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mb-1">
                      <span className="text-xs font-bold text-blue-700">S</span>
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

              {/* Message Input Area */}
              <div className="p-4 bg-white border-t border-slate-200 shadow-sm shrink-0">
                <form onSubmit={handleSendMessage} className="flex flex-col gap-2">
                  {/* Quick Replies */}
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    <button type="button" onClick={() => setMessageInput("I have uploaded the requested document.")} className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600 rounded-full whitespace-nowrap transition-colors">
                      I've uploaded the document
                    </button>
                    <button type="button" onClick={() => setMessageInput("Please review again.")} className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600 rounded-full whitespace-nowrap transition-colors">
                      Please review again
                    </button>
                    <button type="button" onClick={() => setMessageInput("Thank you for the update.")} className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600 rounded-full whitespace-nowrap transition-colors">
                      Thank you
                    </button>
                  </div>
                  
                  <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-sm">
                    <button type="button" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors shrink-0">
                      <Paperclip className="w-5 h-5" />
                    </button>
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
                    <button type="button" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors shrink-0 hidden sm:block">
                      <Smile className="w-5 h-5" />
                    </button>
                    <Button 
                      type="submit" 
                      disabled={!messageInput.trim()}
                      className={`shrink-0 h-10 w-10 p-0 rounded-lg transition-all ${messageInput.trim() ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}
                    >
                      <Send className="w-4 h-4 ml-0.5" />
                    </Button>
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
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-4 border-white shadow-md mb-4 ${activeChat.bg} ${activeChat.color}`}>
                <activeChat.icon className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{activeChat.department}</h3>
              <p className="text-sm text-slate-500 mb-4">{activeChat.officer}</p>
              
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1 bg-white h-9 shadow-sm border-slate-200">
                  <Archive className="w-4 h-4 mr-2" /> Archive
                </Button>
                <Button variant="outline" className="flex-1 bg-white h-9 shadow-sm border-slate-200">
                  <Pin className="w-4 h-4 mr-2" /> Pin
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Conversation Info</h4>
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-sm">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Clearance Request</p>
                    <Link to="/student/clearance" className="text-sm font-semibold text-blue-600 hover:underline flex items-center">
                      REQ-2024-8932 <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Status</p>
                    <span className="inline-flex items-center text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                      {activeChat.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Created</p>
                    <p className="text-sm font-medium text-slate-900">Oct 24, 2023</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Shared Files (2)</h4>
                  <button className="text-xs font-medium text-blue-600 hover:underline">View All</button>
                </div>
                <div className="space-y-2">
                  <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3 hover:border-blue-300 transition-colors cursor-pointer shadow-sm group">
                    <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">Book_Return_Receipt.pdf</p>
                      <p className="text-xs text-slate-500">845 KB • 10:45 AM</p>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3 hover:border-blue-300 transition-colors cursor-pointer shadow-sm group">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">Library_Clearance_Form.jpg</p>
                      <p className="text-xs text-slate-500">1.2 MB • Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-white text-slate-700 hover:text-blue-600 hover:bg-blue-50 border-slate-200 shadow-sm h-11">
                <CornerUpLeft className="w-4 h-4 mr-2" /> Open Related Documents
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
