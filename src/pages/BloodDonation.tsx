import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  bloodType: z.string().refine((value) => value !== "", {
    message: "You must select a blood type.",
  }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  message: z.string().max(200, {
    message: "Message must be less than 200 characters.",
  }).optional(),
});

const bloodTypes = [
  {
    label: "A+",
    value: "A+",
  },
  {
    label: "A-",
    value: "A-",
  },
  {
    label: "B+",
    value: "B+",
  },
  {
    label: "B-",
    value: "B-",
  },
  {
    label: "AB+",
    value: "AB+",
  },
  {
    label: "AB-",
    value: "AB-",
  },
  {
    label: "O+",
    value: "O+",
  },
  {
    label: "O-",
    value: "O-",
  },
];

const BloodDonation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bloodType: "",
      date: new Date(),
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Appointment Request Submitted",
        description: "Your appointment request has been submitted successfully.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <section className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Blood Donation</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Donate blood today and save lives. Each donation can help up to three people in need.
        </p>
      </section>

      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Donate Blood?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <Droplet className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <span className="font-medium">Save Lives:</span> Your donation can save up to 3 lives.
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <Droplet className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <span className="font-medium">Community Support:</span> Contribute to your community's health.
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <Droplet className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <span className="font-medium">Health Benefits:</span> May help in reducing the risk of heart diseases.
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Appointment Request</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="123-456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a blood type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bloodTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Appointment Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date()
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Please choose a date for your appointment.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional information you'd like to share?"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum 200 characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Request Appointment"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 rounded-lg p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Blood Donation Process</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-gray-200 p-3 rounded-full mr-3">
                  <span className="font-bold text-gray-700">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Registration</h3>
                  <p className="text-gray-600">Provide your personal and medical history.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gray-200 p-3 rounded-full mr-3">
                  <span className="font-bold text-gray-700">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Screening</h3>
                  <p className="text-gray-600">Undergo a quick health check-up to ensure you're fit to donate.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gray-200 p-3 rounded-full mr-3">
                  <span className="font-bold text-gray-700">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Donation</h3>
                  <p className="text-gray-600">Donate blood in a safe, sterile environment.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gray-200 p-3 rounded-full mr-3">
                  <span className="font-bold text-gray-700">4</span>
                </div>
                <div>
                  <h3 className="font-medium">Refreshments</h3>
                  <p className="text-gray-600">Enjoy snacks and drinks to replenish your energy.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <Droplet className="h-64 w-64 animate-pulse-slow" />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="border p-4 rounded-lg">
            <h3 className="font-medium">Who can donate blood?</h3>
            <p className="text-gray-600">
              Most people can donate blood if they are in good health. There are some basic requirements which may vary
              from place to place.
            </p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="font-medium">How often can I donate blood?</h3>
            <p className="text-gray-600">
              You can donate blood every 56 days. This allows your body to replenish the blood cells.
            </p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="font-medium">What should I do before donating blood?</h3>
            <p className="text-gray-600">
              Get a good night's sleep, eat a healthy meal, and drink plenty of fluids.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BloodDonation;
