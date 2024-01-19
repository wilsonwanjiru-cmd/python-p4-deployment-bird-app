
Learning Goals
    • Understand the React build process and how to serve a React app from Flask.
    • Grasp the challenges of client-side routing in a deployed application.
    • Deploy a full-stack Flask-React application to Render.

    Setup
    1. Fork the repository from GitHub.
    2. Set up the repository locally:
       bashCopy code
       npm install --prefix client
       pipenv install && pipenv shell
    3. Create a .env file at the root and add the following variable:
       plaintextCopy code
       DATABASE_URI=postgresql://{retrieve this from Render}
       Use the load_dotenv() function in server/app.py to import environment variables.
    4. Run the following commands to install, upgrade, and seed the database:
       bashCopy code
       cd server
       flask db upgrade
       python seed.py
    5. Run the app locally:
       bashCopy code
       honcho start -f Procfile.dev
React Production Build
    1. Build the production version of the React app:
       bashCopy code
       npm run build --prefix client
    2. Add static routes to Flask in app.py:
       pythonCopy code
       app = Flask(
           __name__,
           static_url_path='',
           static_folder='../client/build',
           template_folder='../client/build'
       )
       
       @app.route('/')
       @app.route('/<int:id>')
       def index(id=0):
           return render_template("index.html")
    3. Run the Flask server:
       bashCopy code
       gunicorn --chdir server app:app
    4. Visit http://localhost:8000 to view the production version of the React application.
React Production Build
    1. Build the production version of the React app:
       bashCopy code
       npm run build --prefix client
    2. Add static routes to Flask in app.py:
       pythonCopy code
       app = Flask(
           __name__,
           static_url_path='',
           static_folder='../client/build',
           template_folder='../client/build'
       )
       
       @app.route('/')
       @app.route('/<int:id>')
       def index(id=0):
           return render_template("index.html")
    3. Run the Flask server:
       bashCopy code
       gunicorn --chdir server app:app
    4. Visit http://localhost:8000 to view the production version of the React application.
Render Build Process
    1. Commit changes to your fork on GitHub and copy the project URL.
    2. Navigate to Render dashboard.
    3. Create a new web service, connect the repository, and set the following:
        ◦ Build Command:
          bashCopy code
          pip install -r requirements.txt && npm install --prefix client && npm run build --prefix client
        ◦ Start Command:
          bashCopy code
          gunicorn --chdir server app:app
        ◦ Environment Variables:
            ▪ DATABASE_URI=postgresql://{retrieve this from Render}
            ▪ PYTHON_VERSION=3.8.13
    4. Save changes and wait for deployment completion.
    5. Check the "Events" tab for progress and errors.
    6. Once the site is "Live," visit your site URL and experience the deployed Flask-React application on Render.

    
