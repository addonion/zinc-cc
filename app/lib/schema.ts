export const SITE_URL = "https://zinc.cc";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const orgRef = { "@id": ORG_ID };

// С trailingSlash Next не добавляет слеш к сегменту с точкой (считает его файлом) и редиректит на адрес без слеша
export const getProjectPath = (slug: string) => `/portfolio-intereri/${slug}${slug.includes(".") ? "" : "/"}`;
