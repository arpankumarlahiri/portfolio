Reddit Portfolio

Project Inspiration

I was inspired to create this Reddit portfolio project as a personal blog and knowledge management system. With diverse areas of interest, I aimed to build a platform that allows me to explore and share content in a structured and community-driven manner.

Project Overview

This project is a Reddit clone designed to serve the same purpose as Reddit itself. It provides a platform for creating subreddits (subgroups) where users can post content, engage in discussions, upvote/downvote, join groups, and comment on threads.

Key Features

Subreddit Creation: Users can create subreddits based on specific topics or interests.
Content Posting: Members of subreddits can post content related to the group's theme.
Voting System: Users can express their opinions by upvoting or downvoting content.
Group Joining: Joining groups allows users to stay updated on discussions within their areas of interest.
Discussion Threads: Commenting and engaging in discussions within threads enhance user interaction.
Functionality and User Experience

While I can't definitively say how my project stands out, the combination of features such as subreddit creation, content posting, and an intuitive voting system aims to provide users with a familiar yet enhanced Reddit-like experience.

Technology Stack

Frontend: Next.js, Chakra UI, Typescript, Recoil
Backend: Firebase
Contribution and Setup

Local Setup
To run this project locally, follow these steps:

Clone the Repository:
bash
Copy code
git clone https://github.com/your-username/reddit-portfolio.git
Navigate to the Project Directory:
bash
Copy code
cd reddit-portfolio
Install Dependencies:
bash
Copy code
npm install
Create Firebase Project:
Create a project on the Firebase Console.
Obtain the Firebase configuration credentials.
Configure Firebase Credentials:
Create a .env.local file in the project root.
Add your Firebase credentials to the file:
env
Copy code
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
Run the Application:
bash
Copy code
npm run dev
Open in Browser:
Open your browser and navigate to http://localhost:3000.
Future Development
As of now, the project doesn't have testing implemented. Future developments may include the addition of testing methodologies to enhance the reliability and robustness of the codebase.