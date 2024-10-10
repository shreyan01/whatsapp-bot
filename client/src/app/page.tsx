"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">MessageBot</div>
          <div className="space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">Pricing</a>
            <a href="/send-text" className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition">Get Started</a>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        <section className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
            Connect with Customers,<br />Effortlessly
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Automate your customer messaging with our intuitive bot platform. Personalized, scalable, and efficient.
          </p>
          <button onClick={() => router.push("/send-text")} className="bg-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Start Messaging Now
          </button>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Automated Campaigns", desc: "Set up and schedule message campaigns with ease." },
                { title: "Smart Personalization", desc: "Tailor messages to individual customers for higher engagement." },
                { title: "Real-time Analytics", desc: "Track and analyze your messaging performance instantly." }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Image
                  src="/placeholder-image.jpg"
                  alt="MessageBot workflow"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
              </div>
              <div className="md:w-1/2 md:pl-12">
                <ol className="space-y-6">
                  {[
                    "Upload your customer phone numbers",
                    "Create your message template",
                    "Set your campaign schedule",
                    "Review and launch your campaign",
                    "Monitor results in real-time"
                  ].map((step, index) => (
                    <li key={index} className="flex items-center">
                      <span className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">{index + 1}</span>
                      <span className="text-lg text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Simple Pricing</h2>
            <div className="max-w-md mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Pro Plan</h3>
                <p className="text-5xl font-bold mb-6 text-pink-500">$49<span className="text-2xl font-normal text-gray-600">/month</span></p>
                <ul className="mb-8 space-y-4">
                  {["Unlimited messages", "Advanced analytics", "24/7 support", "API access"].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-pink-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Ready to Transform Your Customer Communication?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Get in touch with our team for a personalized demo and see how MessageBot can elevate your customer engagement.
            </p>
            <button className="bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-900 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Contact Us
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p>© 2023 MessageBot. All rights reserved.</p>
        </div>
      </footer>

      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${scrollY % window.innerWidth}px ${scrollY % window.innerHeight}px, rgba(255,192,203,0.15) 0%, rgba(255,255,255,0) 50%)`,
          transition: 'all 0.3s ease',
        }}
      />
    </div>
  );
}
