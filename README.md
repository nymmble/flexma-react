## **flexma-react** is a set of React components that enable you to go from Figma design to React code quickly and easily.

<br />
<br />

## Table of Contents

- [1. Installation](#1-installation)
- [2. Motivation](#2-motivation)
- [3. Examples](#3-examples)
- [4. Features](#4-features)
- [5. Compatible Versions](#5-compatible-versions)
- [6. License](#6-license)

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

[Figma's auto layout](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties) feature is a pretty close approximation of the way [CSS flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox) works, so we built the **flexma-react** components to compliment this method of laying out UI elements -- **flexma-react** abstracts away the flexbox details to allow a developer to look at the specifications of a Figma mock up and easily implement it in React.

## 3. Examples

Let's use a simple example to quickly illustrate the design-to-code workflow enabled by **flexma-react**.

<br />
Here, we have a notification card designed in Figma:

<img src="https://raw.githubusercontent.com/nymmble/flexma-react/main/img/example-1-notification_card.png" alt="Example notification card">

<br />
Looking at the layers used by this design, we can see it was built as a container with vertical (column) auto layout: the first cell in the column is made up of the icon and main text, while the second cell in the column is comprised of the date and chevron.

<img src="https://raw.githubusercontent.com/nymmble/flexma-react/main/img/example-2-top_level_layers.png" alt="Example notification card Figma layers">

<br />
To start, let's inspect the top level's (container's) auto layout specification:

<img src="https://raw.githubusercontent.com/nymmble/flexma-react/main/img/example-2a-top_level-auto_layout.png" alt="Example notification card Auto layout specs">

We can see the container uses a vertical/column layout, with a 15 pixel gap between each child (cell), and a padding of 5 on all sides of the container.

To implement this in React using **flexma-react**, we'll use the `FmColumn` component:

```jsx
<FmColumn gap={15} style={{ padding: 5 }}>
  {/* Icon and main text will go here */}

  {/* Date and chevron will go here */}
</FmColumn>
```

<br />
Next, we'll look at how the icon and main text are laid out:

<img src="https://raw.githubusercontent.com/nymmble/flexma-react/main/img/example-3-icon_and_text_auto_layout.png" alt="Example icon and text Auto layout specs">

We can see this block is using a horizontal/row layout, with a gap of 10 between each child. To implement this in React, we use the `FmRow` component and we'll use some hypothetical custom components that will provide the actual content:

```jsx
<FmColumn gap={15} style={{ padding: 5 }}>
  <FmRow gap={10}>
    <IconBullhorn />
    <OfferDetails />
  </FmRow>

  {/* Date and chevron will go here */}
</FmColumn>
```

<br />
For the date and chevron, we follow the same process of inspecting the auto layout details, then using a **flexma-react** component to implement the design in React.

<br />
First we look at the auto layout specifications:
<img src="https://raw.githubusercontent.com/nymmble/flexma-react/main/img/example-4-date_and_chevron_auto_layout.png" alt="Example date and chevron Auto layout specs">

<br />
We can also see that the date section of the row is set to `Fill container`. This is what pushes the chevron icon over to the right of the card:

<img src="https://raw.githubusercontent.com/nymmble/flexma-react/main/img/example-4a-date_fill_container.png" alt="Example date width specs">

<br />
We'll use a `FmRow` with a gap of 15 to replicate the design. We'll put a `100%` width on the date as well:

```jsx
<FmColumn gap={15} style={{ padding: 5 }}>

  <FmRow gap={10}>
    <IconBullhorn />
    <OfferDetails />
  </FmRow>

  <FmRow gap={15}>
    <OfferDate style={{ width: '100%' }}>
    <ChevronLink>
  </FmRow>

</FmColumn>
```

<br />
And we're done! We have quickly and accurately replicated the Figma specifications in React!

Note that this is a simple example, and **flexma-react** components include additional optional props to help accommodate various spacing and alignment requirements. For further details, please see the prop interfaces in the flexma-react component files.

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
