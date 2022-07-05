import * as React from 'react';
import TestRenderer, { act } from 'react-test-renderer';

import { FmColumn } from './FmColumn';

describe('<FmColumn />', () => {
  /** This will hold the test renderer created instance of the component for each test. */
  let renderer: TestRenderer.ReactTestRenderer;
  describe('flex behavior', () => {
    it('should use a flex column layout', () => {
      act(() => {
        // We create the instance within an `act` because of the component's useEffect.
        renderer = TestRenderer.create(<FmColumn></FmColumn>);
      });
      const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

      expect(tree.props.style?.display).toBe('flex');
      expect([undefined, 'column']).toContain(tree.props.style?.flexDirection);
    });

    describe('vertical alignment of children', () => {
      it('should align children to the top by default', () => {
        act(() => {
          renderer = TestRenderer.create(<FmColumn></FmColumn>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect([undefined, 'flex-start']).toContain(tree.props.style?.justifyContent);
      });

      it('should align children to the center when vCenter is specified', () => {
        act(() => {
          renderer = TestRenderer.create(<FmColumn vCenter></FmColumn>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.style?.justifyContent).toBe('center');
      });

      it('should align children to the bottom when vBottom is specified', () => {
        act(() => {
          renderer = TestRenderer.create(<FmColumn vBottom></FmColumn>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.style?.justifyContent).toBe('flex-end');
      });

      it('should vertically stretch children to fill the container when vFillContainer is specified', () => {
        act(() => {
          renderer = TestRenderer.create(
            <FmColumn vFillContainer>
              <p>Test paragraph</p>
              <div>Child div</div>
              <span>Child span</span>
            </FmColumn>
          );
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        // Container height should be 100%
        expect(tree.props.style?.height).toBe('100%');

        // Each child to have height: 100% (if height was not explicitly specified on child)
        tree.children?.forEach((child) => {
          child = child as TestRenderer.ReactTestRendererJSON;
          expect(child.props.style?.height).toBe('100%');
        });
      });

      it('should allow children to override vFillContainer,', async () => {
        const overridenClass = 'div_id';
        const newHeight = '50px';

        act(() => {
          renderer = TestRenderer.create(
            <FmColumn vFillContainer>
              <p>Test paragraph</p>
              <div style={{ height: newHeight }} className={overridenClass}>
                Child div
              </div>
              <span>Child span</span>
            </FmColumn>
          );
        });

        const childDiv = await renderer.root.findByProps({ className: overridenClass });

        expect(childDiv.props.style?.height).not.toBe('100%');
        expect(childDiv.props.style?.height).toBe(newHeight);
      });
    });

    describe('horizontal alignment of children', () => {
      it('should align children to the left by default', () => {
        act(() => {
          renderer = TestRenderer.create(<FmColumn></FmColumn>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(['flex-start', undefined]).toContain(tree.props.style?.alignItems);
      });

      it('should align children to the center when hCenter is specified', () => {
        act(() => {
          renderer = TestRenderer.create(<FmColumn hCenter></FmColumn>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.style?.alignItems).toBe('center');
      });

      it('should align children to the right when hRight is specified', () => {
        act(() => {
          renderer = TestRenderer.create(<FmColumn hRight></FmColumn>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.style?.alignItems).toBe('flex-end');
      });

      it(`should horizontally stretch children to fill the container when hFillContainer is
      specified`, () => {
        act(() => {
          renderer = TestRenderer.create(
            <FmColumn hFillContainer>
              <p>Test paragraph</p>
              <div>Child div</div>
              <span>Child span</span>
            </FmColumn>
          );
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        // Container width should be 100%
        expect(tree.props.style?.width).toBe('100%');

        // Each child to have width: 100% (if width was not explicitly specified on child)
        tree.children?.forEach((child) => {
          child = child as TestRenderer.ReactTestRendererJSON;
          expect(child.props.style?.width).toBe('100%');
        });
      });

      it('should allow children to override hFillContainer,', async () => {
        const overridenClass = 'div_id';
        const newWidth = '50px';

        act(() => {
          renderer = TestRenderer.create(
            <FmColumn hFillContainer>
              <p>Test paragraph</p>
              <div style={{ width: newWidth }} className={overridenClass}>
                Child div
              </div>
              <span>Child span</span>
            </FmColumn>
          );
        });

        const childDiv = await renderer.root.findByProps({ className: overridenClass });

        expect(childDiv.props.style?.height).not.toBe('100%');
        expect(childDiv.props.style?.width).toBe(newWidth);
      });
    });

    describe('spacing between children', () => {
      it('should use "space-between" flex behavior when vSpaceBetween is specified', () => {
        act(() => {
          renderer = TestRenderer.create(<FmColumn vSpaceBetween></FmColumn>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.style?.justifyContent).toBe('space-between');
      });

      it('should use "space-around" flex behavior when vSpaceAround is specified', () => {
        act(() => {
          renderer = TestRenderer.create(<FmColumn vSpaceAround></FmColumn>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.style?.justifyContent).toBe('space-around');
      });

      it('should not add any bottom margins to children if no gap is specified', () => {
        act(() => {
          renderer = TestRenderer.create(
            <FmColumn>
              <div></div>
              <div></div>
              <p>Hello text</p>
            </FmColumn>
          );
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        tree.children?.forEach((child) => {
          child = child as TestRenderer.ReactTestRendererJSON;
          expect([0, undefined]).toContain(child.props.style?.marginBottom);
        });
      });

      it(`should add a bottom margin between each child in the column, except
          for the last child, if a gap is specified`, () => {
        const gap = 10;
        act(() => {
          renderer = TestRenderer.create(
            <FmColumn gap={gap}>
              <div></div>
              <div></div>
              <p>Hello text</p>
            </FmColumn>
          );
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(allHaveBottomMarginsExceptLast(tree.children, gap)).toBeTruthy();
      });
    });
  });

  describe('inputs to the component', () => {
    it('should support having no children', () => {
      act(() => {
        renderer = TestRenderer.create(<FmColumn></FmColumn>);
      });
      const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

      expect(tree.children).toBeFalsy();
    });

    it('should support passed in contents as children', () => {
      act(() => {
        renderer = TestRenderer.create(
          <FmColumn>
            foo
            <div></div>
          </FmColumn>
        );
      });
      const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

      expect(tree.children?.length).toBe(2);
    });

    it('should allow passed in styles to override default styles', () => {
      // Override - It wouldn't actually make sense to override the flexDirection this way,
      // this is just a test to ensure default styles can be overwritten.
      act(() => {
        renderer = TestRenderer.create(<FmColumn style={{ flexDirection: 'row' }}></FmColumn>);
      });
      const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

      expect(tree.props.style.flexDirection).toBe('row');
    });

    it('should not overwrite defaults for styles that were not passed in', () => {
      act(() => {
        renderer = TestRenderer.create(<FmColumn style={{ flexDirection: 'row' }}></FmColumn>);
      });
      const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

      expect(tree.props.style.display).toBe('flex');
    });

    describe('props', () => {
      it('should not specify a className prop if none was passed in', () => {
        act(() => {
          renderer = TestRenderer.create(<FmColumn></FmColumn>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.className).not.toBeDefined();
      });

      it('should use the passed in className prop', () => {
        const customClassName = 'myClass';

        act(() => {
          renderer = TestRenderer.create(<FmColumn className={customClassName}></FmColumn>);
        });
        const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

        expect(tree.props.className).toBeDefined();
        expect(tree.props.className).toBe(customClassName);
      });
    });
  });

  describe('styles on child elements', () => {
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
        renderer = TestRenderer.create(
          <FmColumn gap={10}>
            <div style={divStyle} className={'myDiv'}></div>
            <p style={pStyle} className={'myP'}>
              Hello
            </p>
            <div style={divStyle} className={'myDiv'}></div>
          </FmColumn>
        );
      });

      // Assert - all div's should have the div styles
      const divEls = await renderer.root.findAllByProps({ className: 'myDiv' });
      divEls.forEach((divEl) => {
        Object.keys(divStyle).forEach((styleName) => {
          expect(divEl.props.style[styleName]).toBe(divStyle[styleName]);
        });
      });

      // Assert - all p elements should have the paragraph styles
      const pEls = await renderer.root.findAllByProps({ className: 'myP' });
      pEls.forEach((pEl) => {
        Object.keys(pStyle).forEach((styleName) => {
          expect(pEl.props.style[styleName]).toBe(pStyle[styleName]);
        });
      });
    });

    it(`should allow styles specified on child elements to override child styles specified
    by FmColumn`, () => {
      const newMarginBottom = 3;

      const divStyle: { [key: string]: any } = {
        // This should override the margin specified on FmColumn by the `gap` prop.
        marginBottom: newMarginBottom
      };
      const pStyle: { [key: string]: any } = {
        // This should override the margin specified on FmColumn by the `gap` prop.
        marginBottom: newMarginBottom
      };

      act(() => {
        renderer = TestRenderer.create(
          <FmColumn gap={10}>
            <div style={divStyle}></div>
            <p style={pStyle}>Hello</p>
            <div style={divStyle}></div>
          </FmColumn>
        );
      });

      const tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;

      // Assert
      expect(allHaveBottomMarginsExceptLast(tree.children, newMarginBottom)).toBeTruthy();
    });
  });
});

/**
 *
 * Helper functions
 *
 */

/** All nodes should have the expected bottom margin, except the last node which should have no
 bottom margin. */
function allHaveBottomMarginsExceptLast(
  nodes: TestRenderer.ReactTestRendererNode[] | null,
  expectedMargin: number
): boolean {
  let result = true;
  nodes?.forEach((node, i) => {
    node = node as TestRenderer.ReactTestRendererJSON;
    if (i === nodes.length - 1) {
      if (!!node.props.style.marginBottom) {
        result = false;
      }
    } else if (
      !!node.props.style.marginBottom === false ||
      node.props.style.marginBottom !== expectedMargin
    ) {
      result = false;
    }
  });
  return result;
}
