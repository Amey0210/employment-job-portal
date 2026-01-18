# Job Portal App

A full-stack job portal built using MongoDB, Express.js, React.js, and Node.js, with separate dashboards for Students and Recruiters.


## Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React.js, Redux Toolkit, Tailwind CSS, shadcn/ui, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose (ODM) |
| **Cloud Storage** | Cloudinary (Resumes & Profile Photos) |
| **Security** | JWT (JSON Web Tokens), bcrypt.js |
| **File Handling** | Multer |

---

## Key Features

### For Students (Job Seekers)
* **Smart Search:** Find jobs using keyword search combined with location and category filters.
* **Seamless Applications:** Apply for jobs with one click and track application status (Pending, Accepted, Rejected).
* **Dynamic Profiles:** Manage a professional bio, list skills, and upload/update resumes.
* **Persistent State:** User sessions and application data remain intact even after refresh using Redux Persist.

### For Recruiters (Admins)
* **Company Management:** Register and update company profiles with logos.
* **Job Lifecycle:** Post new job openings with detailed requirements and salary brackets.
* **Applicant Tracking System (ATS):** Review applicant profiles, view resumes, and update hiring status in real-time.

---

## Project Structure

```text
├── backend/          # Node.js & Express server, Models, Controllers, Routes
├── frontend/         # React.js application (Vite), Redux slices, Components
└── README.md         # Documentation