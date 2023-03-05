# Getting Started
1. Create venv
```bash
  python -m venv venv  
```
2. Create .env file
```config
MONGODB_URI="YOUR_MONGO_DB_URI"
DB_NAME="YOUR_DB_NAME"
``` 
3. Go to frontend folder, and install Package for frontend with this command
```
pnpm install
```
4. Go back to root folder and Run API
```
python app.py
```
5. Go to frontend folder, Run frontend
```
pnpm run dev
```