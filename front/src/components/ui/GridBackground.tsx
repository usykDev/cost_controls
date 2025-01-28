const GridBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full bg-white bg-grid-black/[0.05] relative">
      <div className="absolute pointer-events-none inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  );
};
export default GridBackground;
