# @gibme/fontawesome

Simple utilities for creating [Font Awesome](https://fontawesome.com/) icons and buttons programmatically with full TypeScript support.

## Installation

```bash
npm install @gibme/fontawesome
```

```bash
yarn add @gibme/fontawesome
```

## Requirements

- Node.js >= 22
- Font Awesome CSS must be loaded in your page separately

## Usage

### ES Module / TypeScript

```typescript
import FontAwesome, { createIcon, createButton } from '@gibme/fontawesome';
```

### Browser (UMD)

Include the bundled `FontAwesome.min.js` in your page. The library is available as a global `FontAwesome` object.

## API

### `createIcon(icon, options?)`

Creates an `<i>` element with the appropriate Font Awesome classes.

```typescript
// Simple icon
const icon = createIcon('star');

// Branded icon (string)
const twitter = createIcon('brand x-twitter');

// Branded icon (array)
const github = createIcon(['brand', 'github']);

// With options
const spinner = createIcon('spinner', {
    style: 'solid',
    animation: 'spin',
    size: 'xl',
    color: '#ff0000',
});

// With custom attributes
const icon = createIcon('bell', {
    attributes: {
        id: 'notification-bell',
        'data-count': 5,
        hidden: false,
    },
});
```

#### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `style` | `'solid' \| 'regular' \| 'light' \| 'duotone' \| 'thin'` | `'solid'` | Icon style variant |
| `animation` | `Animation` | `'none'` | Animation effect |
| `rotation` | `Rotation` | `'none'` | Rotation or flip transformation |
| `size` | `'default' \| '2xs' \| 'xs' \| 'lg' \| 'xl' \| '2xl'` | `'default'` | Icon size |
| `color` | `Color` | — | CSS color (`#hex`, `rgb()`, or `rgba()`) |
| `class` | `string` | — | Additional CSS classes |
| `attributes` | `Record<string, string \| number \| boolean>` | `{}` | Custom HTML attributes |

### `createButton(icon, options?)`

Creates a `<button>` element with an embedded Font Awesome icon. Accepts all icon options plus:

| Option | Type | Description |
|---|---|---|
| `label` | `string \| HTMLElement` | Text or element to display alongside the icon |

```typescript
// Icon button
const btn = createButton('trash', {
    style: 'solid',
    color: '#dc3545',
});

// Icon button with text label
const saveBtn = createButton('floppy-disk', {
    label: 'Save',
});

// Icon button with custom label element
const label = document.createElement('span');
label.textContent = 'Download';
const dlBtn = createButton('download', { label });
```

### Types

#### `Animation`

```
'none' | 'beat' | 'beat-fade' | 'bounce' | 'fade' | 'flip' | 'shake' | 'spin' | 'spin-reverse' | 'spin-pulse'
```

#### `Rotation`

```
'none' | 'rotate-90' | 'rotate-180' | 'rotate-270' | 'flip-horizontal' | 'flip-vertical' | 'flip-both'
```

#### `Color`

```
`#${string}` | `rgb(${number},${number},${number})` | `rgba(${number},${number},${number},${number})`
```

## License

MIT