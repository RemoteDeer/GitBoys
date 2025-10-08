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
        description: 'We are looking for a talented UI/UX designer...',
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
        description: 'Seeking a skilled writer to produce high-quality articles...',
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
        description: 'Friendly and energetic barista needed for morning shifts...',
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
        description: 'Accurate and efficient data entry specialist for a short-term project...',
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

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/search', (req, res) => {
    const { query, skills, location, format, duration, education, special } = req.query;
    let filteredTasks = tasks;

    // Filtering logic...
    if (query) {
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.company.toLowerCase().includes(query.toLowerCase()) ||
            task.description.toLowerCase().includes(query.toLowerCase())
        );
    }
    if (location) {
         filteredTasks = filteredTasks.filter(task => task.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (skills && skills.length > 0) {
        const skillArray = Array.isArray(skills) ? skills : [skills];
        filteredTasks = filteredTasks.filter(task =>
            skillArray.every(skill => task.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase()))
        );
    }
    if (format && format.length > 0) {
        const formatArray = Array.isArray(format) ? format : [format];
        filteredTasks = filteredTasks.filter(task => formatArray.includes(task.format));
    }
    if (duration && duration !== 'Any') {
        filteredTasks = filteredTasks.filter(task => task.duration === duration);
    }
    if (education && education !== 'Any level') {
        filteredTasks = filteredTasks.filter(task => task.education === education);
    }
    if (special && special.length > 0) {
        const specialArray = Array.isArray(special) ? special : [special];
        filteredTasks = filteredTasks.filter(task => 
            specialArray.every(cat => task.special.includes(cat))
        );
    }

    res.render('search', {
        tasks: filteredTasks,
        query: query || '',
        filters: req.query
    });
});

app.listen(port, () => {
    console.log(`Server is running successfully on http://localhost:${port}`);
});