
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Pill, Droplet } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/hooks/use-cart";

// Mock data for medications with real images
const medicationsData = [
  {
    id: 1,
    name: "Aspirin 325mg",
    price: 32.50,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop",
    category: "Pain Relief",
    prescription: false,
    description: "For pain relief and fever reduction"
  },
  {
    id: 2,
    name: "Amoxicillin 500mg",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=300&auto=format&fit=crop",
    category: "Antibiotics",
    prescription: true,
    description: "Antibiotic for bacterial infections"
  },
  {
    id: 3,
    name: "Lisinopril 10mg",
    price: 85.75,
    image: "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?q=80&w=300&auto=format&fit=crop",
    category: "Blood Pressure",
    prescription: true,
    description: "For high blood pressure management"
  },
  {
    id: 4,
    name: "Loratadine 10mg",
    price: 45.50,
    image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=300&auto=format&fit=crop",
    category: "Allergy",
    prescription: false,
    description: "Non-drowsy allergy relief"
  },
  {
    id: 5,
    name: "Metformin 500mg",
    price: 65.25,
    image: "https://images.unsplash.com/photo-1585435557343-3b348031e799?q=80&w=300&auto=format&fit=crop",
    category: "Diabetes",
    prescription: true,
    description: "Oral diabetes medication"
  },
  {
    id: 6,
    name: "Ibuprofen 200mg",
    price: 25.75,
    image: "https://images.unsplash.com/photo-1626716493197-aac05f97797c?q=80&w=300&auto=format&fit=crop",
    category: "Pain Relief",
    prescription: false,
    description: "Anti-inflammatory pain reliever"
  },
  {
    id: 7,
    name: "Vitamin D3 1000IU",
    price: 145.00,
    image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=300&auto=format&fit=crop",
    category: "Vitamins",
    prescription: false,
    description: "Supports bone health and immune function"
  },
  {
    id: 8,
    name: "Omeprazole 20mg",
    price: 89.50,
    image: "https://images.unsplash.com/photo-1517373116369-9bdb8cdc9f62?q=80&w=300&auto=format&fit=crop",
    category: "Digestive Health",
    prescription: false,
    description: "For heartburn and acid reflux"
  },
];

// Categories for filtering
const categories = [
  "All Categories",
  "Pain Relief",
  "Antibiotics",
  "Blood Pressure",
  "Allergy",
  "Diabetes",
  "Vitamins",
  "Digestive Health"
];

const Pharmacy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [prescriptionOnly, setPrescriptionOnly] = useState(false);

  const { toast } = useToast();
  const { addItem } = useCart();

  const handleAddToCart = (medication: any) => {
    addItem({
      id: medication.id,
      name: medication.name,
      price: medication.price,
      image: medication.image,
    });
    
    toast({
      title: "Added to Cart",
      description: `${medication.name} has been added to your cart`,
    });
  };

  const filteredMedications = medicationsData.filter((medication) => {
    const matchesSearch = medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          medication.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Categories" || 
                            medication.category === selectedCategory;
    
    const matchesPrescription = prescriptionOnly ? medication.prescription : true;
    
    return matchesSearch && matchesCategory && matchesPrescription;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Online Pharmacy</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our wide selection of medications and health products
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-1 md:col-span-5">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="col-span-1 md:col-span-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1 md:col-span-3 flex items-center">
            <Button 
              variant={prescriptionOnly ? "secondary" : "outline"} 
              className="w-full"
              onClick={() => setPrescriptionOnly(!prescriptionOnly)}
            >
              <Pill className="h-4 w-4 mr-2" />
              Prescription Only
            </Button>
          </div>
        </div>
      </div>

      {/* Medications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMedications.length > 0 ? (
          filteredMedications.map((medication) => (
            <Card key={medication.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{medication.name}</CardTitle>
                  {medication.prescription && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Prescription
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={medication.image} 
                    alt={medication.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {medication.category}
                  </Badge>
                  <p className="text-sm text-gray-600 mb-2">{medication.description}</p>
                  <p className="font-bold text-lg">Rs {medication.price.toFixed(2)}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleAddToCart(medication)}
                  disabled={medication.prescription}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {medication.prescription ? "Requires Prescription" : "Add to Cart"}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-gray-500">No medications match your search criteria. Please try a different search.</p>
          </div>
        )}
      </div>

      <div className="bg-muted mt-12 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-3">Prescription Medications</h2>
        <p className="text-gray-600 mb-4">
          To purchase prescription medications, you'll need to upload a valid prescription from your doctor. 
          Once verified, we'll process your order.
        </p>
        <Button variant="outline">
          Learn More About Prescriptions
        </Button>
      </div>
    </div>
  );
};

export default Pharmacy;
