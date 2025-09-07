import React, { useState } from 'react';

export const ContactUsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Please enter a valid email.';
    if (!message.trim() || message.trim().length < 10) e.message = 'Please enter a message (min 10 chars).';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 sm:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-primary-600">Contact Sales</h1>
          <p className="mt-2 text-gray-600">Fill the form and our sales team will get back to you within one business day.</p>
        </header>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Get in touch</h2>
            {submitted ? (
              <div role="status" className="mb-4 p-4 rounded bg-green-50 text-green-800">Thanks! Your message was sent.</div>
            ) : null}
            <form onSubmit={onSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  Send message
                </button>
                <button
                  type="button"
                  onClick={() => { setName(''); setEmail(''); setMessage(''); setErrors({}); }}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Reset
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-md font-medium mb-2">Sales Info</h3>
              <p className="text-sm text-gray-600">For enterprise inquiries and custom integrations, let us know your timeline and needs.</p>
              <ul className="mt-4 text-sm space-y-2">
                <li><strong>Phone:</strong> <a href="tel:+1234567890" className="text-primary-600 hover:underline">+1 (234) 567-890</a></li>
                <li><strong>Email:</strong> <a href="mailto:sales@propchain.example" className="text-primary-600 hover:underline">sales@propchain.example</a></li>
                <li><strong>Hours:</strong> Mon–Fri, 9am–6pm</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-md font-medium mb-2">Company</h3>
              <p className="text-sm text-gray-600">PropChain — Real estate platform demo.</p>
              <address className="not-italic text-sm mt-3">
                123 Demo St.<br />
                Sample City, SC 12345
              </address>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ContactUsPage;
