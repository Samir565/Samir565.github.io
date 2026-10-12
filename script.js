/**
 * Muhammad Samir Malik — Portfolio Client Script
 * Complete vanilla JavaScript for tabs, modals, copy tools, form validation, and navigation
 */

// 1. Data Store for Detailed Project Modals
const projectDossiers = {
  "smart-meter": {
    title: "Smart Metering System — Energy Tracker",
    category: "Final Year Project | Smart Energy Systems",
    badge: "Flagship Capstone Project",
    overview: "Developed an intelligent energy monitoring prototype to extract and process readings from three-phase electricity meters for efficient energy management.",
    objective: "To design, develop, and validate an intelligent three-phase energy monitoring prototype capable of extracting, digitizing, and processing electrical consumption metrics for real-time visibility and efficient energy auditing.",
    problemStatement: "Conventional metering infrastructures in multi-phase industrial and commercial environments lack accessible, automated telemetry interfaces. Manual meter audits lead to delayed consumption insights, unmonitored power factor drops, and an inability to dynamically balance three-phase loads.",
    proposedSystem: "The Energy Tracker prototype interfaces with three-phase electricity metering hardware to capture active, reactive, and apparent power metrics. Extracted signal streams are conditioned, converted, and pre-processed through embedded processing logic to provide granular load profiling without requiring proprietary closed-loop utility interfaces.",
    architecture: "Three-Phase Lines (L1, L2, L3, N) -> Signal Conditioning & Potential/Current Transformers -> Analog Front-End / Microcontroller Digitizer -> Data Parsing & Feature Extraction Firmware -> Energy Monitoring Telemetry Interface.",
    readingExtraction: "High-precision sampling of voltage and current waveforms per phase, numerical calculation of RMS values, apparent power (kVA), active power (kW), reactive power (kVAR), and phase angles. Clean digital payload generation ready for local logging and transmission.",
    tools: ["Circuit Simulation Tools", "Altium Designer", "C/C++ Embedded Firmware", "Instrumentation Fixtures", "MATLAB (Validation)"],
    results: [
      "Constructed a working laboratory prototype capable of capturing multi-channel electrical readings across simulated three-phase loads.",
      "Demonstrated automated reading extraction eliminating manual logging bottlenecks.",
      "Verified signal integrity and phase angle alignment against calibrated benchmark instruments in laboratory trials."
    ],
    limitations: [
      "Tested primarily under laboratory-scale voltage and controlled load conditions; full industrial high-voltage isolation certification pending utility compliance standards.",
      "Long-term ambient thermal stress and high-frequency harmonic distortion effects require further empirical validation in harsh electrical environments."
    ],
    improvements: [
      "Integration of industrial RS-485 / Modbus protocol stack for direct SCADA interoperability.",
      "Implementation of edge-based harmonic distortion (THD) spectral analysis using dedicated DSP cores.",
      "Secure cellular (NB-IoT) telemetry uplink for distributed sub-station deployment."
    ]
  },
  "ml-dsp": {
    title: "Machine Learning & Signal Processing",
    category: "Machine Learning | MATLAB | Digital Signal Processing",
    badge: "Applied Technical Suite",
    overview: "Implemented convolutional neural networks (CNNs) for image classification, developed customer dataset clustering algorithms, and designed audio bandpass filters using MATLAB.",
    objective: "To demonstrate multi-domain computational engineering across computer vision (CNN image classification), unsupervised customer grouping (clustering), and acoustic signal synthesis (MATLAB audio bandpass filters).",
    tools: ["Python", "MATLAB", "DSP Toolbox", "NumPy", "Matplotlib", "C++"],
    subprojects: [
      {
        name: "CNN-Based Image Classification",
        tech: "Python, CNN, Matplotlib",
        desc: "Engineered and trained Convolutional Neural Network architectures comprising convolutional layers, non-linear activation functions, pooling stages, and fully-connected classifiers to categorize input imagery.",
        methodology: "Data preprocessing, feature normalization, convolution kernel tuning, backpropagation optimization, and classification matrix evaluation."
      },
      {
        name: "Customer Dataset Clustering",
        tech: "Python, Unsupervised ML",
        desc: "Formulated unsupervised clustering pipelines to uncover latent groupings and behavioral archetypes within multi-attribute customer datasets.",
        methodology: "Data cleaning, feature scaling, dimensionality assessment, distance metric optimization, and cluster validation (e.g. elbow heuristic and silhouette analysis)."
      },
      {
        name: "Audio Bandpass Filter Design in MATLAB",
        tech: "MATLAB, DSP Toolbox, Fourier Analysis",
        desc: "Designed digital bandpass filters tailored for acoustic frequency bands, analyzing magnitude/phase responses, group delay, and pole-zero stability in MATLAB.",
        methodology: "Specification of passband ripple, stopband attenuation, cutoff frequencies; filter coefficient calculation; frequency response simulation and sound file filtering validation."
      }
    ],
    results: [
      "Successfully trained and validated convolutional neural networks for multi-class image recognition tasks.",
      "Partitioned multidimensional customer feature vectors into distinct behavioral clusters for segmentation analysis.",
      "Synthesized, analyzed, and verified finite/infinite impulse response audio bandpass filters meeting specified attenuation bands in MATLAB."
    ],
    limitations: [
      "Image classification models tested on standard benchmark partitions; real-world deployment requires domain-specific data augmentation.",
      "Clustering parameters were evaluated across offline structured tabular datasets without streaming updates.",
      "Filter implementations were validated numerically in software simulations prior to hardware DSP deployment."
    ]
  },
  "neuromorphic": {
    title: "Neuromorphic Computing in VLSI",
    category: "Technical Research | VLSI | Neuromorphic Computing",
    badge: "Technical Literature Research",
    overview: "Researched advanced neuromorphic computing architectures and VLSI systems, compiling and presenting findings from recent academic literature.",
    objective: "To conduct an in-depth critical analysis of state-of-the-art neuromorphic computing paradigms, silicon neuron/synapse circuits, and energy-efficient event-driven VLSI implementations reported in contemporary research literature.",
    methodology: "Structured survey and comparative synthesis of peer-reviewed literature across IEEE, ACM, and semiconductor journals covering asynchronous event-driven silicon, analog/mixed-signal synaptic arrays, and bio-inspired computing efficiencies.",
    tools: ["Academic Literature Databases", "Technical Presentation Tools", "VLSI Architectural Frameworks", "Comparative Engineering Matrix"],
    themes: [
      "Biological Plausibility vs. Silicon Constraints (Hodgkin-Huxley & Leaky Integrate-and-Fire in CMOS)",
      "Event-Driven & Asynchronous Communication (Address Event Representation / AER protocols)",
      "Emerging Synaptic Technologies & In-Memory Computing (Memristive ReRAM crossbars)",
      "Energy-Efficiency Benchmarking (Energy-per-synaptic-operation against classical GPU/TPU architectures)"
    ],
    results: [
      "Synthesized complex architectural principles across multiple academic research publications into an accessible, structured technical dossier.",
      "Formulated comparative taxonomic matrices contrasting analog, digital, and hybrid neuromorphic VLSI architectures.",
      "Delivered technical seminar presentations highlighting key design bottlenecks in neuromorphic hardware scaling."
    ],
    limitations: [
      "Research was conducted through rigorous literature analysis and architectural synthesis rather than proprietary custom IC fabrication in silicon.",
      "Simulation models discussed in papers reflect specific semiconductor technology nodes whose foundry PDKs were not directly fabricated in this study."
    ]
  },
  "ball-balance": {
    title: "Ball Balancing Table",
    category: "Hardware Design | Feedback Control",
    badge: "Hardware Control System",
    overview: "Designed a hardware feedback control system to autonomously balance a ball on a flat surface using advanced control logic.",
    objective: "To design, assemble, and tune an autonomous mechatronic ball balancing platform that dynamically adjusts plate inclination along two orthogonal axes to maintain ball equilibrium at specified coordinates.",
    problemStatement: "The ball-and-plate system represents a classic non-linear, underactuated control problem where open-loop stability is impossible. A continuous feedback loop must rapidly calculate position deviations and adjust physical actuators to prevent the ball from rolling off.",
    specs: [
      "Degrees of Freedom: 2 DOF (Roll & Pitch Axes)",
      "Actuation Mechanism: Dual High-Torque Servo Linkages",
      "Sensing Feedback: Continuous 2D Coordinate Tracking",
      "Control Strategy: Closed-Loop Feedback Regulation"
    ],
    tools: ["Circuit Simulation Tools", "SolidWorks (CAD concepts)", "C/C++", "Microcontroller Hardware", "Oscilloscopes & Test Fixtures"],
    results: [
      "Engineered physical platform and electrical interfacing to drive dual-axis tilt mechanisms with low latency.",
      "Implemented closed-loop firmware calculating continuous corrections based on real-time position measurements.",
      "Demonstrated autonomous ball containment and setpoint stabilization under small external disturbances."
    ],
    limitations: [
      "Mechanical backlash and friction in servo linkages introduce non-linearities at microscopic center-plate boundaries.",
      "System performance depends on clean sensor signal without tactile or optical noise spikes."
    ]
  }
};

// 2. Telemetry HUD Graphic Switcher
function initTelemetryHUD() {
  const tabs = document.querySelectorAll('.tech-tab');
  const waveView = document.getElementById('hud-wave');
  const circuitView = document.getElementById('hud-circuit');
  const dspView = document.getElementById('hud-dsp');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const mode = tab.getAttribute('data-mode');
      if (waveView) waveView.style.display = mode === 'wave' ? 'block' : 'none';
      if (circuitView) circuitView.style.display = mode === 'circuit' ? 'block' : 'none';
      if (dspView) dspView.style.display = mode === 'dsp' ? 'block' : 'none';
    });
  });
}

// 3. Project Modal Dossier Viewer
function openProjectModal(projectId) {
  const data = projectDossiers[projectId];
  if (!data) return;

  const modalOverlay = document.getElementById('project-modal');
  const titleEl = document.getElementById('modal-proj-title');
  const categoryEl = document.getElementById('modal-proj-category');
  const contentEl = document.getElementById('modal-proj-content');

  if (!modalOverlay || !titleEl || !contentEl) return;

  titleEl.textContent = data.title;
  categoryEl.textContent = data.category + " • " + data.badge;

  let html = `
    <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:20px;">
      <h4 style="font-size:12px; font-family:monospace; text-transform:uppercase; color:#0066E0; margin-bottom:6px;">Core Objective</h4>
      <p style="font-size:15px; color:#1E293B; line-height:1.6;">${data.objective}</p>
      <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:14px;">
        ${data.tools.map(t => `<span style="font-family:monospace; font-size:11px; background:#FFFFFF; border:1px solid #CBD5E1; padding:3px 8px; border-radius:4px; color:#475569;">${t}</span>`).join('')}
      </div>
    </div>
  `;

  if (data.problemStatement) {
    html += `
      <div style="display:grid; grid-template-columns:1fr; gap:12px;">
        <div style="background:#FFFBEB; border:1px solid #FDE68A; border-radius:10px; padding:16px;">
          <strong style="display:block; font-size:13px; font-family:monospace; color:#B45309; margin-bottom:4px;">PROBLEM STATEMENT</strong>
          <p style="font-size:13.5px; color:#78350F; line-height:1.5;">${data.problemStatement}</p>
        </div>
      </div>
    `;
  }

  if (data.proposedSystem) {
    html += `
      <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:10px; padding:16px;">
        <strong style="display:block; font-size:13px; font-family:monospace; color:#1D4ED8; margin-bottom:4px;">PROPOSED SYSTEM & TELEMETRY MECHANICS</strong>
        <p style="font-size:13.5px; color:#1E3A8A; line-height:1.5;">${data.proposedSystem}</p>
      </div>
    `;
  }

  if (data.architecture) {
    html += `
      <div style="background:#0B1526; color:#F8FAFC; border-radius:10px; padding:18px; font-family:monospace; font-size:12px;">
        <div style="color:#38A2FF; font-weight:bold; margin-bottom:8px;">SYSTEM ARCHITECTURE SEQUENCE:</div>
        <div style="background:#070D18; padding:12px; border-radius:6px; border:1px solid #1E293B; line-height:1.7;">${data.architecture}</div>
      </div>
    `;
  }

  if (data.subprojects) {
    html += `
      <div>
        <h4 style="font-size:14px; font-weight:bold; color:#0B1526; margin-bottom:12px;">Subproject Implementations:</h4>
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${data.subprojects.map(sp => `
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:14px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <strong style="font-size:14px; color:#0B1526;">${sp.name}</strong>
                <span style="font-size:11px; font-family:monospace; color:#0066E0;">${sp.tech}</span>
              </div>
              <p style="font-size:13px; color:#475569; margin-bottom:6px;">${sp.desc}</p>
              <div style="font-size:12px; color:#334155; font-family:monospace; background:#FFFFFF; padding:8px; border-radius:6px; border:1px solid #E2E8F0;">
                <strong>Methodology:</strong> ${sp.methodology}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (data.themes) {
    html += `
      <div>
        <h4 style="font-size:14px; font-weight:bold; color:#0B1526; margin-bottom:12px;">Key Research Themes (Academic Literature Survey):</h4>
        <ul style="list-style:disc; padding-left:20px; font-size:13.5px; color:#334155; line-height:1.7;">
          ${data.themes.map(th => `<li>${th}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  if (data.specs) {
    html += `
      <div>
        <h4 style="font-size:14px; font-weight:bold; color:#0B1526; margin-bottom:10px;">Hardware Specifications:</h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px;">
          ${data.specs.map(sp => `<div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:10px; border-radius:6px; font-size:12px; font-family:monospace; color:#1E293B;">${sp}</div>`).join('')}
        </div>
      </div>
    `;
  }

  html += `
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:6px;">
      <div style="background:#F0FDF4; border:1px solid #BBF7D0; border-radius:10px; padding:16px;">
        <strong style="display:block; font-size:13px; font-family:monospace; color:#166534; margin-bottom:8px;">DEMONSTRATED OUTCOMES</strong>
        <ul style="padding-left:16px; font-size:12.5px; color:#14532D; line-height:1.6;">
          ${data.results.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
      <div style="background:#FEF2F2; border:1px solid #FECACA; border-radius:10px; padding:16px;">
        <strong style="display:block; font-size:13px; font-family:monospace; color:#991B1B; margin-bottom:8px;">SCOPE & LIMITATIONS</strong>
        <ul style="padding-left:16px; font-size:12.5px; color:#7F1D1D; line-height:1.6;">
          ${data.limitations.map(l => `<li>${l}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  contentEl.innerHTML = html;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// 4. CV Modal & Print Functions
function openCVModal() {
  const cvModal = document.getElementById('cv-modal');
  if (cvModal) {
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCVModal() {
  const cvModal = document.getElementById('cv-modal');
  if (cvModal) {
    cvModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function printCV() {
  window.print();
}

// 5. Copy to Clipboard Tool
function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`✓ Copied ${label} to clipboard!`);
  }).catch(() => {
    showToast(`Failed to copy to clipboard`);
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove('show');
  void toast.offsetWidth; // trigger reflow
  toast.classList.add('show');
}

// 6. Mobile Navigation Menu
function toggleMobileMenu() {
  const menu = document.getElementById('nav-menu');
  if (menu) {
    menu.classList.toggle('mobile-open');
  }
}

// 7. Contact Form Handling with Mailto Fallback
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const errorEl = document.getElementById('contact-error');
  const successEl = document.getElementById('contact-success');

  if (!name || !email || !subject || !message) {
    if (errorEl) {
      errorEl.textContent = 'Please complete all required fields.';
      errorEl.style.display = 'block';
    }
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (errorEl) {
      errorEl.textContent = 'Please provide a valid email address.';
      errorEl.style.display = 'block';
    }
    return false;
  }

  if (errorEl) errorEl.style.display = 'none';

  // Construct mailto link
  const encodedSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject}`);
  const encodedBody = encodeURIComponent(`Hello Samir,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}`);
  const mailtoUri = `mailto:samiramir377@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

  if (successEl) {
    successEl.style.display = 'block';
    successEl.innerHTML = `<strong>Dispatch Initiated!</strong> Your default email client has been launched with your pre-filled inquiry. You can also email directly to <a href="mailto:samiramir377@gmail.com" style="text-decoration:underline; font-weight:bold;">samiramir377@gmail.com</a>.`;
  }

  window.location.href = mailtoUri;
  return false;
}

// 8. ESC Key Listener for Modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeCVModal();
  }
});

// 9. Document Loaded Initialization
document.addEventListener('DOMContentLoaded', () => {
  initTelemetryHUD();

  // Close mobile menu on anchor click
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('nav-menu');
      if (menu) menu.classList.remove('mobile-open');
    });
  });
});
