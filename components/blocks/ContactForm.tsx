'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface ContactFormProps {
  heading?: string;
  description?: string;
  email?: string;
  address?: string;
  projectTypes?: string[];
  budgetRanges?: string[];
  submitButtonText?: string;
}

export function ContactForm({
  heading = 'Contact',
  description = 'Tell us about your vision. Whether it\'s a single hero image or a full world-building campaign, we are ready to collaborate.',
  email = 'hello@darkokalany.com',
  address = '109 North 4th St\nBrooklyn, NY 11249',
  projectTypes = ['Real Estate', 'Fashion', 'Brand Film', 'Concept Art', 'Other'],
  budgetRanges = ['$2.5k - $5k', '$5k - $10k', '$10k - $25k', '$25k+'],
  submitButtonText = 'Send Inquiry',
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: projectTypes[0] || 'Other',
    budget: budgetRanges[0] || '$2.5k - $5k',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Demo submission - replace with actual form handling
    setTimeout(() => {
      alert('Thank you for your inquiry. This is a demo form.');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column - Info */}
        <div>
          <h2 className="text-5xl md:text-7xl font-heading text-white mb-6">
            {heading}
          </h2>
          <p className="text-gray-400 text-lg font-light mb-12">{description}</p>

          <div className="space-y-8 font-mono text-sm">
            <div>
              <h4 className="text-gray-500 uppercase mb-2">Email</h4>
              <a
                href={`mailto:${email}`}
                className="text-white text-xl hover:text-primary transition-colors"
              >
                {email}
              </a>
            </div>
            {address && (
              <div>
                <h4 className="text-gray-500 uppercase mb-2">Studio</h4>
                <p className="text-white whitespace-pre-line">{address}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="bg-white/5 p-8 md:p-12 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-mono uppercase text-gray-500 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-black border border-white/20 p-4 text-white focus:border-primary focus:outline-none transition-colors"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-gray-500 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-black border border-white/20 p-4 text-white focus:border-primary focus:outline-none transition-colors"
                placeholder="john@company.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase text-gray-500 mb-2">
                  Project Type
                </label>
                <select
                  className="w-full bg-black border border-white/20 p-4 text-white focus:border-primary focus:outline-none transition-colors appearance-none"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-gray-500 mb-2">
                  Budget
                </label>
                <select
                  className="w-full bg-black border border-white/20 p-4 text-white focus:border-primary focus:outline-none transition-colors appearance-none"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                >
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-gray-500 mb-2">
                Project Details
              </label>
              <textarea
                className="w-full bg-black border border-white/20 p-4 text-white focus:border-primary focus:outline-none transition-colors h-32"
                placeholder="Describe your project..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
            >
              {isSubmitting ? 'Sending...' : submitButtonText}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
