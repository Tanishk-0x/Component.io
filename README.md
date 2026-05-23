# ⚡Component-io (AI-Powered Component Engine) 

Component-io is an intelligent toolkit that lets you effortlessly discover, create, and integrate modern UI components into your web projects.
You can browse a rich library of pre-existing designs or describe exactly what you need in plain English to have our AI generate the custom 
code instantly. Test and tweak your elements in a live browser sandbox, then seamlessly pull the final code directly into your local project
using our quick npx CLI tool.

### 🌟Key Features: 
* AI-Powered Generation: Just describe the component in plain English. the AI instantly translates your prompt into clean, ready to use React code.
* Live Interactive Sandbox: No more guessing what the code looks like. Tweak, test, and play with your components in a built-in browser playground before you ever download them.
* Instant CLI Integration: Ditch the messy copy-paste. Use seamless npx command line tool to beam components directly into your local project files in seconds.
* Curated Component Library: Don't want to start from scratch? Browse a rich, ever-growing repository of beautiful, pre-built UI elements ready for immediate use.
* Robust Admin Controls: Full command over the ecosystem. Dedicated admin dashboards allows admin to effortlessly curate the library, moderate AI generations, manage users, and maintain components.
* Tiered Credit Packs (Stripe Integrated): Power up your creation engine with flexible credit bundles processed securely through Stripe. Choose between the 200 Credit Pack for steady building or the 500 Credit Pack to unlock heavy-duty, high-volume AI generations.
* Developer-First Design: Built by developers, for developers. Enjoy a sleek, distraction-free dark theme optimized for long coding sessions and maximum productivity. 

### ✨AI Component Generation  
This feature generates a ready-to-use React and Tailwind component based on your text prompt. You can view a live preview and instantly integrate it into your local project using a simple copy-paste or a single CLI command.
#### Key Capabilities:  
* Context-Aware Prompts: The engine accepts plain English descriptions. Whether you type "Give me a clean testimonial slider" or a complex request like "Create a dark-themed pricing card with an annual toggle switch, interactive hover states, and dynamic gradient borders", the AI understands the layout requirements perfectly.
* Vector-Based Semantic Caching: Instead of hitting the LLM for every single request, the system converts prompts into mathematical vector embeddings. It runs a similarity search across a vector database to look for matching intents. If another user previously asked for something semantically identical (e.g., "Dark mode sign-in form" vs. "Dark theme login box"), it serves the cached component instantly with zero token cost.
* Instantly Usable Code: The AI doesn't just give you a basic template; it writes fully working React components. If you ask for an interactive form, it builds a form that actually accepts typing and button clicks, ready to be dropped straight into your app.
* Beautiful, Modern Styling: Every generated component is automatically designed using Tailwind CSS. This means your new UI will look highly professional, automatically resize for mobile phones, and fit perfectly into modern dark-themed websites without any extra effort.
* Seamless Integration (Copy/Paste or CLI): Once your component looks perfect in the live sandbox, getting it into your codebase is frictionless. You can manually copy the generated code, or use a single npx command to beam the files directly into your local project.
#### Preview: 
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1ujLxK1Qb6mDpESMXTVS4-enTwDhKB1gd" alt="AI Generation Demo" width="90%">
</p>

### ✨Pre-Exist Component Library
Browse a rich collection of professionally designed, ready-to-use UI components. Skip the generation process and instantly find exactly what you need.
#### Details: 
* Instant Search & Browsing: Quickly search through the database to find existing components by name or category.
* Live Sandbox Preview: Just like AI generations, every pre-built component opens in the live browser environment so you can test it before downloading.
* One-Click Integration: Seamlessly pull any library component straight into your local project using a direct copy-paste or the custom npx CLI command.
#### Preview: 
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=17w8fOh8TPyI8JuCI6BlhXiebwZezI0DI" alt="Components" width="90%">
</p>

### ✨Seamless CLI Integration
Streamline your development workflow with a dedicated command-line tool. Fetch and inject components straight into your project's architecture with a single keystroke, bypassing manual file creation entirely.
#### Details: 
* Executable Tooling: A custom-built CLI for instant execution via npx component-io.
* Automated Scaffolding: Connects directly to the backend API to retrieve component data and automatically structures the necessary .jsx/.tsx files in your specified directory.
#### Preview: 
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=14pTGVSSzzl_3juPWdsD67ysxNMUHdK-x" alt="CLI Demo" width="90%">
</p>

### ✨User Profile Dashboard 
A dedicated personal space to manage your UI library. Easily access your saved components, track your available AI credits, and check your account verification status all in one place.
#### Details: 
* Saved Components: Securely links your account to your favorite components in the database for instant access anytime.
* Account Verification: Uses secure authentication to manage and display your account status (Verified vs. Unverified).
* Credit Tracking: Automatically syncs with the backend to show exactly how many AI generation credits you have left in real-time.
#### Preview: 
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1ORcVenfFPjIye-N54sfunkWzROY_0MCZ" alt="Profile" width="90%">
</p>

### ✨Admin Dashboard
A secure, centralized control panel to manage the entire platform. Easily monitor user accounts, track credit usage, and review generated components to keep the public library high quality.
#### Details: 
* Secure Access: Protected by special admin-only permissions, ensuring only authorized Admin can access sensitive platform settings.
* Content Moderation: Provides simple tools to review, approve, or delete AI-generated components before they are available publicly for users.
* User Management: Allows admins to view all registered accounts, monitor platform activity.
* Manual Component Upload: Allows admins to manually write and publish their own custom UI components directly to the public library.
#### Preview: 
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1spJlLcDVUZ2yUbHb7ffAbfKqOvYiY5FJ" alt="Admin" width="90%">
</p>



## ⚡Security & Performance
* Vector-Based Semantic Caching: Instead of hitting the Gemini API for every single request, user prompts are converted into vector embeddings. If a structurally similar request is found in the database, the system serves the cached component instantly. This drops latency from seconds to milliseconds and drastically cuts LLM token costs.
* Data Pagination: Loading all the components at once would crash the browser. I used Pagination to load only 12 to 15 components at a time. As user clicks "Next", the next batch is fetchhed, keeps the website fast.
* Debouncing: Implemented a 400ms debounce on the component search bar (both in the web UI and the CLI tool) to wait for the user to stop typing before firing requests. This prevents server overload and reduces unnecessary database queries.
* Optimized Database Reads (.lean()): For all read-only operations—like fetching a user's saved components or browsing the public library—I utilized Mongoose's .lean() method. This bypasses the heavy Mongoose document wrappers, making data fetching significantly faster and less memory-intensive.
* API Rate Limiting: Applied strict rate-limiting middleware on the AI generation endpoints. This protects the backend from malicious bot traffic, prevents spam, and ensures unpredictable API billing spikes do not occur.
* Secure Stripe Webhooks: Integrated Stripe webhook signature verification. This ensures that the backend only updates a user's credit balance when the request mathematically proves it came directly from Stripe's secure servers, preventing spoofed payment events.
* JWT Authentication: All sensitive actions (like generating code, spending credits, or accessing the Admin Dashboard) are heavily protected by stateless JSON Web Tokens (JWT).
* Bcrypt Hashing: Used bcrypt to securely hash user passwords, ensuring that sensitive credentials are encrypted and never stored in plain text inside the database.

## 🛠️Technology Used 
```
ReactJs | Node | ExpressJs | MongoDB | LLM(APIs) | SandPack | Vector Search
```

## ⚙️Installation & Setup
1. Clone the repo:
```
git clone https://github.com/Tanishk-0x/Component.io
```

2. Navigate to /Backend:
```
cd Backend
```

3. Install Backend Dependencies:
```
npm install 
```

4. Navigate to /Frontend & Install Dependencies:
```
cd Frontend && npm install
```

5. Set Environment Variables (.env):
```
PORT = 
MONGO_URL = ""
ACCESS_TOKEN_SECRET = ""
REFRESH_TOKEN_SECRET = ""
NODE_ENV = ""
STRIPE_SECRET_KEY = ""
STRIPE_WEBHOOK_SECRET = ""
GROQ_API_KEY = ""
GEMINI_API_KEY = ""
GROQ_API_KEY = ""
HOST_EMAIL = ""
EMAIL_APP_PASSWORD = ""
```

6. Start the Server:
```
npm run dev
```

7. Run the Project:
```
npm run dev
```
