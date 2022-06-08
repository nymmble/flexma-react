## **flexma-react** is a set of React components that use flexbox CSS to replicate Figma's auto layout functionality as closely as possible. flexma-react facilitates going from Figma design to React implementation as quickly as easily as possible.

<br />
<br />

## Table of Contents

1. [Installation](#1-installation)
2. [Motivation](#2-motivation)
3. [Examples](#3-examples)
4. [Features](#4-features)
5. [Compatible Versions](#5-compatible-versions)
6. [License](#6-license)

<br />

## 1. Installation

Using [`npm`](https://www.npmjs.com/package/flexma-react):

```bash
npm install flexma-react
```

To use the flexma-react components in your React app:

```jsx
import { FmRow, FmColumn } from 'flexma-react';

// ...
function MyReactComponent() {
  return (
    <FmRow showBorders vCenter hSpaceAround>
      <div>Row cell 1</div>
      <FmColumn gap={5} showBorders>
        <div> Row cell 2, Col cell 1</div>
        <div> Row cell 2, Col cell 2</div>
      </FmColumn>
    </FmRow>
  );
}
```

The above code would render this simple example that includes a column layout within a row:

<img src="https://raw.githubusercontent.com/nymmble/flexma-react/main/img/row-with-sub-column.png" alt="Row with sub-column">

## 2. Motivation

When working through our own projects, we saw an opportunity to better align the way we were turning Figma designs into React code. We wanted to avoid having our developers trying to replicate designs by "eyeballing it", and instead provide a more programmatic way to move from design to code.

[Figma's auto layout](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties) feature is a pretty close approximation of the way [CSS flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox) works, so we built the **flexma-react** components to allow a developer to look at the specifications of a Figma mock up and easily implement that design in React.

## 3. Examples

## 4. Features

To make the transition from Figma to React as efficient as possible, **flexma-react** components support the following features:

- Vertical and horizontal alignment (in CSS speak: `flex-start`, `center`, `flex-end`)
- Spacing between child elements (`Packed`, `Space between` or `gap` in Figma, `space-between`, `space-around`, or `gap` in CSS)
- Setting child element size to replicate Figma's `Hug contents` and `Fill container` behaviors.

## 5. Compatible Versions

| flexma-react     | React         |
| ---------------- | ------------- |
| v0.0.1 to v0.0.2 | v18 and above |

## 6. License

Licensed under the MIT License, Copyright © 2022 nymmble inc. See [LICENSE](https://github.com/nymmble/flexma-react/blob/main/LICENSE) for more information.
