import { useLanguage } from "../i18n/LanguageContext.jsx";
import { Divider } from "../ds/core/Divider.jsx";
import { Caption } from "../ds/editorial/Caption.jsx";
import "./Footer.css";

export default function Footer() {
  const { t } = useLanguage();
  const { footer } = t;

  return (
    <footer className="footer">
      <div className="container">
        <Divider weight="heavy" />
        <div className="footer__row">
          <Caption>{footer.copyright}</Caption>
          <a className="footer__link" href="#top">
            <Caption tone="ink" as="span">
              &#8593;
            </Caption>
          </a>
        </div>
      </div>
    </footer>
  );
}
