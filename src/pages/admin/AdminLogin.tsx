"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      toast.success("Welcome back!");
      router.push("/admin/dashboard");
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative"
      style={{ backgroundImage: "url('/images/adminBackground.jpg')" }}
    >
      {/* Blurred overlay over the background */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
            <span className="text-accent-foreground font-heading font-bold text-3xl">E</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-white/60 mt-1">Equalizer RV Management</p>
        </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30" 
                placeholder="Enter your email" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30" 
                placeholder="Enter your password" 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" 
              size="lg"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}