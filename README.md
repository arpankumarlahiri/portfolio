```markdown
# Reddit Portfolio

## Project Inspiration
I wanted to make my personal blog / knowledge management system, but I have many areas of interest so I thought this will be a good idea.

## Project Overview
This project is a Reddit clone and serves the same purpose as Reddit itself.

## Key Features
- **Subreddit Creation:** Users can create subreddits based on specific topics or interests.
- **Content Posting:** Members of subreddits can post content related to the group's theme.
- **Voting System:** Users can express their opinions by upvoting or downvoting content.
- **Group Joining:** Joining groups allows users to stay updated on discussions within their areas of interest.
- **Discussion Threads:** Commenting and engaging in discussions within threads enhance user interaction.

## Functionality and User Experience
I don't know, but...

## Technology Stack
- **Frontend:** Next.js, Chakra UI, Typescript, Recoil
- **Backend:** Firebase

## Contribution and Setup
### Local Setup
To run this project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/reddit-portfolio.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd reddit-portfolio
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Create Firebase Project:**
   - Create a project on the [Firebase Console](https://console.firebase.google.com/).
   - Obtain the Firebase configuration credentials.

5. **Configure Firebase Credentials:**
   - Create a `.env.local` file in the project root.
   - Add your Firebase credentials to the file:
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

6. **Run the Application:**
   ```bash
   npm run dev
   ```

7. **Open in Browser:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### Future Development
As of now, the project doesn't have testing implemented. Future developments may include the addition of testing methodologies to enhance the reliability and robustness of the codebase.

---
```
