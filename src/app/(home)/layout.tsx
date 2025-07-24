import Navbar from '~/components/layout/navbar';

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <main className="min-h-dvh w-full">
      <Navbar className="" />
      <div className="h-full">{children}</div>
    </main>
  );
}
