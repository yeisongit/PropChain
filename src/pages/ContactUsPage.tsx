"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import AnimateOnView from "@/components/AnimateOnView";
import ScrollToTop from "@/components/ScrollToTop";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsLoading(false);
    setFormData({ name: "", email: "", company: "", message: "" });
    setErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 relative overflow-hidden">
        <ScrollToTop />
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.05),transparent_50%)]"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-emerald-100/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md text-center bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Message Sent Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in blockchain real estate! Our
              PropChain experts will get back to you within 24 hours with
              personalized insights for your investment goals.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Explore More Properties
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 relative overflow-hidden">
      <ScrollToTop />
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.05),transparent_50%)]"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-emerald-100/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Section */}
        <AnimateOnView className="animate-fade-up" delay={100} threshold={0.15}>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Ready to Transform Real Estate
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">
                With Blockchain Technology?
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with our blockchain real estate experts to discover how
              PropChain can revolutionize your property investments with
              transparent, secure, and decentralized solutions.
            </p>
          </div>
        </AnimateOnView>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <AnimateOnView
              className="animate-fade-left"
              delay={200}
              threshold={0.15}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Start Your Blockchain Real Estate Journey
                  </h2>
                  <p className="text-lg text-gray-600">
                    Tell us about your real estate goals and discover how
                    blockchain technology can transform your investments.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={`h-12 ${
                          errors.name
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        placeholder="Enter your full name"
                        required
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p 
                          id="name-error" 
                          className="mt-1 text-sm text-red-600" 
                          role="alert"
                          aria-live="polite"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`h-12 ${
                          errors.email
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        placeholder="Enter your email address"
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p 
                          id="email-error" 
                          className="mt-1 text-sm text-red-600" 
                          role="alert"
                          aria-live="polite"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Company (Optional)
                    </label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                      className="h-12"
                      placeholder="Enter your company name"
                      aria-describedby="company-description"
                    />
                    <p id="company-description" className="sr-only">
                      Optional field for your company or organization name
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      className={`min-h-32 resize-none ${
                        errors.message
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                      placeholder="Tell us about your real estate investment goals, property portfolio, or how blockchain technology can help your business..."
                      required
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : "message-description"}
                    />
                    <p id="message-description" className="sr-only">
                      Minimum 10 characters required. Share your real estate investment goals or questions about blockchain technology
                    </p>
                    {errors.message && (
                      <p 
                        id="message-error" 
                        className="mt-1 text-sm text-red-600" 
                        role="alert"
                        aria-live="polite"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    aria-describedby="submit-button-description"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div 
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                          aria-hidden="true"
                        ></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send className="w-5 h-5" aria-hidden="true" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </button>
                  <p id="submit-button-description" className="sr-only">
                    Submit the contact form to send your message to our team
                  </p>
                </form>
              </div>
            </AnimateOnView>
          </div>

          {/* Contact Information */}
          <AnimateOnView
            className="animate-fade-right"
            delay={300}
            threshold={0.15}
          >
            <div className="space-y-6">
              {/* Sales Information */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    Blockchain Real Estate Experts
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    Ready to explore NFT properties, smart contract solutions,
                    or blockchain-powered real estate investments? Our experts
                    are here to help.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-emerald-500" />
                      <a
                        href="tel:+1-555-0123"
                        className="text-gray-900 hover:text-emerald-600 transition-colors"
                      >
                        +1 (555) PROPCHAIN
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-500" />
                      <a
                        href="mailto:blockchain@propchain.com"
                        className="text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        blockchain@propchain.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-purple-500" />
                      <span className="text-gray-900">
                        Mon-Fri, 9AM-6PM EST
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    PropChain Headquarters
                  </h3>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">
                    Blockchain Innovation Center
                  </h4>
                  <address className="not-italic text-gray-600 leading-relaxed">
                    456 Blockchain Boulevard
                    <br />
                    Crypto District, Suite 2024
                    <br />
                    San Francisco, CA 94105
                    <br />
                    United States
                  </address>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">
                      🏢 Located in the heart of the financial district, where
                      traditional real estate meets blockchain innovation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Response Promise */}
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    Blockchain Expert Response
                  </h3>
                  <p className="text-emerald-50 leading-relaxed">
                    Our real estate blockchain specialists respond to all
                    inquiries within 24 hours. Get personalized guidance for
                    your property investment journey.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnView>
        </div>
      </div>
    </div>
  );
}
