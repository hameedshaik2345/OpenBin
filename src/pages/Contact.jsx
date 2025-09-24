import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      details: "OpenBinSolutions@gmail.com",
      description: "Send us your queries and we'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      details: "+91 9492807863",
      description: "Call us for immediate assistance (9 AM - 6 PM)"
    },
    {
      icon: MapPin,
      title: "Headquarters",
      details: "Andhra Pradesh, India",
      description: "Serving universities across India"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Saturday",
      description: "9:00 AM - 6:00 PM (IST)"
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Contact & Support 📞
        </h1>
        <p className="text-gray-600">
          Get in touch with our OpenBin team for support, feedback, or partnership inquiries
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <info.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {info.title}
                    </h3>
                    <p className="text-emerald-600 font-medium mb-1">{info.details}</p>
                    <p className="text-gray-600 text-sm">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose OpenBin?</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-700">24/7 Vending Machine Support</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-700">Instant Reward Processing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-700">University Partnership Program</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-700">Environmental Impact Tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          
          {isSubmitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-xl">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">Message sent successfully!</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select a subject</option>
                <option value="support">Technical Support</option>
                <option value="partnership">University Partnership</option>
                <option value="feedback">Feedback & Suggestions</option>
                <option value="billing">Billing & Payments</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Describe your query or feedback..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">How do I get started with OpenBin?</h3>
              <p className="text-gray-600 text-sm">Simply download our app, create an account, and start scanning QR codes at any OpenBin vending machine!</p>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">What types of waste do you accept?</h3>
              <p className="text-gray-600 text-sm">We accept plastic bottles, paper, cardboard, metal cans, glass bottles, and electronic waste.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">How are rewards calculated?</h3>
              <p className="text-gray-600 text-sm">Rewards are based on current market prices and the weight/quantity of your recyclables.</p>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Can universities partner with OpenBin?</h3>
              <p className="text-gray-600 text-sm">Yes! We offer special partnership programs for universities. Contact us for more details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}