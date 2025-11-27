# Frandy - Plant-Based Multivitamin Gummies 🍓

Welcome to the official repository for the Frandy landing page! This project is a modern, responsive web application built to collect pre-orders for Frandy's upcoming launch.

## 🚀 Tech Stack

-   **Frontend:** React (v18), Tailwind CSS, Lucide React
-   **Backend:** Vercel Serverless Functions (Node.js)
-   **Database:** Supabase (PostgreSQL)
-   **Email:** Nodemailer (Gmail SMTP)
-   **Deployment:** Vercel

## ✨ Features

-   **Beautiful UI:** Responsive design with a premium aesthetic.
-   **Email Collection:** Users can sign up for the waitlist.
-   **Secure Database:** Emails are stored securely in Supabase with Row Level Security (RLS).
-   **Instant Notifications:** Users receive a custom "Thank You" email immediately upon signup.
-   **Status Tracking:** The system tracks whether the welcome email was successfully sent.

## 🛠️ Local Development

### Prerequisites

-   Node.js (v18 or higher)
-   npm
-   Vercel CLI (`npm i -g vercel`)

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nwopes/frandy-frontend.git
    cd frandy-frontend/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `frontend` directory with the following keys:
    ```env
    REACT_APP_SUPABASE_URL=your_supabase_url
    REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=465
    SMTP_USER=your_email@gmail.com
    SMTP_PASS=your_app_password
    ```

4.  **Run Locally:**
    Since this project uses Vercel Serverless Functions, you must use `vercel dev` instead of `npm start`.
    ```bash
    vercel dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  **Important:** Add all the environment variables from your `.env` file to the Vercel Project Settings.
4.  Deploy!

## 🔒 Security

-   **RLS (Row Level Security):** The Supabase `emails` table is protected.
-   **Public Access:** Anonymous users can `INSERT` emails (via the backend API).
-   **Private Access:** Only the backend API (using the Service Role Key) can `UPDATE` records.
-   **Environment Variables:** Sensitive keys are never exposed to the client-side bundle (except the Anon key, which is safe).

## 📄 License

This project is proprietary to the Frandy Team.
