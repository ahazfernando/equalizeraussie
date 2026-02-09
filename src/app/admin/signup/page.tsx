"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function AdminSignup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setLoading(true);

        try {
            // Create user with Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create user document in Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                firstName: firstName,
                lastName: lastName,
                fullName: `${firstName} ${lastName}`,
                role: 'admin',
                isApproved: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });

            toast.success("Account created successfully! Awaiting approval from administrator.");

            // Redirect to login page after a short delay
            setTimeout(() => {
                router.push("/admin/login");
            }, 2000);

        } catch (error: any) {
            console.error(error);

            // Handle specific Firebase errors
            if (error.code === 'auth/email-already-in-use') {
                toast.error("This email is already registered");
            } else if (error.code === 'auth/invalid-email') {
                toast.error("Invalid email address");
            } else if (error.code === 'auth/weak-password') {
                toast.error("Password is too weak");
            } else {
                toast.error(error.message || "Failed to create account");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex relative overflow-hidden">
            {/* Animated gradient orbs for ambient effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Left Panel - Image with margins and rounded corners */}
            <div className="hidden lg:flex lg:w-[60%] p-4 pl-6 pt-6 pb-6">
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <Image
                        src="/header/nighttimervfeealing.png"
                        alt="Equalizer RV"
                        fill
                        className="object-cover scale-x-[-1]"
                        priority
                    />
                </div>
            </div>

            {/* Right Panel - Signup Form */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto relative z-10">
                <div className="w-full max-w-md">
                    {/* Logo with glow effect */}
                    <div className="mb-8">
                        <Image
                            src="/logo/whitelogoWQ.png"
                            alt="Equalizer Logo"
                            width={150}
                            height={50}
                            className="mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        />
                    </div>

                    {/* Headers - Left Aligned with gradient text */}
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            SIGN UP ACCOUNT
                        </h2>
                        <p className="text-gray-400">Enter your personal data to create your account</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-white font-medium">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="eg. John"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="h-12 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 shadow-lg hover:shadow-blue-500/10"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-white font-medium">Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="eg. Francisco"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="h-12 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 shadow-lg hover:shadow-blue-500/10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white font-medium">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="eg. john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 shadow-lg hover:shadow-blue-500/10"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white font-medium">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-12 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 pr-10 shadow-lg hover:shadow-blue-500/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-white font-medium">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="h-12 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 pr-10 shadow-lg hover:shadow-blue-500/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-100 hover:to-gray-300 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{" "}
                            <Link
                                href="/admin/login"
                                className="text-white hover:text-blue-400 font-semibold transition-colors duration-200 underline-offset-4 hover:underline"
                            >
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
