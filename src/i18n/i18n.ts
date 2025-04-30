import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "where to go": "Where to go?",
      all: "All",
      tourist: "Tourist",
      hotel: "Hotel",
      restaurant: "Restaurant",
      settings: "Settings",
      profile: "Profile",
      home: "Home",
      logout: "Logout",
      login: "Login",
      destination: "Destination",
      post: "Post",
      schedule: "Schedule",
      planning: "Planning",
      language: "Language",
      contact: "Contact",
      "favorite destination": "Favorite destination",
      "text favorite destination":
        "Choose a popular travel destination below to explore our exclusive trips at very reasonable prices.",
      "news feed": "News feed",
      "Create post": "Create post",
      "No posts available": "No posts available",
      "select destination": "Select destination",
      Typing: "Typing",
      "What's on your mind?": "What's on your mind?",
      Content: "Content",
      Image: "Image",
      "Upload image": "Upload image",
      "Please choose destination": "Please choose destination",
      "just now": "just now",
      "minutes ago": "minutes ago",
      "hours ago": "hours ago",
      "days ago": "days ago",
      Like: "Like",
      Comment: "Comment",
      search: "Search",
      "travel destination": "Travel destination",
      "food destination": "Food destination",
      "book now": "Book now",
      "Admin Management": "Admin Management",
      "Manage posts and destinations on the platform":
        "Manage posts and destinations on the platform",
      "Post Management": "Post Management",
      "Destination Management": "Destination Management",
      "Manage and moderate posts on the platform":
        "Manage and moderate posts on the platform",
      Total: "Total",
      items: "items",
      "No images": "No images",
      Stats: "Stats",
      Author: "Author",
      Images: "Images",
      "Created At": "Created At",
      "Updated By": "Updated By",
      "Created By": "Created By",
      "Add Destination": "Add Destination",
      "Edit Destination": "Edit Destination",
      "Please input the name!": "Please input the name!",
      "Please input the description!": "Please input the description!",
      "Please input the image URL!": "Please input the image URL!",
      "Image URL": "Image URL",
      "Operation failed": "Operation failed",
      "Destination created successfully": "Destination created successfully",
      "Destination updated successfully": "Destination updated successfully",
      "Destination deleted successfully": "Destination deleted successfully",
      "Failed to delete destination": "Failed to delete destination",
      "Failed to fetch destinations": "Failed to fetch destinations",
      "Are you sure you want to delete this destination?":
        "Are you sure you want to delete this destination?",
      Yes: "Yes",
      No: "No",
      "Delete Post": "Delete Post",
      "This action cannot be undone.": "This action cannot be undone.",
      Comments: "Comments",
      Reactions: "Reactions",
      Reaction: "Reaction",
      update: "Update",
      delete: "Delete",
      cancel: "Cancel",
      send: "Send",
      "write comment": "Enter your comment...",
      "Are you sure you want to delete this post?":
        "Are you sure you want to delete this post?",
      "see more": "See more",
      "show less": "Show less",
      "search.placeholder.1": "Where to go, what to do, interests...",
      "search.placeholder.2": "Where would you like to travel?",
      "search.placeholder.3": "Find great restaurants...",
      "search.placeholder.4": "Luxury hotels...",
      "search.placeholder.5": "Famous tourist attractions...",
      "search.placeholder.6": "Explore local cuisine...",
      "Oops!": "Oops!",
      "Please enter a destination to start your journey.":
        "Please enter a destination to start your journey.",
      "No destinations found": "No destinations found",
      "Try another search term or explore our categories.":
        "Try another search term or explore our categories.",
      "Invalid Search": "Invalid Search",
      "Please provide a travel-related search query.":
        "Please provide a travel-related search query.",
      "Something went wrong": "Something went wrong",
      "We couldn't complete your search. Please try again.":
        "We couldn't complete your search. Please try again.",
      "planner.activities.createAllTooltip": "Create all activities",
      "planner.day": "Day",
      "planner.startTime": "Start Time",
      "planner.endTime": "End Time",
      "planner.additionalInfo": "Additional Information",
      "planner.activities.loading": "Loading...",
      "planner.activities.createAll": "Create All",
      "Search results:": "Search results",
      "planner.activities.created": "Activities created",
      "planner.activities.createdDesc":
        "Activities have been added to your calendar",
      "planner.activities.createFailed": "Failed to create activities",
      "planner.activities.createError": "Error creating activities",
      searching: "Searching...",
      "Our AI-Powered Travel Tools": "Our AI-Powered Travel Tools",
      "Discover how our intelligent travel assistant can help you plan the perfect Vietnamese adventure":
        "Discover how our intelligent travel assistant can help you plan the perfect Vietnamese adventure",
      "AI Travel Assistant": "AI Travel Assistant",
      "Chat with our AI to get personalized recommendations, answer questions about Vietnamese culture, and solve any travel concerns.":
        "Chat with our AI to get personalized recommendations, answer questions about Vietnamese culture, and solve any travel concerns.",
      "Chat Now": "Chat Now",
      "AI Itinerary Planner": "AI Itinerary Planner",
      "Input your preferences, travel dates, and interests to receive a custom Vietnam itinerary optimized for your unique travel style.":
        "Input your preferences, travel dates, and interests to receive a custom Vietnam itinerary optimized for your unique travel style.",
      "Plan Itinerary": "Plan Itinerary",
      "Visual Discovery": "Visual Discovery",
      "Upload an image or describe a place, and our AI will identify Vietnamese destinations that match your vision.":
        "Upload an image or describe a place, and our AI will identify Vietnamese destinations that match your vision.",
      "Try Visual Search": "Try Visual Search",
      "Visual Search": "Visual Search",
      "Upload an image to find similar destinations in Vietnam":
        "Upload an image to find similar destinations in Vietnam",
      "Select Image": "Select Image",
      "Please select an image first": "Please select an image first",
      "Image uploaded successfully": "Image uploaded successfully",
      "Failed to upload image": "Failed to upload image",
      Search: "Search",
      Close: "Close",
      "Experience Our AI in Action": "Experience Our AI in Action",
      "Our intelligent travel assistant understands your preferences and provides personalized recommendations for your Vietnamese adventure.":
        "Our intelligent travel assistant understands your preferences and provides personalized recommendations for your Vietnamese adventure.",
      "Get instant answers to your travel questions":
        "Get instant answers to your travel questions",
      "Receive personalized itinerary suggestions":
        "Receive personalized itinerary suggestions",
      "Discover hidden gems based on your interests":
        "Discover hidden gems based on your interests",
      "Learn about local customs and cultural insights":
        "Learn about local customs and cultural insights",
      "Create Your Itinerary": "Create Your Itinerary",
      "How TriVenture Works": "How TriVenture Works",
      "Tell Us Your Preferences": "Tell Us Your Preferences",
      "Share your travel dates, interests, budget, and travel style.":
        "Share your travel dates, interests, budget, and travel style.",
      "Our AI Analyzes": "Our AI Analyzes",
      "Our AI processes your preferences to find the perfect Vietnamese experiences.":
        "Our AI processes your preferences to find the perfect Vietnamese experiences.",
      "Receive Recommendations": "Receive Recommendations",
      "Get personalized itineraries, accommodations, and attraction suggestions.":
        "Get personalized itineraries, accommodations, and attraction suggestions.",
      "Travel with Confidence": "Travel with Confidence",
      "Enjoy your AI-optimized Vietnamese adventure with ongoing support.":
        "Enjoy your AI-optimized Vietnamese adventure with ongoing support.",
      "Ready to Discover Vietnam?": "Ready to Discover Vietnam?",
      "Let our AI-powered platform guide you through the beauty, culture, and wonders of Vietnam.":
        "Let our AI-powered platform guide you through the beauty, culture, and wonders of Vietnam.",
      "Start Planning": "Start Planning",
      "Chat with AI Assistant": "Chat with AI Assistant",
      "Plan Your Trip": "Plan Your Trip",
      "Explore Our AI Tools": "Explore Our AI Tools",
      "Select Language": "Select Language",
      Menu: "Menu",
      "AI Page": "AI Page",
      Save: "Save",
      "Update Post": "Update Post",
      "Unknown time": "Unknown time",
      "Welcome to TriVenture": "Welcome to TriVenture",
      "Discover Vietnam like never before with our AI-powered travel intelligence platform":
        "Discover Vietnam like never before with our AI-powered travel intelligence platform",
      "Your Photo": "Your Photo",
      "Match Score": "Match Score",
      "Vietnam Travel Calendar": "Vietnam Travel Calendar",
      "View Guide": "View Guide",
      "Refresh Calendar": "Refresh Calendar",
      "Quick Guide": "Quick Guide",
      "View More": "View More",
      "Click on a date to create new event":
        "Click on a date to create new event",
      "Drag and drop to change time": "Drag and drop to change time",
      "Click on event to edit": "Click on event to edit",
      "Use colors to categorize activities":
        "Use colors to categorize activities",
      "Activity Types": "Activity Types",
      "Upcoming Events": "Upcoming Events",
      "Hide Weekends": "Hide Weekends",
      "Show Weekends": "Show Weekends",
      "No events yet. Create your first event!":
        "No events yet. Create your first event!",
      "Update Event": "Update Event",
      "Create New Event": "Create New Event",
      Title: "Title",
      "Activity Type": "Activity Type",
      Location: "Location",
      Notes: "Notes",
      "Save Event": "Save Event",
      "Delete Event": "Delete Event",
      Cancel: "Cancel",
      "How to Use the Travel Calendar": "How to Use the Travel Calendar",
      "This travel calendar helps you plan your Vietnam trip easily and efficiently.":
        "This travel calendar helps you plan your Vietnam trip easily and efficiently.",
      "Main Features": "Main Features",
      "View Calendar": "View Calendar",
      "Switch between day, week and month views":
        "Switch between day, week and month views",
      "Create Event": "Create Event",
      "Edit Event": "Edit Event",
      "Drag and drop to change time, or click event to edit details":
        "Drag and drop to change time, or click event to edit details",
      Categorize: "Categorize",
      "Travel Planning Tips": "Travel Planning Tips",
      "Start with city's main attractions":
        "Start with city's main attractions",
      "Make time for local cuisine": "Make time for local cuisine",
      "Consider travel time between locations":
        "Consider travel time between locations",
      "Mix cultural and nature activities":
        "Mix cultural and nature activities",
      "This calendar is designed to help you make the most of your Vietnam trip!":
        "This calendar is designed to help you make the most of your Vietnam trip!",
      "Example: Visit Hoan Kiem Lake, Eat at Bat Dan Pho...":
        "Example: Visit Hoan Kiem Lake, Eat at Bat Dan Pho...",
      "Please enter a title!": "Please enter a title!",
      "Please select an activity type!": "Please select an activity type!",
      "Add notes about this activity...": "Add notes about this activity...",
      Sightseeing: "Sightseeing",
      Food: "Food",
      Nature: "Nature",
      Culture: "Culture",
      Transportation: "Transportation",
      Accommodation: "Accommodation",
      Other: "Other",
      "Updated successfully": "Updated successfully",
      "Event has been updated successfully.":
        "Event has been updated successfully.",
      "Update failed": "Update failed",
      "Event was not updated. Please try again.":
        "Event was not updated. Please try again.",
      Error: "Error",
      "An error occurred while updating the event. Please try again.":
        "An error occurred while updating the event. Please try again.",
      Updated: "Updated",
      "Events have been updated": "Events have been updated",
      "Update error": "Update error",
      "Could not update events": "Could not update events",
      "Event deleted": "Event deleted",
      "Event has been deleted successfully.":
        "Event has been deleted successfully.",
      "Delete error": "Delete error",
      "Calendar API not available.": "Calendar API not available.",
      "Event created": "Event created",
      "New event has been created successfully.":
        "New event has been created successfully.",
      "Could not create event. Please try again.":
        "Could not create event. Please try again.",
      "Could not update event. Please try again.":
        "Could not update event. Please try again.",
      "more events": "{{count}} more",
      reactions: "reactions",
      comments: "comments",
      "post.AI Travel Assistant": "AI Travel Assistant",
      "post.Let AI help plan your perfect trip!":
        "Let AI help plan your perfect trip!",
      "post.Start Planning": "Start Planning",
      "post.Quick Actions": "Quick Actions",
      "post.Find Destinations": "Find Destinations",
      "post.Popular Routes": "Popular Routes",
      "post.Trending Topics": "Trending Topics",
      "post.Suggested Destinations": "Suggested Destinations",
      "post.Image Search": "Image Search",
      "post.Upload an image to find similar destinations":
        "Upload an image to find similar destinations",
      "post.Try Image Search": "Try Image Search",
      "post.Discover Vietnam": "Discover Vietnam",
      "post.Special tours and exclusive deals for your next adventure":
        "Special tours and exclusive deals for your next adventure",
      "post.Learn More": "Learn More",
      "planner.title": "AI Travel Planner",
      "planner.subtitle":
        "Let our AI create a personalized travel itinerary just for you. Simply follow these steps and get ready for an amazing journey!",
      "planner.step.chooseMethod": "Choose Method",
      "planner.step.chooseMethod.desc": "Select input type",
      "planner.step.planDetails": "Plan Details",
      "planner.step.planDetails.desc": "Fill in preferences",
      "planner.step.processing": "Processing",
      "planner.step.processing.desc": "Creating your plan",
      "planner.step.ready": "Ready!",
      "planner.step.ready.desc": "View your itinerary",

      "planner.tab.textQuery": "Text Query",
      "planner.tab.imageQuery": "Image Query",
      "planner.tab.progress": "Planning Progress",
      "planner.tab.itinerary": "Your Itinerary",
      "planner.form.travelDates": "Travel Dates",
      "planner.form.travelDates.start": "Start Date",
      "planner.form.travelDates.end": "End Date",
      "planner.form.duration": "Duration (days)",
      "planner.form.interests": "Your Interests",
      "planner.form.interests.placeholder":
        "e.g., nature, culture, food, adventure",
      "planner.form.mustVisit": "Must-Visit Destinations",
      "planner.form.mustVisit.placeholder":
        "Select destinations you don't want to miss",
      "planner.form.mainLocation": "Main Location",
      "planner.form.submit": "Create My Travel Plan",
      "planner.form.submitting": "Submitting...",
      "planner.form.dateRequired": "Please select travel dates",
      "planner.form.durationWarning": "Trip duration must be between 1 and 14 days",
      "planner.form.durationError": "Please select a duration between 1 and 14 days",
      "planner.location.quyNhon": "Quy Nhon",
      "planner.location.nhaTrang": "Nha Trang",
      "planner.location.daNang": "Da Nang",
      "planner.output.day": "Day",
      "planner.activity.created": "Activity Created",
      "planner.activity.createdDesc":
        "Activity has been added to your calendar",
      "planner.activity.createFailed": "Failed to create activity",
      "planner.activity.createError": "Error creating activity",
      "planner.activity.alreadyCreated": "Activity already added to calendar",
      "planner.activity.createTooltip": "Add to calendar",
      "planner.activity.loading": "Adding activity...",
      "planner.activity.timeRange": "Time Range",
      "planner.activity.description": "Description",
      "planner.activity.actions": "Actions",
      "planner.activity.updateTime": "Update time",
      "common.error": "Error",
      "Failed to fetch chat history": "Failed to fetch chat history",
      "Error parsing stored data": "Error parsing stored data",
      "No chat history": "No chat history",
      "Hello! How can I help you today?": "Hello! How can I help you today?",
      "Empty Search": "Empty Search",
      "Please enter a search query.": "Please enter a search query.",
      "Search Error": "Search Error",
      "Failed to fetch search results. Please try again.":
        "Failed to fetch search results. Please try again.",
      "Find Your Dream Destinations": "Find Your Dream Destinations",
      "Search for places...": "Search for places...",
      "Searching for amazing places...": "Searching for amazing places...",
      Resources: "Resources",
      Account: "Account",
      "Support Center": "Support Center",
      Feedback: "Feedback",
      Support: "Support",
      Events: "Events",
      Promotions: "Promotions",
      "Request Demo": "Request Demo",
      Careers: "Careers",
      "No more posts": "No more posts",
      "Reload Page": "Reload Page",
      "Sign in to experience all features of our platform!":
        "Sign in to experience all features of our platform!",
      "Plan your perfect trip with us": "Plan your perfect trip with us",
      "Sign in with your Google account to continue":
        "Sign in with your Google account to continue",
      "User Management": "User Management",
      "Manage users on the platform": "Manage users on the platform",
      "User deleted successfully": "User deleted successfully",
      "Failed to delete user": "Failed to delete user",
      "Delete this user?": "Delete this user?",
      "Are you sure you want to delete this user?":
        "Are you sure you want to delete this user?",
      User: "User",
      Role: "Role",
      Status: "Status",
      Actions: "Actions",
      "User Information": "User Information",
      "Delete User": "Delete User",
      Delete: "Delete",
      "View and manage user accounts": "View and manage user accounts",
      about: "About us",
      "About TriVenture": "TriVenture",
      "Intelligent Travel Platform revolutionizing your travel experience":
        "Intelligent Travel Platform revolutionizing your travel experience",
      "Our Mission": "Our Mission",
      "TriVenture aims to revolutionize travel planning by leveraging artificial intelligence and user-generated content to provide personalized travel experiences. We believe in making travel more accessible, efficient, and enjoyable for everyone.":
        "TriVenture aims to revolutionize travel planning by leveraging artificial intelligence and user-generated content to provide personalized travel experiences. We believe in making travel more accessible, efficient, and enjoyable for everyone.",
      "Our platform combines destination insights, trip planning tools, and community-driven content to help travelers make informed decisions and create memorable experiences.":
        "Our platform combines destination insights, trip planning tools, and community-driven content to help travelers make informed decisions and create memorable experiences.",
      "Key Features": "Key Features",
      "Destination Discovery": "Destination Discovery",
      "Explore curated destinations with detailed information about attractions, accommodations, and local experiences.":
        "Explore curated destinations with detailed information about attractions, accommodations, and local experiences.",
      "Trip Planning": "Trip Planning",
      "Create and manage detailed travel itineraries with our intuitive planning tools that help you organize every aspect of your journey.":
        "Create and manage detailed travel itineraries with our intuitive planning tools that help you organize every aspect of your journey.",
      "Community Posts": "Community Posts",
      "Share your travel experiences and learn from others through our community-driven content platform featuring authentic travel stories.":
        "Share your travel experiences and learn from others through our community-driven content platform featuring authentic travel stories.",
      "Our Team": "Our Team",
      "Meet the talented individuals behind TriVenture":
        "Meet the talented individuals behind TriVenture",
      "Get in Touch": "Get in Touch",
      "We're always looking to improve our platform. If you have any questions, suggestions, or feedback, please don't hesitate to contact us.":
        "We're always looking to improve our platform. If you have any questions, suggestions, or feedback, please don't hesitate to contact us.",

      // Project Information
      "Project Information": "Project Information",
      "Project Name": "Project Name",
      "Project Code": "Project Code",
      "Group Name": "Group Name",
      "Software Type": "Software Type",

      // Vision & Background
      "Our Vision": "Our Vision",
      "Product Background": "Product Background",
      "Current travel planning methods are often fragmented":
        "Current travel planning methods are often fragmented",
      "In today's digital era":
        "In today's digital era, travel preferences have significantly evolved. While traditional package tours once dominated the industry, travelers are now increasingly embracing independent travel, seeking autonomy in planning, exploring, and curating their own experiences. The rise of online services and information technology has empowered individuals to research destinations, build itineraries, and manage bookings with unprecedented ease.",
      "Despite the proliferation":
        "Despite the proliferation of global travel platforms, many existing solutions still fall short of adequately addressing the distinct needs of personalized travel in local markets, particularly in Vietnam. Our team recognizes that current travel planning methods are often fragmented and disjointed. Travelers in pursuit of genuinely personalized experiences are frequently forced to navigate a complex and inefficient process, juggling multiple websites and applications.",
      "Recognizing this significant service gap":
        "Recognizing this significant service gap, our team proposes the TriVenture concept. TriVenture harnesses the power of Artificial Intelligence (AI) and Machine Learning to generate tailored travel recommendations and optimize travel planning through an intuitive and interactive web system. This system is designed to become the leading platform for personalized travel experiences, bridging the critical gap between generic global platforms and the specific needs of travelers in this vibrant and dynamic market.",

      // Our Advantages
      "Our Advantage": "Our Advantage",
      "Deep AI-Driven Personalization": "Deep AI-Driven Personalization",
      "Dynamic Contextual Awareness": "Dynamic Contextual Awareness",
      "Seamlessly Integrated Features": "Seamlessly Integrated Features",

      "TriVenture employs advanced AI":
        "TriVenture employs advanced AI and Machine Learning algorithms to build comprehensive user profiles that go beyond basic inputs, analyzing explicitly stated preferences, implicit preferences learned from behavior, and travel history to understand evolving and nuanced preferences.",
      "Our platform integrates real-time data":
        "Our platform integrates real-time data streams to dynamically adapt recommendations based on current context, including real-time weather data and cultural nuances, ensuring recommendations are locally relevant and sensitive.",
      "We combine AI-powered recommendations":
        "We combine AI-powered recommendations, interactive chatbot planning, user reviews and ratings, and robust plan management to offer a comprehensive, personalized travel planning experience that truly understands each traveler's unique needs.",

      // Mission points
      "Effortless Planning": "Effortless Planning",
      "Deeply Personalized Journeys": "Deeply Personalized Journeys",
      "Confident Exploration": "Confident Exploration",

      // Email contact
      Email: "Email",
      "TriVenture employs advanced AI and Machine Learning algorithms to build comprehensive user profiles that go beyond basic inputs, analyzing explicitly stated preferences, implicit preferences learned from behavior, and travel history to understand evolving and nuanced preferences.":
        "TriVenture employs advanced AI and Machine Learning algorithms to build comprehensive user profiles that go beyond basic inputs, analyzing explicitly stated preferences, implicit preferences learned from behavior, and travel history to understand evolving and nuanced preferences.",
      "Our platform integrates real-time data streams to dynamically adapt recommendations based on current context, including real-time weather data and cultural nuances, ensuring recommendations are locally relevant and sensitive.":
        "Our platform integrates real-time data streams to dynamically adapt recommendations based on current context, including real-time weather data and cultural nuances, ensuring recommendations are locally relevant and sensitive.",
      "We combine AI-powered recommendations, interactive chatbot planning, user reviews and ratings, and robust plan management to offer a comprehensive, personalized travel planning experience that truly understands each traveler's unique needs.":
        "We combine AI-powered recommendations, interactive chatbot planning, user reviews and ratings, and robust plan management to offer a comprehensive, personalized travel planning experience that truly understands each traveler's unique needs.",
      "Recognizing this significant service gap, our team proposes the TriVenture concept. TriVenture harnesses the power of Artificial Intelligence (AI) and Machine Learning to generate tailored travel recommendations and optimize travel planning through an intuitive and interactive web system. This system is designed to become the leading platform for personalized travel experiences, bridging the critical gap between generic global platforms and the specific needs of travelers in this vibrant and dynamic market.":
        "Recognizing this significant service gap, our team proposes the TriVenture concept. TriVenture harnesses the power of Artificial Intelligence (AI) and Machine Learning to generate tailored travel recommendations and optimize travel planning through an intuitive and interactive web system. This system is designed to become the leading platform for personalized travel experiences, bridging the critical gap between generic global platforms and the specific needs of travelers in this vibrant and dynamic market.",
      "Despite the proliferation of global travel platforms, many existing solutions still fall short of adequately addressing the distinct needs of personalized travel in local markets, particularly in Vietnam. Our team recognizes that current travel planning methods are often fragmented and disjointed. Travelers in pursuit of genuinely personalized experiences are frequently forced to navigate a complex and inefficient process, juggling multiple websites and applications.":
        "Despite the proliferation of global travel platforms, many existing solutions still fall short of adequately addressing the distinct needs of personalized travel in local markets, particularly in Vietnam. Our team recognizes that current travel planning methods are often fragmented and disjointed. Travelers in pursuit of genuinely personalized experiences are frequently forced to navigate a complex and inefficient process, juggling multiple websites and applications.",
      "Destinations, build itineraries, and manage bookings with unprecedented ease.":
        "Destinations, build itineraries, and manage bookings with unprecedented ease.",
      "In today's digital era, travel preferences have significantly evolved. While traditional package tours once dominated the industry, travelers are now increasingly embracing independent travel, seeking autonomy in planning, exploring, and curating their own experiences. The rise of online services and information technology has empowered individuals to research destinations, build itineraries, and manage bookings with unprecedented ease.":
        "In today's digital era, travel preferences have significantly evolved. While traditional package tours once dominated the industry, travelers are now increasingly embracing independent travel, seeking autonomy in planning, exploring, and curating their own experiences. The rise of online services and information technology has empowered individuals to research destinations, build itineraries, and manage bookings with unprecedented ease.",
      "TriVenture will be more than just an application; it will be a trusted companion that learns and adapts with you, continuously refining its understanding of your travel aspirations and the ever-changing world around us. By harnessing the power of AI and prioritizing a user-centric design, TriVenture aims to unlock the pure joy of travel, making every journey uniquely yours and effortlessly unforgettable.":
        "TriVenture will be more than just an application; it will be a trusted companion that learns and adapts with you, continuously refining its understanding of your travel aspirations and the ever-changing world around us. By harnessing the power of AI and prioritizing a user-centric design, TriVenture aims to unlock the pure joy of travel, making every journey uniquely yours and effortlessly unforgettable.",
      "Our mission is to transform the travel experience by empowering users with:":
        "Our mission is to transform the travel experience by empowering users with:",
      "Say goodbye to fragmented, time-consuming research across multiple platforms. TriVenture simplifies the entire process, offering a streamlined and intuitive experience.":
        "Say goodbye to fragmented, time-consuming research across multiple platforms. TriVenture simplifies the entire process, offering a streamlined and intuitive experience.",
      "Move beyond generic suggestions. TriVenture crafts itineraries that resonate with individual passions, learned preferences, and evolving travel styles.":
        "Move beyond generic suggestions. TriVenture crafts itineraries that resonate with individual passions, learned preferences, and evolving travel styles.",
      "Travel with assurance, knowing your itinerary is dynamically optimized for real-time conditions and tailored to your specific needs and desires.":
        "Travel with assurance, knowing your itinerary is dynamically optimized for real-time conditions and tailored to your specific needs and desires.",
      "TriVenture envisions a future where travel planning is intuitive, personalized, and truly inspiring. We are building an AI-powered travel companion that goes beyond simple recommendations. TriVenture seamlessly integrates real-time data – from dynamic weather patterns and localized events to nuanced cultural trends – with a deep understanding of each traveler's unique preferences.":
        "TriVenture envisions a future where travel planning is intuitive, personalized, and truly inspiring. We are building an AI-powered travel companion that goes beyond simple recommendations. TriVenture seamlessly integrates real-time data – from dynamic weather patterns and localized events to nuanced cultural trends – with a deep understanding of each traveler's unique preferences.",
      "TriVenture: An AI-Powered Travel Destination Recommendation System with Contextual Awareness and Personalized Planning":
        "TriVenture: An AI-Powered Travel Destination Recommendation System with Contextual Awareness and Personalized Planning",
      "Web portal": "Web portal",
    },
  },
  vi: {
    translation: {
      "where to go": "Đi đâu?",
      all: "Tất cả",
      tourist: "Du lịch",
      hotel: "Khách sạn",
      home: "Trang chủ",
      restaurant: "Nhà hàng",
      settings: "Cài đặt",
      profile: "Hồ sơ",
      login: "Đăng nhập",
      logout: "Đăng xuất",
      destination: "Điểm đến",
      post: "Bài viết",
      schedule: "Lịch trình",
      planning: "Lập kế hoạch",
      "favorite destination": "Điểm đến yêu thích",
      "text favorite destination":
        "Hãy chọn một điểm đến du lịch nổi tiếng dưới đây để khám phá các chuyến đi độc quyền của chúng tôi với mức giá vô cùng hợp lý.",
      "news feed": "Bảng tin",
      "Create post": "Tạo bài viết",
      "No posts available": "Không có bài viết nào",
      "select destination": "Chọn điểm đến",
      Typing: "Nhập nội dung",
      "What's on your mind?": "Bạn đang nghĩ gì?",
      Content: "Nội dung",
      Image: "Hình ảnh",
      "Upload image": "Tải ảnh lên",
      "Please choose destination": "Vui lòng chọn điểm đến",
      "just now": "Vừa xong",
      "minutes ago": "phút trước",
      "hours ago": "giờ trước",
      "days ago": "ngày trước",
      Like: "Thích",
      Comment: "Bình luận",
      search: "Tìm kiếm",
      "travel destination": "Điểm đến du lịch",
      "food destination": "Điểm đến ẩm thực",
      "book now": "Đặt ngay",
      Reaction: "Tương tác",
      update: "Cập nhật",
      delete: "Xóa",
      cancel: "Hủy",
      send: "Gửi",
      "write comment": "Viết bình luận...",
      "Are you sure you want to delete this post?":
        "Bạn có chắc chắn muốn xóa bài viết này không?",
      "Delete Post": "Delete Post",
      "This action cannot be undone.": "Hành động này không thể hoàn tác.",
      "see more": "Xem thêm",
      "show less": "Thu gọn",
      "search.placeholder.1": "Đi đâu, làm gì, sở thích...",
      "search.placeholder.2": "Bạn muốn đi du lịch ở đâu?",
      "search.placeholder.3": "Tìm nhà hàng ngon...",
      "search.placeholder.4": "Khách sạn sang trọng...",
      "search.placeholder.5": "Địa điểm du lịch nổi tiếng...",
      "search.placeholder.6": "Khám phá ẩm thực địa phương...",
      "Oops!": "Ồ!",
      "Please enter a destination to start your journey.":
        "Vui lòng nhập điểm đến để bắt đầu hành trình của bạn.",
      "No destinations found": "Không tìm thấy điểm đến nào",
      "Try another search term or explore our categories.":
        "Thử tìm kiếm khác hoặc khám phá các danh mục của chúng tôi.",
      "Invalid Search": "Tìm kiếm không hợp lệ",
      "Please provide a travel-related search query.":
        "Vui lòng nhập nội dung tìm kiếm liên quan đến du lịch.",
      "Something went wrong": "Đã xảy ra lỗi",
      "We couldn't complete your search. Please try again.":
        "Chúng tôi không thể hoàn thành tìm kiếm. Vui lòng thử lại.",
      "Please wait": "Vui lòng đợi",
      "Please wait a moment before searching again.":
        "Vui lòng đợi một chút trước khi tìm kiếm lại.",
      "planner.activities.createAllTooltip": "Tạo tất cả hoạt động",
      "planner.activities.loading": "Đang tạo hoạt động...",
      "planner.activities.createAll": "Tạo tất cả",
      "planner.day": "Ngày",
      "planner.startTime": "Thời gian bắt đầu",
      "planner.endTime": "Thời gian kết thúc",
      "planner.additionalInfo": "Thông tin thêm",
      "Search results:": "Kết quả tìm kiếm",
      "planner.activities.created": "Đã tạo tất cả hoạt đông",
      "planner.activities.createdDesc":
        "Tất cả hoạt động đã được thêm vào lịch của bạn",
      searching: "Đang tìm kiếm...",
      "Our AI-Powered Travel Tools": "Công Cụ Du Lịch Được Hỗ Trợ Bởi AI",
      "Discover how our intelligent travel assistant can help you plan the perfect Vietnamese adventure":
        "Khám phá cách trợ lý du lịch thông minh của chúng tôi có thể giúp bạn lên kế hoạch cho chuyến phiêu lưu Việt Nam hoàn hảo",
      "AI Travel Assistant": "Trợ Lý Du Lịch AI",
      "Chat with our AI to get personalized recommendations, answer questions about Vietnamese culture, and solve any travel concerns.":
        "Trò chuyện với AI của chúng tôi để nhận đề xuất cá nhân hóa, trả lời câu hỏi về văn hóa Việt Nam và giải quyết mọi lo lắng về du lịch.",
      "Chat Now": "Trò Chuyện Ngay",
      "AI Itinerary Planner": "Lập Kế Hoạch Hành Trình AI",
      "Input your preferences, travel dates, and interests to receive a custom Vietnam itinerary optimized for your unique travel style.":
        "Nhập sở thích, ngày đi và sở thích của bạn để nhận lịch trình Việt Nam được tùy chỉnh tối ưu hóa cho phong cách du lịch độc đáo của bạn.",
      "Plan Itinerary": "Lập Kế Hoạch",
      "Visual Discovery": "Khám Phá Trực Quan",
      "Upload an image or describe a place, and our AI will identify Vietnamese destinations that match your vision.":
        "Tải lên hình ảnh hoặc mô tả một địa điểm, và AI của chúng tôi sẽ xác định các điểm đến Việt Nam phù hợp với tầm nhìn của bạn.",
      "Try Visual Search": "Thử Tìm Kiếm Trực Quan",
      "Visual Search": "Tìm Kiếm Trực Quan",
      "Upload an image to find similar destinations in Vietnam":
        "Tải lên hình ảnh để tìm các điểm đến tương tự ở Việt Nam",
      "Select Image": "Chọn Hình Ảnh",
      "Please select an image first": "Vui lòng chọn một hình ảnh trước",
      "Image uploaded successfully": "Tải lên hình ảnh thành công",
      "Failed to upload image": "Tải lên hình ảnh thất bại",
      Search: "Tìm Kiếm",
      Close: "Đóng",
      "Experience Our AI in Action": "Trải Nghiệm AI Của Chúng Tôi",
      "Our intelligent travel assistant understands your preferences and provides personalized recommendations for your Vietnamese adventure.":
        "Trợ lý du lịch thông minh của chúng tôi hiểu sở thích của bạn và cung cấp đề xuất cá nhân hóa cho chuyến phiêu lưu Việt Nam của bạn.",
      "Get instant answers to your travel questions":
        "Nhận câu trả lời ngay lập tức cho các câu hỏi du lịch của bạn",
      "Receive personalized itinerary suggestions":
        "Nhận đề xuất lịch trình cá nhân hóa",
      "Discover hidden gems based on your interests":
        "Khám phá những điểm đến ẩn dựa trên sở thích của bạn",
      "Learn about local customs and cultural insights":
        "Tìm hiểu về phong tục địa phương và hiểu biết văn hóa",
      "Create Your Itinerary": "Tạo Lịch Trình Của Bạn",
      "How TriVenture Works": "TriVenture Hoạt Động Như Thế Nào",
      "Tell Us Your Preferences": "Cho Chúng Tôi Biết Sở Thích Của Bạn",
      "Share your travel dates, interests, budget, and travel style.":
        "Chia sẻ ngày đi, sở thích, ngân sách và phong cách du lịch của bạn.",
      "Our AI Analyzes": "AI Của Chúng Tôi Phân Tích",
      "Our AI processes your preferences to find the perfect Vietnamese experiences.":
        "AI của chúng tôi xử lý sở thích của bạn để tìm những trải nghiệm Việt Nam hoàn hảo.",
      "Receive Recommendations": "Nhận Đề Xuất",
      "Get personalized itineraries, accommodations, and attraction suggestions.":
        "Nhận lịch trình, chỗ ở và đề xuất điểm tham quan được cá nhân hóa.",
      "Travel with Confidence": "Du Lịch Tự Tin",
      "Enjoy your AI-optimized Vietnamese adventure with ongoing support.":
        "Tận hưởng chuyến phiêu lưu Việt Nam được tối ưu hóa bởi AI với sự hỗ trợ liên tục.",
      "Ready to Discover Vietnam?": "Sẵn Sàng Khám Phá Việt Nam?",
      "Let our AI-powered platform guide you through the beauty, culture, and wonders of Vietnam.":
        "Để nền tảng được hỗ trợ bởi AI của chúng tôi hướng dẫn bạn qua vẻ đẹp, văn hóa và kỳ quan của Việt Nam.",
      "Start Planning": "Bắt Đầu Lập Kế Hoạch",
      "Chat with AI Assistant": "Trò Chuyện Với Trợ Lý AI",
      "Plan Your Trip": "Lập Kế Hoạch Chuyến Đi",
      "Explore Our AI Tools": "Khám Phá Công Cụ AI Của Chúng Tôi",
      "Select Language": "Chọn Ngôn Ngữ",
      Menu: "Menu",
      "AI Page": "Trang AI",
      Save: "Lưu",
      "Update Post": "Cập Nhật Bài Viết",
      "Unknown time": "Thời gian không xác định",
      "Welcome to TriVenture": "Chào mừng đến với TriVenture",
      "Discover Vietnam like never before with our AI-powered travel intelligence platform":
        "Khám phá Việt Nam như chưa bao giờ với nền tảng du lịch thông minh được hỗ trợ bởi AI của chúng tôi",
      "Your Photo": "Ảnh Của Bạn",
      "Match Score": "Điểm Phù Hợp",
      "Vietnam Travel Calendar": "Lịch Du Lịch Việt Nam",
      "View Guide": "Xem Hướng Dẫn",
      "Refresh Calendar": "Cập Nhật Lịch",
      "Quick Guide": "Hướng Dẫn Nhanh",
      "View More": "Xem Thêm",
      "Click on a date to create new event": "Nhấp vào ngày để tạo sự kiện mới",
      "Drag and drop to change time": "Kéo và thả để thay đổi thời gian",
      "Click on event to edit": "Nhấp vào sự kiện để chỉnh sửa",
      "Use colors to categorize activities":
        "Sử dụng màu sắc để phân loại hoạt động",
      "Activity Types": "Loại Hoạt Động",
      "Upcoming Events": "Sự Kiện Sắp Tới",
      "Hide Weekends": "Ẩn Cuối Tuần",
      "Show Weekends": "Hiện Cuối Tuần",
      "No events yet. Create your first event!":
        "Chưa có sự kiện nào. Hãy tạo sự kiện mới!",
      "Update Event": "Cập Nhật Sự Kiện",
      "Create New Event": "Tạo Sự Kiện Mới",
      Title: "Tiêu Đề",
      "Activity Type": "Loại Hoạt Động",
      Location: "Địa Điểm",
      Notes: "Ghi Chú",
      "Save Event": "Lưu Sự Kiện",
      "Delete Event": "Xóa Sự Kiện",
      Cancel: "Hủy",
      "How to Use the Travel Calendar": "Cách Sử Dụng Lịch Du Lịch",
      "This travel calendar helps you plan your Vietnam trip easily and efficiently.":
        "Lịch du lịch này giúp bạn lên kế hoạch chuyến đi Việt Nam một cách dễ dàng và hiệu quả.",
      "Main Features": "Các Tính Năng Chính",
      "View Calendar": "Xem Lịch",
      "Switch between day, week and month views":
        "Chuyển đổi giữa chế độ xem ngày, tuần và tháng",
      "Create Event": "Tạo Sự Kiện",
      "Edit Event": "Chỉnh Sửa Sự Kiện",
      "Drag and drop to change time, or click event to edit details":
        "Kéo và thả để thay đổi thởi gian, hoặc nhấp vào sự kiện để chỉnh sửa chi tiết",
      Categorize: "Phân Loại",
      "Travel Planning Tips": "Mẹo Lập Kế Hoạch Du Lịch",
      "Start with city's main attractions":
        "Bắt đầu với các điểm tham quan chính của thành phố",
      "Make time for local cuisine": "Dành thởi gian cho ẩm thực địa phương",
      "Consider travel time between locations":
        "Cân nhắc thời gian di chuyển giữa các địa điểm",
      "Mix cultural and nature activities":
        "Kết hợp các hoạt động văn hóa và thiên nhiên",
      "This calendar is designed to help you make the most of your Vietnam trip!":
        "Lịch này được thiết kế để giúp bạn tận dụng tối đa chuyến đi Việt Nam của mình!",
      "Example: Visit Hoan Kiem Lake, Eat at Bat Dan Pho...":
        "Ví dụ: Tham quan Hồ Hoàn Kiếm, Ăn phở Bát Đàn...",
      "Please enter a title!": "Vui lòng nhập tiêu đề!",
      "Please select an activity type!": "Vui lòng chọn loại hoạt động!",
      "Add notes about this activity...": "Thêm ghi chú về hoạt động này...",
      Sightseeing: "Tham Quan",
      Food: "Ẩm Thực",
      Nature: "Thiên Nhiên",
      Culture: "Văn Hóa",
      Transportation: "Di Chuyển",
      Accommodation: "Nơi Ở",
      Other: "Khác",
      "Updated successfully": "Cập nhật thành công",
      "Event has been updated successfully.":
        "Sự kiện đã được cập nhật thành công.",
      "Update failed": "Cập nhật thất bại",
      "Event was not updated. Please try again.":
        "Sự kiện không được cập nhật. Vui lòng thử lại.",
      Error: "Lỗi",
      "An error occurred while updating the event. Please try again.":
        "Lỗi xảy ra khi cập nhật sự kiện. Vui lòng thử lại.",
      Updated: "Đã cập nhật",
      "Events have been updated": "Các sự kiện đã được cập nhật",
      "Update error": "Lỗi cập nhật",
      "Could not update events": "Không thể cập nhật các sự kiện",
      "Event deleted": "Đã xóa sự kiện",
      "Event has been deleted successfully.": "Sự kiện đã được xóa thành công.",
      "Delete error": "Lỗi xóa",
      "Calendar API not available.": "API lịch không khả dụng.",
      "Event created": "Đã tạo sự kiện",
      "New event has been created successfully.":
        "Sự kiện mới đã được tạo thành công.",
      "Operation failed": "Thao tác thất bại",
      "Could not create event. Please try again.":
        "Không thể tạo sự kiện. Vui lòng thử lại.",
      "Could not update event. Please try again.":
        "Không thể cập nhật sự kiện. Vui lòng thử lại.",
      "more events": "{{count}} sự kiện khác",
      reactions: "tương tác",
      comments: "bình luận",
      "post.AI Travel Assistant": "Trợ lý Du lịch AI",
      "post.Let AI help plan your perfect trip!":
        "Để AI giúp lập kế hoạch chuyến đi hoàn hảo của bạn!",
      "post.Start Planning": "Bắt đầu lập kế hoạch",
      "post.Quick Actions": "Thao Tác Nhanh",
      "post.Find Destinations": "Tìm Điểm Đến",
      "post.Popular Routes": "Tuyến Đường Phổ Biến",
      "post.Trending Topics": "Chủ Đề Thịnh Hành",
      "post.Suggested Destinations": "Điểm Đến Gợi Ý",
      "post.Image Search": "Tìm Kiếm Hình Ảnh",
      "post.Upload an image to find similar destinations":
        "Tải lên hình ảnh để tìm các điểm đến tương tự",
      "post.Try Image Search": "Thử Tìm Kiếm Hình Ảnh",
      "post.Discover Vietnam": "Khám phá Việt Nam",
      "post.Special tours and exclusive deals for your next adventure":
        "Tour đặc biệt và ưu đãi độc quyền cho chuyến phiêu lưu tiếp theo của bạn",
      "post.Learn More": "Tìm hiểu thêm",
      "planner.title": "Lập Kế Hoạch Du Lịch AI",
      "planner.subtitle":
        "Để AI của chúng tôi tạo lịch trình du lịch được cá nhân hóa cho bạn. Chỉ cần làm theo các bước và chuẩn bị cho một hành trình tuyệt vời!",
      "planner.step.chooseMethod": "Chọn Phương Thức",
      "planner.step.chooseMethod.desc": "Chọn kiểu nhập",
      "planner.step.planDetails": "Chi Tiết Kế Hoạch",
      "planner.step.planDetails.desc": "Điền sở thích",
      "planner.step.processing": "Đang Xử Lý",
      "planner.step.processing.desc": "Tạo kế hoạch của bạn",
      "planner.step.ready": "Hoàn Thành!",
      "planner.step.ready.desc": "Xem lịch trình",
      "planner.tab.textQuery": "Tìm Kiếm Bằng Văn Bản",
      "planner.tab.imageQuery": "Tìm Kiếm Bằng Hình Ảnh",
      "planner.tab.progress": "Tiến Trình Lập Kế Hoạch",
      "planner.tab.itinerary": "Lịch Trình Của Bạn",
      "planner.form.travelDates": "Ngày Du Lịch",
      "planner.form.travelDates.start": "Ngày Bắt Đầu",
      "planner.form.travelDates.end": "Ngày Kết Thúc",
      "planner.form.duration": "Thời Gian (ngày)",
      "planner.form.interests": "Sở Thích Của Bạn",
      "planner.form.interests.placeholder":
        "vd: thiên nhiên, văn hóa, ẩm thực, phiêu lưu",
      "planner.form.mustVisit": "Điểm Đến Bắt Buộc",
      "planner.form.mustVisit.placeholder":
        "Chọn những điểm đến bạn không muốn bỏ lỡ",
      "planner.form.mainLocation": "Địa Điểm Chính",
      "planner.form.submit": "Lên kế hoạch",
      "planner.form.submitting": "Đang lên kế hoạch...",
      "planner.form.dateRequired": "Vui lòng chọn ngày du lịch",
      "planner.form.durationWarning": "Thời gian du lịch phải từ 1 đến 14 ngày",
      "planner.form.durationError": "Vui lòng chọn thởi gian từ 1 đến 14 ngày",
      "planner.location.quyNhon": "Quy Nhơn",
      "planner.location.nhaTrang": "Nha Trang",
      "planner.location.daNang": "Đà Nẵng",
      "planner.output.day": "Ngày",
      "planner.activity.created": "Hoạt Động Đã Được Tạo",
      "planner.activity.createdDesc": "Hoạt động đã được thêm vào lịch của bạn",
      "planner.activity.createFailed": "Không thể tạo hoạt động",
      "planner.activity.createError": "Lỗi khi tạo hoạt động",
      "planner.activity.alreadyCreated": "Hoạt động đã được thêm vào lịch",
      "planner.activity.createTooltip": "Thêm vào lịch",
      "planner.activity.loading": "Đang thêm hoạt động...",
      "planner.activity.timeRange": "Khoảng Thời Gian",
      "planner.activity.description": "Mô Tả",
      "planner.activity.actions": "Hành Động",
      "planner.activity.updateTime": "Cập Nhật Thời Gian",
      "common.error": "Lỗi",
      "Failed to fetch chat history": "Không thể tải lịch sử trò chuyện",
      "Error parsing stored data": "Lỗi khi đọc dữ liệu đã lưu",
      "No chat history": "Không có lịch sử trò chuyện",
      "Hello! How can I help you today?":
        "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?",
      "Empty Search": "Tìm Kiếm Trống",
      "Please enter a search query.": "Vui lòng nhập từ khóa tìm kiếm.",
      "Search Error": "Lỗi Tìm Kiếm",
      "Failed to fetch search results. Please try again.":
        "Không thể tải kết quả tìm kiếm. Vui lòng thử lại.",
      "Find Your Dream Destinations": "Tìm Điểm Đến Mơ Ước",
      "Search for places...": "Tìm kiếm địa điểm...",
      "Searching for amazing places...":
        "Đang tìm kiếm những địa điểm tuyệt vời...",
      Resources: "Tài Nguyên",
      Account: "Tài Khoản",
      "Support Center": "Trung Tâm Hỗ Trợ",
      Feedback: "Phản Hồi",
      Support: "Hỗ Trợ",
      Events: "Sự Kiện",
      Promotions: "Khuyến Mãi",
      "Request Demo": "Yêu Cầu Demo",
      Careers: "Tuyển Dụng",
      "Admin Management": "Quản Lý Admin",
      "Manage posts and destinations on the platform":
        "Quản lý bài viết và điểm đến trên nền tảng",
      "Post Management": "Quản Lý Bài Viết",
      "Destination Management": "Quản Lý Điểm Đến",
      "Manage and moderate posts on the platform":
        "Quản lý và kiểm duyệt bài viết trên nền tảng",
      Total: "Tổng",
      items: "mục",
      "No images": "Không có hình ảnh",
      Stats: "Thống kê",
      Author: "Tác giả",
      Images: "Hình ảnh",
      "Created At": "Ngày tạo",
      "Updated By": "Cập nhật bởi",
      "Created By": "Tạo bởi",
      "Add Destination": "Thêm Điểm Đến",
      "Edit Destination": "Sửa Điểm Đến",
      "Please input the name!": "Vui lòng nhập tên!",
      "Please input the description!": "Vui lòng nhập mô tả!",
      "Please input the image URL!": "Vui lòng nhập URL hình ảnh!",
      "Image URL": "URL Hình ảnh",
      "Destination created successfully": "Tạo điểm đến thành công",
      "Destination updated successfully": "Cập nhật điểm đến thành công",
      "Destination deleted successfully": "Xóa điểm đến thành công",
      "Failed to delete destination": "Xóa điểm đến thất bại",
      "Failed to fetch destinations": "Không thể tải danh sách điểm đến",
      "Are you sure you want to delete this destination?":
        "Bạn có chắc chắn muốn xóa điểm đến này?",
      Yes: "Có",
      No: "Không",
      Comments: "Bình luận",
      Reactions: "Tương tác",
      language: "Ngôn ngữ",
      contact: "Liên hệ",
      "No more posts": "Không còn bài viết",
      "Reload Page": "Tải lại trang",
      "Sign in to experience all features of our platform!":
        "Đăng nhập để trải nghiệm tất cả các tính năng của nền tảng",
      "Plan your perfect trip with us":
        "Lập kế hoạch chuyến đi hoàn hảo với chúng tôi",
      "Sign in with your Google account to continue":
        "Đăng nhập với tài khoản Google để tiếp tục",
      "User Management": "Quản Lý Người Dùng",
      "Manage users on the platform": "Quản lý người dùng trên nền tảng",
      "User deleted successfully": "Người dùng đã được xóa thành công",
      "Failed to delete user": "Xóa người dùng thất bại",
      "Delete this user?": "Xóa người dùng này?",
      "Are you sure you want to delete this user?":
        "Bạn có chắc chắn muốn xóa người dùng này?",
      User: "Người dùng",
      Role: "Vai trò",
      Status: "Trạng thái",
      Actions: "Hành động",
      "User Information": "Thông tin người dùng",
      "Delete User": "Xóa người dùng",
      Delete: "Xóa",
      "View and manage user accounts": "Xem và quản lý tài khoản người dùng",
      about: "Về chúng tôi",
      "About TriVenture": "TriVenture",
      "Intelligent Travel Platform revolutionizing your travel experience":
        "Nền tảng du lịch thông minh cách mạng hóa trải nghiệm du lịch của bạn",
      "Our Mission": "Sứ mệnh của chúng tôi",
      "TriVenture aims to revolutionize travel planning by leveraging artificial intelligence and user-generated content to provide personalized travel experiences. We believe in making travel more accessible, efficient, and enjoyable for everyone.":
        "TriVenture nhằm mục đích cách mạng hóa việc lập kế hoạch du lịch bằng cách tận dụng trí tuệ nhân tạo và nội dung do người dùng tạo ra để cung cấp trải nghiệm du lịch cá nhân hóa. Chúng tôi tin vào việc làm cho du lịch trở nên dễ tiếp cận, hiệu quả và thú vị hơn cho tất cả mọi người.",
      "Our platform combines destination insights, trip planning tools, and community-driven content to help travelers make informed decisions and create memorable experiences.":
        "Nền tảng của chúng tôi kết hợp thông tin chi tiết về điểm đến, công cụ lập kế hoạch chuyến đi và nội dung do cộng đồng điều khiển để giúp du khách đưa ra quyết định sáng suốt và tạo ra những trải nghiệm đáng nhớ.",
      "Key Features": "Tính năng chính",
      "Destination Discovery": "Khám phá điểm đến",
      "Explore curated destinations with detailed information about attractions, accommodations, and local experiences.":
        "Khám phá các điểm đến được chọn lọc với thông tin chi tiết về các điểm tham quan, chỗ ở và trải nghiệm địa phương.",
      "Trip Planning": "Lập kế hoạch chuyến đi",
      "Create and manage detailed travel itineraries with our intuitive planning tools that help you organize every aspect of your journey.":
        "Tạo và quản lý lịch trình du lịch chi tiết với các công cụ lập kế hoạch trực quan của chúng tôi giúp bạn tổ chức mọi khía cạnh của hành trình.",
      "Community Posts": "Bài đăng cộng đồng",
      "Share your travel experiences and learn from others through our community-driven content platform featuring authentic travel stories.":
        "Chia sẻ trải nghiệm du lịch của bạn và học hỏi từ người khác thông qua nền tảng nội dung do cộng đồng điều khiển với các câu chuyện du lịch chân thực.",
      "Our Team": "Đội ngũ của chúng tôi",
      "Meet the talented individuals behind TriVenture":
        "Gặp gỡ những cá nhân đằng sau TriVenture",
      "Get in Touch": "Liên hệ với chúng tôi",
      "We're always looking to improve our platform. If you have any questions, suggestions, or feedback, please don't hesitate to contact us.":
        "Chúng tôi luôn tìm cách cải thiện nền tảng của mình. Nếu bạn có bất kỳ câu hỏi, đề xuất hoặc phản hồi nào, vui lòng liên hệ với chúng tôi.",

      // Project Information
      "Project Information": "Thông tin dự án",
      "Project Name": "Tên dự án",
      "Project Code": "Mã dự án",
      "Group Name": "Tên nhóm",
      "Software Type": "Kiểu phần mềm",

      // Vision & Background
      "Our Vision": "Tầm nhìn của chúng tôi",
      "Product Background": "Bối cảnh sản phẩm",
      "In today's digital era":
        "Trong kỷ nguyên số hiện nay, sở thích du lịch đã thay đổi đáng kể. Trong khi các tour du lịch trọn gói truyền thống từng thống trị ngành công nghiệp này, du khách ngày càng ưa chuộng hình thức du lịch độc lập, tìm kiếm sự tự chủ trong việc lập kế hoạch, khám phá và sắp xếp trải nghiệm của riêng mình. Sự phát triển của dịch vụ trực tuyến và công nghệ thông tin đã giúp mọi người nghiên cứu điểm đến, xây dựng lịch trình và quản lý đặt chỗ với sự dễ dàng chưa từng có.",
      "Despite the proliferation":
        "Mặc dù có nhiều nền tảng du lịch toàn cầu, nhiều giải pháp hiện có vẫn chưa đáp ứng đầy đủ nhu cầu du lịch cá nhân hóa ở thị trường địa phương, đặc biệt là ở Việt Nam. Đội ngũ của chúng tôi nhận thấy rằng các phương pháp lập kế hoạch du lịch hiện tại thường bị phân mảnh và thiếu liên kết. Du khách theo đuổi trải nghiệm thực sự cá nhân hóa thường phải điều hướng qua một quy trình phức tạp và kém hiệu quả, phải xử lý nhiều trang web và ứng dụng khác nhau.",
      "Recognizing this significant service gap":
        "Nhận thấy khoảng trống dịch vụ quan trọng này, đội ngũ chúng tôi đề xuất khái niệm TriVenture. TriVenture tận dụng sức mạnh của Trí tuệ Nhân tạo (AI) và Học máy để tạo ra các đề xuất du lịch được điều chỉnh và tối ưu hóa việc lập kế hoạch du lịch thông qua hệ thống web trực quan và tương tác. Hệ thống này được thiết kế để trở thành nền tảng hàng đầu cho trải nghiệm du lịch cá nhân hóa, thu hẹp khoảng cách quan trọng giữa các nền tảng toàn cầu chung chung và nhu cầu cụ thể của du khách trong thị trường năng động và sôi động này.",

      // Our Advantages
      "Our Advantage": "Lợi thế của chúng tôi",
      "Deep AI-Driven Personalization": "Cá nhân hóa sâu dựa trên AI",
      "Dynamic Contextual Awareness": "Nhận thức ngữ cảnh linh hoạt",
      "Seamlessly Integrated Features": "Tính năng tích hợp liền mạch",

      "TriVenture employs advanced AI":
        "TriVenture sử dụng các thuật toán AI và Học máy tiên tiến để xây dựng hồ sơ người dùng toàn diện vượt xa những thông tin đầu vào cơ bản, phân tích sở thích được nêu rõ, sở thích ngầm học được từ hành vi, và lịch sử du lịch để hiểu các sở thích tinh tế và phát triển.",
      "Our platform integrates real-time data":
        "Nền tảng của chúng tôi tích hợp luồng dữ liệu thời gian thực để điều chỉnh đề xuất một cách linh hoạt dựa trên bối cảnh hiện tại, bao gồm dữ liệu thời tiết thời gian thực và sắc thái văn hóa, đảm bảo các đề xuất phù hợp và nhạy cảm với địa phương.",
      "We combine AI-powered recommendations":
        "Chúng tôi kết hợp các đề xuất được hỗ trợ bởi AI, lập kế hoạch chatbot tương tác, đánh giá và xếp hạng của người dùng, và quản lý kế hoạch mạnh mẽ để cung cấp trải nghiệm lập kế hoạch du lịch cá nhân hóa toàn diện thực sự hiểu nhu cầu độc đáo của mỗi du khách.",

      // Mission points
      "Effortless Planning": "Lập kế hoạch dễ dàng",
      "Deeply Personalized Journeys": "Hành trình cá nhân hóa sâu sắc",
      "Confident Exploration": "Khám phá tự tin",

      // Email contact
      Email: "Email",
      "TriVenture employs advanced AI and Machine Learning algorithms to build comprehensive user profiles that go beyond basic inputs, analyzing explicitly stated preferences, implicit preferences learned from behavior, and travel history to understand evolving and nuanced preferences.":
        "TriVenture sử dụng các thuật toán AI và Học máy tiên tiến để xây dựng hồ sơ người dùng toàn diện vượt xa những thông tin đầu vào cơ bản, phân tích sở thích được nêu rõ, sở thích ngầm học được từ hành vi, và lịch sử du lịch để hiểu các sở thích tinh tế và phát triển.",
      "Our platform integrates real-time data streams to dynamically adapt recommendations based on current context, including real-time weather data and cultural nuances, ensuring recommendations are locally relevant and sensitive.":
        "Nền tảng của chúng tôi tích hợp luồng dữ liệu thời gian thực để điều chỉnh đề xuất một cách linh hoạt dựa trên bối cảnh hiện tại, bao gồm dữ liệu thời tiết thời gian thực và sắc thái văn hóa, đảm bảo các đề xuất phù hợp và nhạy cảm với địa phương.",
      "We combine AI-powered recommendations, interactive chatbot planning, user reviews and ratings, and robust plan management to offer a comprehensive, personalized travel planning experience that truly understands each traveler's unique needs.":
        "Chúng tôi kết hợp các đề xuất được hỗ trợ bởi AI, lập kế hoạch chatbot tương tác, đánh giá và xếp hạng của người dùng, và quản lý kế hoạch mạnh mẽ để cung cấp trải nghiệm lập kế hoạch du lịch cá nhân hóa toàn diện thực sự hiểu nhu cầu độc đáo của mỗi du khách.",
      "Recognizing this significant service gap, our team proposes the TriVenture concept. TriVenture harnesses the power of Artificial Intelligence (AI) and Machine Learning to generate tailored travel recommendations and optimize travel planning through an intuitive and interactive web system. This system is designed to become the leading platform for personalized travel experiences, bridging the critical gap between generic global platforms and the specific needs of travelers in this vibrant and dynamic market.":
        "Nhận thấy khoảng trống dịch vụ quan trọng này, đội ngũ chúng tôi đề xuất khái niệm TriVenture. TriVenture tận dụng sức mạnh của Trí tuệ Nhân tạo (AI) và Học máy để tạo ra các đề xuất du lịch được điều chỉnh và tối ưu hóa việc lập kế hoạch du lịch thông qua hệ thống web trực quan và tương tác. Hệ thống này được thiết kế để trở thành nền tảng hàng đầu cho trải nghiệm du lịch cá nhân hóa, thu hẹp khoảng cách quan trọng giữa các nền tảng toàn cầu chung chung và nhu cầu cụ thể của du khách trong thị trường năng động và sôi động này.",
      "Despite the proliferation of global travel platforms, many existing solutions still fall short of adequately addressing the distinct needs of personalized travel in local markets, particularly in Vietnam. Our team recognizes that current travel planning methods are often fragmented and disjointed. Travelers in pursuit of genuinely personalized experiences are frequently forced to navigate a complex and inefficient process, juggling multiple websites and applications.":
        "Mặc dù có nhiều nền tảng du lịch toàn cầu, nhiều giải pháp hiện có vẫn chưa đáp ứng đầy đủ nhu cầu du lịch cá nhân hóa ở thị trường địa phương, đặc biệt là ở Việt Nam. Đội ngũ của chúng tôi nhận thấy rằng các phương pháp lập kế hoạch du lịch hiện tại thường bị phân mảnh và thiếu liên kết. Du khách theo đuổi trải nghiệm thực sự cá nhân hóa thường phải điều hướng qua một quy trình phức tạp và kém hiệu quả, phải xử lý nhiều trang web và ứng dụng khác nhau.",
      "Destinations, build itineraries, and manage bookings with unprecedented ease.":
        "Điểm đến, xây dựng lịch trình và quản lý đặt chỗ với sự dễ dàng chưa từng có.",
      "In today's digital era, travel preferences have significantly evolved. While traditional package tours once dominated the industry, travelers are now increasingly embracing independent travel, seeking autonomy in planning, exploring, and curating their own experiences. The rise of online services and information technology has empowered individuals to research destinations, build itineraries, and manage bookings with unprecedented ease.":
        "Trong kỷ nguyên số hiện nay, sở thích du lịch đã thay đổi đáng kể. Trong khi các tour du lịch trọn gói truyền thống từng thống trị ngành công nghiệp này, du khách ngày càng ưa chuộng hình thức du lịch độc lập, tìm kiếm sự tự chủ trong việc lập kế hoạch, khám phá và sắp xếp trải nghiệm của riêng mình. Sự phát triển của dịch vụ trực tuyến và công nghệ thông tin đã giúp mọi người nghiên cứu điểm đến, xây dựng lịch trình và quản lý đặt chỗ với sự dễ dàng chưa từng có.",
      "TriVenture will be more than just an application; it will be a trusted companion that learns and adapts with you, continuously refining its understanding of your travel aspirations and the ever-changing world around us. By harnessing the power of AI and prioritizing a user-centric design, TriVenture aims to unlock the pure joy of travel, making every journey uniquely yours and effortlessly unforgettable.":
        "TriVenture sẽ không chỉ là một ứng dụng; nó sẽ là người bạn đồng hành đáng tin cậy, học hỏi và thích nghi cùng bạn, liên tục tinh chỉnh hiểu biết của mình về khát vọng du lịch của bạn và thế giới luôn thay đổi xung quanh chúng ta. Bằng cách khai thác sức mạnh của AI và ưu tiên thiết kế lấy người dùng làm trung tâm, TriVenture hướng đến mục tiêu mở khóa niềm vui thuần túy của du lịch, biến mọi hành trình trở nên độc đáo và dễ dàng khó quên.",
      "Our mission is to transform the travel experience by empowering users with:":
        "Sứ mệnh của chúng tôi là chuyển đổi trải nghiệm du lịch bằng cách cung cấp cho người dùng",
      "Say goodbye to fragmented, time-consuming research across multiple platforms. TriVenture simplifies the entire process, offering a streamlined and intuitive experience.":
        "Nói chào đến nghiên cứu phân tán, tốn thời gian trên nhiều nền tảng. TriVenture đơn giản hóa toàn bộ quy trình, cung cấp trải nghiệm dễ dàng và trực quan.",
      "Move beyond generic suggestions. TriVenture crafts itineraries that resonate with individual passions, learned preferences, and evolving travel styles.":
        "Vượt qua các đề xuất tổng quát. TriVenture tạo ra lịch trình phù hợp với sở thích cá nhân, sở thích đã học được và phát triển trong du lịch.",
      "Travel with assurance, knowing your itinerary is dynamically optimized for real-time conditions and tailored to your specific needs and desires.":
        "Du lịch với sự tự tin, biết rằng lịch trình của bạn được tối ưu hóa cho điều kiện thời gian thực và phù hợp với nhu cầu cụ thể của bạn.",
      "TriVenture envisions a future where travel planning is intuitive, personalized, and truly inspiring. We are building an AI-powered travel companion that goes beyond simple recommendations. TriVenture seamlessly integrates real-time data – from dynamic weather patterns and localized events to nuanced cultural trends – with a deep understanding of each traveler's unique preferences.":
        "TriVenture tin rằng trong tương lai, lập kế hoạch du lịch sẽ trở nên trực quan, cá nhân hóa và thực sự thú vị. Chúng tôi đang xây dựng một người bạn du lịch được hỗ trợ bởi AI, vượt qua các đề xuất đơn giản. TriVenture tích hợp dữ liệu thời gian thực – từ các mẫu thời tiết thời gian thực và sự kiện địa phương đến xu hướng văn hóa tinh tế – với sự hiểu biết sâu sắc về nhu cầu du lịch độc đáo của mỗi du khách.",
      "TriVenture: An AI-Powered Travel Destination Recommendation System with Contextual Awareness and Personalized Planning":
        "TriVenture: Hệ thống đề xuất điểm đến du lịch hỗ trợ AI với nhận thức theo ngữ cảnh và lập kế hoạch cá nhân hóa",
      "Web portal": "Trang web",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});
