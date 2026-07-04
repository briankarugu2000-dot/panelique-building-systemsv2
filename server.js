const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const LEADS_FILE = path.join(__dirname, 'leads.json');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure leads file exists
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf8');
}

// Helper to read leads
const readLeads = () => {
  try {
    const data = fs.readFileSync(LEADS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading leads file:', err);
    return [];
  }
};

// Helper to write leads
const writeLeads = (leads) => {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing leads file:', err);
  }
};

// Endpoints
// POST /api/leads - Save a lead
app.post('/api/leads', (req, res) => {
  const { name, email, phone, projectType, wallArea, calculatedCost, notes, source } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  const leads = readLeads();
  const newLead = {
    id: 'LEAD-' + Math.floor(100000 + Math.random() * 900000),
    name: name || 'Anonymous Contractor',
    email: email || 'N/A',
    phone,
    projectType: projectType || 'General Inquiry',
    wallArea: wallArea || 0,
    calculatedCost: calculatedCost || 0,
    notes: notes || '',
    source: source || 'Website Quote',
    submittedAt: new Date().toISOString(),
  };

  leads.unshift(newLead);
  writeLeads(leads);

  console.log(`[Lead Captured] ID: ${newLead.id}, Name: ${newLead.name}, Phone: ${newLead.phone}, Source: ${newLead.source}`);
  res.status(201).json({ success: true, lead: newLead });
});

// GET /api/leads - Retrieve all leads
app.get('/api/leads', (req, res) => {
  const leads = readLeads();
  res.json(leads);
});

// Start server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(` PANELIQUE BACKEND LEAD DB RUNNING ON PORT ${PORT}`);
  console.log(` Leads database file: ${LEADS_FILE}`);
  console.log(`==================================================`);
});
