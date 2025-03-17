import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, DollarSign, User } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  amount: z.string().min(1, { message: "Amount is required" }),
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  paymentMethod: z.enum(["creditCard", "paypal", "bankTransfer"]),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  anonymous: z.boolean().default(false),
  message: z.string().optional(),
});

type DonationFormProps = {
  campaignId?: string;
  campaignTitle?: string;
  onDonationComplete?: (data: z.infer<typeof formSchema>) => void;
};

const DonationForm = ({
  campaignId = "123",
  campaignTitle = "Help Fund Our Community Garden",
  onDonationComplete = () => {},
}: DonationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      name: "",
      email: "",
      paymentMethod: "creditCard",
      anonymous: false,
      message: "",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onDonationComplete(data);
      form.reset();
    } catch (error) {
      console.error("Error processing donation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const predefinedAmounts = ["10", "25", "50", "100"];

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Donate to Support
        </CardTitle>
        <CardDescription className="text-center">
          {campaignTitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormLabel>Select Amount</FormLabel>
              <div className="grid grid-cols-4 gap-2">
                {predefinedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => {
                      setSelectedAmount(amount);
                      form.setValue("amount", amount);
                    }}
                    className="h-12"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter amount"
                          className="pl-10"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setSelectedAmount("");
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="John Doe"
                          className="pl-10"
                          {...field}
                        />
                      </div>
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
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="anonymous"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 mt-1"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Make my donation anonymous</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Add a message of support"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2 rounded-md border p-3">
                          <RadioGroupItem value="creditCard" id="creditCard" />
                          <FormLabel
                            htmlFor="creditCard"
                            className="font-normal cursor-pointer flex-1"
                          >
                            Credit Card
                          </FormLabel>
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border p-3">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <FormLabel
                            htmlFor="paypal"
                            className="font-normal cursor-pointer flex-1"
                          >
                            PayPal
                          </FormLabel>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border p-3">
                          <RadioGroupItem
                            value="bankTransfer"
                            id="bankTransfer"
                          />
                          <FormLabel
                            htmlFor="bankTransfer"
                            className="font-normal cursor-pointer flex-1"
                          >
                            Bank Transfer
                          </FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {paymentMethod === "creditCard" && (
                <div className="space-y-4">
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 5678 9012 3456" />
                    </FormControl>
                  </FormItem>

                  <div className="grid grid-cols-2 gap-4">
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input placeholder="123" />
                      </FormControl>
                    </FormItem>
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Complete Donation"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
        <p>Your donation will directly support this campaign.</p>
        <p>All transactions are secure and encrypted.</p>
      </CardFooter>
    </Card>
  );
};

export default DonationForm;
