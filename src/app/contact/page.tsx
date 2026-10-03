import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Call Us",
    primary: "+20 100 123 4567",
    secondary: "Mon–Sat, 9am–7pm",
    href: "tel:+201001234567",
  },
  {
    icon: Mail,
    label: "Email Us",
    primary: "support@bazaro.com",
    secondary: "We reply within 24 hours",
    href: "mailto:support@bazaro.com",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    primary: "New Damietta, Damietta",
    secondary: "Damietta, Egypt",
    href: "https://maps.app.goo.gl/TwRDnxwKb8jkA9Er7",
  },
];

const businessHours = [
  { day: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
  { day: "Saturday", hours: "10:00 AM – 5:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.79-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 3H21l-6.55 7.49L22.5 21h-6.7l-5.25-6.87L4.5 21H2.4l7-8.01L1.5 3h6.86l4.74 6.28L18.9 3Zm-1.17 16.17h1.16L7.34 4.75H6.1l11.63 14.42Z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 8.4s-.2-1.5-.8-2.2c-.8-.8-1.7-.8-2.1-.9C16.3 5 12 5 12 5s-4.3 0-7.1.3c-.4 0-1.3.1-2.1.9C2.2 6.9 2 8.4 2 8.4S1.8 10.1 1.8 11.9v1.2c0 1.8.2 3.5.2 3.5s.2 1.5.8 2.2c.8.9 1.9.8 2.4.9 1.7.2 7.2.3 7.2.3s4.3 0 7.1-.3c.4 0 1.3-.1 2.1-.9.6-.7.8-2.2.8-2.2s.2-1.7.2-3.5v-1.2c0-1.8-.2-3.5-.2-3.5ZM9.8 15V8.9l5.4 3.05L9.8 15Z" />
    </svg>
  );
}

const socialLinks = [
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com" },
  { icon: TwitterIcon, label: "Twitter / X", href: "https://www.x.com" },
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com",
  },
  { icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com" },
];

export default function Contact() {
  return (
    <main className="bg-[#F7F5F2]">
      <section className="relative overflow-hidden bg-[#1F2937] px-6 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,160,0.25)_0%,rgba(31,41,55,0)_55%),radial-gradient(circle_at_85%_80%,rgba(232,87,31,0.18)_0%,rgba(31,41,55,0)_55%)]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#0EA5A0]/30 bg-[#0EA5A0]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#0EA5A0]">
            <MessageCircle size={14} />
            Get in Touch
          </span>

          <h1
            className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            We'd love to <span className="text-[#E8571F]">hear from you</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#B8BDC6] sm:text-lg">
            Questions about an order, a seller account, or just want to say hi?
            Our team is here to help, every day of the week.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-5 transition-colors hover:border-[#0EA5A0]/30"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1F2937] transition-colors group-hover:bg-[#E8571F]">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#0EA5A0]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-base font-semibold text-[#1F2937]">
                        {item.primary}
                      </p>
                      <p className="text-sm text-[#7A7A7A]">{item.secondary}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0EA5A0]/10">
                  <Clock size={18} className="text-[#0EA5A0]" />
                </div>
                <h3
                  className="text-lg font-bold text-[#1F2937]"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Business Hours
                </h3>
              </div>
              <ul className="space-y-2.5">
                {businessHours.map((item) => (
                  <li
                    key={item.day}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-[#4B4B4B]">{item.day}</span>
                    <span
                      className={`font-medium ${
                        item.hours === "Closed"
                          ? "text-[#E8571F]"
                          : "text-[#1F2937]"
                      }`}
                    >
                      {item.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-black/10 bg-[#1F2937] p-6">
              <h3
                className="mb-1 text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Follow Bazaro
              </h3>
              <p className="mb-5 text-sm text-[#B8BDC6]">
                Deals, drops, and updates — wherever you scroll.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-[#0EA5A0] hover:border-[#0EA5A0]"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white px-6 py-8 sm:px-10 sm:py-10">
            <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1F2937]">
              <Send size={18} className="text-[#F7F5F2]" />
            </div>

            <h2
              className="mt-4 text-2xl font-bold leading-tight tracking-tight text-[#1F2937] sm:text-3xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Send us a message
            </h2>
            <p className="mb-8 mt-2 max-w-md text-sm leading-6 text-[#4B4B4B] sm:text-base">
              Fill out the form below and our support team will get back to you
              within one business day.
            </p>

            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold uppercase tracking-wide text-[#1F2937]"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="h-12 w-full rounded-lg border border-black/10 bg-[#F7F5F2] px-4 text-sm text-[#1A1A1A] outline-none transition-all duration-150 placeholder:text-[#9BA1AC] focus:border-[#E8571F] focus:bg-white focus:ring-2 focus:ring-[#E8571F]/10"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold uppercase tracking-wide text-[#1F2937]"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="h-12 w-full rounded-lg border border-black/10 bg-[#F7F5F2] px-4 text-sm text-[#1A1A1A] outline-none transition-all duration-150 placeholder:text-[#9BA1AC] focus:border-[#E8571F] focus:bg-white focus:ring-2 focus:ring-[#E8571F]/10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="text-xs font-semibold uppercase tracking-wide text-[#1F2937]"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="How can we help?"
                  required
                  className="h-12 w-full rounded-lg border border-black/10 bg-[#F7F5F2] px-4 text-sm text-[#1A1A1A] outline-none transition-all duration-150 placeholder:text-[#9BA1AC] focus:border-[#E8571F] focus:bg-white focus:ring-2 focus:ring-[#E8571F]/10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold uppercase tracking-wide text-[#1F2937]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us a bit more..."
                  required
                  className="w-full resize-none rounded-lg border border-black/10 bg-[#F7F5F2] px-4 py-3 text-sm text-[#1A1A1A] outline-none transition-all duration-150 placeholder:text-[#9BA1AC] focus:border-[#E8571F] focus:bg-white focus:ring-2 focus:ring-[#E8571F]/10"
                />
              </div>

              <button
                type="submit"
                className="mt-2 flex cursor-pointer h-12 w-full items-center justify-center gap-2 rounded-lg border-0 bg-[#E8571F] text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#D14A16] focus:outline-none focus:ring-2 focus:ring-[#E8571F]/30 active:scale-[0.99] sm:h-13 sm:w-fit sm:px-8"
              >
                Send Message
                <ArrowRight size={16} />
              </button>

              <p className="flex items-center gap-1.5 text-xs text-[#7A7A7A] sm:text-sm">
                <ShieldCheck size={14} className="shrink-0 text-[#0EA5A0]" />
                <span>Your information is safe and never shared.</span>
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-4xl bg-linear-to-br from-[#0EA5A0]/15 via-white to-white shadow-[0_0_80px_-20px_rgba(14,165,160,0.35)]">
          <div className="flex flex-col items-center gap-5 px-6 py-14 text-center sm:px-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0EA5A0]/30 bg-[#0EA5A0]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#0EA5A0]">
              <Sparkles size={14} />
              Prefer a quick answer?
            </span>
            <h2
              className="max-w-xl text-2xl font-bold leading-tight tracking-tight text-[#1F2937] sm:text-3xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Check our <span className="text-[#E8571F]">Help Center</span> for
              instant answers
            </h2>
            <p className="max-w-md text-sm leading-6 text-[#4B4B4B] sm:text-base">
              Order tracking, returns, and seller FAQs — most questions are
              answered in under a minute.
            </p>
            <a
              href="/help"
              className="group mt-2 inline-flex w-fit items-center gap-2 rounded-lg bg-[#1F2937] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#111827]"
            >
              Visit Help Center
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
