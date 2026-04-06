import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="section-container relative">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="heading-primary">Get In Touch</h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Feel free to reach out for projects, collaborations, or opportunities.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* CONTACT INFO */}
        <motion.div className="space-y-8">

          <div className="glass-card p-8 flex items-start gap-6">
            <Mail size={28} />
            <div>
              <h3 className="text-xl font-bold">Email</h3>
              <a href="mailto:sk2001may@gmail.com">
                sk2001may@gmail.com
              </a>
            </div>
          </div>

          <div className="glass-card p-8 flex items-start gap-6">
            <Phone size={28} />
            <div>
              <h3 className="text-xl font-bold">Phone</h3>
              <a href="tel:9661710034">
                +91 9661710034
              </a>
            </div>
          </div>

          <div className="glass-card p-8 flex items-start gap-6">
            <MapPin size={28} />
            <div>
              <h3 className="text-xl font-bold">Location</h3>
              <p>Noida, India</p>
            </div>
          </div>

        </motion.div>

        {/* FORM */}
        <motion.div>
          <form
            action="https://formsubmit.co/sk2001may@gmail.com"
            method="POST"
            className="glass-card p-8 md:p-10 flex flex-col gap-6"
          >
            <h3 className="text-2xl font-bold">Send a Message</h3>

            {/* Hidden Fields */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New Portfolio Message 🚀" />
            <input type="hidden" name="_template" value="table" />

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="p-4 rounded-xl border"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="p-4 rounded-xl border"
            />

            {/* Message */}
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows="4"
              className="p-4 rounded-xl border resize-none text-black"
            ></textarea>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2"
            >
              Send Message
              <Send size={18} />
            </button>

          </form>
        </motion.div>

      </div>
    </section>
  );
}