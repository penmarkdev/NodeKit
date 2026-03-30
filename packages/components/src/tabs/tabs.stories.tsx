/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, Tab } from './tabs';

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

export const Default: Story = {
  render: () => (
    <Tabs>
      <Tab title="First">Content for the first tab.</Tab>
      <Tab title="Second">Content for the second tab.</Tab>
      <Tab title="Third">Content for the third tab.</Tab>
    </Tabs>
  ),
};
