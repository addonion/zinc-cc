"use client";

import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="container mx-auto px-6 py-24 text-center text-white">
      <h1>Страница временно недоступна</h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg">
        Не удалось получить данные с сервера. Попробуйте обновить страницу или вернитесь на главную.
      </p>
      {process.env.NODE_ENV === "development" && (
        <pre className="mx-auto mt-6 max-w-3xl overflow-auto rounded bg-black/40 p-4 text-left text-sm">
          {error.message}
        </pre>
      )}
      <div className="mt-8 flex justify-center gap-4">
        <button className="bg-white px-5 py-3 font-bold text-black" onClick={reset}>
          Обновить
        </button>
        <Link className="border border-white px-5 py-3 font-bold text-white" href="/">
          На главную
        </Link>
      </div>
    </main>
  );
}
