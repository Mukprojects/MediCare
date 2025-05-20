import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Phone, Mail, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { AppointmentBooking } from "@/components/AppointmentBooking";

// Mock doctor data (in a real app, this would come from an API)
const doctorsData = [
  {
    id: 1,
    name: "Dr. Jane Cooper",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
    location: "New York Medical Center",
    address: "123 Medical Plaza, New York, NY 10001",
    rating: 4.8,
    experience: "15+ years",
    education: [
      { degree: "MD", institution: "Harvard Medical School", year: "2005" },
      { degree: "Residency", institution: "Johns Hopkins Hospital", year: "2008" },
      { degree: "Fellowship", institution: "Mayo Clinic", year: "2010" }
    ],
    bio: "Dr. Jane Cooper is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology, heart failure management, and cardiac rehabilitation. Dr. Cooper has published numerous research papers and is dedicated to providing patient-centered care.",
    contact: {
      email: "jane.cooper@medicare.com",
      phone: "+1 (555) 123-4567"
    },
    schedule: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 2:00 PM" },
      { day: "Saturday", hours: "Closed" },
      { day: "Sunday", hours: "Closed" }
    ]
  },
  {
    id: 2,
    name: "Dr. Robert Fox",
    specialty: "Neurology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop",
    location: "Central Hospital",
    address: "456 Health Avenue, Chicago, IL 60601",
    rating: 4.7,
    experience: "12+ years",
    education: [
      { degree: "MD", institution: "Stanford University", year: "2008" },
      { degree: "Residency", institution: "UCSF Medical Center", year: "2011" },
      { degree: "Fellowship", institution: "Cleveland Clinic", year: "2013" }
    ],
    bio: "Dr. Robert Fox is a neurologist specializing in movement disorders and neurodegenerative diseases. With over 12 years of clinical experience, he focuses on providing comprehensive neurological care using the latest diagnostic tools and treatment approaches.",
    contact: {
      email: "robert.fox@medicare.com",
      phone: "+1 (555) 234-5678"
    },
    schedule: [
      { day: "Monday", hours: "8:00 AM - 4:00 PM" },
      { day: "Tuesday", hours: "8:00 AM - 4:00 PM" },
      { day: "Wednesday", hours: "Closed" },
      { day: "Thursday", hours: "8:00 AM - 4:00 PM" },
      { day: "Friday", hours: "8:00 AM - 4:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 1:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ]
  },
  // More doctors...
  {
    id: 3,
    name: "Dr. Emily Wilson",
    specialty: "Pediatrics",
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=300&auto=format&fit=crop",
    location: "Children's Hospital",
    address: "789 Child Care Lane, Boston, MA 02115",
    rating: 4.9,
    experience: "10+ years",
    education: [
      { degree: "MD", institution: "Yale School of Medicine", year: "2010" },
      { degree: "Residency", institution: "Boston Children's Hospital", year: "2013" },
    ],
    bio: "Dr. Emily Wilson is a compassionate pediatrician who specializes in child development and preventive care. She is known for her gentle approach with young patients and her commitment to family-centered healthcare.",
    contact: {
      email: "emily.wilson@medicare.com",
      phone: "+1 (555) 345-6789"
    },
    schedule: [
      { day: "Monday", hours: "8:30 AM - 4:30 PM" },
      { day: "Tuesday", hours: "8:30 AM - 4:30 PM" },
      { day: "Wednesday", hours: "8:30 AM - 4:30 PM" },
      { day: "Thursday", hours: "8:30 AM - 4:30 PM" },
      { day: "Friday", hours: "8:30 AM - 3:00 PM" },
      { day: "Saturday", hours: "Closed" },
      { day: "Sunday", hours: "Closed" }
    ]
  },
  // Additional doctors would follow the same pattern
  {
    id: 4,
    name: "Dr. Michael Johnson",
    specialty: "Orthopedics",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&auto=format&fit=crop",
    location: "Sports Medicine Clinic",
    address: "567 Athletic Court, Miami, FL 33101",
    rating: 4.6,
    experience: "8+ years",
    education: [
      { degree: "MD", institution: "Duke University", year: "2012" },
      { degree: "Residency", institution: "Rush University Medical Center", year: "2016" },
      { degree: "Fellowship", institution: "Andrews Sports Medicine", year: "2018" }
    ],
    bio: "Dr. Michael Johnson specializes in sports medicine and orthopedic surgery. His approach combines surgical expertise with rehabilitation techniques to help patients recover and return to their activities as quickly as possible.",
    contact: {
      email: "michael.johnson@medicare.com",
      phone: "+1 (555) 456-7890"
    },
    schedule: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 3:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 1:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ]
  },
  {
    id: 5,
    name: "Dr. Sarah Martinez",
    specialty: "Dermatology",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=300&auto=format&fit=crop",
    location: "Skin Care Center",
    address: "901 Dermatology Drive, Los Angeles, CA 90001",
    rating: 4.8,
    experience: "14+ years",
    education: [
      { degree: "MD", institution: "UCLA School of Medicine", year: "2007" },
      { degree: "Residency", institution: "NYU Langone Health", year: "2011" }
    ],
    bio: "Dr. Sarah Martinez is a board-certified dermatologist specializing in both medical and cosmetic dermatology. She offers treatments for skin conditions as well as aesthetic procedures to help patients look and feel their best.",
    contact: {
      email: "sarah.martinez@medicare.com",
      phone: "+1 (555) 567-8901"
    },
    schedule: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 1:00 PM" },
      { day: "Saturday", hours: "Closed" },
      { day: "Sunday", hours: "Closed" }
    ]
  },
  {
    id: 6,
    name: "Dr. James Thompson",
    specialty: "General Medicine",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=300&auto=format&fit=crop",
    location: "Community Health Clinic",
    address: "234 Main Street, Seattle, WA 98101",
    rating: 4.5,
    experience: "20+ years",
    education: [
      { degree: "MD", institution: "University of Washington", year: "2001" },
      { degree: "Residency", institution: "Mass General Hospital", year: "2004" }
    ],
    bio: "Dr. James Thompson is a family physician with two decades of experience in providing comprehensive primary care. He focuses on preventive medicine and building long-term relationships with his patients to promote overall health and wellness.",
    contact: {
      email: "james.thompson@medicare.com",
      phone: "+1 (555) 678-9012"
    },
    schedule: [
      { day: "Monday", hours: "8:00 AM - 6:00 PM" },
      { day: "Tuesday", hours: "8:00 AM - 6:00 PM" },
      { day: "Wednesday", hours: "8:00 AM - 6:00 PM" },
      { day: "Thursday", hours: "8:00 AM - 6:00 PM" },
      { day: "Friday", hours: "8:00 AM - 4:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 12:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ]
  }
];

const DoctorDetails = () => {
  const { id } = useParams();
  const doctorId = parseInt(id || "0");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const doctor = doctorsData.find((d) => d.id === doctorId);

  if (!doctor) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Doctor not found</h2>
        <p className="mb-6">The doctor you are looking for does not exist or has been removed.</p>
        <Button asChild>
          <Link to="/doctors">Back to Doctors</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0">
          <Link to="/doctors" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Doctors
          </Link>
        </Button>
      </div>

      {/* Doctor Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="h-48 w-48 rounded-full overflow-hidden mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{doctor.name}</h2>
                <p className="text-muted-foreground">{doctor.specialty}</p>
                <div className="flex justify-center mt-2">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    ★ {doctor.rating} Rating
                  </Badge>
                </div>
                <p className="mt-2">{doctor.experience} Experience</p>
              </div>
              <div className="w-full mt-6">
                <Button 
                  className="w-full"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Book Appointment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{doctor.location}</p>
                    <p className="text-sm text-muted-foreground">{doctor.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                  <p>{doctor.contact.phone}</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                  <p>{doctor.contact.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="mb-6 bg-muted/60 p-1">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Biography</h3>
              <p className="text-gray-700">{doctor.bio}</p>
            </TabsContent>

            <TabsContent value="education" className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Education & Training</h3>
              <ul className="space-y-4">
                {doctor.education.map((edu, index) => (
                  <li key={index} className="border-b pb-3 last:border-b-0">
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-muted-foreground">{edu.institution}, {edu.year}</p>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="schedule" className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Working Hours</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctor.schedule.map((slot, index) => (
                  <div key={index} className="flex justify-between items-center border-b py-2 last:border-b-0">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{slot.day}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className={slot.hours === "Closed" ? "text-destructive" : ""}>
                        {slot.hours}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="location" className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Location</h3>
              <div className="h-96 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                {/* This is a placeholder for the map */}
                {/* In a real app, integrate with a maps API like Google Maps */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto text-primary mb-2" />
                    <p className="font-medium">{doctor.location}</p>
                    <p className="text-sm text-muted-foreground">{doctor.address}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Appointment Booking Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Book Appointment with {doctor.name}</DialogTitle>
            <DialogDescription>
              Select a date and time for your appointment with {doctor.name}.
            </DialogDescription>
          </DialogHeader>
          <AppointmentBooking doctor={doctor} onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorDetails;
