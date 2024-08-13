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

import $ from 'jquery';
import { Icon, Button } from './types';
export * from './types';

export default abstract class FontAwesome {
    /**
     * Creates a button with a fontawesome icon inside
     *
     * @param icon
     * @param iconOptions
     */
    public static createButton <T extends HTMLElement = HTMLButtonElement> (
        icon: string | string[],
        iconOptions: Partial<Button.Options> = {}
    ): JQuery<T> {
        if (Array.isArray(icon)) {
            icon = icon.join(' ');
        }

        const button = $<T>('<button>')
            .addClass('btn')
            .attr('type', 'button');

        FontAwesome.createIcon(icon, iconOptions)
            .appendTo(button);

        if (iconOptions.label && typeof iconOptions.label === 'string') {
            $('<span>')
                .text(` ${iconOptions.label}`)
                .appendTo(button);
        } else if (iconOptions.label && typeof iconOptions.label !== 'string') {
            iconOptions.label.appendTo(button);
        }

        return button;
    }

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
    public static createIcon<T extends HTMLElement = HTMLElement> (
        icon: string | string[],
        options: Partial<Icon.Options> = {}
    ): JQuery<T> {
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

        const element = $<T>('<i>')
            .addClass(`fa-${options.style} ${icon}`);

        if (options.animation !== 'none') {
            // spin-reverse requires two classes
            if (options.animation === 'spin-reverse') {
                element.addClass('fa-spin fa-spin-reverse');
            } else {
                element.addClass(`fa-${options.animation}`);
            }
        }

        if (options.rotation !== 'none' && options.animation === 'none') {
            element.addClass(`fa-${options.rotation}`);
        }

        if (options.color) {
            element.attr('style', `color: ${options.color}`);
        }

        if (options.size !== 'default') {
            element.addClass(`fa-${options.size}`);
        }

        if (options.class) {
            element.addClass(options.class);
        }

        for (const key in options.attributes) {
            const value = options.attributes[key];

            if (typeof value === 'boolean') {
                if (value) {
                    element.attr(key, key);
                }
            } else if (typeof value === 'number') {
                element.attr(key, value.toString());
            } else {
                element.attr(key, value);
            }
        }

        return element;
    }
}

export { FontAwesome };
