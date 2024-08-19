// Copyright (c) 2024, Brandon Lehmann <brandonlehmann@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { Icon, Button } from './types';
export * from './types';

/**
 * Creates a Font Awesome Icon
 *
 * Note: The icon name must be specified without the `fa-` prefix. If the icon includes
 * multiple names (i.e. `fa-brand fa-x-twitter`) the icon should be specified as either
 * `brand x-twitter` or `['brand','x-twitter']`
 *
 * @param icon
 * @param options
 */
export const createIcon = (
    icon: string | string[],
    options: Partial<Icon.Options> = {}
): HTMLElement => {
    options.style ??= 'solid';
    options.animation ??= 'none';
    options.rotation ??= 'none';
    options.size ??= 'default';
    options.attributes ??= {};

    if (Array.isArray(icon)) {
        icon = icon.join(' ');
    }

    // rework the icon in case of multiple specifiers
    icon = icon.split(' ')
        .map(elem => `fa-${elem}`)
        .join(' ');

    const element = document.createElement('i');
    element.className = `fa-${options.style} ${icon}`;

    if (options.animation !== 'none') {
        const { animation } = options;
        // spin-reverse requires two classes
        if (animation === 'spin-reverse') {
            element.classList.add('fa-spin', 'fa-spin-reverse');
        } else {
            element.classList.add(`fa-${animation}`);
        }
    }

    if (options.rotation !== 'none' && options.animation !== 'none') {
        element.classList.add(`fa-${options.rotation}`);
    }

    if (options.color) {
        element.setAttribute('style', `color: ${options.color}`);
    }

    if (options.size !== 'default') {
        element.classList.add(`fa-${options.size}`);
    }

    if (options.class) {
        element.classList.add(options.class);
    }

    for (const key in options.attributes) {
        const value = options.attributes[key];

        if (typeof value === 'boolean') {
            if (value) {
                element.setAttribute(key, key);
            }
        } else if (typeof value === 'number') {
            element.setAttribute(key, value.toString());
        } else {
            element.setAttribute(key, value);
        }
    }

    return element;
};

/**
 * Creates a button with a fontawesome icon inside
 *
 * @param icon
 * @param iconOptions
 */
export const createButton = (
    icon: string | string[],
    iconOptions: Partial<Button.Options> = {}
): HTMLButtonElement => {
    if (Array.isArray(icon)) {
        icon = icon.join(' ');
    }

    const button = document.createElement('button');
    button.classList.add('btn');
    button.setAttribute('type', 'button');
    button.appendChild(createIcon(icon, iconOptions));

    if (iconOptions.label && typeof iconOptions.label === 'string') {
        const span = document.createElement('span');
        span.textContent = ` ${iconOptions.label}`;
        button.appendChild(span);
    } else if (iconOptions.label && typeof iconOptions.label !== 'string') {
        button.appendChild(iconOptions.label);
    }

    return button;
};

export const FontAwesome = {
    createIcon,
    createButton
};

export default FontAwesome;
