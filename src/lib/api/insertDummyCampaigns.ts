import { supabase } from "@/lib/supabase";

// Function to insert dummy campaigns into the database
export async function insertDummyCampaigns() {
  try {
    // Check if campaigns already exist to avoid duplicates
    const { data: existingCampaigns, error: checkError } = await supabase
      .from("campaigns")
      .select("count")
      .single();

    if (checkError) {
      console.error("Error checking existing campaigns:", checkError);
      return { error: checkError };
    }

    // If there are already campaigns, don't insert more
    if (existingCampaigns && existingCampaigns.count > 0) {
      console.log(
        `${existingCampaigns.count} campaigns already exist, skipping insertion`,
      );
      return { data: { message: "Campaigns already exist" }, error: null };
    }

    // Create dummy campaign data
    const dummyCampaigns = [
      {
        title: "Clean Water for Rural Communities",
        short_description:
          "Help us bring clean drinking water to 5 villages in Eastern Uganda",
        story:
          "<p>Access to clean water remains a critical challenge for many rural communities in Eastern Uganda. This campaign aims to install water purification systems in 5 villages, providing reliable access to clean drinking water for over 2,000 people.</p><p>Each water purification system costs approximately $2,000 to purchase and install. Your contribution will help reduce waterborne diseases and improve overall health outcomes in these communities.</p>",
        category: "Environment",
        target_amount: 10000,
        current_amount: 3500,
        end_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        organizer_name: "Water Access Initiative",
        organizer_bio:
          "A non-profit organization focused on providing clean water solutions to rural communities in Uganda",
        is_public: true,
        status: "active",
        backer_count: 42,
        user_id: "1",
        // Removed cover_image field as it doesn't exist in the database schema
      },
      {
        title: "Mobile Health Clinic for Remote Areas",
        short_description:
          "Support our initiative to bring healthcare to underserved communities",
        story:
          "<p>Many remote communities in Uganda lack access to basic healthcare services. Our mobile health clinic will travel to these areas, providing essential medical care, vaccinations, and health education.</p><p>The mobile clinic will be equipped with diagnostic equipment, essential medicines, and staffed by healthcare professionals. It will serve approximately 10,000 people across 15 remote villages.</p>",
        category: "Health",
        target_amount: 25000,
        current_amount: 12750,
        end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        organizer_name: "Healthcare Without Borders",
        organizer_bio:
          "A team of healthcare professionals dedicated to improving medical access in rural Uganda",
        is_public: true,
        status: "active",
        backer_count: 85,
        user_id: "2",
        // Removed cover_image field as it doesn't exist in the database schema
      },
      {
        title: "Scholarship Fund for Girls's Education",
        short_description:
          "Help send 50 girls to secondary school in Northern Uganda",
        story:
          "<p>Education is a powerful tool for breaking the cycle of poverty, especially for girls in rural communities. Our scholarship program aims to support 50 girls from low-income families in Northern Uganda to complete their secondary education.</p><p>Each scholarship covers school fees, uniforms, books, and supplies for one academic year. We also provide mentoring and academic support to ensure the students succeed.</p>",
        category: "Education",
        target_amount: 15000,
        current_amount: 6800,
        end_date: new Date(
          Date.now() + 120 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        organizer_name: "Education Empowerment Trust",
        organizer_bio:
          "Working to increase educational opportunities for girls in underserved communities",
        is_public: true,
        status: "active",
        backer_count: 73,
        user_id: "3",
        // Removed cover_image field as it doesn't exist in the database schema
      },
    ];

    // Insert the dummy campaigns
    const { data, error } = await supabase
      .from("campaigns")
      .insert(dummyCampaigns)
      .select();

    if (error) {
      console.error("Error inserting dummy campaigns:", error);
      return { error };
    }

    console.log("Successfully inserted dummy campaigns:", data);
    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error inserting dummy campaigns:", error);
    return { error };
  }
}
