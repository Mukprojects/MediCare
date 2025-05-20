
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { doctorsData } from "./Doctors";

// Types for messages
type Message = {
  id: string;
  senderId: string | number;
  content: string;
  timestamp: Date;
  isDoctor?: boolean;
};

// Custom hook for managing chat with a specific doctor
const useChat = (doctorId: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load existing messages from localStorage if any
    const storedMessages = localStorage.getItem(`chat_${doctorId}`);
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      } catch (e) {
        console.error("Failed to parse stored messages", e);
      }
    } else {
      // Add welcome message for first-time chat
      const doctor = doctorsData.find(d => d.id === doctorId);
      if (doctor) {
        const welcomeMessage: Message = {
          id: `welcome-${Date.now()}`,
          senderId: doctorId,
          content: `Hello, I'm ${doctor.name}. How can I help you today?`,
          timestamp: new Date(),
          isDoctor: true
        };
        setMessages([welcomeMessage]);
        localStorage.setItem(`chat_${doctorId}`, JSON.stringify([welcomeMessage]));
      }
    }
  }, [doctorId]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      senderId: 'user',
      content,
      timestamp: new Date()
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    localStorage.setItem(`chat_${doctorId}`, JSON.stringify(updatedMessages));
    
    // Simulate doctor typing
    setLoading(true);
    
    // Get doctor info
    const doctor = doctorsData.find(d => d.id === doctorId);
    
    // Simulate response after delay
    setTimeout(() => {
      // Generate doctor's response based on specialty
      let responseText = "";
      
      if (doctor) {
        const lowerContent = content.toLowerCase();
        
        if (lowerContent.includes("hello") || lowerContent.includes("hi")) {
          responseText = `Hello there! I'm ${doctor.name}. How may I assist you today?`;
        } else if (lowerContent.includes("appointment")) {
          responseText = `For appointments, you can check my availability and book directly from my profile page. Is there a specific date you're looking for?`;
        } else if (lowerContent.includes("pain") || lowerContent.includes("symptom") || lowerContent.includes("issue")) {
          responseText = `I understand you're experiencing some discomfort. While I can provide general guidance, it's important to have a proper consultation to address your concerns accurately. Can you provide more details about your symptoms?`;
        } else if (lowerContent.includes("thank")) {
          responseText = `You're welcome! Feel free to reach out if you need anything else.`;
        } else if (lowerContent.includes("cost") || lowerContent.includes("fee") || lowerContent.includes("price") || lowerContent.includes("charge")) {
          responseText = `My consultation fee is ₹1,500 per session. If you have insurance coverage, please check with your provider regarding reimbursement options.`;
        } else if (lowerContent.includes("experience") || lowerContent.includes("qualification")) {
          responseText = `I have ${doctor.experience} of experience specializing in ${doctor.specialty}. I completed my medical training at a prestigious institution and have been practicing at ${doctor.location} for several years.`;
        } else {
          responseText = `Thank you for your message. For a more comprehensive assessment related to ${doctor.specialty}, I would recommend scheduling an appointment. Is there anything specific you'd like to know about your condition or treatment options?`;
        }
      } else {
        responseText = "Thank you for your message. I'll get back to you as soon as possible.";
      }
      
      const doctorMessage: Message = {
        id: `doctor-${Date.now()}`,
        senderId: doctorId,
        content: responseText,
        timestamp: new Date(),
        isDoctor: true
      };
      
      const finalMessages = [...updatedMessages, doctorMessage];
      setMessages(finalMessages);
      localStorage.setItem(`chat_${doctorId}`, JSON.stringify(finalMessages));
      setLoading(false);
    }, 1500);
  };
  
  return { messages, sendMessage, loading };
};

// Component for AI support chat
const AiSupportChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Initial AI greeting
    const initialMessage: Message = {
      id: `ai-${Date.now()}`,
      senderId: 'ai-support',
      content: "Hello! I'm MediCare's AI assistant. How can I help you today? I can answer general health questions, guide you to the right specialist, or help with using our platform.",
      timestamp: new Date(),
      isDoctor: true
    };
    setMessages([initialMessage]);
  }, []);
  
  const sendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      senderId: 'user',
      content: input,
      timestamp: new Date()
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    
    // Simulate AI typing
    setLoading(true);
    
    // Simulate response after delay
    setTimeout(() => {
      const lowerContent = input.toLowerCase();
      let responseText = "";
      
      if (lowerContent.includes("doctor") || lowerContent.includes("specialist")) {
        responseText = "We have many specialists available. You can browse our doctors page to find specialists by field, or I can help you find the right doctor based on your symptoms.";
      } else if (lowerContent.includes("appointment")) {
        responseText = "You can book appointments directly from each doctor's profile page. Simply navigate to the Doctors section, select a doctor, and click 'Book Appointment' to see their availability.";
      } else if (lowerContent.includes("medicine") || lowerContent.includes("pharmacy")) {
        responseText = "Our pharmacy section offers a wide range of medications. You can browse by category, search for specific medications, and place orders for home delivery.";
      } else if (lowerContent.includes("blood") || lowerContent.includes("donate")) {
        responseText = "Thank you for your interest in blood donation! Visit our Blood Donation page to find nearby donation centers, check eligibility requirements, and schedule your donation.";
      } else if (lowerContent.includes("emergency")) {
        responseText = "If you're experiencing a medical emergency, please call emergency services at 108 immediately. For urgent but non-emergency consultations, several of our doctors offer same-day appointments.";
      } else {
        responseText = "I'm here to help with any questions about our services. You can ask about finding doctors, booking appointments, ordering medications, or using any feature of our platform.";
      }
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        senderId: 'ai-support',
        content: responseText,
        timestamp: new Date(),
        isDoctor: true
      };
      
      setMessages([...updatedMessages, aiMessage]);
      setLoading(false);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.senderId === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-muted'
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={!input.trim() || loading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// DoctorChat component for individual doctor conversations
const DoctorChat = ({ doctorId }: { doctorId: number }) => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, loading } = useChat(doctorId);
  const doctor = doctorsData.find(d => d.id === doctorId);
  
  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b flex items-center gap-3">
        <Avatar>
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img src={doctor?.image} alt={doctor?.name || "Doctor"} className="h-full w-full object-cover" />
          </div>
        </Avatar>
        <div>
          <h3 className="font-medium">{doctor?.name}</h3>
          <p className="text-xs text-muted-foreground">{doctor?.specialty}</p>
        </div>
        <Badge variant="secondary" className="ml-auto">{doctor?.experience}</Badge>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.senderId === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-muted'
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!input.trim() || loading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main ChatBot component
const ChatBot = () => {
  const [activeTab, setActiveTab] = useState<string>("support");
  
  const handleDoctorSelect = (doctorId: number) => {
    setActiveTab(`doctor-${doctorId}`);
  };
  
  return (
    <div className="container mx-auto py-8 px-4 h-[calc(100vh-180px)]">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Medical Support Chat</h1>
        <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
          Get help from our AI assistant or message our doctors directly
        </p>
      </div>
      
      <Card className="h-[calc(100vh-300px)]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="border-b px-4">
            <TabsList className="my-2">
              <TabsTrigger value="support" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>24/7 Support</span>
              </TabsTrigger>
              {doctorsData.map((doctor) => (
                <TabsTrigger key={doctor.id} value={`doctor-${doctor.id}`} className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full overflow-hidden">
                    <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="max-md:hidden">{doctor.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value="support" className="flex-1 h-0 m-0 overflow-hidden">
            <AiSupportChat />
          </TabsContent>
          
          {doctorsData.map((doctor) => (
            <TabsContent key={doctor.id} value={`doctor-${doctor.id}`} className="flex-1 h-0 m-0 overflow-hidden">
              <DoctorChat doctorId={doctor.id} />
            </TabsContent>
          ))}
        </Tabs>
      </Card>
      
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Our Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {doctorsData.map((doctor) => (
            <Card 
              key={doctor.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleDoctorSelect(doctor.id)}
            >
              <CardContent className="p-4 flex flex-col items-center">
                <div className="h-16 w-16 rounded-full overflow-hidden mb-2">
                  <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="font-medium text-center">{doctor.name}</h3>
                <p className="text-xs text-center text-muted-foreground">{doctor.specialty}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
