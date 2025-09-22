"use client";
import React, { useState } from "react";
import { baseInstance } from "@/constants/apis";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    setIsLoading(true);

    try {
      // Send the form data in the request body
      const res = await baseInstance.post('/customer-inquiry', formData);
      
      console.log(res);

      // Check for successful response (status 200-299)
      if (res.status >= 200 && res.status < 300) {
        setStatus("Message sent successfully ✅");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message ❌");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Error sending message ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="xl:p-24 xl:flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-[#FD6D0D]">
            Get in Touch
          </h2>

          <div className="flex items-center gap-4 p-4 bg-white/5 border-l-4 border-[#FD6D0D]">
            <svg className="w-6 h-6 text-[#FD6D0D]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <div>
              <p className="font-semibold">Email</p>
              <p className="mb-1">info@camptreksafaris.com</p>
              <p>camptreksafaris@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/5 border-l-4 border-[#FD6D0D]">
            <svg className="w-6 h-6 text-[#FD6D0D]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <div>
              <p className="font-semibold">Phone</p>
              <p>(+254)-720-938-799</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/5 border-l-4 border-[#FD6D0D]">
            <svg className="w-6 h-6 text-[#FD6D0D]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div>
              <p className="font-semibold">Address</p>
              <p>Ring Road, Commercial Centre</p>
              <p>Westlands, Nairobi, Kenya</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-md mx-auto bg-white shadow">
          <h1 className="text-2xl uppercase flex justify-center font-bold mb-6 text-[#FD6D0D]">
            Enquiry Form
          </h1>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border focus:outline-none focus:ring-2 focus:ring-blue-500
            placeholder: text-[12px]
            "
            required
            disabled={isLoading}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border focus:outline-none focus:ring-2 focus:ring-blue-500
            placeholder: text-[12px]
            "
            required
            disabled={isLoading}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full h-[150px] p-2 border focus:outline-none focus:ring-2 focus:ring-blue-500
            placeholder: text-[12px]
            "
            required
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-[14px] uppercase bg-[#FD6D0D] text-white py-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Sending..." : "Submit"}
          </button>

          {status && (
            <p className={`text-sm h-[50px] mt-2 ${status.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {status}
              <span>
                Please check your email for confirmation!!
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;