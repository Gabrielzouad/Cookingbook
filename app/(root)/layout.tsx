import Navbar from '@/components/Navbar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='relative'>
      <Navbar />
      <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14'>
        {children}
      </section>
    </main>
  );
};

export default Layout;
