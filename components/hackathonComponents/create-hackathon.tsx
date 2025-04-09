"use client";
import React from 'react';
import { InputEvent } from '../ui/input-event';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormMessage,
    FormLabel,
} from "@/components/ui/form";
import {
    CalendarIcon,
    MapPinIcon,
    LinkIcon,
    UsersIcon,
    MailIcon,
    GlobeIcon,
    HashIcon,
    Trophy,
    Clock,
    Upload,
    Sparkles,
    ImageIcon
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import ImageUpload from '@/utils/uploadImage';
import { hackathonSchema } from '@/schemas/hackathonSchema';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const CreateHackathon = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof hackathonSchema>>({
        resolver: zodResolver(hackathonSchema),
        defaultValues: {
            hackathon_name: "",
            hackathon_website: "",
            theme: "",
            imageUrl: "",
            location: "",
            description: "",
            contactInfo_1: "",
            contactInfo_2: "",
            contactEmail_1: "",
            contactEmail_2: "",
            start_date: "",
            prizePool: "",
            end_date: "",
            social: "",
            pincode: "",
            website_link: ""
        },
    });

    const { handleSubmit, control } = form;
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    async function onSubmit(values: z.infer<typeof hackathonSchema>) {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/events/create-hackathon', values);
            if (response.status === 200) {
                toast.success("Hackathon created successfully!");
                router.push('/hackathons');
            } else {
                toast.error("Failed to create hackathon.");
            }
        } catch (error: any) {
            console.error("Error creating hackathon:", error);
            toast.error(error?.response?.data?.message || "Something went wrong while creating the hackathon.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='w-full h-full rounded-xl'>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8'>
                        <div className="space-y-2 md:col-span-1">
                            <div className="flex flex-col space-y-2 bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50">
                                <h3 className="text-lg font-semibold mb-4 text-white/90 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-purple-500" /> Hackathon Cover Image
                                </h3>
                                <FormField
                                    name="imageUrl"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">
                                                Cover Image
                                                <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="h-[240px] w-full">
                                                    <ImageUpload
                                                        value={field.value || ""}
                                                        onChange={(url) => {
                                                            field.onChange(url);
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <p className="text-xs text-zinc-500 mt-4">
                                    Recommended size: 1200x630px. Maximum file size: 5MB.
                                </p>
                            </div>
                        </div>

                        {/* Form fields - Column 2 */}
                        <div className='md:col-span-2'>
                            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50 mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-white/90">Hackathon Details</h3>

                                {/* Hackathon name */}
                                <FormField
                                    control={control}
                                    name="hackathon_name"
                                    render={({ field }) => (
                                        <FormItem className="mb-4">
                                            <InputEvent
                                                placeholder='Enter an amazing hackathon name'
                                                type='text'
                                                className='text-3xl md:text-4xl mb-2 leading-normal py-3 px-4 border-0 font-bold text-white bg-transparent placeholder:text-zinc-600'
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Theme field */}
                                <FormField
                                    control={control}
                                    name="theme"
                                    render={({ field }) => (
                                        <FormItem className="mb-4">
                                            <label className="text-sm font-medium text-zinc-400 mb-1 block">
                                                Theme
                                            </label>
                                            <div className='relative'>
                                                <HashIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500' />
                                                <Input
                                                    placeholder='e.g. Sustainability, AI, HealthTech'
                                                    type='text'
                                                    className='border-zinc-700 bg-zinc-800/50 pl-10 text-white'
                                                    {...field}
                                                />
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Description */}
                                <FormField
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="mb-2">
                                            <label className="text-sm font-medium text-zinc-400 mb-1 block">
                                                Description
                                            </label>
                                            <div className="relative">
                                                <Textarea
                                                    placeholder="Describe your hackathon in detail. What will attendees build? What are the challenges?"
                                                    className="bg-zinc-800/50 border-zinc-700 text-white rounded-xl min-h-[120px] text-md"
                                                    {...field}
                                                />
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Dates and Prize section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Dates */}
                                <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50">
                                    <h3 className="text-lg font-semibold mb-4 text-white/90 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-purple-500" /> When
                                    </h3>

                                    <div className="space-y-4">
                                        {["start_date", "end_date"].map((dateField, index) => (
                                            <FormField
                                                key={dateField}
                                                control={control}
                                                name={dateField as "start_date" | "end_date"}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <label className="text-sm font-medium text-zinc-400 mb-1">
                                                            {index === 0 ? "Start Date" : "End Date"}
                                                        </label>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant="outline"
                                                                        className="w-full pl-3 text-left font-normal border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 hover:text-white transition-colors"
                                                                    >
                                                                        {field.value ? (
                                                                            <span className="text-white">{format(new Date(field.value), "PPP")}</span>
                                                                        ) : (
                                                                            <span className="text-zinc-500">{index === 0 ? "Select start date" : "Select end date"}</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value ? new Date(field.value) : undefined}
                                                                    onSelect={(date) => field.onChange(date?.toISOString())}
                                                                    disabled={(date) => date < new Date()}
                                                                    initialFocus
                                                                    className="rounded-md bg-zinc-900 border-zinc-800"
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Prize Pool */}
                                <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50">
                                    <h3 className="text-lg font-semibold mb-4 text-white/90 flex items-center gap-2">
                                        <Trophy className="w-4 h-4 text-purple-500" /> Prize Pool
                                    </h3>

                                    <FormField
                                        control={control}
                                        name="prizePool"
                                        render={({ field }) => (
                                            <FormItem>
                                                <label className="text-sm font-medium text-zinc-400 mb-1 block">
                                                    Total Prize Amount
                                                </label>
                                                <div className='relative'>
                                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500">$</div>
                                                    <Input
                                                        placeholder='e.g. 5000'
                                                        type='text'
                                                        className='border-zinc-700 bg-zinc-800/50 w-full pl-8 text-white'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="mt-2 text-xs text-zinc-500">
                                        Impressive prizes attract more participants. Add the total value of all prizes.
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50 mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-white/90 flex items-center gap-2">
                                    <MapPinIcon className="w-4 h-4 text-purple-500" /> Location
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    <FormField
                                        control={control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <label className="text-sm font-medium text-zinc-400 mb-1 block">
                                                    Venue
                                                </label>
                                                <div className="relative">
                                                    <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                                    <Input
                                                        placeholder="e.g. University Campus, Virtual"
                                                        type='text'
                                                        className='border-zinc-700 bg-zinc-800/50 w-full pl-10 text-white'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="pincode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <label className="text-sm font-medium text-zinc-400 mb-1 block">
                                                    Pincode / ZIP
                                                </label>
                                                <div className="relative">
                                                    <HashIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                                    <Input
                                                        placeholder="e.g. 94105"
                                                        type='text'
                                                        className='border-zinc-700 bg-zinc-800/50 w-full pl-10 text-white'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Links & Websites */}
                            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50 mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-white/90 flex items-center gap-2">
                                    <LinkIcon className="w-4 h-4 text-purple-500" /> Links & Websites
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    <FormField
                                        control={control}
                                        name="hackathon_website"
                                        render={({ field }) => (
                                            <FormItem>
                                                <label className="text-sm font-medium text-zinc-400 mb-1 block">
                                                    Hackathon Website
                                                </label>
                                                <div className="relative">
                                                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                                    <Input
                                                        placeholder="https://example.com/hackathon"
                                                        type='text'
                                                        className='border-zinc-700 bg-zinc-800/50 w-full pl-10 text-white'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="website_link"
                                        render={({ field }) => (
                                            <FormItem>
                                                <label className="text-sm font-medium text-zinc-400 mb-1 block">
                                                    Organization Website
                                                </label>
                                                <div className="relative">
                                                    <GlobeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                                    <Input
                                                        placeholder="https://yourdomain.com"
                                                        type='text'
                                                        className='border-zinc-700 bg-zinc-800/50 w-full pl-10 text-white'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="social"
                                        render={({ field }) => (
                                            <FormItem>
                                                <label className="text-sm font-medium text-zinc-400 mb-1 block">
                                                    Social Media
                                                </label>
                                                <div className="relative">
                                                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                                    <Input
                                                        placeholder="https://twitter.com/yourhackathon"
                                                        type='text'
                                                        className='border-zinc-700 bg-zinc-800/50 w-full pl-10 text-white'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50 mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-white/90 flex items-center gap-2">
                                    <MailIcon className="w-4 h-4 text-purple-500" /> Contact Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    <FormField
                                        control={control}
                                        name="contactInfo_1"
                                        render={({ field }) => (
                                            <FormItem>
                                                <label className="text-sm font-medium text-zinc-400 mb-1 block">
                                                    Contact Phone 1
                                                </label>
                                                <div className="relative">
                                                    <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                                    <Input
                                                        placeholder="e.g. +1 555-123-4567"
                                                        type='text'
                                                        className='border-zinc-700 bg-zinc-800/50 w-full pl-10 text-white'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="contactInfo_2"
                                        render={({ field }) => (
                                            <FormItem>
                                                <label className="text-sm font-medium text-zinc-400 mb-1 block">
                                                    Contact Phone 2 (Optional)
                                                </label>
                                                <div className="relative">
                                                    <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                                    <Input
                                                        placeholder="e.g. +1 555-987-6543"
                                                        type='text'
                                                        className='border-zinc-700 bg-zinc-800/50 w-full pl-10 text-white'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="contactEmail_1"
                                        render={({ field }) => (
                                            <FormItem>
                                                <label className="text-sm font-medium text-zinc-400 mb-1 block">
                                                    Contact Email 1
                                                </label>
                                                <div className="relative">
                                                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                                    <Input
                                                        placeholder="contact@yourhackathon.com"
                                                        type='email'
                                                        className='border-zinc-700 bg-zinc-800/50 w-full pl-10 text-white'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="contactEmail_2"
                                        render={({ field }) => (
                                            <FormItem>
                                                <label className="text-sm font-medium text-zinc-400 mb-1 block">
                                                    Contact Email 2 (Optional)
                                                </label>
                                                <div className="relative">
                                                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                                    <Input
                                                        placeholder="support@yourhackathon.com"
                                                        type='email'
                                                        className='border-zinc-700 bg-zinc-800/50 w-full pl-10 text-white'
                                                        {...field}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Submit button */}
                            <Button
                                className="w-full mt-8 h-14 text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)]"
                                disabled={isSubmitting}
                                type="submit"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Hackathon...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Sparkles className="h-5 w-5" /> Launch Hackathon
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CreateHackathon;