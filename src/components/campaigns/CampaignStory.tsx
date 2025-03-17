import React from "react";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

interface CampaignStoryProps {
  content?: string;
  media?: Array<{
    type: "image" | "video";
    url: string;
    caption?: string;
  }>;
}

const CampaignStory = ({
  content = "<p>This campaign was started to help fund a new community garden in our neighborhood. The garden will provide fresh produce for local families and serve as an educational space for children to learn about sustainable agriculture.</p><p>We need your support to purchase gardening tools, seeds, soil, and irrigation equipment. We also plan to build accessible pathways and seating areas so everyone in the community can enjoy the space.</p><p>With your help, we can transform an empty lot into a thriving green space that brings people together and improves our local environment. Every donation, no matter how small, brings us closer to our goal!</p><p>Thank you for your support and for being part of our community garden journey!</p>",
  media = [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
      caption: "The empty lot we plan to transform into a community garden",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
      caption: "Example of what our garden could look like when completed",
    },
  ],
}: CampaignStoryProps) => {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Campaign Story</h2>
      <Separator className="mb-6" />

      {/* Campaign content */}
      <div
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Media gallery */}
      {media && media.length > 0 && (
        <div className="space-y-6 mt-8">
          <h3 className="text-xl font-semibold">Campaign Gallery</h3>
          <div className="grid grid-cols-1 gap-6">
            {media.map((item, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden border border-gray-200"
              >
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={item.caption || `Campaign image ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    className="w-full h-auto"
                    poster="https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&q=80"
                  />
                )}
                {item.caption && (
                  <div className="p-3 bg-gray-50 text-sm text-gray-600">
                    {item.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default CampaignStory;
