const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Mock Data - Expanded with properties for filtering
const tasks = [
    {
        title: 'UI/UX Designer for Mobile App',
        salary: '$3,000 per project',
        company: 'Creative Solutions Inc.',
        location: 'Remote',
        description: 'We are looking for a talented UI/UX designer to create a modern and intuitive interface for our new fitness application...',
        posted: '17 minutes ago',
        logo: 'CS',
        skills: ['Figma', 'UI', 'UX', 'Mobile Design'],
        format: 'Online',
        duration: 'More than a week',
        education: "Bachelor's Degree",
        special: ['Suitable for students']
    },
    {
        title: 'Content Writer for Tech Blog',
        salary: '$500 per article',
        company: 'Innovatech',
        location: 'Astana',
        description: 'Seeking a skilled writer to produce high-quality articles on AI and machine learning trends.',
        posted: '2 hours ago',
        logo: 'IN',
        skills: ['Writing', 'SEO', 'AI'],
        format: 'In-person',
        duration: 'About a week',
        education: "Any level",
        special: []
    },
    {
        title: 'Part-time Barista',
        salary: '$20 per hour',
        company: 'The Daily Grind',
        location: 'Astana',
        description: 'Friendly and energetic barista needed for morning shifts. No prior experience necessary, we will train.',
        posted: '1 day ago',
        logo: 'DG',
        skills: ['Customer Service'],
        format: 'In-person',
        duration: '1-3 days',
        education: 'High School',
        special: ['Suitable for students']
    },
    {
        title: 'Data Entry Assistant',
        salary: '$150 per day',
        company: 'Global Data Corp',
        location: 'Remote',
        description: 'Accurate and efficient data entry specialist for a short-term project. Must be proficient with Excel.',
        posted: '3 days ago',
        logo: 'GD',
        skills: ['Excel', 'Data Entry'],
        format: 'Online',
        duration: 'Less than a day',
        education: 'High School',
        special: ['Accessible']
    }
];

// --- Routes ---

// Homepage Route
app.get('/', (req, res) => {
    res.render('home');
});

// Search Page Route - Updated with Filtering Logic
app.get('/search', (req, res) => {
    const { query, skills, location, format, duration, education, special } = req.query;
    let filteredTasks = tasks;

    // 1. Filter by main search query (in title, company, or description)
    if (query) {
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.company.toLowerCase().includes(query.toLowerCase()) ||
            task.description.toLowerCase().includes(query.toLowerCase())
        );
    }

    // 2. Filter by location (if provided)
    if (location) {
        if (location.toLowerCase() === 'remote') {
            filteredTasks = filteredTasks.filter(task => task.location === 'Remote');
        } else {
            filteredTasks = filteredTasks.filter(task => task.location.toLowerCase().includes(location.toLowerCase()));
        }
    }
    
    // 3. Filter by skills (task must have ALL selected skills)
    if (skills && skills.length > 0) {
        const skillArray = Array.isArray(skills) ? skills : [skills];
        filteredTasks = filteredTasks.filter(task =>
            skillArray.every(skill => task.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase()))
        );
    }

    // 4. Filter by format (can match any of the selected formats)
    if (format && format.length > 0) {
        const formatArray = Array.isArray(format) ? format : [format];
        filteredTasks = filteredTasks.filter(task => formatArray.includes(task.format));
    }

    // 5. Filter by duration
    if (duration && duration !== 'Any') {
        filteredTasks = filteredTasks.filter(task => task.duration === duration);
    }
    
    // 6. Filter by education
    if (education && education !== 'Any level') {
        filteredTasks = filteredTasks.filter(task => task.education === education);
    }

    // 7. Filter by special categories
    if (special && special.length > 0) {
        const specialArray = Array.isArray(special) ? special : [special];
        filteredTasks = filteredTasks.filter(task => 
            specialArray.every(cat => task.special.includes(cat))
        );
    }

    // THE FIX IS HERE: We now pass the 'filters' object to the template
    res.render('search', {
        tasks: filteredTasks,
        query: query || '',
        filters: req.query // This line ensures the 'filters' variable is always available
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running successfully on http://localhost:${port}`);
});