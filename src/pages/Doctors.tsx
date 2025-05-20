
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Calendar } from "lucide-react";

// Mock data for doctors with real images
export const doctorsData = [
  {
    id: 1,
    name: "Dr. Jane Cooper",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
    location: "New York Medical Center",
    rating: 4.8,
    experience: "15+ years"
  },
  {
    id: 2,
    name: "Dr. Robert Fox",
    specialty: "Neurology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop",
    location: "Central Hospital",
    rating: 4.7,
    experience: "12+ years"
  },
  {
    id: 3,
    name: "Dr. Emily Wilson",
    specialty: "Pediatrics",
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=300&auto=format&fit=crop",
    location: "Children's Hospital",
    rating: 4.9,
    experience: "10+ years"
  },
  {
    id: 4,
    name: "Dr. Michael Johnson",
    specialty: "Orthopedics",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&auto=format&fit=crop",
    location: "Sports Medicine Clinic",
    rating: 4.6,
    experience: "8+ years"
  },
  {
    id: 5,
    name: "Dr. Sarah Martinez",
    specialty: "Dermatology",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=300&auto=format&fit=crop",
    location: "Skin Care Center",
    rating: 4.8,
    experience: "14+ years"
  },
  {
    id: 6,
    name: "Dr. James Thompson",
    specialty: "General Medicine",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=300&auto=format&fit=crop",
    location: "Community Health Clinic",
    rating: 4.5,
    experience: "20+ years"
  },
];

// List of specialties for filtering
const specialties = [
  "All Specialties",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "General Medicine"
];

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === "All Specialties" || 
                            doctor.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Find a Doctor</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with our experienced medical professionals specializing in various fields
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2">
            <Input
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Select
              value={selectedSpecialty}
              onValueChange={setSelectedSpecialty}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Doctors Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <CardTitle>{doctor.name}</CardTitle>
                    <CardDescription>{doctor.specialty}</CardDescription>
                  </div>
                  <div className="rounded-full bg-primary/10 text-primary px-2 py-1 text-sm font-medium">
                    ★ {doctor.rating}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center my-4">
                  <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{doctor.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Experience: {doctor.experience}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/doctors/${doctor.id}`}>View Profile</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-gray-500">No doctors match your search criteria. Please try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
