"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function QuoteForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setPhone("");
      setPropertyType("Apartment");
      setSubmitted(false);
    }, 3000);
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-3xl mb-2">✓</div>
        <p className="font-semibold text-gray-900">Quote request submitted!</p>
        <p className="text-sm text-gray-500 mt-1">
          We&apos;ll call back within business hours.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div>
        <label className="text-xs font-medium mb-1 block text-gray-700">
          Name
        </label>
        <input
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="text-xs font-medium mb-1 block text-gray-700">
          Phone
        </label>
        <input
          required
          type="tel"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="+971 ..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label className="text-xs font-medium mb-1 block text-gray-700">
          Property Type
        </label>
        <select
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option>Apartment</option>
          <option>Villa</option>
          <option>Office / Commercial</option>
          <option>Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full font-semibold rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition text-white"
        style={{ backgroundColor: "var(--accent-color, #f59e0b)" }}
      >
        <Send className="w-4 h-4" /> Get a Free Quote
      </button>
      <p className="text-gray-400 text-xs text-center">
        No spam. Response within business hours.
      </p>
    </form>
  );
}
