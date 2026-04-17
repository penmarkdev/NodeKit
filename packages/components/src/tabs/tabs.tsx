/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  SprocketTab,
  SprocketTabs,
  SprocketTabList,
  SprocketTabPanel,
  SprocketTabPanels,
  SprocketSelectionIndicator,
} from '@sprocketui-react/tabs';
import cn from 'clsx';
import { assert } from '@necto/assert';
import { slugify } from '@necto/strings';
import { Children, isValidElement, forwardRef, useMemo } from 'react';

import type { ReactElement, ReactNode, ForwardedRef } from 'react';

export const Tab = ({ children, title, id, className }: { title: ReactNode; id?: string; className?: string; children?: ReactNode }): ReactElement => (
  <SprocketTabPanel
    value={id ?? slugify(typeof title === 'string' ? title : 'tab', { lower: true, strict: true })}
    className={cn('text-foreground text-sm', className)}
  >
    {children}
  </SprocketTabPanel>
);

export const Tabs = forwardRef<
  HTMLDivElement,
  {
    defaultTabIndex?: number;
    className?: string;
    children: ReactElement<typeof Tab> | ReactElement<typeof Tab>[];
  }
>(({ defaultTabIndex = 0, className, children }, ref: ForwardedRef<HTMLDivElement>): ReactElement => {
  const arrayChildren = useMemo(() => {
    return Children.toArray(children).filter(
      (child): child is ReactElement<{ title: ReactNode; id?: string; children?: ReactNode }> =>
        isValidElement(child),
    );
  }, [children]);

  assert(arrayChildren.length > 0, 'Tabs must contain at least one Tab child.');

  const tabs = useMemo(() => {
    return arrayChildren.map((child) => {
      const title = child.props.title;

      return {
        title,
        value: child.props.id ?? slugify(typeof title === 'string' ? title : 'tab', { lower: true, strict: true }),
      };
    });
  }, [arrayChildren]);

  return (
    <SprocketTabs
      ref={ref}
      defaultSelectedValue={tabs[defaultTabIndex]?.value}
      className={cn('flex flex-col font-body', className)}
    >
      <SprocketTabList className="flex gap-6 border-b border-border pb-px relative">
        {tabs.map((tab): ReactElement => (
          <SprocketTab
            key={tab.value}
            value={tab.value}
            className={cn(
              'relative cursor-pointer bg-transparent border-none',
              'py-2 -mb-px text-sm font-medium text-muted',
              'transition-colors duration-150',
              'flex items-center gap-1.5 whitespace-nowrap',
              "after:content-[''] after:absolute after:left-0 after:right-0",
              'after:-bottom-px after:h-0.5 after:bg-primary/45',
              'after:rounded-sm after:opacity-0 after:transition-opacity after:duration-150',
              'hover:text-foreground hover:after:opacity-100',
              'data-[selected=true]:text-primary data-[selected=true]:after:opacity-0',
            )}
          >
            {tab.title}
          </SprocketTab>
        ))}

        <SprocketSelectionIndicator
          className={cn(
            'absolute -bottom-px h-0.5 bg-primary rounded-sm',
            ' transition-[transform,width] duration-200 ease-in-out'
          )}
          style={{
            width: 'var(--sprocketui-selection-indicator-width, 0px)',
            transform: 'translateX(var(--sprocketui-selection-indicator-x, 0px))',
          }}
        />
      </SprocketTabList>

      <SprocketTabPanels className="pt-4">
        {arrayChildren}
      </SprocketTabPanels>
    </SprocketTabs>
  );
});
