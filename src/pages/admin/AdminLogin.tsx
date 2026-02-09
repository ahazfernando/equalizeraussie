"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user is approved
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'admin' && !userData.isApproved) {
          await signOut(auth);
          toast.error("Account pending approval. Please contact administrator.");
          setLoading(false);
          return;
        }
      } else {
        await signOut(auth);
        toast.error("User profile not found. Please contact support.");
        setLoading(false);
        return;
      }

      toast.success("Logged in successfully");
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex relative overflow-hidden">
      {/* Animated gradient orbs for ambient effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

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

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
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
              SIGN IN ACCOUNT
            </h2>
            <p className="text-gray-400">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-100 hover:to-gray-300 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-gray-400 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-white hover:text-blue-400 font-semibold transition-colors duration-200 underline-offset-4 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}