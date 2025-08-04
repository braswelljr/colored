import { Header, Segment } from '~/components/layout/home/sections';
import Navbar from '~/components/layout/navbar';
import { circuit } from '~/utils/backgrounds';

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <main className="min-h-dvh w-full">
      <header
        className="w-full bg-yellow-500 dark:bg-zinc-950"
        style={{ backgroundImage: circuit }}
      >
        <Navbar />
        <Header />
      </header>
      <Segment />
      <div className="h-full pt-2 pb-5">{children}</div>
    </main>
  );
}
