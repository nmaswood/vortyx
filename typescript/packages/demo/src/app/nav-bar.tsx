export function MainNav({ children }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className="sticky top-0 z-50 flex items-center space-x-4 bg-tailwindBlack p-4 lg:space-x-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full items-center">{children}</div>

        <div className="flex items-center gap-4"></div>
      </div>
    </nav>
  );
}
