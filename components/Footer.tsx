import React from 'react'

export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-24 text-gray-500 border-t border-gray-700">
      <a
        className="flex items-center justify-center gap-2"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Built by Dennis Nichols, 2023
      </a>
    </footer>
  );
}
