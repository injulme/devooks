import * as React from 'react';

import { Check, CirclePlus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

interface FacetedFilterProps {
  title?: string;
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}
// TODO: defaultValue가 selectedValues에 안들어감..
// 그래서 mypage/edit 관심 카테고리 쪽에 카테고리 데이터 있는데 안나옴...
const FacetedFilter = React.forwardRef<HTMLButtonElement, FacetedFilterProps>(
  ({ title, options, defaultValue = [], onValueChange }: FacetedFilterProps, ref) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    console.log('selectedValues : ', selectedValues, 'defaultValue : ', defaultValue);
    React.useEffect(() => {
      setSelectedValues(defaultValue);
    }, []);
    React.useEffect(() => {
      if (JSON.stringify(selectedValues) !== JSON.stringify(defaultValue)) {
        setSelectedValues(selectedValues);
        if (onValueChange) onValueChange(selectedValues);
      }
    }, [defaultValue, selectedValues]);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button ref={ref} variant="outline" size="sm" className="h-8 border-dashed">
            <CirclePlus className="mr-2 h-4 w-4" />
            {title}
            {selectedValues?.length > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                  {selectedValues.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.length > 2 ? (
                    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                      {selectedValues.length} selected
                    </Badge>
                  ) : (
                    options
                      .filter((option) => selectedValues.includes(option.value))
                      .map((option) => (
                        <Badge
                          variant="secondary"
                          key={option.value}
                          className="rounded-sm px-1 font-normal"
                        >
                          {option.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder={title} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (isSelected) {
                          setSelectedValues(
                            selectedValues.filter(
                              (selectedValue) => selectedValue !== option.value,
                            ),
                          );
                        } else {
                          setSelectedValues((prev) => [...prev, option.value]);
                        }
                      }}
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible',
                        )}
                      >
                        <Check className={cn('h-4 w-4')} />
                      </div>
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedValues.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => setSelectedValues([])}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

FacetedFilter.displayName = 'FacetedFilter';
export { FacetedFilter };
