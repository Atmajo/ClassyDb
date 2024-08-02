export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <body className="bg-gray-500">{children}</body>
    );
  }
  