import React, { useState } from 'react';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Real Estate',
    budget: '2.5k-5k',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry. This is a demo form.");
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-6 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl md:text-7xl font-heading text-white mb-6">Contact</h1>
            <p className="text-gray-400 text-lg font-light mb-12">
              Tell us about your vision. Whether it's a single hero image or a full world-building campaign, we are ready to collaborate.
            </p>
            
            <div className="space-y-8 font-mono text-sm">
              <div>
                <h4 className="text-gray-500 uppercase mb-2">Email</h4>
                <a href="mailto:hello@darkokalany.com" className="text-white text-xl hover:text-primary transition-colors">hello@darkokalany.com</a>
              </div>
              <div>
                <h4 className="text-gray-500 uppercase mb-2">Studio</h4>
                <p className="text-white">
                  109 North 4th St<br />
                  Brooklyn, NY 11249
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-8 md:p-12 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase text-gray-500 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-black border border-white/20 p-4 text-white focus:border-primary focus:outline-none transition-colors rounded-none"
                  placeholder="John Doe"
                  required
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-xs font-mono uppercase text-gray-500 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-black border border-white/20 p-4 text-white focus:border-primary focus:outline-none transition-colors rounded-none"
                  placeholder="john@company.com"
                  required
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-500 mb-2">Project Type</label>
                  <select 
                    className="w-full bg-black border border-white/20 p-4 text-white focus:border-primary focus:outline-none transition-colors rounded-none appearance-none"
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option>Real Estate</option>
                    <option>Fashion</option>
                    <option>Brand Film</option>
                    <option>Concept Art</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-500 mb-2">Budget</label>
                  <select 
                    className="w-full bg-black border border-white/20 p-4 text-white focus:border-primary focus:outline-none transition-colors rounded-none appearance-none"
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  >
                    <option>$2.5k - $5k</option>
                    <option>$5k - $10k</option>
                    <option>$10k - $25k</option>
                    <option>$25k+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-500 mb-2">Project Details</label>
                <textarea 
                  className="w-full bg-black border border-white/20 p-4 text-white focus:border-primary focus:outline-none transition-colors h-32 rounded-none"
                  placeholder="Describe your project..."
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <Button type="submit" variant="primary" className="w-full">Send Inquiry</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;