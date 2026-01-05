import { Search } from 'lucide-react';
import { useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { Beyblade } from '@/types/beyblade';

interface BeybladeSearchProps {
  beyblades: Beyblade[];
  selectedId: string | null;
  excludeId: string | null;
  onSelect: (beyblade: Beyblade) => void;
  placeholder?: string;
}

export function BeybladeSearch({
  beyblades,
  selectedId,
  excludeId,
  onSelect,
  placeholder = 'Type a Beyblade...',
}: BeybladeSearchProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const availableBeyblades = beyblades.filter((b) => b.id !== excludeId);
  const selectedBeyblade = beyblades.find((b) => b.id === selectedId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="w-full flex items-center gap-2 px-4 py-3 border rounded-lg bg-background hover:bg-accent transition-colors text-left"
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className={selectedBeyblade ? 'text-foreground' : 'text-muted-foreground'}>
            {selectedBeyblade ? selectedBeyblade.name : placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search beyblades..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No beyblades found.</CommandEmpty>
            <CommandGroup>
              {availableBeyblades.map((beyblade) => (
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
                  <span className="text-xs text-muted-foreground">{beyblade.type}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
