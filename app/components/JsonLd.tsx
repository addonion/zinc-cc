export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Экранируем "<", чтобы значения из CMS не могли закрыть тег script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
