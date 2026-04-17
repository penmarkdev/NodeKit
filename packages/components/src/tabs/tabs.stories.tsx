/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Tabs, Tab } from './tabs';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const EditableTitlesExample = () => {
  const [titles, setTitles] = useState({
    tab1: 'Introduction',
    tab2: 'Details',
  });

  return (
    <Tabs>
      <Tab
        id="tab-1"
        title={
          <input
            value={titles.tab1}
            onChange={(e) =>
              setTitles((prev) => ({ ...prev, tab1: e.target.value }))
            }
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
            title="First tab title"
            placeholder="First tab title"
            aria-label="First tab title"
          />
        }
      >
        Content for the first tab.
      </Tab>

      <Tab
        id="tab-2"
        title={
          <input
            value={titles.tab2}
            onChange={(e) =>
              setTitles((prev) => ({ ...prev, tab2: e.target.value }))
            }
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
            title="Second tab title"
            placeholder="Second tab title"
            aria-label="Second tab title"
          />
        }
      >
        Content for the second tab.
      </Tab>

      <Tab id="tab-3" title="Static Title">
        Content for the third tab.
      </Tab>
    </Tabs>
  );
};

export const Default: Story = {
  render: () => <EditableTitlesExample />,
};
