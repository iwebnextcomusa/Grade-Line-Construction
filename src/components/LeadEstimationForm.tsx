/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Phone, Clock, Mail } from "lucide-react";

export default function LeadEstimationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Excavation",
    spaceType: "Residential",
    budget: "$1,000 - $5,000",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [apiResponseMsg, setApiResponseMsg] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    
    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.contact = "Please provide at least an Email or Phone Number so we can reach you.";
    }

    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.phone.trim() && !/^[0-9+-\s()]{7,15}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation errors on type
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
    if (errors.contact) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.contact;
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/estimates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Form submission returned a non-ok endpoint response");
      }

      const result = await response.json();
      setSubmitStatus("success");
      setApiResponseMsg(result.message);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "Excavation",
        spaceType: "Residential",
        budget: "$1,000 - $5,000",
        message: "",
      });
    } catch (err) {
      console.error("Failed submitting estimate form to server:", err);
      setSubmitStatus("error");
      setApiResponseMsg("Failed to connect to the server. Please call us directly at 801-903-8689!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-855 rounded-[2px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative accent background strip */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-500 via-[#E67E22] to-amber-400" />

      <h3 className="text-2xl font-bold tracking-tight text-white mb-2 font-sans">
        Request a Free Project Estimate
      </h3>
      <p className="text-sm text-neutral-400 mb-6 leading-relaxed font-sans">
        Input details below or call Claude directly at <span className="text-[#E67E22] font-semibold">801-903-8689</span>. Fill out custom specs to expedite site evaluations.
      </p>

      {submitStatus === "success" && (
        <div className="bg-green-950/40 border border-green-800/40 rounded-xl p-5 text-center mb-6 animate-in fade-in zoom-in-95 duration-300">
          <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <h4 className="font-bold text-green-200 text-lg mb-1 font-sans">Estimate Form Submitted!</h4>
          <p className="text-sm text-green-300 leading-relaxed font-sans">{apiResponseMsg}</p>
          <button
            id="new-est-btn"
            onClick={() => setSubmitStatus("idle")}
            className="mt-4 px-4 py-2 bg-green-900 hover:bg-green-800 text-white rounded-lg text-xs font-semibold cursor-pointer transition-all"
          >
            Submit Another Request
          </button>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="bg-red-950/40 border border-red-800/40 rounded-xl p-5 mb-6 text-center animate-in fade-in zoom-in-95 duration-300">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h4 className="font-bold text-red-200 text-lg mb-1 font-sans">Submission Error</h4>
          <p className="text-sm text-red-300 font-sans">{apiResponseMsg}</p>
        </div>
      )}

      {submitStatus !== "success" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.contact && (
            <div className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-3 flex items-center gap-3 text-amber-300 text-xs">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{errors.contact}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-1.5 font-mono">
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Claude Wayman"
                className={`w-full bg-neutral-950 text-white text-sm rounded-[2px] border px-3.5 py-3 focus:outline-none transition-colors ${
                  errors.name ? "border-red-500 focus:border-red-500" : "border-neutral-800 focus:border-[#E67E22]"
                }`}
              />
              {errors.name && <p className="text-red-500 text-[10px] mt-1 font-mono">{errors.name}</p>}
            </div>

            {/* Service Type Selection */}
            <div>
              <label htmlFor="service" className="block text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-1.5 font-mono">
                Required Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-neutral-950 text-white text-sm rounded-[2px] border border-neutral-800 focus:outline-none focus:border-[#E67E22] px-3 py-3"
              >
                <option value="Excavation">Excavation & Foundations</option>
                <option value="SitePrep">Site Preparation & Building Pads</option>
                <option value="Grading">Rough & Finish Grading</option>
                <option value="Clearing">Land & Tree Clearing</option>
                <option value="Utilities">Utility Trenching & Laying</option>
                <option value="Driveways">Driveway / Private Road Prep</option>
                <option value="Combination">Comprehensive Site Work Package</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-1.5 font-mono">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="claudewayman02@gmail.com"
                className={`w-full bg-neutral-950 text-white text-sm rounded-[2px] border px-3.5 py-3 focus:outline-none transition-colors ${
                  errors.email ? "border-red-500" : "border-neutral-800 focus:border-[#E67E22]"
                }`}
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-1 font-mono">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-1.5 font-mono">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="801-903-8689"
                className={`w-full bg-neutral-950 text-white text-sm rounded-[2px] border px-3.5 py-3 focus:outline-none transition-colors ${
                  errors.phone ? "border-red-500" : "border-neutral-800 focus:border-[#E67E22]"
                }`}
              />
              {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-mono">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Space Type */}
            <div>
              <label htmlFor="spaceType" className="block text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-1.5 font-mono">
                Property Category
              </label>
              <select
                id="spaceType"
                name="spaceType"
                value={formData.spaceType}
                onChange={handleChange}
                className="w-full bg-neutral-950 text-white text-sm rounded-[2px] border border-neutral-800 focus:outline-none focus:border-[#E67E22] px-3 py-3"
              >
                <option value="Residential">Residential Property Owner</option>
                <option value="Commercial">Commercial Property Owner / Dev</option>
                <option value="Contractor">General Contractor / Home Builder</option>
                <option value="Agricultural">Agricultural / Farm Lands Owner</option>
              </select>
            </div>

            {/* Project Budget */}
            <div>
              <label htmlFor="budget" className="block text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-1.5 font-mono">
                Estimated Project Budget
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-neutral-950 text-white text-sm rounded-[2px] border border-neutral-800 focus:outline-none focus:border-[#E67E22] px-3 py-3"
              >
                <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                <option value="$50,000+">$50,000+ (Large Civil / Commercial)</option>
                <option value="Unsure">Unsure (Need Consultation / Site Check)</option>
              </select>
            </div>
          </div>

          {/* Message / Project Details */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-1.5 font-mono">
              Project Details & Slope Conditions
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g., Excavating a basement for a 2,500 sqft custom house. Need sagebrush cleared, building pad compressed, and standard grading for correct water drainage."
              className="w-full bg-neutral-950 text-white text-sm rounded-[2px] border border-neutral-800 focus:outline-none focus:border-[#E67E22] px-3.5 py-3 resize-none focus:ring-0"
            />
          </div>

          <button
            id="est-submit"
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-sans text-xs font-bold uppercase tracking-[1px] py-3.5 rounded-[2px] cursor-pointer hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing Free Specs Estimate...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Estimate Request Specs
              </>
            )}
          </button>
        </form>
      )}

      {/* Trust Signatures */}
      <div className="mt-6 border-t border-neutral-800/80 pt-4 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-500 font-mono gap-3">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#E67E22]" /> Response Guarantee: Under 24 Business Hours
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Licensed, Bonded & Insured State of Utah
        </span>
      </div>
    </div>
  );
}
