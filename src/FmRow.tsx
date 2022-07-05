import * as React from 'react';

interface FmRowProps extends Omit<React.HTMLProps<any>, 'style'> {
  /** Vertically center the content in the container. By default, content is vertically aligned
   to the top of the container. */
  vCenter?: boolean;
  /** Vertically align the content to the bottom of the container. By default, content is
    vertically aligned to the top of the container. */
  vBottom?: boolean;
  /** If set, vertically stretch all children to fill the container. This can be overriden on one
   or more children by explicitly setting their height style. */
  vFillContainer?: boolean;
  /** Horizontally center the content of each child. By default, content is aligned left. */
  hCenter?: boolean;
  /** Horizontally align the content of each child to the right. By default, content is aligned
   left. */
  hRight?: boolean;
  /** If set, horizontally space the children evenly across the entire container, with the first and
   last children positioned against the edges of the container. */
  hSpaceBetween?: boolean;
  /** If set, horizontally space the children evenly across the entire container, including spacing
   between the edges of the container and the first and last children. */
  hSpaceAround?: boolean;
  /** If set, the width of the children in the row will all be set to fill the container
   (ie. 100%). This can be overriden by explicitly setting widths on child elements. */
  hFillContainer?: boolean;
  /** How many pixels to render between each child. */
  gap?: number;
  /** The flexWrap style is set to 'wrap' by default. Use this prop to override that default. */
  noWrap?: boolean;
  /** Styles passed in via a prop. */
  style?: React.CSSProperties;
  /** For debugging purposes. Render borders around containing View (purple) and each child (cyan). */
  showBorders?: boolean;
}

/**
 *
 * This component provides a container that lays out its children in a flex row. Various
 * props can be passed to this component to affect the positioning and layout of its children (see
 * the props interface for more details).
 *
 */
export const FmRow: React.FC<FmRowProps> = (props) => {
  const [containerStyles, setContainerStyles] = React.useState<React.CSSProperties>({
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: props.noWrap ? 'nowrap' : 'wrap',
    borderColor: props.showBorders ? 'purple' : undefined,
    borderWidth: props.showBorders ? 1 : undefined,
    borderStyle: props.showBorders ? 'solid' : undefined
  });

  const [childStyles, setChildStyles] = React.useState<React.CSSProperties>({
    marginRight: props.gap || 0,
    borderColor: props.showBorders ? 'cyan' : undefined,
    borderWidth: props.showBorders ? 2 : undefined,
    borderStyle: props.showBorders ? 'dashed' : undefined
  });

  const [lastChildIndex, setLastChildIndex] = React.useState<number>(
    React.Children.count(props.children)
  );

  React.useLayoutEffect(() => {
    let configuredStyles: any = {};
    if (props.vCenter) {
      configuredStyles.alignItems = 'center';
    } else if (props.vBottom) {
      configuredStyles.alignItems = 'flex-end';
    } else if (props.vFillContainer) {
      configuredStyles.height = '100%';
      setChildStyles({ ...childStyles, height: '100%' });
    }

    if (props.hCenter) {
      configuredStyles.justifyContent = 'center';
    } else if (props.hRight) {
      configuredStyles.justifyContent = 'flex-end';
    } else if (props.hSpaceBetween) {
      configuredStyles.justifyContent = 'space-between';
    } else if (props.hSpaceAround) {
      configuredStyles.justifyContent = 'space-around';
    } else if (props.hFillContainer) {
      configuredStyles.width = '100%';
      setChildStyles({ ...childStyles, width: '100%' });
    }

    setContainerStyles((currStyles) => ({
      ...currStyles,
      ...configuredStyles
    }));

    // We need to treat the last child differently as we don't want a margin behind it. This index
    // and function help us identify the last child.
    setLastChildIndex(React.Children.count(props.children));
  }, []);

  const isLastChild = (index: number): boolean => index === lastChildIndex - 1;

  /** Used by the view to determine the left and right margin on each child within the row. */
  const getHMargins = (index: number): { marginLeft: number; marginRight: number } => {
    const gap = props.gap ?? 0;
    if (props.hCenter || props.hSpaceAround) {
      return { marginLeft: gap / 2, marginRight: gap / 2 };
    } else if (props.hSpaceBetween) {
      // with hSpace between, first child has no marginLeft
      if (index === 0) {
        return { marginLeft: 0, marginRight: gap / 2 };
      } else if (!isLastChild(index)) {
        return { marginLeft: gap / 2, marginRight: gap / 2 };
      } else {
        return { marginLeft: gap / 2, marginRight: 0 };
      }
    } else if (props.hRight) {
      return { marginLeft: index === 0 ? 0 : gap, marginRight: 0 };
    } else {
      // hLeft (default)
      return { marginLeft: 0, marginRight: isLastChild(index) ? 0 : gap };
    }
  };

  return (
    <div className={props.className} style={{ ...containerStyles, ...props.style }}>
      {React.Children.map(props.children, (child, i) => {
        if (isEl(child)) {
          let mergedStyles = {
            ...childStyles,
            ...getHMargins(i),
            ...child.props.style
          };

          return React.cloneElement(child, {
            style: mergedStyles
          });
        } else {
          return child;
        }
      })}
    </div>
  );
};

/** Helper type guard to make sure a child passed to this component is a React element. */
function isEl(x: any): x is React.ReactElement {
  return x instanceof Object && 'props' in x;
}
