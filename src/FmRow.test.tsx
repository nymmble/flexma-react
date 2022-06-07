import * as React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
// import { Text, View } from 'react-native';

import { FmRow } from './FmRow';

describe('<FmRow />', () => {
  describe('flex behavior', () => {
    let renderer: TestRenderer.ReactTestRenderer;

    it('should use a row layout', () => {
      act(() => {
        // We create the instance within an `act` because of FmRow's useEffect.
        renderer = TestRenderer.create(<FmRow></FmRow>);
      });
      const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

      expect(tree.props.style.display).toBe('flex');
      expect(tree.props.style.flexDirection).toBe('row');
    });

    describe('wrapping behavior', () => {
      it('should wrap by default', () => {
        act(() => {
          renderer = TestRenderer.create(<FmRow></FmRow>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.style.flexWrap).toBe('wrap');
      });

      it('should not wrap when configured to do so', () => {
        act(() => {
          renderer = TestRenderer.create(<FmRow noWrap></FmRow>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.style.flexWrap).toBe('nowrap');
      });
    });

    describe('vertical alignment of children', () => {
      it('should vertically align children to the top by default', () => {
        act(() => {
          renderer = TestRenderer.create(<FmRow></FmRow>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.style.flexDirection).toBe('row');
        expect(['flex-start', undefined]).toContain(tree.props.style.alignItems);
      });

      it('should vertically align children to the center when vCenter is passed', () => {
        act(() => {
          renderer = TestRenderer.create(<FmRow vCenter></FmRow>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.style.flexDirection).toBe('row');
        expect(tree.props.style.alignItems).toBe('center');
      });

      it('should vertically align children to the bottom when vBottom is passed', () => {
        act(() => {
          renderer = TestRenderer.create(<FmRow vBottom></FmRow>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.style.flexDirection).toBe('row');
        expect(tree.props.style.alignItems).toBe('flex-end');
      });

      it('should vertically stretch children to fill container when vFillContainer is specified', () => {
        act(() => {
          renderer = TestRenderer.create(
            <FmRow vFillContainer>
              <p>Paragraph</p>
              <div>div</div>
              <span>span</span>
            </FmRow>
          );
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        // Container height
        expect(tree.props.style?.height).toBe('100%');

        // Each child should also have max height
        tree.children?.forEach((child) => {
          child = child as TestRenderer.ReactTestRendererJSON;
          expect(child.props.style?.height).toBe('100%');
        });
      });

      it('should allow children to explicitly override vFillContainer', async () => {
        const divClass = 'div_id';
        const newHeight = '25px';

        act(() => {
          renderer = TestRenderer.create(
            <FmRow vFillContainer>
              <p>Paragraph</p>
              <div style={{ height: newHeight }} className={divClass}>
                div
              </div>
              <span>span</span>
            </FmRow>
          );
        });

        const childDiv = await renderer.root.findByProps({ className: divClass });
        expect(childDiv.props.style?.height).not.toBe('100%');
        expect(childDiv.props.style?.height).toBe(newHeight);
      });
    });

    describe('horizontal alignment of children', () => {
      it('should horizontally align children to the left by default', () => {
        act(() => {
          renderer = TestRenderer.create(<FmRow></FmRow>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.style.flexDirection).toBe('row');
        expect(['flex-start', undefined]).toContain(tree.props.style.justifyContent);
      });

      it('should horizontally align children to the center when hCenter is passed', () => {
        act(() => {
          renderer = TestRenderer.create(<FmRow hCenter></FmRow>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.style.flexDirection).toBe('row');
        expect(tree.props.style.justifyContent).toBe('center');
      });

      it('should horizontally align children to the right when hRight is passed', () => {
        act(() => {
          renderer = TestRenderer.create(<FmRow hRight></FmRow>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.style.flexDirection).toBe('row');
        expect(tree.props.style.justifyContent).toBe('flex-end');
      });

      it(`should horizontally stretch children to fill container when hFillContainer is
      specified`, () => {
        act(() => {
          renderer = TestRenderer.create(
            <FmRow hFillContainer>
              <p>Paragraph</p>
              <div>div</div>
              <span>span</span>
            </FmRow>
          );
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        // Container width
        expect(tree.props.style?.width).toBe('100%');

        // Each child should also have max width
        tree.children?.forEach((child) => {
          child = child as TestRenderer.ReactTestRendererJSON;
          expect(child.props.style?.width).toBe('100%');
        });
      });

      it('should allow children to explicitly override hFillContainer', async () => {
        const divClass = 'div_id';
        const newWidth = '25px';

        act(() => {
          renderer = TestRenderer.create(
            <FmRow vFillContainer>
              <p>Paragraph</p>
              <div style={{ width: newWidth }} className={divClass}>
                div
              </div>
              <span>span</span>
            </FmRow>
          );
        });

        const childDiv = await renderer.root.findByProps({ className: divClass });
        expect(childDiv.props.style?.width).not.toBe('100%');
        expect(childDiv.props.style?.width).toBe(newWidth);
      });
    });
  });

  describe('inputs', () => {
    let instance: TestRenderer.ReactTestRenderer;

    it('should support having no children', () => {
      act(() => {
        // We create the instance within an `act` because of FmRow's useEffect.
        instance = TestRenderer.create(<FmRow></FmRow>);
      });
      const tree = instance.toJSON() as TestRenderer.ReactTestRendererJSON;

      expect(tree.children).toBeFalsy();
    });

    it('should support passed in contents as children', () => {
      act(() => {
        // We create the instance within an `act` because of FmRow's useEffect.
        instance = TestRenderer.create(
          <FmRow>
            foo
            <div></div>
          </FmRow>
        );
      });
      const tree = instance.toJSON() as TestRenderer.ReactTestRendererJSON;

      expect(tree.children?.length).toBe(2);
    });

    it('should allow passed in styles to override default styles', () => {
      // Override - It wouldn't actually make sense to override the flexDirection this way,
      // this is just a test to ensure default styles can be overwritten.
      act(() => {
        instance = TestRenderer.create(<FmRow style={{ flexDirection: 'column' }}></FmRow>);
      });
      const newTree = instance.toJSON() as TestRenderer.ReactTestRendererJSON;

      expect(newTree.props.style.flexDirection).toBe('column');
    });

    it('should not overwrite defaults for styles that were not passed in', () => {
      act(() => {
        instance = TestRenderer.create(<FmRow style={{ flexDirection: 'column' }}></FmRow>);
      });
      const tree = instance.toJSON() as TestRenderer.ReactTestRendererJSON;

      expect(tree.props.style.flexWrap).toBe('wrap');
    });
  });

  describe('child spacing', () => {
    let instance: TestRenderer.ReactTestRenderer;

    it('children should have no left margins by default', () => {
      act(() => {
        instance = TestRenderer.create(
          <FmRow gap={10}>
            <div></div>
            <p>Hello</p>
            <div></div>
          </FmRow>
        );
      });
      const tree = instance.toJSON() as TestRenderer.ReactTestRendererJSON;

      // Assert
      try {
        tree.children?.forEach((child) => {
          expect((child as TestRenderer.ReactTestRendererJSON).props.style?.marginLeft).toBeFalsy();
        });
      } catch {
        throw new Error('No children found.');
      }
    });

    it('children should have right margins except on the last child by default', () => {
      const gap = 10;

      act(() => {
        instance = TestRenderer.create(
          <FmRow gap={gap}>
            <div></div>
            <p>Hello</p>
            <div></div>
          </FmRow>
        );
      });
      const tree = instance.toJSON() as TestRenderer.ReactTestRendererJSON;

      // Assert
      expect(allHaveRightMarginsExceptLastChild(tree.children, gap)).toBeTruthy();
    });

    it('children should have half gap left and half gap right on each child for hCenter', () => {
      const gap = 10;
      act(() => {
        instance = TestRenderer.create(
          <FmRow hCenter gap={gap}>
            <div></div>
            <p>Hello</p>
            <div></div>
          </FmRow>
        );
      });
      const tree = instance.toJSON() as TestRenderer.ReactTestRendererJSON;

      // Assert
      tree.children?.forEach((child, i) => {
        child = child as TestRenderer.ReactTestRendererJSON;
        expect(child.props.style?.marginLeft).toBe(gap / 2);
        expect(child.props.style?.marginRight).toBe(gap / 2);
      });
    });

    it('children should have half gap left and half gap right on each child for hSpaceAround', () => {
      const gap = 10;
      act(() => {
        instance = TestRenderer.create(
          <FmRow hSpaceAround gap={gap}>
            <div></div>
            <p>Hello</p>
            <div></div>
          </FmRow>
        );
      });
      const tree = instance.toJSON() as TestRenderer.ReactTestRendererJSON;

      // Assert
      tree.children?.forEach((child, i) => {
        child = child as TestRenderer.ReactTestRendererJSON;
        expect(child.props.style?.marginLeft).toBe(gap / 2);
        expect(child.props.style?.marginRight).toBe(gap / 2);
      });
    });

    it(`children should have half gap left and half gap right on each child for hSpaceBetween, but
  no outer margins on the first and last children`, () => {
      const gap = 10;
      act(() => {
        instance = TestRenderer.create(
          <FmRow hSpaceBetween gap={gap}>
            <div></div>
            <p>Hello</p>
            <div></div>
          </FmRow>
        );
      });
      const tree = instance.toJSON() as TestRenderer.ReactTestRendererJSON;

      // Assert
      const firstChild = (
        tree.children?.slice() as TestRenderer.ReactTestRendererNode[]
      )?.shift() as TestRenderer.ReactTestRendererJSON;
      expect(firstChild.props.style.marginLeft).toBeFalsy();

      const lastChild = (
        tree.children?.slice() as TestRenderer.ReactTestRendererNode[]
      )?.pop() as TestRenderer.ReactTestRendererJSON;
      expect(lastChild.props.style?.marginLeft).toBe(gap / 2);
      expect(lastChild.props.style?.marginRight).toBeFalsy();

      expect(allMiddleSiblingsHaveStyle(tree.children, 'marginLeft', gap / 2)).toBeTruthy();
      expect(allMiddleSiblingsHaveStyle(tree.children, 'marginRight', gap / 2)).toBeTruthy();
    });

    it(`children should have left margins (except for first child) and no right margins on all
  children for hRight`, () => {
      const gap = 10;
      act(() => {
        instance = TestRenderer.create(
          <FmRow hRight gap={gap}>
            <div></div>
            <p>Hello</p>
            <div></div>
          </FmRow>
        );
      });
      const tree = instance.toJSON() as TestRenderer.ReactTestRendererJSON;

      // Assert
      expect(noRightMargins(tree.children)).toBeTruthy();
      expect(allHaveLeftMarginsExceptFirstChild(tree.children, gap)).toBeTruthy();
    });
  });

  describe('children', () => {
    let instance: TestRenderer.ReactTestRenderer;

    it('should allow styles to be specified directly on child elements', async () => {
      const divStyle: { [key: string]: any } = {
        backgroundColor: 'green',
        fontSize: 23
      };
      const pStyle: { [key: string]: any } = {
        fontSize: 14,
        borderColor: 'red'
      };

      act(() => {
        instance = TestRenderer.create(
          <FmRow gap={10}>
            <div style={divStyle} className={'myDiv'}></div>
            <p style={pStyle} className={'myP'}>
              Hello
            </p>
            <div style={divStyle} className={'myDiv'}></div>
          </FmRow>
        );
      });

      // Assert - all div's should have the div styles
      const divEls = await instance.root.findAllByProps({ className: 'myDiv' });
      divEls.forEach((divEl) => {
        Object.keys(divStyle).forEach((styleName) => {
          expect(divEl.props.style[styleName]).toBe(divStyle[styleName]);
        });
      });

      // Assert - all p elements should have the paragraph styles
      const pEls = await instance.root.findAllByProps({ className: 'myP' });
      pEls.forEach((pEl) => {
        Object.keys(pStyle).forEach((styleName) => {
          expect(pEl.props.style[styleName]).toBe(pStyle[styleName]);
        });
      });
    });

    it('should allow styles defined on children to override styles defined by FmRow', () => {
      const origMarginRight = 10;
      const newMarginRight = 3;

      const divStyle: { [key: string]: any } = {
        marginRight: newMarginRight
      };
      const pStyle: { [key: string]: any } = {
        marginRight: newMarginRight
      };

      act(() => {
        instance = TestRenderer.create(
          <FmRow gap={origMarginRight}>
            <div style={divStyle}></div>
            <p style={pStyle}>Hello</p>
            <div style={divStyle}></div>
          </FmRow>
        );
      });

      const tree = instance.toJSON() as TestRenderer.ReactTestRendererJSON;

      // Assert
      tree.children?.forEach((child) => {
        child = child as TestRenderer.ReactTestRendererJSON;
        expect(child.props.style.marginRight).toBe(newMarginRight);
      });
    });
  });
});

/**
 *
 * Helper functions
 *
 */

/**
 * Last child must have no right margins, all other nodes must have a right margin.
 */
function allHaveRightMarginsExceptLastChild(
  nodes: TestRenderer.ReactTestRendererNode[] | null,
  expectedMargin: number
): boolean {
  if (!nodes || !nodes.length) {
    return false;
  }

  let result = true;
  nodes.reverse().forEach((node, i) => {
    node = node as TestRenderer.ReactTestRendererJSON;
    if (i === 0) {
      // Checking the last child (i == 0 because we reversed the array). If it has a right
      // margin, return false.
      if (!!node.props.style.marginRight === true) {
        result = false;
      }
    } else if (
      !!node.props.style.marginRight === false ||
      node.props.style.marginRight !== expectedMargin
    ) {
      // If any other child does not have a right margin, return false.
      result = false;
    }
  });
  return result;
}

/**
 * Returns false if any node in the array has a right margin.
 */
function noRightMargins(nodes: TestRenderer.ReactTestRendererNode[] | null): boolean {
  if (!nodes || !nodes.length) {
    return false;
  }

  let result = true;
  nodes.forEach((node) => {
    node = node as TestRenderer.ReactTestRendererJSON;
    if (!!node.props.style.marginRight === true) {
      result = false;
    }
  });

  return result;
}

/**
 * All nodes (except first child) must have the expected left margin. First child must have
 * no left margin.
 */
function allHaveLeftMarginsExceptFirstChild(
  nodes: TestRenderer.ReactTestRendererNode[] | null,
  expectedMargin: number
): boolean {
  if (!nodes || !nodes.length) {
    return false;
  }

  let result = true;
  nodes.forEach((node, i) => {
    node = node as TestRenderer.ReactTestRendererJSON;
    if (i === 0) {
      if (!!node.props.style.marginLeft === true) {
        result = false;
      }
    } else if (
      !!node.props.style.marginLeft === false ||
      node.props.style.marginLeft !== expectedMargin
    ) {
      result = false;
    }
  });
  return result;
}

/**
 * All nodes (except the first and last) must have the expected value for the specified style
 * field.
 */
function allMiddleSiblingsHaveStyle(
  nodes: TestRenderer.ReactTestRendererNode[] | null,
  field: string,
  value: number
): boolean {
  if (!nodes || !nodes.length) {
    return false;
  }

  let result = true;
  nodes.forEach((node, i) => {
    node = node as TestRenderer.ReactTestRendererJSON;
    if (i !== 0 && i !== nodes.length - 1) {
      if (node.props.style[field] !== value) {
        result = false;
      }
    }
  });
  return result;
}
