import LeftBar from "@/components/leftbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="md:overflow-hidden">
      <LeftBar />
      {children}
    </main>
  );
}
