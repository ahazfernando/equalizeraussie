"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function AdminReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      toast.success("Password reset email sent! Check your inbox (and spam folder).");
      router.push("/admin");
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format.");
      } else {
        toast.error(error.message || "Failed to send reset email");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="hidden lg:flex lg:w-[55%] p-6">
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

      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          
          <Button
            variant="ghost"
            className="mb-8 text-gray-400 hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Button>

          <div className="mb-8">
            <Image
              src="/logo/whitelogoWQ.png"
              alt="Equalizer Logo"
              width={150}
              height={50}
              className="mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              RESET PASSWORD
            </h2>
            <p className="text-gray-400">
              Enter your email and we'll send you a link to reset your password
            </p>
          </div>

          <form onSubmit={handleReset} className="space-y-5">
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-100 hover:to-gray-300 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Remember your password?{" "}
              <Link
                href="/admin"
                className="text-white hover:text-blue-400 font-semibold transition-colors duration-200 underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}