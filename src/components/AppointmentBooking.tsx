import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { CalendarIcon, Clock } from "lucide-react";

// Types for the component props
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  schedule: Array<{
    day: string;
    hours: string;
  }>;
  // other doctor properties
}

interface AppointmentBookingProps {
  doctor: Doctor;
  onClose: () => void;
}

// Generate time slots based on doctor's schedule
const generateTimeSlots = (day: string, schedule: Array<{ day: string; hours: string }>) => {
  const daySchedule = schedule.find(s => s.day === day);
  
  if (!daySchedule || daySchedule.hours === "Closed") {
    return [];
  }

  // Parse hours like "9:00 AM - 5:00 PM" to generate slots
  const [start, end] = daySchedule.hours.split(" - ");
  
  // Mock available slots - in a real app, these would come from an API
  const mockSlots = [
    { time: "09:00 AM", available: true },
    { time: "09:30 AM", available: false },
    { time: "10:00 AM", available: true },
    { time: "10:30 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "11:30 AM", available: true },
    { time: "01:00 PM", available: true },
    { time: "01:30 PM", available: false },
    { time: "02:00 PM", available: true },
    { time: "02:30 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "03:30 PM", available: false },
    { time: "04:00 PM", available: true },
    { time: "04:30 PM", available: true }
  ];

  // Filter slots based on doctor's schedule (this is simplified)
  return mockSlots;
};

// Get day of week from date
const getDayOfWeek = (date: Date) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
};

// Check if a date is disabled
const isDateDisabled = (date: Date, schedule: Array<{ day: string; hours: string }>) => {
  const day = getDayOfWeek(date);
  const daySchedule = schedule.find(s => s.day === day);
  return !daySchedule || daySchedule.hours === "Closed";
};

export const AppointmentBooking = ({ doctor, onClose }: AppointmentBookingProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined);
  const [timeSlots, setTimeSlots] = useState<Array<{ time: string; available: boolean }>>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  
  // Update time slots when date changes
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      const day = getDayOfWeek(newDate);
      const slots = generateTimeSlots(day, doctor.schedule);
      setTimeSlots(slots);
      setSelectedTimeSlot(undefined);
    } else {
      setTimeSlots([]);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !selectedTimeSlot) {
      toast.error("Please select a date and time for your appointment");
      return;
    }
    
    if (!name || !email || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Submit appointment
    toast.success(
      `Appointment booked with ${doctor.name} on ${format(date, "MMMM d, yyyy")} at ${selectedTimeSlot}`,
      {
        duration: 5000,
      }
    );
    
    onClose();
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Select Date</h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          disabled={(date) => 
            date < new Date() || // Can't book in the past
            isDateDisabled(date, doctor.schedule) // Can't book when doctor is not available
          }
          className="p-3 rounded-md border border-input pointer-events-auto"
        />
        
        {date && timeSlots.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-3">Available Time Slots</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.time}
                  variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                  className="flex items-center justify-center"
                  onClick={() => setSelectedTimeSlot(slot.time)}
                  disabled={!slot.available}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {slot.time}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {date && timeSlots.length === 0 && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <p className="text-center text-muted-foreground">
              No appointments available on this date
            </p>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Your Information</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Visit</Label>
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly describe your symptoms or reason"
              />
            </div>
            
            <div className="p-4 bg-muted/50 rounded-md">
              {date && selectedTimeSlot ? (
                <div className="text-sm">
                  <p className="font-medium">Appointment Summary:</p>
                  <p>Date: {format(date, "MMMM d, yyyy")}</p>
                  <p>Time: {selectedTimeSlot}</p>
                  <p>Doctor: {doctor.name}</p>
                  <p>Specialty: {doctor.specialty}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Please select a date and time for your appointment
                </p>
              )}
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!date || !selectedTimeSlot}>
                Confirm Appointment
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
