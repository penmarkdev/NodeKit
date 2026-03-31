/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import cn from 'clsx';
import { forwardRef } from 'react';

import type { ReactElement, ReactNode, ForwardedRef } from 'react';

export const Badge = forwardRef<HTMLSpanElement, {
  shape?: 'rounded' | 'pill',
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  color?: 'gray' | 'blue' | 'green' | 'yellow' | 'orange' | 'red' | 'purple' | 'white',
  className?: string,
  children?: ReactNode,
}>(({ shape = 'rounded', size = 'md', color = 'gray', className, children }, ref: ForwardedRef<HTMLSpanElement>): ReactElement => {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center font-medium ring-1 ring-inset',
        shape === 'pill' ? 'rounded-full' : 'rounded-md',
        size === 'xs' && 'px-1.5 py-0.5 text-[10px]',
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-2.5 py-1 text-xs',
        size === 'lg' && 'px-3 py-1 text-sm',
        size === 'xl' && 'px-3.5 py-1.5 text-sm',
        color === 'gray' && 'bg-gray-100 text-gray-700 ring-gray-300',
        color === 'blue' && 'bg-blue-100 text-blue-700 ring-blue-300',
        color === 'green' && 'bg-green-100 text-green-700 ring-green-300',
        color === 'yellow' && 'bg-yellow-100 text-yellow-700 ring-yellow-300',
        color === 'orange' && 'bg-orange-100 text-orange-700 ring-orange-300',
        color === 'red' && 'bg-red-100 text-red-700 ring-red-300',
        color === 'purple' && 'bg-purple-100 text-purple-700 ring-purple-300',
        color === 'white' && 'bg-white text-gray-700 ring-gray-200',
        className,
      )}
    >
      {children}
    </span>
  );
});
