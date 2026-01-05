import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { SocialLinks } from './SocialLinks';

export function Header() {
  return (
    <header className="w-full">
      {/* Top navbar with navigation and social links */}
      <div className="flex justify-end items-center gap-4 mb-2">
        <Navigation />
        <SocialLinks />
      </div>
      {/* Main header content */}
      <div className="flex flex-col items-center gap-3 mb-4">
        <Logo />
        <p className="text-muted-foreground text-lg">Compare or compose invincible Beyblades</p>
      </div>
    </header>
  );
}
