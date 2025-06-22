'use client';

import Link from 'next/link';

export default function ScrollLink({ href, children, className = '' }) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link href={href} onClick={handleClick} className={className} style={{ textDecoration: 'none' }}>
        {children}
    </Link>
  );
}
