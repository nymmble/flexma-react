import * as React from 'react';

interface FmColumnProps extends Omit<React.HTMLProps<any>, 'style'> {
  /** Vertically center the content in the container. By default, content is vertically aligned
   to the top of the container. */
  vCenter?: boolean;
  /** Vertically align the content to the bottom of the container. By default, content is
    vertically aligned to the top of the container. */
  vBottom?: boolean;
  /** If set, vertically space the children evenly across the entire container, with the first and
   last children positioned against the edges of the container. */
  vSpaceBetween?: boolean;
  /** If set, vertically space the children evenly across the entire container, including spacing
   between the edges of the container and the first and last children. */
  vSpaceAround?: boolean;
  /** If this is set, the height of the children in the column will all be set to maximize their
   heights. This can be overriden by explicitly setting heights on child elements. */
  vFillContainer?: boolean;
  /** Horizontally center the content of the container. By default, content is aligned left. */
  hCenter?: boolean;
  /** Horizontally align the content of the container to the right. By default, content is aligned
   left. */
  hRight?: boolean;
  /** If this is set, the width of the children in the column will all be set to fill the container
   (ie. 100%). This can be overriden by explicitly setting widths on child elements. */
  hFillContainer?: boolean;
  /** How many pixels to render between each child. */
  gap?: number;
  /** For debugging purposes. Render borders around containing View (red) and each child (pink). */
  showBorders?: boolean;
  style?: React.CSSProperties;
}

/**
 *
 * This component provides a container that lays out its children in a flex column. Various
 * props can be passed to this component to affect the positioning and layout of its children (see
 * the props interface for more details).
 *
 */
export const FmColumn: React.FC<FmColumnProps> = (props) => {
  const [containerStyles, setContainerStyles] = React.useState<React.CSSProperties>({
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    borderColor: props.showBorders ? 'red' : undefined,
    borderWidth: props.showBorders ? 1 : undefined,
    borderStyle: props.showBorders ? 'solid' : undefined
  });

  const [childStyles, setChildStyles] = React.useState<React.CSSProperties>({
    marginBottom: props.gap || 0,
    borderColor: props.showBorders ? 'pink' : undefined,
    borderWidth: props.showBorders ? 2 : undefined,
    borderStyle: props.showBorders ? 'dashed' : undefined
  });

  const [lastChildIndex, setLastChildIndex] = React.useState<number>(
    React.Children.count(props.children)
  );

  const isLastChild = (index: number): boolean => index === lastChildIndex - 1;

  React.useLayoutEffect(() => {
    let configuredStyles: any = {};
    if (props.vCenter) {
      configuredStyles.justifyContent = 'center';
    } else if (props.vBottom) {
      configuredStyles.justifyContent = 'flex-end';
    } else if (props.vSpaceBetween) {
      configuredStyles.justifyContent = 'space-between';
    } else if (props.vSpaceAround) {
      configuredStyles.justifyContent = 'space-around';
    } else if (props.vFillContainer) {
      configuredStyles.height = '100%';
      setChildStyles({ ...childStyles, height: '100%' });
    }

    if (props.hCenter) {
      configuredStyles.alignItems = 'center';
    } else if (props.hRight) {
      configuredStyles.alignItems = 'flex-end';
    } else if (props.hFillContainer) {
      configuredStyles.width = '100%';
      setChildStyles({ ...childStyles, width: '100%' });
    }

    setContainerStyles({ ...containerStyles, ...configuredStyles });

    // We need to treat the last child differently as we don't want a margin below it. This index
    // and function help us identify the last child.
    setLastChildIndex(React.Children.count(props.children));
  }, []);

  return (
    <div style={{ ...containerStyles, ...props.style }}>
      {React.Children.map(props.children, (child, i) => {
        if (isEl(child)) {
          let mergedStyles = {
            ...childStyles,
            ...child.props.style
          };
          mergedStyles = isLastChild(i) ? { ...mergedStyles, marginBottom: 0 } : mergedStyles;
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
