import React, { useState } from 'react';
import ClientInquiryModal from '../../components/ClientInquiryModal';
import { AnswerSection, CtaBand, PageFaq, SectionHead } from '../../components';
import { ANSWER_BLOCKS, FAQS, SERVICE_PACKAGES } from '../../content/siteFacts';

const CATEGORY_FILTERS = [
  { key: 'all', label: 'All Services' },
  { key: 'web', label: 'Web App Development' },
  { key: 'mobile', label: 'Mobile App Development' },
  { key: 'ai', label: 'AI Chatbot Integration' },
  { key: 'seo', label: 'SEO & Digital Growth' },
  { key: 'marketing', label: 'Digital Marketing' },
  { key: 'support', label: 'Maintenance & Support' }
];

const PROCESS_STEPS = [
  {
    num: 'Step 01',
    title: '1-on-1 Discovery Meeting',
    text: 'We start with a call over Google Meet or Zoom, or an in-person meeting in Kathmandu, to understand your business model, target audience, and feature goals.'
  },
  {
    num: 'Step 02',
    title: 'Tailored Scope Blueprint',
    text: 'Our leadership team drafts a comprehensive technical architecture, UI wireframe roadmap, transparent budget milestones, and realistic delivery schedule.'
  },
  {
    num: 'Step 03',
    title: 'Agile Sprints & Live Demos',
    text: 'You get live staging previews and sprint updates with our engineering team, allowing your direct feedback to shape the product iteratively.'
  },
  {
    num: 'Step 04',
    title: 'Launch, Training & Warranty',
    text: 'We deploy your system to cloud servers, transfer 100% full source code ownership, train your internal staff, and provide 30-day dedicated post-launch support.'
  }
];

export default function ServicesPage({ selectedCategory = 'all', currentUser }) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const [showClientModal, setShowClientModal] = useState(false);
  const [targetServiceTitle, setTargetServiceTitle] = useState('Custom Web Application Development');

  React.useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const servicesList = [
    {
      id: 'web-dev',
      category: 'web',
      packages: SERVICE_PACKAGES["Custom Web Application Development"],
      label: 'Digital Solutions',
      title: 'Custom Web Application Development',
      subtitle: 'Powerful digital platforms built around your business needs.',
      features: [
        'Custom Business Platforms',
        'Customer Portals',
        'Workflow Automation',
        'Online Booking Systems',
        'Business Management Tools'
      ],
      deliverables: [
        'A custom application tailored to your business processes.',
        'Easy-to-use dashboards and management tools.',
        'Secure user accounts and role-based access.',
        'Streamlined workflows and automated tasks.',
        'Responsive experiences across desktop, tablet, and mobile.',
        'Ongoing support and improvements, where included in the service offering.'
      ],
      description: 'We build custom web applications that simplify operations, improve customer experiences, and help businesses grow. From customer portals and booking platforms to complex business management systems, we turn your requirements into reliable, easy-to-use digital solutions.'
    },
    {
      id: 'mobile-dev',
      category: 'mobile',
      packages: SERVICE_PACKAGES["Mobile App Development"],
      label: 'Mobile Solutions',
      title: 'Mobile App Development',
      subtitle: 'Seamless mobile experiences that keep your customers connected.',
      features: [
        'Customer Mobile Apps',
        'Online Ordering and Booking',
        'Real-Time Notifications',
        'Account and Profile Management',
        'Mobile Business Tools'
      ],
      deliverables: [
        'A mobile application designed around your business goals.',
        'Simple and intuitive screens and navigation.',
        'Customer accounts and personalized experiences, where required.',
        'Notifications and real-time updates, where applicable.',
        'Testing across supported devices.',
        'App store submission assistance, where included in the agreed scope.'
      ],
      description: 'We create intuitive mobile applications that help businesses reach customers, deliver services, and simplify everyday interactions. From customer-facing apps to internal business tools, we focus on usability, performance, and a consistent experience across mobile devices.'
    },
    {
      id: 'ai-chatbot',
      category: 'ai',
      packages: SERVICE_PACKAGES["AI Chatbots & Intelligent Agents"],
      label: 'Automation Solutions',
      title: 'AI Chatbots & Intelligent Agents',
      subtitle: 'Automated customer support and lead capture that works around the clock.',
      features: [
        '24/7 Customer Support',
        'Answers From Your Documents',
        'Smart Lead Capture',
        'Routine Task Automation',
        'Website and App Integration'
      ],
      deliverables: [
        'A support assistant that answers customer questions at any hour.',
        'Responses based on your own documents, policies, and service information.',
        'Website enquiries captured and routed to your team.',
        'Routine requests and repetitive internal tasks handled automatically.',
        'The assistant placed inside your existing website or mobile application.'
      ],
      description: 'We build digital assistants that answer customer questions at any time of day, working from your own business documents rather than generic replies. They capture enquiries from your website and take over the repetitive requests your staff would otherwise handle by hand.'
    },
    {
      id: 'seo-growth',
      category: 'seo',
      packages: SERVICE_PACKAGES["SEO & Digital Growth"],
      label: 'Search & Growth',
      title: 'SEO & Digital Growth',
      subtitle: 'Make your business easier to find when customers search online.',
      features: [
        'Search Visibility',
        'Local Search Presence',
        'Keyword and Competitor Research',
        'Page Speed Improvement',
        'Written Performance Reports'
      ],
      deliverables: [
        'A written audit of where your business stands in search today.',
        'Page content and structure aligned with the terms your customers search.',
        'A stronger presence in local search and on your Google Business Profile.',
        'Faster pages that present well on mobile devices.',
        'A closing report of the changes made and how the site now performs.'
      ],
      description: 'We improve how visible your business is in search results. Work begins with an audit of where you stand today, then covers site structure, page content, and loading speed — the factors that decide whether a customer finds you or moves on. You finish with a written account of what changed.'
    },
    {
      id: 'digital-marketing',
      category: 'marketing',
      label: 'Campaigns & Content',
      title: 'Digital Marketing',
      subtitle: 'Turn attention into enquiries on the channels your customers already use.',
      packages: SERVICE_PACKAGES["Digital Marketing"],
      features: [
        'Social Media Management',
        'SEO & Google Business Profile',
        'Google Ads & Meta Ads',
        'Branding & Content Creation',
        'Lead Generation',
        'Traffic & Conversion Optimization'
      ],
      deliverables: [
        'A monthly content plan for the social channels you keep, with posting and replies handled for you.',
        'Search and Google Business Profile work folded into the same plan as the paid campaigns.',
        'Google Ads and Meta Ads set up, managed week to week, and reported in writing.',
        'Brand basics — logo usage, colours, tone and post templates — with copy written per channel.',
        'Lead capture on your site and a clear route for each enquiry to reach the right person.',
        'A view of where visitors come from and where they leave, then changes to the pages they land on.'
      ],
      description: 'More traffic is not the goal — enquiries are. Search, social and paid campaigns run as one plan, so the audience, the message and the budget are handled in one place rather than by three vendors. Your ad budget stays in your own Google or Meta account and is billed by them, separately from our service fee.'
    },
    {
      id: 'maintenance-support',
      category: 'support',
      packages: SERVICE_PACKAGES["Website Maintenance & Support"],
      label: 'Care & Support',
      title: 'Website Maintenance & Support',
      subtitle: 'Keep your website secure, current, and running properly after launch.',
      features: [
        'Content and Feature Updates',
        'Bug Fixing and Troubleshooting',
        'Security and Uptime Monitoring',
        'Scheduled Backups',
        'Hosting and Domain Migration'
      ],
      deliverables: [
        'Content, image, and feature updates on your live website.',
        'Bug fixing and troubleshooting when something stops working.',
        'Security patching, SSL checks, and uptime monitoring.',
        'Scheduled backups and recovery support.',
        'Help with hosting, domain, and website migration.',
        'Direct support from the team that built your system.'
      ],
      description: 'Launching a project is not where our involvement ends. We keep your system current afterwards — content changes, feature updates, security and backup routines, and practical help with hosting — handled by the same team that built it, so nothing has to be explained twice.'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? servicesList 
    : servicesList.filter(s => s.category === activeCategory);

  const openInquiryModal = (serviceTitle) => {
    setTargetServiceTitle(serviceTitle || 'Custom Web Application Development');
    setShowClientModal(true);
  };

  return (
    <section className="services-page">
      <div className="container">

        <SectionHead
          level={1}
          eyebrow="Solutions for Business Owners"
          title="IT Solutions & Custom Software Development in Nepal"
          lede="Velora Global builds digital systems that help businesses run better — custom web platforms, mobile applications, automated customer support, and the campaigns that bring customers to them. We also handle what comes after launch: making your business easier to find online, and keeping your systems current, secure, and dependable. Every service line below publishes an indicative NPR fee band for its usual scope."
        />

        <div className="svc-toolbar" role="group" aria-label="Filter services by category">
          {CATEGORY_FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className="svc-filter"
              aria-pressed={activeCategory === filter.key}
              onClick={() => setActiveCategory(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <h2 className="visually-hidden">Service offerings</h2>
        <div className="svc-list">
          {filteredServices.map((service) => (
            <article key={service.id} className="svc-card">
              <div>
                <p className="svc-eyebrow">{service.label}</p>
                <h3 className="svc-card__title">{service.title}</h3>
                <p className="svc-card__tagline">{service.subtitle}</p>
                <p className="svc-card__desc">{service.description}</p>
                <ul className="svc-features">
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                {service.packages && (
                  <div className="svc-packages">
                    <p className="svc-packages__caption">
                      <span>{service.packages.label}</span>
                      <span>{service.packages.feeLabel}</span>
                    </p>
                    <div className="svc-ruled">
                      {service.packages.rows.map((row) => (
                        <p key={row.fee} className={row.name ? 'svc-package' : 'svc-package svc-package--single'}>
                          {row.name && <span>{row.name}</span>}
                          <span className="svc-package__fee">{row.fee}</span>
                        </p>
                      ))}
                    </div>
                    {service.packages.note && (
                      <p className="svc-packages__note">{service.packages.note}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="svc-card__aside">
                <h4 className="svc-aside-label">What You Get</h4>
                <ul className="svc-deliverables">
                  {service.deliverables.map((item) => (
                    <li key={item}>
                      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M5 10.5L8 13.5L15 6.5" stroke="#1d4ed8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="svc-btn svc-btn--primary svc-btn--block"
                  onClick={() => openInquiryModal(service.title)}
                >
                  Discuss Your Project
                </button>
              </div>
            </article>
          ))}
        </div>

        <section className="svc-process" aria-labelledby="svc-process-title">
          <p className="svc-eyebrow">How We Deliver Excellence</p>
          <h2 id="svc-process-title" className="svc-section-title">Our 4-Step Client Engagement Process</h2>
          <p className="svc-section-lede">
            Every serious project is unique. We believe in direct, face-to-face consultation to understand your exact business workflow before writing a single line of code.
          </p>

          <ol className="svc-steps">
            {PROCESS_STEPS.map((step) => (
              <li key={step.num} className="svc-step">
                <span className="svc-step__num">{step.num}</span>
                <h3 className="svc-step__title">{step.title}</h3>
                <p className="svc-step__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

      </div>

      {/* Full-bleed band: outside the container so the colour covers the viewport. */}
      <CtaBand
        id="svc-cta-title"
        eyebrow="Direct Leadership Consultation"
        title="Schedule a Face-to-Face Project Discussion"
        text="Visit our office in Balkumari, Kathmandu, or book an interactive video session with Founder Abhishek Sah & our delivery team to discuss your project requirements."
        actions={
          <>
            <a
              className="svc-btn svc-btn--whatsapp"
              href="https://wa.me/9779826031419?text=Hello%20Velora%20Global%20Team%2C%20I%20would%20like%20to%20schedule%20a%20face-to-face%20meeting%20to%20discuss%20a%20custom%20software%20project."
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule via WhatsApp (+977 9826031419)
            </a>
            <button
              type="button"
              className="svc-btn svc-btn--primary"
              onClick={() => openInquiryModal('Direct Face-to-Face Project Discussion')}
            >
              Request In-Person Consultation
            </button>
          </>
        }
        facts={[
          { label: 'Office Location', value: 'Balkumari, Ring Road, Kathmandu' },
          { label: 'Virtual Meeting', value: 'Google Meet / Zoom / WhatsApp' },
          { label: 'Helpline', value: '+977 9826031419' }
        ]}
      />

      <div className="container">
        <PageFaq items={FAQS.services} />

        <AnswerSection
          heading={ANSWER_BLOCKS.services.heading}
          answer={ANSWER_BLOCKS.services.answer}
          specs={ANSWER_BLOCKS.services.specs}
        />

      </div>

      {/* Dedicated Client Project Inquiry Modal */}
      {showClientModal && (
        <ClientInquiryModal 
          defaultService={targetServiceTitle}
          currentUser={currentUser}
          onClose={() => setShowClientModal(false)}
        />
      )}
    </section>
  );
}



