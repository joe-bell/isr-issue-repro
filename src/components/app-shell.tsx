import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "@/lib/i18n";

export const AppShell: React.FC = ({ children }) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <header
        style={{ paddingBottom: "1rem", borderBottom: "1px solid black" }}
      >
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>{t("common:home")}</a>
              </Link>
            </li>
            <li>
              <Link href="/post/new">
                <a>{t("common:new-post")}</a>
              </Link>
            </li>
          </ul>
        </nav>

        <div style={{ marginTop: "1rem" }}>
          {t("common:switch-locale")}:
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: 0,
              marginTop: "0.5rem",
            }}
          >
            {router.locales.map((locale) => (
              <li
                style={{ display: "inline-block", marginRight: "0.5rem" }}
                key={locale}
              >
                <Link href={router.asPath} locale={locale}>
                  <a>{locale}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <main>{children}</main>
    </React.Fragment>
  );
};
