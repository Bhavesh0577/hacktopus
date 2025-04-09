"use client"
import React, { useState } from 'react'
import { InputEvent } from '../ui/input-event'
import { Input } from '../ui/input'
import { EventSchema } from '@/schemas/eventSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel
} from "@/components/ui/form"
import {
    CalendarIcon,
    LinkIcon,
    MapPinIcon,
    UsersIcon,
    GlobeIcon,
    FileTextIcon,
    ImageIcon,
    AlarmClock,
    Clock,
    Upload,
    Sparkles
} from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Textarea } from '../ui/textarea'
import ImageUpload from '@/utils/uploadImage'
import axios from 'axios'

const CreateEvent = () => {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof EventSchema>>({
        resolver: zodResolver(EventSchema),
        defaultValues: {
            event_link: "",
            event_name: "",
            imageUrl: "",
            website_link: "",
            social: "",
            participants: "",
            start_date: "",
            end_date: "",
            pincode: "",
            location: "",
            description: ""
        },
    })

    async function onSubmit(values: z.infer<typeof EventSchema>) {
        setLoading(true)
        try {
            const response = await axios.post("/api/events/create-event", values)
            if (response.status === 200) {
                console.log("Form submitted", values)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full h-full rounded-xl'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
                        {/* Image upload section - Column 1 */}
                        <div className='md:col-span-2 rounded-xl h-full'>
                            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50 h-full">
                                <h3 className="text-lg font-semibold mb-4 text-white/90 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-pink-500" /> Event Cover Image
                                </h3>
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
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
                        <div className='md:col-span-3'>
                            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50 mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-white/90">Event Details</h3>

                                {/* Event name */}
                                <FormField
                                    control={form.control}
                                    name="event_name"
                                    render={({ field }) => (
                                        <FormItem className="mb-4">
                                            <InputEvent
                                                placeholder='Enter an amazing event name'
                                                type='text'
                                                className='text-3xl md:text-4xl mb-2 leading-normal py-3 px-4 border-0 font-bold text-white bg-transparent placeholder:text-zinc-600'
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Description */}
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="mb-8">
                                            <div className="relative">
                                                <Textarea
                                                    placeholder="Describe your event in detail. What will attendees experience?"
                                                    className="bg-zinc-800/50 border-zinc-700 text-white rounded-xl min-h-[120px] text-md"
                                                    {...field}
                                                />
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Date and location section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Dates */}
                                <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50">
                                    <h3 className="text-lg font-semibold mb-4 text-white/90 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-pink-500" /> When
                                    </h3>

                                    <div className="space-y-4">
                                        {["start_date", "end_date"].map((dateField, index) => (
                                            <FormField
                                                key={dateField}
                                                control={form.control}
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

                                {/* Location */}
                                <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50">
                                    <h3 className="text-lg font-semibold mb-4 text-white/90 flex items-center gap-2">
                                        <MapPinIcon className="w-4 h-4 text-pink-500" /> Where
                                    </h3>

                                    <div className="space-y-4">
                                        {["location", "pincode"].map((fieldName, index) => (
                                            <FormField
                                                key={fieldName}
                                                control={form.control}
                                                name={fieldName as "location" | "pincode"}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <label className="text-sm font-medium text-zinc-400 mb-1 block">
                                                            {fieldName === "location" ? "Location" : "Pincode"}
                                                        </label>
                                                        <div className="relative">
                                                            <Input
                                                                placeholder={fieldName === "location" ? "e.g. San Francisco, CA" : "e.g. 94105"}
                                                                type='text'
                                                                className='border-zinc-700 bg-zinc-800/50 w-full text-white'
                                                                {...field}
                                                            />
                                                        </div>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Links and Social */}
                            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50 mt-6">
                                <h3 className="text-lg font-semibold mb-4 text-white/90 flex items-center gap-2">
                                    <LinkIcon className="w-4 h-4 text-pink-500" /> Links & Details
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    {[
                                        { name: "event_link", label: "Event Link", icon: LinkIcon, placeholder: "https://example.com/event" },
                                        { name: "website_link", label: "Website", icon: GlobeIcon, placeholder: "https://yourdomain.com" },
                                        { name: "social", label: "Social Media", icon: LinkIcon, placeholder: "https://twitter.com/username" },
                                        { name: "participants", label: "Max Participants", icon: UsersIcon, placeholder: "e.g. 100" }
                                    ].map((field) => (
                                        <FormField
                                            key={field.name}
                                            control={form.control}
                                            name={field.name as any}
                                            render={({ field: formField }) => (
                                                <FormItem>
                                                    <label className="text-sm font-medium text-zinc-400 mb-1 block">
                                                        {field.label}
                                                    </label>
                                                    <div className="relative">
                                                        <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                                        <Input
                                                            placeholder={field.placeholder}
                                                            type='text'
                                                            className='border-zinc-700 bg-zinc-800/50 pl-10 text-white'
                                                            {...formField}
                                                        />
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Submit button */}
                            <Button
                                className="w-full mt-8 h-14 text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)]"
                                disabled={loading}
                                type="submit"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Event...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Sparkles className="h-5 w-5" /> Launch Event
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CreateEvent