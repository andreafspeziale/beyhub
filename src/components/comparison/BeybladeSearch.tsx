import { Command as CommandIcon, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TYPE_COLORS, TYPE_ICON_COLORS, TYPE_ICONS } from '@/constants/beyblade.constants';
import type { Beyblade } from '@/types/beyblade';

interface BeybladeSearchProps {
  beyblades: Beyblade[];
  selectedId: string | null;
  excludeIds?: string[];
  onSelect: (beyblade: Beyblade) => void;
  placeholder?: string;
  enableShortcut?: boolean;
}

export function BeybladeSearch({
  beyblades,
  selectedId,
  excludeIds = [],
  onSelect,
  placeholder = 'Type a Beyblade',
  enableShortcut = false,
}: BeybladeSearchProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const availableBeyblades = beyblades.filter((b) => !excludeIds.includes(b.id));
  const selectedBeyblade = beyblades.find((b) => b.id === selectedId);

  const MAX_VISIBLE = 3;
  const isSearching = search.trim().length > 0;
  const filteredBeyblades = isSearching
    ? availableBeyblades.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
    : availableBeyblades.slice(0, MAX_VISIBLE);

  useEffect(() => {
    if (!enableShortcut) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableShortcut]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={buttonRef}
          type="button"
          className="w-full flex items-center gap-2 px-4 py-3 border rounded-lg bg-background hover:bg-accent transition-colors text-left cursor-pointer"
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <span
            className={`flex-1 ${selectedBeyblade ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            {selectedBeyblade ? selectedBeyblade.name : placeholder}
          </span>
          {enableShortcut && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border font-mono">
                <CommandIcon className="h-3 w-3 inline" />
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border font-mono">
                K
              </kbd>
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <div className="flex h-10 items-center gap-2 border-b px-3">
            <input
              placeholder="Shinobi Shadow..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList>
            <CommandEmpty>No Beyblades found</CommandEmpty>
            <CommandGroup>
              {filteredBeyblades.map((beyblade) => {
                const TypeIcon = TYPE_ICONS[beyblade.type];
                return (
                  <CommandItem
                    key={beyblade.id}
                    value={beyblade.name}
                    onSelect={() => {
                      onSelect(beyblade);
                      setOpen(false);
                      setSearch('');
                    }}
                    className="cursor-pointer"
                  >
                    <span className="flex-1">{beyblade.name}</span>
                    <Badge className={TYPE_COLORS[beyblade.type]}>
                      <TypeIcon className={`h-3.5 w-3.5 ${TYPE_ICON_COLORS[beyblade.type]}`} />
                    </Badge>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
