🎯 Content Matrix Generator
Content Matrix Generator will help you create hooks to use for creating videos on TikTok, Instagram, and YouTube to help promote your writing.

🚀 Deploying to Vercel
Deploying this project to Vercel is an excellent choice , as their system is built for this exact project structure (static frontend + api folder). This guide will walk you through the steps to get your app live.


Prerequisites 


A Google API Key: This is required for Gemini to run. Get your key at https://aistudio.google.com/api-keys.



A GitHub Account: Vercel's best workflow is to connect directly to a GitHub repository.


A Vercel Account: Sign up for a free account at vercel.com and connect it to your GitHub account.

🚀 Step-by-Step Deployment Guide
Step 1: Prepare Your Project for GitHub
Before you upload your code, you need to add one important file to ensure you don't upload unnecessary folders (like node_modules).

Create a .gitignore file in the root of your project. Add this single line to it:


node_modules/
This tells Git to ignore the node_modules folder.

Step 2: Push Your Project to GitHub
First, create a new, empty repository on GitHub (e.g., "content-matrix-pwa").

From your project folder in your terminal, run these commands to upload your code:

Bash

# Initialize a new git repository
git init

# Add all your files (including the new .gitignore)
git add . 

# Make your first save (commit)
git commit -m "Initial commit for Content Matrix PWA" [cite: 12]

# Link your local folder to the GitHub repo (use the URL GitHub gives you)
git remote add origin https://github.com/your-username/content-matrix-pwa.git [cite: 12]

# Push your code to GitHub
git push -u origin main [cite: 12]
Step 3: Import Your Project in Vercel
Log in to your Vercel dashboard.

Click "Add New..." and select "Project".

Find your new GitHub repository (content-matrix-pwa) and click the "Import" button next to it.

Step 4: Configure and Deploy
This is the most important step.


Framework Preset: Vercel should auto-select "Other". This is correct. It tells Vercel to serve index.html from the root and turn the api/ folder into serverless functions.




Build and Output Settings: Leave these blank. Your project doesn't have a build step.


Environment Variables: This is critical.

Click to expand the "Environment Variables" section.

In the Name field, type GEMINI_API_KEY.

In the Value field, paste your secret Google API key.

Click "Add".


Deploy: Click the "Deploy" button.

That's it! Vercel will deploy your site and API functions. After 1-2 minutes, your project will be live on a public URL.
