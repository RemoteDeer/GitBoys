// 1. IMPORT LIBRARIES
// =================================================================================================
// Import the 'express' library to create and manage the server.
const express = require('express');
// Import the 'path' library to handle and transform file paths.
const path = require('path');

// 2. INITIALIZE THE APP
// =================================================================================================
// Create an instance of an Express application.
const app = express();
// Define the port the server will run on. Use an environment variable or default to 3000.
const PORT = process.env.PORT || 3000;

// 3. CONFIGURE THE APP (MIDDLEWARE & VIEW ENGINE)
// =================================================================================================
// Set EJS as the template engine.
app.set('view engine', 'ejs');
// Specify the directory where the template files are located.
app.set('views', path.join(__dirname, 'views'));

// Serve static files (like CSS, client-side JS, images) from the 'public' directory.
// This makes files like 'translator.js' and 'main.js' accessible to the browser.
app.use(express.static(path.join(__dirname, 'public')));


// 4. MOCK DATABASE
// =================================================================================================
// In a real application, this data would come from a database (like PostgreSQL, MongoDB, etc.).
// For now, we'll use a simple array of objects to simulate our task data.
const tasks = [
    {
        title: 'UI/UX Designer for Mobile App',
        salary: '$3,000 per project',
        company: 'Creative Solutions Inc.',
        location: 'Remote',
        description: 'We are looking for a talented UI/UX designer to create a modern and intuitive interface for our new fitness application...',
        postedAgo: '17 minutes ago',
        logo: 'CS'
    },
    {
        title: 'Technical Content Writer (Node.js)',
        salary: '$50 per hour',
        company: 'DevScribes',
        location: 'Astana, Kazakhstan',
        description: 'Write high-quality technical articles and tutorials about Node.js, Express, and modern web development practices.',
        postedAgo: '2 hours ago',
        logo: 'DS'
    },
    {
        title: 'Social Media Manager for a Week-long Campaign',
        salary: '$800 for the campaign',
        company: 'Buzzify Marketing',
        location: 'Remote',
        description: 'Manage our social media channels (Twitter, Instagram) for an upcoming product launch campaign. Must be an expert in engagement.',
        postedAgo: '1 day ago',
        logo: 'BM'
    },
    {
        title: 'Urgent: Fix a Bug in a Python Script',
        salary: '$150 fixed price',
        company: 'DataCorp',
        location: 'Remote',
        description: 'We have a Python script for data processing that has a critical bug. We need an expert to identify and fix it within the next 24 hours.',
        postedAgo: '3 days ago',
        logo: 'DC'
    },
    {
        title: 'Create a Logo for a New Cafe',
        salary: '$400 fixed price',
        company: 'The Daily Grind',
        location: 'Almaty, Kazakhstan',
        description: 'Design a creative and memorable logo for a new specialty coffee shop opening soon. Must provide vector files.',
        postedAgo: '5 days ago',
        logo: 'DG'
    }
];

// 5. DEFINE ROUTES
// =================================================================================================
// Homepage Route: Renders the home.ejs template.
app.get('/', (req, res) => {
    // res.render() finds the specified EJS file in the 'views' folder,
    // processes it, and sends the resulting HTML to the browser.
    res.render('home');
});

// Search Results Route: Renders the search.ejs template with task data.
app.get('/search', (req, res) => {
    // Get the search query from the URL (e.g., /search?query=designer)
    const query = req.query.query ? req.query.query.toLowerCase() : '';

    // Filter the tasks based on the query.
    // If there's no query, all tasks will be shown.
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.company.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
    );
    
    // Render the 'search' view and pass the 'filteredTasks' array to it.
    // Inside search.ejs, this array will be available as the 'tasks' variable.
    // We also pass the original query to pre-fill the search bar.
    res.render('search', { tasks: filteredTasks, query: req.query.query || '' });
});


// 6. START THE SERVER
// =================================================================================================
// Make the app listen for incoming requests on the specified port.
app.listen(PORT, () => {
    console.log(`Server is running successfully on http://localhost:${PORT}`);
});