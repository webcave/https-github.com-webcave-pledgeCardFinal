import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Save, Trash2, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

import RichTextEditor from "./RichTextEditor";
import MediaUploader from "./MediaUploader";

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(100),
  category: z.string().min(1, { message: "Please select a category" }),
  targetAmount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Target amount must be a positive number",
    }),
  endDate: z.string().refine((val) => new Date(val) > new Date(), {
    message: "End date must be in the future",
  }),
  story: z
    .string()
    .min(100, { message: "Story must be at least 100 characters" }),
  shortDescription: z
    .string()
    .min(20, { message: "Short description must be at least 20 characters" })
    .max(200),
  organizerName: z.string().min(2, { message: "Organizer name is required" }),
  organizerBio: z.string().optional(),
  isPublic: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

interface CampaignCreationFormProps {
  initialData?: Partial<FormValues>;
  onSubmit?: (data: FormValues) => void;
  isEditing?: boolean;
}

const CampaignCreationForm = ({
  initialData = {},
  onSubmit = () => {},
  isEditing = false,
}: CampaignCreationFormProps) => {
  const [step, setStep] = useState(1);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const totalSteps = 4;

  const defaultValues: Partial<FormValues> = {
    title: "",
    category: "",
    targetAmount: "",
    endDate: "",
    story: "",
    shortDescription: "",
    organizerName: "",
    organizerBio: "",
    isPublic: true,
    ...initialData,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const handleMediaChange = (files: File[]) => {
    setMediaFiles(files);
  };

  const handleStoryChange = (content: string) => {
    form.setValue("story", content, { shouldValidate: true });
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (data: FormValues) => {
    // In a real implementation, we would also handle the media files here
    onSubmit(data);
  };

  const handlePreview = () => {
    // In a real implementation, this would show a preview of the campaign
    alert("Preview functionality would be implemented here");
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">
          {isEditing ? "Edit Your Campaign" : "Create Your Campaign"}
        </h1>
        <p className="text-muted-foreground">
          {isEditing
            ? "Update your campaign details below"
            : "Fill in the details below to start your fundraising journey"}
        </p>
      </div>

      <div className="mb-8">
        <Progress value={(step / totalSteps) * 100} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Basic Info</span>
          <span>Story</span>
          <span>Media</span>
          <span>Review</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter a compelling title"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Make it clear and attention-grabbing
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Briefly describe your campaign in 1-2 sentences"
                            {...field}
                            rows={3}
                          />
                        </FormControl>
                        <FormDescription>
                          This will appear in campaign listings
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="medical">Medical</SelectItem>
                              <SelectItem value="education">
                                Education
                              </SelectItem>
                              <SelectItem value="emergency">
                                Emergency Relief
                              </SelectItem>
                              <SelectItem value="community">
                                Community Project
                              </SelectItem>
                              <SelectItem value="animals">
                                Animals & Pets
                              </SelectItem>
                              <SelectItem value="environment">
                                Environment
                              </SelectItem>
                              <SelectItem value="nonprofit">
                                Nonprofit
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="targetAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Funding Goal ($)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="5000"
                              {...field}
                              min="1"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>
                          When will your campaign end?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Organizer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="organizerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organizer Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name or organization name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organizerBio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organizer Bio (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell potential donors about yourself or your organization"
                            {...field}
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Campaign Story */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="story"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Story</FormLabel>
                        <FormControl>
                          <RichTextEditor
                            initialContent={field.value}
                            onChange={handleStoryChange}
                            minHeight="400px"
                          />
                        </FormControl>
                        <FormDescription>
                          Share your story in detail. What are you raising funds
                          for? Why is it important?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Media Upload */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Upload Photos & Videos
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add compelling visuals to your campaign. The first image
                        will be your campaign's cover photo.
                      </p>
                      <MediaUploader
                        onChange={handleMediaChange}
                        maxFiles={8}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Review & Submit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Campaign Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Title</p>
                          <p className="text-muted-foreground">
                            {form.getValues("title")}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Category</p>
                          <p className="text-muted-foreground">
                            {form.getValues("category")}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Funding Goal</p>
                          <p className="text-muted-foreground">
                            ${form.getValues("targetAmount")}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">End Date</p>
                          <p className="text-muted-foreground">
                            {form.getValues("endDate")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Organizer Information
                      </h3>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div>
                          <p className="font-medium">Name</p>
                          <p className="text-muted-foreground">
                            {form.getValues("organizerName")}
                          </p>
                        </div>
                        {form.getValues("organizerBio") && (
                          <div>
                            <p className="font-medium">Bio</p>
                            <p className="text-muted-foreground">
                              {form.getValues("organizerBio")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Campaign Visibility
                      </h3>
                      <FormField
                        control={form.control}
                        name="isPublic"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Make campaign public
                              </FormLabel>
                              <FormDescription>
                                Your campaign will be visible to everyone and
                                appear in search results
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            ) : (
              <div></div>
            )}

            <div className="flex space-x-2">
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  className="text-destructive border-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              )}

              <Button type="button" variant="outline" onClick={handlePreview}>
                <Eye className="mr-2 h-4 w-4" /> Preview
              </Button>

              {step < totalSteps ? (
                <Button type="button" onClick={nextStep}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  {isEditing ? "Update Campaign" : "Create Campaign"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CampaignCreationForm;
