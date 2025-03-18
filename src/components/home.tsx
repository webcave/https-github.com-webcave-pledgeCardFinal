import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Heart, Users, Sparkles } from "lucide-react";
import PageLayout from "./layout/PageLayout";
import CampaignGrid from "./campaigns/CampaignGrid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary/90 to-primary py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Fund the causes you care about, when you can
            </h1>
            <p className="text-lg text-white/90">
              Support campaigns with immediate donations or pledge future
              contributions. Make a difference today or commit to help tomorrow.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                asChild
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link to="/campaigns">Explore Campaigns</Link>
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
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
              alt="People working together"
              className="rounded-lg shadow-xl w-full max-w-md mx-auto object-cover h-[350px]"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-white py-12 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary">
                $12M+
              </p>
              <p className="text-sm text-gray-600">Funds Raised</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary">
                5,000+
              </p>
              <p className="text-sm text-gray-600">Campaigns Funded</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary">
                120K+
              </p>
              <p className="text-sm text-gray-600">Donors & Pledgers</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary">98%</p>
              <p className="text-sm text-gray-600">Pledge Fulfillment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns Section */}
      <section className="w-full py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Featured Campaigns
              </h2>
              <p className="text-gray-600 mt-2">
                Discover campaigns making an impact right now
              </p>
            </div>
            <Button variant="ghost" asChild className="mt-4 md:mt-0">
              <Link to="/campaigns" className="flex items-center">
                View all campaigns <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="trending">
            <TabsList className="mb-6">
              <TabsTrigger value="trending">
                <TrendingUp className="h-4 w-4 mr-2" /> Trending
              </TabsTrigger>
              <TabsTrigger value="newest">
                <Sparkles className="h-4 w-4 mr-2" /> Newest
              </TabsTrigger>
              <TabsTrigger value="nearGoal">
                <Heart className="h-4 w-4 mr-2" /> Near Goal
              </TabsTrigger>
              <TabsTrigger value="mostPledges">
                <Users className="h-4 w-4 mr-2" /> Most Pledges
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending">
              <CampaignGrid />
            </TabsContent>
            <TabsContent value="newest">
              <CampaignGrid />
            </TabsContent>
            <TabsContent value="nearGoal">
              <CampaignGrid />
            </TabsContent>
            <TabsContent value="mostPledges">
              <CampaignGrid />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-white py-16 px-4 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Our platform makes it easy to support causes you care about, with
              flexible options for giving
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Find a Campaign</h3>
              <p className="text-gray-600">
                Browse through campaigns or search for causes that resonate with
                your values and interests.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Choose Your Support
              </h3>
              <p className="text-gray-600">
                Decide whether to donate immediately or pledge a future
                contribution based on your financial situation.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Make an Impact</h3>
              <p className="text-gray-600">
                Track the progress of campaigns you've supported and see the
                real-world difference your contribution makes.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link to="/campaigns/create">Start Your Campaign</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Success Stories
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Hear from campaign creators and supporters about their experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
                  alt="Maria"
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Maria Rodriguez</h4>
                  <p className="text-sm text-gray-500">Campaign Creator</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Thanks to the pledge feature, my campaign reached its goal even
                when immediate donations weren't enough. The platform made it
                easy to keep supporters engaged throughout the journey."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=David"
                  alt="David"
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">David Chen</h4>
                  <p className="text-sm text-gray-500">Regular Donor</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I love being able to pledge support for campaigns when I can't
                donate immediately. It helps me budget my giving while still
                supporting causes I care about right when they need it."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha"
                  alt="Aisha"
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Aisha Johnson</h4>
                  <p className="text-sm text-gray-500">Nonprofit Director</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The platform has transformed how we fundraise. The combination
                of immediate donations and future pledges gives us more
                predictable funding and helps us plan our projects better."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to make a difference?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Whether you want to create a campaign or support an existing one,
            now is the perfect time to get involved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link to="/campaigns">Find a Campaign</Link>
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
    </PageLayout>
  );
};

export default Home;
