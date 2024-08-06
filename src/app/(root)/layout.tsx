import LeftBar from "@/components/leftbar";
import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex" suppressHydrationWarning={true}>
      <LeftBar />
      <div className="flex flex-1 flex-col">
        <Navbar />
        {children}
      </div>
    </main>
  );
}
