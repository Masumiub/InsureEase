# InsureEase

A modern insurance management web application that allows users to explore insurance plans, book policies, and manage their requests with ease. The platform provides an intuitive interface for customers while also enabling administrators to manage plans and bookings efficiently.

🔗 **Live Demo:** [https://insure-ease-seven.vercel.app/](https://insure-ease-seven.vercel.app/)

---

## 📜 Description

**InsureEase** is a full-stack Next.js application designed for insurance agencies and customers.  
Users can browse available insurance plans, view plan details, make bookings, and track their policies.  
Admins can manage insurance plans, approve or reject bookings, and oversee user interactions.

---

## 🚀 Top 5 Features

1. **Authentication & Authorization**
   - Secure login and registration using NextAuth.js
   - Role-based access (Admin & User)

2. **Insurance Plan Management**
   - Browse plans by type and view detailed plan information
   - Admins can add, edit, and delete plans

3. **Policy Booking System**
   - Users can submit booking requests for insurance plans
   - Bookings have status tracking (`pending`, `approved`, `rejected`)

4. **My Policies Page**
   - Logged-in users can view their active and pending policies
   - Links to view plan details directly

5. **Responsive UI**
   - Fully responsive design optimized for desktop and mobile

---

## 🛠 Tech Stack

**Frontend:**
- [Next.js 14+](https://nextjs.org/) (App Router)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

**Backend & Database:**
- [MongoDB](https://www.mongodb.com/)
- [NextAuth.js](https://next-auth.js.org/)

**Other Tools & Packages:**
- TypeScript
- Zod (data validation)
- DaisyUI (UI components)
- ESLint & Prettier

---

## 📦 NPM Packages Used

- `next` – Core framework
- `react` & `react-dom` – UI rendering
- `next-auth` – Authentication
- `mongodb` – Database driver
- `zod` – Schema validation
- `tailwindcss` & `daisyui` – Styling and components
- `@types/node`, `@types/react` – TypeScript types
- `eslint`, `eslint-config-next` – Linting

---

## 🖥 Running Locally

Follow these steps to run the project on your local machine:

### 1️⃣ Clone the Repository
- git clone https://github.com/Masumiub/InsureEase
- cd insure-ease


### 2️⃣ Install Dependencies
npm install

### 3️⃣ Create .env.local File
- Create a .env.local file in the root directory with the following variables:
- MONGODB_URI=your_mongodb_connection_string
- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_SECRET=your_secret_key


### 4️⃣ Run the Development Server
- npm run dev


### 5️⃣ Build for Production
- npm run build
- npm start

