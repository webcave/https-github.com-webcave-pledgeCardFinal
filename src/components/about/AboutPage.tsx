import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "../layout/Navbar";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary/90 to-primary py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            About Our Mission in Uganda
          </h1>
          <p className="text-lg text-white/90 mt-4 max-w-2xl">
            Empowering communities across Uganda through flexible fundraising
            solutions that make a real difference.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, our platform was born from a simple observation:
              many Ugandans wanted to support important causes but couldn't
              always make immediate donations due to financial constraints.
            </p>
            <p className="text-gray-600 mb-4">
              We recognized that traditional fundraising platforms weren't
              designed with the unique economic realities of Uganda in mind.
              That's why we created a solution that allows people to pledge
              future support, making giving more accessible to everyone.
            </p>
            <p className="text-gray-600">
              Today, we're proud to have facilitated over 5,000 campaigns across
              Uganda, helping communities build schools, fund medical
              treatments, support local businesses, and respond to emergencies.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1580286923998-09fb88152cc5?w=800&q=80"
              alt="Ugandan community"
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="w-full py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Impact Across Uganda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold">01</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Education</h3>
              <p className="text-gray-600">
                We've helped fund over 200 educational projects, from building
                classrooms in rural areas to providing scholarships for talented
                students across Uganda.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold">02</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Healthcare</h3>
              <p className="text-gray-600">
                Our platform has supported more than 350 healthcare initiatives,
                including medical treatments, community health centers, and
                preventative care programs throughout Uganda.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold">03</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">
                From clean water projects to sustainable agriculture
                initiatives, we've helped Ugandan communities build resilience
                and improve quality of life through over 500 local projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Team
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Our diverse team combines local Ugandan expertise with international
            experience in technology, finance, and community development.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                alt="John Mukasa"
                className="h-32 w-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">John Mukasa</h3>
              <p className="text-gray-500">Co-Founder & CEO</p>
              <p className="text-gray-600 mt-2 px-4">
                Born and raised in Kampala, John brings 15 years of experience
                in community development across Uganda.
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                alt="Sarah Namuli"
                className="h-32 w-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Sarah Namuli</h3>
              <p className="text-gray-500">Co-Founder & COO</p>
              <p className="text-gray-600 mt-2 px-4">
                With a background in finance and nonprofit management, Sarah
                oversees our operations and partnerships throughout Uganda.
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=David"
                alt="David Ochen"
                className="h-32 w-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">David Ochen</h3>
              <p className="text-gray-500">CTO</p>
              <p className="text-gray-600 mt-2 px-4">
                A tech innovator from Gulu, David leads our engineering team and
                ensures our platform meets the unique needs of Ugandan users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Join Our Mission in Uganda
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Whether you want to create a campaign or support an existing one,
            you can make a real difference in communities across Uganda.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link to="/campaigns">Browse Campaigns</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-white border-white hover:bg-white/10"
            >
              <Link to="/campaigns/create">Start a Campaign</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
