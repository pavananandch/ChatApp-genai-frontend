# Express.js + Ollama API Workshop

Welcome to the hands-on workshop!  
In this guide, you'll learn how to build a Node.js REST API using Express, add PDF parsing, and connect to the Ollama API for AI-powered responses.

---

## 1. Prerequisites & Installation Check

Before you start, make sure you have:

- **Node.js v18 or newer**  
  Check your version:
  ```sh
  node -v
  ```
  If your version is less than 18, download and install the latest Node.js from [nodejs.org](https://nodejs.org/).

- **npm** (comes with Node.js)  
  Check:
  ```sh
  npm -v
  ```

- **Ollama**  
  Download and install Ollama from [ollama.ai](https://ollama.ai).  
  Verify installation:
  ```sh
  ollama --version
  ```

- **Pull the `gemma3` model**  
  After installing Ollama, pull the required model:
  ```sh
  ollama pull gemma3:1b-it-qat
  ```

- **Test Ollama in the Console**  
  Run the following command to test the `gemma3` model:
  ```sh
  ollama chat gemma3:1b-it-qat
  ```
  Example prompts to try in the console:
  ```
  You are an expert software developer. Explain the concept of REST APIs.
  ```
  ```
  What is the difference between GET and POST methods in HTTP?
  ```

---

## 2. Create a New Node.js Project

1. **Create a project folder:**
   ```sh
   mkdir backend
   cd backend
   ```

2. **Initialize npm:**
   ```sh
   npm init -y
   ```

---

## 3. Install Dependencies

Install Express, CORS, Multer, and pdf-parse:
```sh
npm install express cors multer pdf-parse
```

---

## 4. Create a Basic REST API

1. **Create a file named `index.js`:**
   ```javascript
   const express = require("express");
   const cors = require("cors");

   const app = express();
   app.use(express.json());
   app.use(cors());

   app.get('/', (req, res) => {
       res.send("sample api");
   });

   app.post('/query', (req, res) => {
       res.send({ message: "Received your query!", query: req.body.query });
   });

   app.listen(3000, () => {
       console.log("Server running on port 3000");
   });
   ```

2. **Run your server:**
   ```sh
   node index.js
   ```

3. **Test the API using Postman or curl:**
   ```sh
   curl http://localhost:3000/
   curl -X POST http://localhost:3000/query -H "Content-Type: application/json" -d "{\"query\":\"Hello\"}"
   ```

---

## 5. Add Ollama API Integration

Replace your `/query` endpoint with the following code to connect to Ollama:

```javascript
app.post('/query', async (req, res) => {
    try {
        let response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "gemma3:1b-it-qat",
                prompt: `you are an expert software developer.
                Answer the question as best as you can. Provide short and concise answers.
                ${req.body.query}`,
                stream: false,
                "options": {
                    "num_ctx": 4000,
                }
            })
        });
        const text = await response.text();
        // NDJSON parsing
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const jsonObjects = lines.map(line => JSON.parse(line));
        const fullResponse = jsonObjects.map(obj => obj.response).join('');
        res.send({ response: fullResponse });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to get response from Ollama API" });
    }
});
```

**Note:**  
- This uses the built-in global `fetch` (Node.js v18+).
- Make sure Ollama is running locally on port 11434.

---

## 6. Start the Project

```sh
npm start
```
Or, if you don't have a `start` script in `package.json`:
```sh
node index.js
```

---

## 7. Next Steps

- Try sending different queries to `/query`.
- Extend the API with PDF parsing or other features.

---

# Ionic Chat App Workshop

Welcome to the hands-on workshop!  
In this guide, you'll learn how to run and explore an Ionic Chat App, understand its code, and generate an Android build.

---

## 1. Prerequisites & Installation Check

Before you start, make sure you have:

- **Node.js v18 or newer**  
  Check your version:
  ```sh
  node -v
  ```
  If your version is less than 18, download and install the latest Node.js from [nodejs.org](https://nodejs.org/).

- **npm** (comes with Node.js)  
  Check:
  ```sh
  npm -v
  ```

- **Ionic CLI**  
  Install globally:
  ```sh
  npm install -g @ionic/cli
  ```
  Verify installation:
  ```sh
  ionic -v
  ```

- **Git**  
  Check:
  ```sh
  git --version
  ```

---

## 2. Clone the Ready-to-Use Ionic Project

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd chatApp
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the app:**
   ```sh
   ionic serve
   ```

4. Open the app in your browser at `http://localhost:8100`.

---

## 3. Explore the Code

The project is structured as follows:

- **`src/app/folder`**: Contains the main chat widget code.
- **`src/app/services`**: Contains the `DataService` for API communication.
- **`src/app/app.component.*`**: Contains the side menu and app-level configuration.

---

## 4. Generate an Android Build

To generate an Android build, follow these steps:

1. **Install Android Studio:**
   - Download and install Android Studio from [developer.android.com](https://developer.android.com/studio).
   - Ensure the Android SDK and platform tools are installed.

2. **Add the Android platform:**
   ```sh
   ionic capacitor add android
   ```

3. **Build the app:**
   ```sh
   ionic build
   ```

4. **Sync the build with Android Studio:**
   ```sh
   npx cap sync android
   ```

5. **Open the project in Android Studio:**
   ```sh
   npx cap open android
   ```

6. **Generate the APK:**
   - In Android Studio, select **Build > Build Bundle(s)/APK(s) > Build APK(s)**.
   - Once the build is complete, locate the APK file in the `app/build/outputs/apk/debug` folder.

---

## 5. Install the APK on Your Mobile Device

1. **Transfer the APK to your mobile device.**
2. **Enable "Install Unknown Apps" on your device.**
3. **Install the APK and open the app.**

---

## 6. Next Steps

- Explore the app's functionality.
- Modify the code to add new features.
- Share your learnings with the group!

---
