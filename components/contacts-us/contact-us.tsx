"use client";

import { useState } from "react";

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e:any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    alert("Form submitted:\n" + JSON.stringify(form, null, 2));
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-[#ED1C24]">
            Get in Touch
          </h2>

          <div className="flex items-center gap-4 p-4 bg-white/5 border-l-4 border-[#ED1C24]">
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1..." />
            </svg>
            <div>
              <p className="font-semibold">Email</p>
              <p>contact@company.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/5 border-l-4 border-[#ED1C24]">
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79..." />
            </svg>
            <div>
              <p className="font-semibold">Phone</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/5 border-l-4 border-[#ED1C24]">
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2..." />
            </svg>
            <div>
              <p className="font-semibold">Address</p>
              <p>123 Business St, Suite 100</p>
              <p>City, State 12345</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 p-8 rounded-2xl shadow-xl space-y-6"
        >
          <h3 className="text-2xl font-semibold text-[#ED1C24]">Send us a Message</h3>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-lg bg-white/20 focus:bg-white/30 outline-none"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-lg bg-white/20 focus:bg-white/30 outline-none"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={4}
            required
            className="w-full p-3 rounded-lg bg-white/20 focus:bg-white/30 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#ED1C24] text-white uppercase font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
