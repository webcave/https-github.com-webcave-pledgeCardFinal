// Dummy data for the application

// Dummy campaigns
export const dummyCampaigns = [
  {
    id: "1",
    title: "Help Build a School in Rural Uganda",
    short_description: "Support education for 500 children in need",
    story:
      "<p>Our goal is to build a new school that will serve 500 children in a rural community outside Kampala. The current facility is deteriorating and cannot accommodate the growing number of students.</p><p>With your support, we can construct a new building with 10 classrooms, proper sanitation facilities, and a small library. This project will dramatically improve educational outcomes for generations of children.</p>",
    category: "Education",
    target_amount: 50000,
    current_amount: 32500,
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    created_at: "2023-09-15T10:30:00Z",
    updated_at: "2023-09-15T10:30:00Z",
    user_id: "1",
    organizer_name: "Education First Uganda",
    organizer_bio:
      "A non-profit focused on improving educational infrastructure in rural Uganda",
    is_public: true,
    status: "active",
    backer_count: 125,
    media: [
      {
        id: "1",
        campaign_id: "1",
        file_path: "campaigns/1/main.jpg",
        file_type: "image",
        is_cover: true,
        display_order: 0,
        caption: "Current school building",
        created_at: "2023-09-15T10:35:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "Clean Water Initiative",
    short_description: "Bringing clean water to communities in Northern Uganda",
    story:
      "<p>Access to clean water remains a critical challenge for many communities in Northern Uganda. This campaign aims to install 15 water wells across the region, providing reliable access to clean water for over 5,000 people.</p><p>Each well costs approximately $1,500 to drill and install. Your contribution will help reduce waterborne diseases and improve overall health outcomes in these communities.</p>",
    category: "Environment",
    target_amount: 25000,
    current_amount: 25000,
    end_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    created_at: "2023-07-20T14:15:00Z",
    updated_at: "2023-07-20T14:15:00Z",
    user_id: "2",
    organizer_name: "Water for All Uganda",
    organizer_bio:
      "Working to provide clean water access across Uganda since 2010",
    is_public: true,
    status: "completed",
    backer_count: 210,
    media: [
      {
        id: "2",
        campaign_id: "2",
        file_path: "campaigns/2/main.jpg",
        file_type: "image",
        is_cover: true,
        display_order: 0,
        caption: "Community water source",
        created_at: "2023-07-20T14:20:00Z",
      },
    ],
  },
  {
    id: "3",
    title: "Medical Supplies for Rural Clinic",
    short_description: "Help us stock essential medicines and equipment",
    story:
      "<p>Our rural health clinic serves over 10,000 people but lacks basic medical supplies and equipment. We need your help to purchase essential items like antibiotics, pain relievers, bandages, and diagnostic tools.</p><p>With proper supplies, we can provide better care for common illnesses, maternal health, and emergency situations. Your support will directly impact the health outcomes of thousands of people in our community.</p>",
    category: "Health",
    target_amount: 15000,
    current_amount: 3200,
    end_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days from now
    created_at: "2023-10-05T09:45:00Z",
    updated_at: "2023-10-05T09:45:00Z",
    user_id: "3",
    organizer_name: "Rural Health Initiative",
    organizer_bio:
      "A community-based organization focused on improving healthcare access in rural areas",
    is_public: true,
    status: "active",
    backer_count: 42,
    media: [
      {
        id: "3",
        campaign_id: "3",
        file_path: "campaigns/3/main.jpg",
        file_type: "image",
        is_cover: true,
        display_order: 0,
        caption: "Our clinic building",
        created_at: "2023-10-05T09:50:00Z",
      },
    ],
  },
  {
    id: "4",
    title: "Community Garden Project",
    short_description: "Creating sustainable food sources for local families",
    story:
      "<p>We're establishing a community garden that will provide fresh produce for 50 families in our neighborhood. The garden will be located on donated land and will grow a variety of vegetables and fruits suited to our climate.</p><p>Your contribution will help us purchase seeds, tools, irrigation equipment, and fencing. We'll also provide training on sustainable gardening practices to ensure long-term success.</p>",
    category: "Food",
    target_amount: 8000,
    current_amount: 1200,
    end_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now
    created_at: "2023-10-12T16:20:00Z",
    updated_at: "2023-10-12T16:20:00Z",
    user_id: "1",
    organizer_name: "Green Thumbs Collective",
    organizer_bio: "A group of local gardeners and food security advocates",
    is_public: true,
    status: "draft",
    backer_count: 15,
    media: [
      {
        id: "4",
        campaign_id: "4",
        file_path: "campaigns/4/main.jpg",
        file_type: "image",
        is_cover: true,
        display_order: 0,
        caption: "Proposed garden site",
        created_at: "2023-10-12T16:25:00Z",
      },
    ],
  },
  {
    id: "5",
    title: "Renewable Energy for Remote Village",
    short_description:
      "Installing solar panels to provide electricity to 50 homes",
    story:
      "<p>Our project aims to bring electricity to a remote village of 50 homes through solar power. Currently, residents rely on kerosene lamps and generators, which are expensive, polluting, and hazardous.</p><p>With your support, we'll install solar panels on each home, providing clean, renewable energy for lighting, phone charging, and small appliances. This will improve quality of life, enable evening study for children, and reduce respiratory health issues.</p>",
    category: "Environment",
    target_amount: 35000,
    current_amount: 12800,
    end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
    created_at: "2023-11-03T08:15:00Z",
    updated_at: "2023-11-03T08:15:00Z",
    user_id: "2",
    organizer_name: "Solar Solutions Uganda",
    organizer_bio:
      "Bringing renewable energy solutions to underserved communities",
    is_public: true,
    status: "active",
    backer_count: 78,
    media: [
      {
        id: "5",
        campaign_id: "5",
        file_path: "campaigns/5/main.jpg",
        file_type: "image",
        is_cover: true,
        display_order: 0,
        caption: "Solar panel installation",
        created_at: "2023-11-03T08:20:00Z",
      },
    ],
  },
  {
    id: "6",
    title: "Women's Entrepreneurship Program",
    short_description:
      "Providing business training and microloans to women entrepreneurs",
    story:
      "<p>Our program supports women entrepreneurs in starting and growing small businesses. We provide comprehensive training in business planning, financial management, and marketing, followed by microloans to help launch or expand their ventures.</p><p>Your contribution will fund training workshops for 100 women and provide startup capital ranging from $200-$500 per business. This investment creates sustainable livelihoods and strengthens local economies.</p>",
    category: "Business",
    target_amount: 20000,
    current_amount: 20000,
    end_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    created_at: "2023-08-17T11:45:00Z",
    updated_at: "2023-08-17T11:45:00Z",
    user_id: "3",
    organizer_name: "Women's Economic Empowerment Initiative",
    organizer_bio:
      "Dedicated to creating economic opportunities for women across Uganda",
    is_public: true,
    status: "completed",
    backer_count: 143,
    media: [
      {
        id: "6",
        campaign_id: "6",
        file_path: "campaigns/6/main.jpg",
        file_type: "image",
        is_cover: true,
        display_order: 0,
        caption: "Business training workshop",
        created_at: "2023-08-17T11:50:00Z",
      },
    ],
  },
  {
    id: "7",
    title: "Emergency Food Relief",
    short_description:
      "Distributing food packages to families affected by recent floods",
    story:
      "<p>Recent flooding has displaced hundreds of families in the eastern region, destroying homes and crops. These families urgently need food assistance as they recover and rebuild.</p><p>We're organizing the distribution of food packages containing rice, beans, cooking oil, and other essentials. Each package costs $50 and will support a family of five for approximately two weeks.</p>",
    category: "Disaster Relief",
    target_amount: 12000,
    current_amount: 11500,
    end_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
    created_at: "2023-12-01T09:30:00Z",
    updated_at: "2023-12-01T09:30:00Z",
    user_id: "1",
    organizer_name: "Emergency Response Network",
    organizer_bio:
      "A coalition of local organizations providing rapid response to disasters",
    is_public: true,
    status: "active",
    backer_count: 230,
    media: [
      {
        id: "7",
        campaign_id: "7",
        file_path: "campaigns/7/main.jpg",
        file_type: "image",
        is_cover: true,
        display_order: 0,
        caption: "Food package distribution",
        created_at: "2023-12-01T09:35:00Z",
      },
    ],
  },
  {
    id: "8",
    title: "Mobile Library for Rural Schools",
    short_description:
      "Creating a mobile library to serve 10 schools in remote areas",
    story:
      "<p>Many rural schools lack access to books and reading materials, limiting students' literacy development and learning opportunities. Our mobile library project will bring books to 10 schools in remote areas, serving approximately 2,000 students.</p><p>We'll purchase a vehicle, convert it into a mobile library with shelving and seating, and stock it with age-appropriate books in both English and local languages. The library will visit each school on a rotating schedule.</p>",
    category: "Education",
    target_amount: 18000,
    current_amount: 2300,
    end_date: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000).toISOString(), // 75 days from now
    created_at: "2023-12-10T14:20:00Z",
    updated_at: "2023-12-10T14:20:00Z",
    user_id: "2",
    organizer_name: "Literacy Matters Foundation",
    organizer_bio:
      "Working to improve literacy rates and educational outcomes in Uganda",
    is_public: true,
    status: "draft",
    backer_count: 28,
    media: [
      {
        id: "8",
        campaign_id: "8",
        file_path: "campaigns/8/main.jpg",
        file_type: "image",
        is_cover: true,
        display_order: 0,
        caption: "Similar mobile library project",
        created_at: "2023-12-10T14:25:00Z",
      },
    ],
  },
  {
    id: "9",
    title: "Youth Sports Program",
    short_description:
      "Providing sports equipment and coaching for underprivileged youth",
    story:
      "<p>Our youth sports program aims to provide positive recreational activities for 200 children from disadvantaged backgrounds. Through organized sports, we help young people develop teamwork, discipline, and leadership skills while promoting physical health.</p><p>Your contribution will help us purchase equipment for soccer, basketball, and volleyball, hire qualified coaches, and secure safe playing facilities. We'll also provide uniforms and organize local tournaments.</p>",
    category: "Sports",
    target_amount: 10000,
    current_amount: 4200,
    end_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now
    created_at: "2023-11-15T16:45:00Z",
    updated_at: "2023-11-15T16:45:00Z",
    user_id: "3",
    organizer_name: "Youth Development Sports League",
    organizer_bio:
      "Using sports as a vehicle for youth development and community building",
    is_public: true,
    status: "active",
    backer_count: 67,
    media: [
      {
        id: "9",
        campaign_id: "9",
        file_path: "campaigns/9/main.jpg",
        file_type: "image",
        is_cover: true,
        display_order: 0,
        caption: "Youth soccer practice",
        created_at: "2023-11-15T16:50:00Z",
      },
    ],
  },
  {
    id: "10",
    title: "Mental Health Support Center",
    short_description:
      "Establishing a community center for mental health services and support",
    story:
      "<p>Mental health services are severely lacking in our community, leaving many people without access to the support they need. We're establishing a community center that will provide counseling, support groups, and educational workshops on mental health and wellbeing.</p><p>Your contribution will help us secure and renovate a space, hire qualified mental health professionals, and develop culturally appropriate resources and programs. The center will serve people of all ages and backgrounds.</p>",
    category: "Health",
    target_amount: 45000,
    current_amount: 5800,
    end_date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(), // 120 days from now
    created_at: "2023-12-05T10:15:00Z",
    updated_at: "2023-12-05T10:15:00Z",
    user_id: "1",
    organizer_name: "Mental Health Matters Uganda",
    organizer_bio:
      "Dedicated to improving mental health awareness, access, and support",
    is_public: true,
    status: "draft",
    backer_count: 52,
    media: [
      {
        id: "10",
        campaign_id: "10",
        file_path: "campaigns/10/main.jpg",
        file_type: "image",
        is_cover: true,
        display_order: 0,
        caption: "Community support group",
        created_at: "2023-12-05T10:20:00Z",
      },
    ],
  },
];

// Dummy users
export const dummyUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    created_at: "2023-01-15T08:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    created_at: "2023-02-20T14:45:00Z",
  },
  {
    id: "3",
    name: "David Chen",
    email: "david.chen@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    created_at: "2023-03-10T11:15:00Z",
  },
];

// Dummy donations
export const dummyDonations = [
  {
    id: "1",
    campaign_id: "1",
    user_id: "2",
    amount: 100,
    status: "completed",
    message: "Happy to support this important cause!",
    is_anonymous: false,
    created_at: "2023-09-20T09:15:00Z",
  },
  {
    id: "2",
    campaign_id: "1",
    user_id: "3",
    amount: 250,
    status: "completed",
    message: "Education is the key to a better future.",
    is_anonymous: false,
    created_at: "2023-09-25T14:30:00Z",
  },
  {
    id: "3",
    campaign_id: "2",
    user_id: "1",
    amount: 75,
    status: "completed",
    message: "Clean water is a basic human right.",
    is_anonymous: false,
    created_at: "2023-07-25T11:45:00Z",
  },
  {
    id: "4",
    campaign_id: "3",
    user_id: "2",
    amount: 150,
    status: "completed",
    message: "Hope this helps provide essential medical supplies.",
    is_anonymous: true,
    created_at: "2023-10-10T16:20:00Z",
  },
  {
    id: "5",
    campaign_id: "5",
    user_id: "3",
    amount: 200,
    status: "completed",
    message: "Renewable energy is the future!",
    is_anonymous: false,
    created_at: "2023-11-15T10:10:00Z",
  },
];

// Dummy pledges
export const dummyPledges = [
  {
    id: "1",
    campaign_id: "1",
    user_id: "3",
    amount: 150,
    status: "pending",
    message: "Will donate next month when I get paid.",
    pledge_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    created_at: "2023-09-18T13:20:00Z",
  },
  {
    id: "2",
    campaign_id: "3",
    user_id: "1",
    amount: 100,
    status: "pending",
    message: "Happy to help with medical supplies.",
    pledge_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
    created_at: "2023-10-12T09:45:00Z",
  },
  {
    id: "3",
    campaign_id: "5",
    user_id: "2",
    amount: 300,
    status: "pending",
    message: "Solar power is important for sustainable development.",
    pledge_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days from now
    created_at: "2023-11-10T15:30:00Z",
  },
  {
    id: "4",
    campaign_id: "7",
    user_id: "3",
    amount: 50,
    status: "pending",
    message: "Will contribute to emergency relief soon.",
    pledge_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    created_at: "2023-12-05T11:15:00Z",
  },
  {
    id: "5",
    campaign_id: "9",
    user_id: "1",
    amount: 75,
    status: "pending",
    message: "Sports programs are great for youth development.",
    pledge_date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days from now
    created_at: "2023-11-20T14:40:00Z",
  },
];

// Helper functions to simulate API calls
export const getImageUrl = (path: string) => {
  // Map file paths to actual image URLs
  const imageMap: Record<string, string> = {
    "campaigns/1/main.jpg":
      "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=800&q=80",
    "campaigns/2/main.jpg":
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&q=80",
    "campaigns/3/main.jpg":
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80",
    "campaigns/4/main.jpg":
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
    "campaigns/5/main.jpg":
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    "campaigns/6/main.jpg":
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
    "campaigns/7/main.jpg":
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    "campaigns/8/main.jpg":
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    "campaigns/9/main.jpg":
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&q=80",
    "campaigns/10/main.jpg":
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  };

  return (
    imageMap[path] ||
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
  );
};
