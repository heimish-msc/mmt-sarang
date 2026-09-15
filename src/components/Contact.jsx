import { useLanguage } from "../i18n/LanguageContext.jsx";
import { DisplayHeading } from "../ds/editorial/DisplayHeading.jsx";
import { Caption } from "../ds/editorial/Caption.jsx";
import { ContactBlock } from "../ds/editorial/ContactBlock.jsx";
import "./Contact.css";

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const { contact } = t;

  return (
    <section id="contact" className="section contact">
      <div className="container">
        {contact.eyebrow ? <Caption>{contact.eyebrow}</Caption> : null}
        <DisplayHeading size="md" style={{ marginTop: contact.eyebrow ? 20 : 0 }}>
          {contact.heading}
        </DisplayHeading>

        <div className="contact__block">
          <ContactBlock
            fields={[
              {
                label: "Email",
                value: <a href={`mailto:${contact.email}`}>{contact.email}</a>,
              },
              {
                label: "Instagram",
                value: (
                  <a
                    className="contact__instagram"
                    href={contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon />
                    <span>@{contact.instagramHandle}</span>
                  </a>
                ),
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
