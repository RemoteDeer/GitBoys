const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Mock Data - With translations
const tasks = [
    {
        title: { en: 'UI/UX Designer for Mobile App', ru: 'UI/UX Дизайнер для мобильного приложения', kk: 'Мобильді қосымшаға арналған UI/UX дизайнері' },
        salary: { amount: 3000, currency: 'USD', period: 'project' },
        company: 'Creative Solutions Inc.',
        location: { type: 'remote' },
        description: { en: 'We are looking for a talented UI/UX designer...', ru: 'Ищем талантливого UI/UX дизайнера...', kk: 'Біз талантты UI/UX дизайнерін іздейміз...' },
        posted: '17 minutes ago',
        logo: 'CS',
        skills: ['Figma', 'UI', 'UX', 'Mobile Design'],
        format: 'online',
        duration: 'more_than_week', 
        education: 'bachelors', 
        special: ['students'] 
    },
    {
        title: { en: 'Content Writer for Tech Blog', ru: 'Автор контента для технического блога', kk: 'Техникалық блогқа контент жазушы' },
        salary: { amount: 225000, currency: 'KZT', period: 'project' }, 
        company: 'Innovatech',
        location: { type: 'on-site', city: 'Astana', country: 'Kazakhstan' },
        description: { en: 'Seeking a skilled writer to produce high-quality articles...', ru: 'Ищем опытного автора для написания качественных статей...', kk: 'Жоғары сапалы мақалалар жазу үшін білікті жазушыны іздеудеміз...' },
        posted: '2 hours ago',
        logo: 'IN',
        skills: ['Writing', 'SEO', 'AI'],
        format: 'in_person',
        duration: 'about_week',
        education: "any",
        special: []
    },
    {
        title: { en: 'Part-time Barista', ru: 'Бариста на неполный рабочий день', kk: 'Жарты күн жұмыс істейтін бариста' },
        salary: { amount: 9000, currency: 'KZT', period: 'hour' }, 
        company: 'The Daily Grind',
        location: { type: 'on-site', city: 'Astana', country: 'Kazakhstan' },
        description: { en: 'Friendly and energetic barista needed for morning shifts...', ru: 'Требуется дружелюбный и энергичный бариста на утренние смены...', kk: 'Таңертеңгі ауысымға мейірімді және жігерлі бариста қажет...' },
        posted: '1 day ago',
        logo: 'DG',
        skills: ['Customer Service'],
        format: 'in_person',
        duration: '1_3_days',
        education: 'high_school',
        special: ['students']
    },
    {
        title: { en: 'Data Entry Assistant', ru: 'Ассистент по вводу данных', kk: 'Деректерді енгізу жөніндегі көмекші' },
        salary: { amount: 150, currency: 'USD', period: 'day' },
        company: 'Global Data Corp',
        location: { type: 'remote' },
        description: { en: 'Accurate and efficient data entry specialist...', ru: 'Требуется точный и эффективный специалист...', kk: 'Деректерді енгізу бойынша ұқыпты және тиімді маман қажет...' },
        posted: '3 days ago',
        logo: 'GD',
        skills: ['Excel', 'Data Entry'],
        format: 'online',
        duration: 'less_than_day',
        education: 'high_school',
        special: ['accessible']
    }
];

//

// --- Routes ---

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/search', (req, res) => {
    const { query, skills, location, format, duration, education, special } = req.query;
    let filteredTasks = tasks;

    // Filtering query
    if (query) {
        // Split the query into individual search terms
        const searchTerms = query.toLowerCase().split().filter(term => term);

        filteredTasks = filteredTasks.filter(task => {
            // Combine all searchable text fields of a task into one string
            const searchableText = [
                task.title,
                task.company,
                task.location,
                task.description,
                task.skills,
                task.special

        ].join(' ').toLowerCase();
        
        // Check if ALL search terms are included in the task's text
        return searchTerms.every(term => searchableText.includes(term));
        });
    }

    // -- Filtering options --

    //Filtering Location
    if (location) {
         filteredTasks = filteredTasks.filter(task => 
            task.location.toLowerCase().includes(location.toLowerCase()));
    }

    //Filtering Skills
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