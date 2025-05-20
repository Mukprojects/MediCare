import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Hospital, 
  Users, 
  Pill, 
  Droplet,
  ArrowRight,
  Clock,
  MapPin
} from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

const features = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Find Specialists",
    description: "Connect with expert doctors in various medical fields",
    link: "/doctors"
  },
  {
    icon: <Pill className="h-8 w-8 text-primary" />,
    title: "Buy Medications",
    description: "Order prescription and over-the-counter medicines online",
    link: "/pharmacy"
  },
  {
    icon: <Droplet className="h-8 w-8 text-blood-500" />,
    title: "Donate Blood",
    description: "Save lives by donating blood at our centers",
    link: "/blood-donation"
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "24/7 Support",
    description: "Round-the-clock medical support for emergencies",
    link: "/chat"
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    content: "The online pharmacy service saved me so much time. Medications arrived quickly and were exactly what I needed!"
  },
  {
    name: "Michael Rodriguez",
    role: "Blood Donor",
    content: "The blood donation process was smooth and the staff was incredibly professional and caring."
  },
  {
    name: "Emily Chen",
    role: "Patient",
    content: "Finding the right specialist was easy with this platform. The doctor profiles helped me make an informed choice."
  },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-pattern py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-medical-800 leading-tight">
                Your Health Is Our <span className="text-primary">Priority</span>
              </h1>
              <p className="text-lg text-gray-700 max-w-xl">
                Connect with specialists, order medications, and donate blood - all in one place. 
                Quality healthcare made accessible for everyone.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/doctors">Find a Doctor</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/pharmacy">Visit Pharmacy</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=800&auto=format&fit=crop"
                alt="Healthcare professionals"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare solutions designed around your needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-t-4 border-t-primary hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full justify-between">
                    <Link to={feature.link}>
                      Learn More 
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Patients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="pt-6">
                  <div className="text-lg font-medium mb-4">"</div>
                  <p className="text-gray-700 mb-4">{testimonial.content}</p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to take control of your health?</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of patients who have trusted us with their healthcare needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="secondary" size="lg">
              <Link to="/doctors">Find a Doctor</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent text-white hover:bg-white hover:text-primary">
              <Link to="/chat">24/7 Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
