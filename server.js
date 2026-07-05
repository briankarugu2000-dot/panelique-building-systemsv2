const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');

try { require('dotenv').config(); } catch (_) {}

const app = express();
const PORT = process.env.PORT || 3001;
const LEADS_FILE = path.join(__dirname, 'leads.json');

const NOTIFY_EMAIL = 'briankarugu2000@gmail.com';

app.use(cors());
app.use(express.json());

if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf8');
}

const readLeads = () => {
  try {
    const data = fs.readFileSync(LEADS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading leads file:', err);
    return [];
  }
};

const writeLeads = (leads) => {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing leads file:', err.message);
  }
};

const smtpConfigured = () => {
  return !!(process.env.SMTP_USER && process.env.SMTP_PASS);
};

let transporter = null;
if (smtpConfigured()) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  console.log('[SMTP] Email notifications enabled');
} else {
  console.log('[SMTP] SMTP not configured — emails disabled');
}

const sendLeadEmail = async (lead) => {
  if (!transporter) return;
  try {
    await transporter.sendMail({
      from: `"Panelique" <${process.env.SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      subject: `New Lead: ${lead.name} - ${lead.source}`,
      html: `
        <h2>New Lead</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${lead.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${lead.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${lead.phone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Project</td><td style="padding:8px;border:1px solid #ddd">${lead.projectType}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Wall Area</td><td style="padding:8px;border:1px solid #ddd">${lead.wallArea} m²</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Cost</td><td style="padding:8px;border:1px solid #ddd">Ksh ${(lead.calculatedCost || 0).toLocaleString()}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Notes</td><td style="padding:8px;border:1px solid #ddd">${lead.notes || 'N/A'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Source</td><td style="padding:8px;border:1px solid #ddd">${lead.source}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Time</td><td style="padding:8px;border:1px solid #ddd">${lead.submittedAt}</td></tr>
        </table>
      `,
    });
    console.log(`[Email Sent] Lead ${lead.id} notified to ${NOTIFY_EMAIL}`);
  } catch (err) {
    console.error('[Email Error]', err.message);
  }
};

app.post('/api/leads', async (req, res) => {
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

  await sendLeadEmail(newLead);

  res.status(201).json({ success: true, lead: newLead });
});

app.get('/api/leads', (req, res) => {
  const leads = readLeads();
  res.json(leads);
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(` PANELIQUE BACKEND LEAD DB RUNNING ON PORT ${PORT}`);
  console.log(` Notifications to: ${NOTIFY_EMAIL}`);
  console.log(` Leads database file: ${LEADS_FILE}`);
  console.log(`==================================================`);
});
