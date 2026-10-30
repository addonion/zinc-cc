import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container mx-auto px-6 py-24 text-center text-white">
      <h1>Страница не найдена</h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg">
        Такой страницы нет. Перейдите на главную или посмотрите проекты в портфолио студии.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link className="bg-white px-5 py-3 font-bold text-black" href="/">
          На главную
        </Link>
        <Link className="border border-white px-5 py-3 font-bold text-white" href="/portfolio-intereri/">
          В портфолио
        </Link>
      </div>
    </main>
  );
}
