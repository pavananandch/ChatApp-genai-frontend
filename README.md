# ChatApp

A simple ChatGPT-like application built with Ionic Angular.

## Prerequisites

- **Node.js**: v18.x or newer recommended  
- **npm**: v9.x or newer  
- **Ionic CLI**: v7.x or newer  
  Install globally if needed:
  ```
  npm install -g @ionic/cli
  ```

## Setup Instructions

1. **Clone the repository**
   ```
   git clone <your-repo-url>
   cd chatApp
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Run the development server**
   ```
   ionic serve
   ```

   This will open the app in your default browser.

## Project Structure

- `src/app/folder/` — Main chat widget and logic
- `src/app/services/data.service.ts` — Handles backend API calls
- `src/assets/` — Profile images and other assets

## Notes

- Ensure your backend server (API) is running at `http://localhost:3000` or update the URL in `data.service.ts`.
- For best results, use the recommended Node and Ionic versions.
- You can customize profile images by replacing files in `src/assets/`.

## Useful Commands

- **Build for production:**  
  ```
  ionic build
  ```
- **Run on device/emulator:**  
  ```
  ionic cap run android
  ionic cap run ios
  ```

---

**Enjoy building your chat app!**
