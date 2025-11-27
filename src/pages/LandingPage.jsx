import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import {
  Leaf,
  Cherry,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  FlaskConical,
  Star,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  X
} from 'lucide-react';
import { productFeatures, howItWorks, vitamins, testimonials, faqs } from '../mockData';
import { useToast } from '../hooks/use-toast';
import HealthQuiz from '../components/HealthQuiz';
import { supabase } from '../supabaseClient';

const iconMap = {
  Leaf,
  Cherry,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  FlaskConical
};

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [heroEmail, setHeroEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { toast } = useToast();

  const handlePreOrder = async (emailValue, source) => {
    if (!emailValue || !emailValue.includes('@')) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Send to API (which handles Database + Email)
      const response = await fetch('/api/send-welcome-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue, source: source }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Server Error: ${errorData.error || response.statusText}`);
      }

      toast({
        title: 'Pre-Order Confirmed! 🎉',
        description: `We've reserved your spot! Check ${emailValue} for exclusive updates.`,
      });

      if (source === 'hero') setHeroEmail('');
      else setEmail('');

    } catch (error) {
      console.error('Process failed:', error);
      toast({
        title: 'Submission Failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold tracking-tight" style={{ color: '#61525a' }}>
              FRANDY
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium hover:opacity-70 transition-opacity">Features</a>
              <a href="#how-it-works" className="text-sm font-medium hover:opacity-70 transition-opacity">How It Works</a>
              <a href="#nutrition" className="text-sm font-medium hover:opacity-70 transition-opacity">Nutrition</a>
              <a href="#faq" className="text-sm font-medium hover:opacity-70 transition-opacity">FAQ</a>
              <Button
                onClick={() => document.getElementById('preorder-section').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white"
              >
                Free Pre-Order
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden" style={{ backgroundColor: '#f7f5f2' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 px-4 py-1 text-sm">
                🎉 Launching Soon - Pre-Order Now!
              </Badge>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight" style={{ color: '#1e1919' }}>
                Your Daily Dose of
                <span className="block bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Berry Bliss
                </span>
              </h1>

              <p className="text-xl md:text-2xl" style={{ color: '#736c64' }}>
                Delicious multivitamin gummies packed with 15 essential vitamins.
                100% plant-based. Naturally sweetened. Zero artificial ingredients.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Plant-Based</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Berry Blast Flavour</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Lab Tested</span>
                </div>
              </div>

              {/* Hero Pre-Order Form */}
              <Card className="p-6 border-2 shadow-xl" style={{ borderColor: '#61525a' }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1e1919' }}>
                  Free Pre-Order
                  <span className="text-base font-medium">No Payment Required</span>
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={heroEmail}
                    onChange={(e) => setHeroEmail(e.target.value)}
                    className="flex-1 h-12 text-base"
                  />
                  <Button
                    onClick={() => handlePreOrder(heroEmail, 'hero')}
                    disabled={isSubmitting}
                    className="h-12 px-8 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold"
                  >
                    {isSubmitting ? 'Reserving...' : 'Reserve Your Spot'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
                <p className="text-sm mt-3" style={{ color: '#736c64' }}>
                  Join 2,000+ early adopters. Be first to experience Frandy.
                </p>
              </Card>
            </div>

            <div className="relative lg:ml-8">
              <div className="relative z-10 animate-float">
                <img
                  src="https://customer-assets.emergentagent.com/job_009bc163-8528-462d-8de8-6d84f6b49e62/artifacts/4sqe5let_demo.png"
                  alt="Frandy Berry Blast Multivitamin Gummies"
                  className="w-full max-w-lg mx-auto drop-shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-red-200/30 to-purple-200/30 blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1e1919' }}>
              Why Choose Frandy?
            </h2>
            <p className="text-xl" style={{ color: '#736c64' }}>
              Premium quality meets delicious taste
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productFeatures.map((feature) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <Card key={feature.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7" style={{ color: '#61525a' }} />
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#1e1919' }}>
                      {feature.title}
                    </h3>
                    <p style={{ color: '#736c64' }}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Health Quiz Section */}
      <section className="py-20" style={{ backgroundColor: '#f7f5f2' }}>
        <HealthQuiz />
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1e1919' }}>
              How Pre-Order Works
            </h2>
            <p className="text-xl" style={{ color: '#736c64' }}>
              Three simple steps to wellness
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-pink-600 text-white text-2xl font-bold flex items-center justify-center mx-auto shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: '#1e1919' }}>
                    {step.title}
                  </h3>
                  <p className="text-lg" style={{ color: '#736c64' }}>
                    {step.description}
                  </p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-red-300 to-pink-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition Info */}
      <section id="nutrition" className="py-20" style={{ backgroundColor: '#f7f5f2' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1e1919' }}>
              Complete Nutrition in Every Bite
            </h2>
            <p className="text-xl" style={{ color: '#736c64' }}>
              15 essential vitamins and minerals
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {vitamins.map((vitamin, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold mb-2" style={{ color: '#1e1919' }}>
                    {vitamin.name}
                  </h4>
                  <p className="text-2xl font-semibold mb-2 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                    {vitamin.amount}
                  </p>
                  <p className="text-sm" style={{ color: '#736c64' }}>
                    {vitamin.benefit}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Pre-Order CTA Section */}
      <section id="preorder-section" className="py-20 relative overflow-hidden" style={{ backgroundColor: '#1e1919' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-purple-600/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Ready to Transform Your Wellness?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300">
              Pre-order now and be among the first to experience Frandy Berry Blast gummies.
              No payment required - just your email.
            </p>

            <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">
                  Secure Your Free Pre-Order
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-14 text-lg bg-white"
                  />
                  <Button
                    onClick={() => handlePreOrder(email, 'cta')}
                    disabled={isSubmitting}
                    className="h-14 px-10 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white text-lg font-semibold"
                  >
                    {isSubmitting ? 'Processing...' : 'Get Early Access'}
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span>No Payment Required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span>Exclusive Launch Offers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span>Limited Quantity</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1e1919' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-xl" style={{ color: '#736c64' }}>
              Everything you need to know about Frandy
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-2 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline" style={{ color: '#1e1919' }}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base pt-4" style={{ color: '#736c64' }}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: '#1e1919' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">FRANDY</h3>
              <p className="text-gray-400">
                Delicious multivitamin gummies for your daily wellness.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#nutrition" className="hover:text-white transition-colors">Nutrition</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Frandy. All rights reserved. Made with ❤️ for your wellness.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
