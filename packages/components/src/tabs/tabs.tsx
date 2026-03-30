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
import { assert } from '@necto/assert';
import { slugify } from '@necto/slugify';
import { Children, isValidElement, forwardRef, useMemo } from 'react';

import styles from './tabs.module.scss';

import type { ReactElement, ReactNode, ForwardedRef } from 'react';

export const Tab = ({ children, title }: { title: string; id?: string; children?: ReactNode }): ReactElement => (
  <SprocketTabPanel value={slugify(title, { lower: true, strict: true })}>
    {children}
  </SprocketTabPanel>
);

export const Tabs = forwardRef<
  HTMLDivElement,
  {
    defaultTabIndex?: number;
    children: ReactElement<typeof Tab> | ReactElement<typeof Tab>[];
  }
>(({ defaultTabIndex = 0, children }, ref: ForwardedRef<HTMLDivElement>): ReactElement => {
  const arrayChildren = useMemo(() => {
    return Children.toArray(children).filter(
      (child): child is ReactElement<{ title: string; id?: string; children?: ReactNode }> =>
        isValidElement(child),
    );
  }, [children]);

  assert(arrayChildren.length > 0, 'Tabs must contain at least one Tab child.');

  const tabs = useMemo(() => {
    return arrayChildren.map((child) => {
      const title: string = child.props.title;

      return {
        title,
        value: child.props.id ?? slugify(title, { lower: true, strict: true }),
      };
    });
  }, [arrayChildren]);

  return (
    <SprocketTabs
      ref={ref}
      defaultSelectedValue={tabs[defaultTabIndex]?.value}
      className={styles.tabs}
    >
      <SprocketTabList className={styles.tabList}>
        {tabs.map((tab): ReactElement => (
          <SprocketTab key={tab.value} value={tab.value} className={styles.tab}>
            {tab.title}
          </SprocketTab>
        ))}

        <SprocketSelectionIndicator className={styles.indicator} />
      </SprocketTabList>

      <SprocketTabPanels className={styles.panels}>
        {arrayChildren}
      </SprocketTabPanels>
    </SprocketTabs>
  );
});
