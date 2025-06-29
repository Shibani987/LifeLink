'use client';

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const ROLES = ["Donor", "Recipient", "Hospital"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const ORGANS = ["Heart", "Liver", "Kidney", "Lungs", "Pancreas", "Cornea", "Skin", "Bone"];

const FAQS = [
  {
    q: "How to become a donor?",
    a: "To become a donor, you can register using the chatbot or our registration page. You'll need to provide your details and consent."
  },
  {
    q: "What is the process?",
    a: "The process involves registration, verification, and matching with recipients in need. Our team will guide you at every step."
  }
];

const BOT_AVATAR = (
  <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-xl">
    🤖
  </div>
);

function TypingAnimation() {
  return (
    <div className="flex items-center space-x-1">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
    </div>
  );
}

interface LifeBotForm {
  name: string;
  bloodGroup: string;
  organ: string;
  location: string;
  coords: GeolocationCoordinates | null;
  emergency: boolean;
}

// Add types for window speech recognition
interface CustomWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}
declare const window: CustomWindow;

const LifeBot = () => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m LifeBot. How can I help you today? Please select your role." }
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(false);
  const [form, setForm] = useState<LifeBotForm>({
    name: "",
    bloodGroup: "",
    organ: "",
    location: "",
    coords: null,
    emergency: false
  });
  const [showLocation, setShowLocation] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Web Speech API setup
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    recognitionRef.current.onend = () => setListening(false);
  }, []);

  // Geolocation
  const handleGetLocation = () => {
    if (!navigator.geolocation) return;
    setShowLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        setForm(f => ({ ...f, coords: pos.coords, location: `Lat: ${pos.coords.latitude}, Lng: ${pos.coords.longitude}` }));
      },
      () => setShowLocation(false)
    );
  };

  // Handle user input
  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    setMessages(msgs => [...msgs, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => setTyping(false), 800);

    // FAQ
    const faq = FAQS.find(f => text.toLowerCase().includes(f.q.toLowerCase()));
    if (faq) {
      setTimeout(() => setMessages(msgs => [...msgs, { from: "bot", text: faq.a }]), 900);
      return;
    }

    // Step logic
    if (!role) {
      if (ROLES.map(r => r.toLowerCase()).includes(text.toLowerCase())) {
        setRole(text);
        setTimeout(() => setMessages(msgs => [...msgs, { from: "bot", text: getPromptForRole(text) }]), 900);
        setStep(1);
      } else {
        setTimeout(() => setMessages(msgs => [...msgs, { from: "bot", text: "Please select a valid role: Donor, Recipient, or Hospital." }]), 900);
      }
      return;
    }

    // Form collection
    if (role && step > 0) {
      await handleFormStep(text);
    }
  };

  const getPromptForRole = (role: string) => {
    switch (role.toLowerCase()) {
      case "donor":
        return "Great! Let’s get you registered as a donor. What’s your name?";
      case "recipient":
        return "Need an organ? I’ll help you make a request. What’s your name?";
      case "hospital":
        return "Welcome, hospital partner! What’s your institution’s name?";
      default:
        return "Please select your role.";
    }
  };

  // Form step logic
  const handleFormStep = async (text: string) => {
    let nextStep = step;
    let nextPrompt = "";
    let updatedForm = { ...form };
    if (step === 1) {
      updatedForm.name = text;
      nextPrompt = "What’s your blood group? (e.g., A+, O-)";
      nextStep = 2;
    } else if (step === 2) {
      if (!BLOOD_GROUPS.includes(text.toUpperCase())) {
        setTimeout(() => setMessages(msgs => [...msgs, { from: "bot", text: "Please enter a valid blood group (A+, O-, etc.)." }]), 900);
        return;
      }
      updatedForm.bloodGroup = text.toUpperCase();
      nextPrompt = "Which organ? (e.g., Heart, Kidney)";
      nextStep = 3;
    } else if (step === 3) {
      if (!ORGANS.map(o => o.toLowerCase()).includes(text.toLowerCase())) {
        setTimeout(() => setMessages(msgs => [...msgs, { from: "bot", text: "Please enter a valid organ (Heart, Kidney, etc.)." }]), 900);
        return;
      }
      updatedForm.organ = text;
      nextPrompt = "Please share your location (click the pin icon).";
      nextStep = 4;
    } else if (step === 4) {
      if (!form.coords) {
        setTimeout(() => setMessages(msgs => [...msgs, { from: "bot", text: "Please click the pin icon to share your location." }]), 900);
        return;
      }
      nextPrompt = role === "recipient" ? "Is this an emergency request? (yes/no)" : "Ready to submit? (yes to confirm)";
      nextStep = 5;
    } else if (step === 5) {
      if (role === "recipient") {
        updatedForm.emergency = /yes|y/i.test(text);
        nextPrompt = "Submitting your emergency request...";
        await submitForm(updatedForm, "/api/emergency-request");
      } else if (role === "donor") {
        nextPrompt = "Submitting your donor registration...";
        await submitForm(updatedForm, "/api/register-donor");
      } else {
        nextPrompt = "Thank you! Our team will contact your hospital soon.";
      }
      nextStep = 0;
      setRole("");
      setForm({ name: "", bloodGroup: "", organ: "", location: "", coords: null, emergency: false });
    }
    setForm(updatedForm);
    setStep(nextStep);
    setTimeout(() => setMessages(msgs => [...msgs, { from: "bot", text: nextPrompt }]), 900);
  };

  // API submission
  const submitForm = async (data: LifeBotForm, endpoint: string) => {
    try {
      await axios.post(endpoint, data);
      setTimeout(() => setMessages(msgs => [...msgs, { from: "bot", text: "Submitted successfully!" }]), 900);
    } catch {
      setTimeout(() => setMessages(msgs => [...msgs, { from: "bot", text: "There was an error submitting your request." }]), 900);
    }
  };

  // Voice input
  const handleMic = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  // Minimized button
  if (!open) {
    return (
      <button
        className="fixed bottom-6 right-6 z-[100] bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300"
        onClick={() => setOpen(true)}
        aria-label="Open LifeBot"
      >
        <span className="text-3xl">🤖</span>
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-[100] w-80 max-w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 animate-fade-in"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-blue-600 rounded-t-2xl">
        <div className="flex items-center space-x-2">
          {BOT_AVATAR}
          <span className="text-lg font-bold text-white">LifeBot</span>
        </div>
        <button onClick={() => setOpen(false)} className="text-white text-2xl font-bold">×</button>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800" style={{ maxHeight: 400 }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}>
            {msg.from === "bot" && BOT_AVATAR}
            <div className={`rounded-xl px-4 py-2 max-w-[70%] text-sm shadow ${msg.from === "bot" ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 ml-2" : "bg-blue-600 text-white mr-2"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">{BOT_AVATAR}<div className="ml-2"><TypingAnimation /></div></div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div className="p-3 border-t bg-white dark:bg-gray-900 flex items-center space-x-2">
        {/* Role selection */}
        {!role && step === 0 && (
          <div className="flex-1 flex space-x-2">
            {ROLES.map(r => (
              <button
                key={r}
                className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                onClick={() => handleSend(r)}
              >
                {r}
              </button>
            ))}
          </div>
        )}
        {/* Form steps */}
        {role && step > 0 && step < 4 && (
          <input
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
            type="text"
            placeholder="Type your answer..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend(input)}
            disabled={typing}
          />
        )}
        {/* Location step */}
        {role && step === 4 && (
          <button
            className="flex items-center px-3 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition"
            onClick={handleGetLocation}
            disabled={!!form.coords}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c.5304 0 1.0391-.2107 1.4142-.5858C13.7893 10.0391 14 9.5304 14 9c0-.5304-.2107-1.0391-.5858-1.4142C12.9609 7.2107 12.5304 7 12 7c-.5304 0-1.0391.2107-1.4142.5858C10.2107 7.9609 10 8.4696 10 9c0 .5304.2107 1.0391.5858 1.4142C10.9609 10.7893 11.4696 11 12 11z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 11v10m0 0c-4.4183 0-8-3.5817-8-8s3.5817-8 8-8 8 3.5817 8 8-3.5817 8-8 8z" /></svg>
            {form.coords ? "Location Shared" : "Share Location"}
          </button>
        )}
        {/* Emergency/submit step */}
        {role && step === 5 && (
          <input
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
            type="text"
            placeholder="Type yes or no..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend(input)}
            disabled={typing}
          />
        )}
        {/* Text input for FAQs or general chat */}
        {(!role || step === 0) && (
          <>
            <input
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend(input)}
              disabled={typing}
            />
            <button
              className={`p-2 rounded-full ${listening ? "bg-blue-200 dark:bg-blue-800" : "bg-blue-100 dark:bg-blue-900"} text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition`}
              onClick={handleMic}
              aria-label="Voice input"
            >
              <svg className={`w-6 h-6 ${listening ? "animate-pulse" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v2m0 0c-3.866 0-7-3.134-7-7m7 7c3.866 0 7-3.134 7-7m-7 7V4m0 0c1.1046 0 2 .8954 2 2v6c0 1.1046-.8954 2-2 2s-2-.8954-2-2V6c0-1.1046.8954-2 2-2z" /></svg>
            </button>
            <button
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              onClick={() => handleSend(input)}
              aria-label="Send"
              disabled={typing}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </button>
          </>
        )}
      </div>
      {/* Location preview */}
      {form.coords && (
        <div className="p-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border-t flex items-center space-x-2">
          <svg className="w-4 h-4 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c.5304 0 1.0391-.2107 1.4142-.5858C13.7893 10.0391 14 9.5304 14 9c0-.5304-.2107-1.0391-.5858-1.4142C12.9609 7.2107 12.5304 7 12 7c-.5304 0-1.0391.2107-1.4142.5858C10.2107 7.9609 10 8.4696 10 9c0 .5304.2107 1.0391.5858 1.4142C10.9609 10.7893 11.4696 11 12 11z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 11v10m0 0c-4.4183 0-8-3.5817-8-8s3.5817-8 8-8 8 3.5817 8 8-3.5817 8-8 8z" /></svg>
          <span>Location: {form.location}</span>
        </div>
      )}
    </div>
  );
};

export default LifeBot;