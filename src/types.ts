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

export type Color = `rgb(${number},${number},${number})`
    | `rgba(${number},${number},${number},${number})`
    | `#${string}`;

export type Animation = 'none' | 'beat' | 'beat-fade' | 'bounce' | 'fade'
    | 'flip' | 'shake' | 'spin' | 'spin-reverse' | 'spin-pulse';

export type Rotation = 'none' | 'rotate-90' | 'rotate-180' | 'rotate-270'
    | 'flip-horizontal' | 'flip-vertical' | 'flip-both';

export namespace Icon {
    type Style = 'solid' | 'regular' | 'light' | 'duotone' | 'thin';

    type Size = 'default' | '2xs' | 'xs' | 'lg' | 'xl' | '2xl';

    /**
     * Font Awesome Option set
     */
    export interface Options {
        class: string;
        style: Style;
        animation: Animation;
        rotation: Rotation;
        size: Size;
        color: Color;
        attributes: Record<string, string | number | boolean>;
    }
}

export namespace Button {
    /**
     * Font Awesome Button Options set
     */
    export interface Options extends Icon.Options {
        label: string | JQuery<HTMLElement>;

        [key: string]: any;
    }
}
