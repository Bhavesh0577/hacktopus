"use client";
import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiYoutube,
  FiPhone,
  FiMail,
  FiGithub,
  FiGlobe,
  FiMapPin,
  FiUser,
  FiEdit3,
  FiSave,
  FiPlusCircle,
} from 'react-icons/fi';
import { Textarea } from '../ui/textarea';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

const UserProfile = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(user?.imageUrl || '/images/default-avatar.png');
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    twitter: '',
    youtube: '',
    linkedin: '',
    github: '',
    facebook: '',
    website: '',
  });
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState(user?.emailAddresses[0]?.emailAddress || '');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSocialLinkChange = (name: keyof typeof socialLinks, value: string) => {
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/api/user/update-profile", {
        firstName,
        lastName,
        username,
        bio,
        profilePicture,
        socialLinks,
        mobileNumber,
        email,
        location,
      })
      if (response.status === 200) {
        console.log('updated')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="pt-24 pb-20 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient-x">Your Profile</h1>
          <p className="text-zinc-400 mt-2">
            Customize how you appear across the platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-6 sticky top-24">
              <div className="flex flex-col items-center text-center">
                <div className="relative group mb-4">
                  <Avatar className="w-32 h-32 border-4 border-purple-500/30">
                    <AvatarImage src={user?.imageUrl} alt={`${firstName} ${lastName}`} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-2xl font-bold">
                      {`${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-purple-600 text-white hover:bg-purple-700 border-0">
                      <FiEdit3 size={14} />
                    </Button>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-white mb-1">{firstName} {lastName}</h2>
                {username && <p className="text-zinc-400 mb-3">@{username}</p>}
                {location && (
                  <div className="flex items-center justify-center text-zinc-400 text-sm mb-4">
                    <FiMapPin className="mr-1.5 h-4 w-4 text-zinc-500" />
                    <span>{location}</span>
                  </div>
                )}

                {bio && (
                  <div className="mt-3 mb-6">
                    <p className="text-zinc-300 text-sm">{bio}</p>
                  </div>
                )}

                <div className="flex gap-2 mt-2 mb-6">
                  {socialLinks.instagram && (
                    <a href={`https://instagram.com/${socialLinks.instagram}`} target="_blank" rel="noopener noreferrer"
                      className="bg-zinc-800 p-2 rounded-full text-pink-400 hover:bg-zinc-700 transition-colors">
                      <FiInstagram size={18} />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a href={`https://twitter.com/${socialLinks.twitter}`} target="_blank" rel="noopener noreferrer"
                      className="bg-zinc-800 p-2 rounded-full text-blue-400 hover:bg-zinc-700 transition-colors">
                      <FiTwitter size={18} />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                      className="bg-zinc-800 p-2 rounded-full text-blue-500 hover:bg-zinc-700 transition-colors">
                      <FiLinkedin size={18} />
                    </a>
                  )}
                  {socialLinks.github && (
                    <a href={`https://github.com/${socialLinks.github}`} target="_blank" rel="noopener noreferrer"
                      className="bg-zinc-800 p-2 rounded-full text-zinc-300 hover:bg-zinc-700 transition-colors">
                      <FiGithub size={18} />
                    </a>
                  )}
                  {socialLinks.website && (
                    <a href={socialLinks.website} target="_blank" rel="noopener noreferrer"
                      className="bg-zinc-800 p-2 rounded-full text-emerald-400 hover:bg-zinc-700 transition-colors">
                      <FiGlobe size={18} />
                    </a>
                  )}
                </div>

                <div className="w-full space-y-2 mt-2">
                  <div className="flex items-center text-sm text-zinc-400">
                    <FiMail className="mr-2 h-4 w-4 text-zinc-500" />
                    <span>{email}</span>
                  </div>
                  {mobileNumber && (
                    <div className="flex items-center text-sm text-zinc-400">
                      <FiPhone className="mr-2 h-4 w-4 text-zinc-500" />
                      <span>{mobileNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Editor - Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-6">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="w-full bg-zinc-800/70 mb-6">
                  <TabsTrigger value="personal" className="flex-1 data-[state=active]:bg-purple-600">
                    <FiUser className="mr-2 h-4 w-4" /> Personal
                  </TabsTrigger>
                  <TabsTrigger value="social" className="flex-1 data-[state=active]:bg-purple-600">
                    <FiGlobe className="mr-2 h-4 w-4" /> Social
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-zinc-300">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-zinc-800/80 text-white border border-zinc-700 focus-visible:ring-purple-500 text-base focus-visible:border-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-zinc-300">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="bg-zinc-800/80 text-white border border-zinc-700 focus-visible:ring-purple-500 text-base focus-visible:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-zinc-300">
                      Username
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                        @
                      </div>
                      <Input
                        id="username"
                        className="pl-8 bg-zinc-800/80 text-white border border-zinc-700 focus-visible:ring-purple-500 text-base focus-visible:border-purple-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-zinc-300">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Share a little about your background and interests."
                      className="h-24 resize-none bg-zinc-800/80 text-white border border-zinc-700 focus-visible:ring-purple-500 text-base focus-visible:border-purple-500"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobileNumber" className="text-zinc-300">
                        Mobile Number
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                          <FiPhone className="h-4 w-4" />
                        </div>
                        <Input
                          id="mobileNumber"
                          type="tel"
                          className="pl-8 bg-zinc-800/80 text-white border border-zinc-700 focus-visible:ring-purple-500 text-base focus-visible:border-purple-500"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-zinc-300">
                        Email
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                          <FiMail className="h-4 w-4" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          className="pl-8 bg-zinc-800/80 text-white border border-zinc-700 focus-visible:ring-zinc-500 text-base"
                          value={user?.emailAddresses[0].emailAddress}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-zinc-300">
                      Location
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                        <FiMapPin className="h-4 w-4" />
                      </div>
                      <Input
                        id="location"
                        type="text"
                        placeholder="City, State, Country"
                        className="pl-8 bg-zinc-800/80 text-white border border-zinc-700 focus-visible:ring-purple-500 text-base focus-visible:border-purple-500"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="social" className="mt-0">
                  <div className="space-y-4">
                    <div className="flex items-center rounded-md overflow-hidden bg-zinc-800/80 border border-zinc-700 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
                      <div className="px-3 py-2 bg-zinc-700">
                        <FiInstagram className="h-5 w-5 text-pink-400" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Instagram Username"
                        value={socialLinks.instagram}
                        onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                        className="flex-grow bg-transparent border-none text-white focus-visible:outline-none focus-visible:ring-0 text-base"
                      />
                    </div>

                    <div className="flex items-center rounded-md overflow-hidden bg-zinc-800/80 border border-zinc-700 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
                      <div className="px-3 py-2 bg-zinc-700">
                        <FiTwitter className="h-5 w-5 text-blue-400" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Twitter Username"
                        value={socialLinks.twitter}
                        onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                        className="flex-grow bg-transparent border-none text-white focus-visible:outline-none focus-visible:ring-0 text-base"
                      />
                    </div>

                    <div className="flex items-center rounded-md overflow-hidden bg-zinc-800/80 border border-zinc-700 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
                      <div className="px-3 py-2 bg-zinc-700">
                        <FiLinkedin className="h-5 w-5 text-blue-500" />
                      </div>
                      <Input
                        type="text"
                        placeholder="LinkedIn Profile URL"
                        value={socialLinks.linkedin}
                        onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                        className="flex-grow bg-transparent border-none text-white focus-visible:outline-none focus-visible:ring-0 text-base"
                      />
                    </div>

                    <div className="flex items-center rounded-md overflow-hidden bg-zinc-800/80 border border-zinc-700 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
                      <div className="px-3 py-2 bg-zinc-700">
                        <FiGithub className="h-5 w-5 text-zinc-300" />
                      </div>
                      <Input
                        type="text"
                        placeholder="GitHub Username"
                        value={socialLinks.github}
                        onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                        className="flex-grow bg-transparent border-none text-white focus-visible:outline-none focus-visible:ring-0 text-base"
                      />
                    </div>

                    <div className="flex items-center rounded-md overflow-hidden bg-zinc-800/80 border border-zinc-700 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
                      <div className="px-3 py-2 bg-zinc-700">
                        <FiYoutube className="h-5 w-5 text-red-500" />
                      </div>
                      <Input
                        type="text"
                        placeholder="YouTube Channel"
                        value={socialLinks.youtube}
                        onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
                        className="flex-grow bg-transparent border-none text-white focus-visible:outline-none focus-visible:ring-0 text-base"
                      />
                    </div>

                    <div className="flex items-center rounded-md overflow-hidden bg-zinc-800/80 border border-zinc-700 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
                      <div className="px-3 py-2 bg-zinc-700">
                        <FiGlobe className="h-5 w-5 text-emerald-400" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Website URL"
                        value={socialLinks.website}
                        onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                        className="flex-grow bg-transparent border-none text-white focus-visible:outline-none focus-visible:ring-0 text-base"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="h-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6"
                >
                  {loading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2 h-4 w-4" /> Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;