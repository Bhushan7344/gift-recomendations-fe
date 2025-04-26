// app/(with-layout)/layout.tsx
import Header from '@/components/custom/Header';
import Footer from '@/components/custom/Footer';

export default function WithLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

