import { RenderResult, act, render, screen } from '@testing-library/react-native';
import { ItemWithIndex } from '../virtualizedList/VirtualizedList';
import { PropsTestButton, TestButton } from '../tests/TestButton';
import { SpatialNavigationRoot } from '../Root';
import '../tests/helpers/configureTestRemoteControl';

import { DefaultFocus } from '../../context/DefaultFocusContext';
import { SpatialNavigationVirtualizedGrid } from '../virtualizedGrid/SpatialNavigationVirtualizedGrid';
import testRemoteControlManager from '../tests/helpers/testRemoteControlManager';

export const expectButtonToHaveFocus = (component: RenderResult, text: string) => {
  const element = component.getByRole('button', { name: text });
  expect(element).toHaveAccessibilityState({ selected: true });
};

describe('SpatialNavigationVirtualizedGrid', () => {
  const renderItem = ({ item }: { item: PropsTestButton & ItemWithIndex }) => (
    <TestButton title={item.title} onSelect={item.onSelect} />
  );

  function createDataArray(numberOfItems: number) {
    const data = [];
    for (let i = 0; i < numberOfItems; i++) {
      data.push({
        title: `button ${i + 1}`,
        onSelect: () => undefined,
        index: i,
      });
    }
    return data;
  }

  const renderGrid = () =>
    render(
      <SpatialNavigationRoot>
        <DefaultFocus>
          <SpatialNavigationVirtualizedGrid
            renderItem={renderItem}
            data={createDataArray(19)}
            itemHeight={100}
            numberOfRenderedRows={5}
            numberOfRowsVisibleOnScreen={3}
            numberOfColumns={3}
            testID="test-grid"
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );

  it('renders the correct number of item', () => {
    const component = renderGrid();
    act(() => jest.runAllTimers());

    expect(screen).toMatchSnapshot();

    expect(screen.getByText('button 1')).toBeTruthy();
    expectButtonToHaveFocus(component, 'button 1');
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 3')).toBeTruthy();
    expect(screen.getByText('button 4')).toBeTruthy();
    expect(screen.getByText('button 5')).toBeTruthy();
    expect(screen.getByText('button 6')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.getByText('button 8')).toBeTruthy();
    expect(screen.getByText('button 9')).toBeTruthy();
    expect(screen.getByText('button 10')).toBeTruthy();
    expect(screen.getByText('button 11')).toBeTruthy();
    expect(screen.getByText('button 12')).toBeTruthy();
    expect(screen.getByText('button 13')).toBeTruthy();
    expect(screen.getByText('button 14')).toBeTruthy();
    expect(screen.getByText('button 15')).toBeTruthy();
    expect(screen.queryByText('button 16')).toBeFalsy();
  });

  it('renders the correct number of item', () => {
    const component = renderGrid();
    act(() => jest.runAllTimers());

    const listElement = component.getByTestId('test-grid');
    expect(listElement).toHaveStyle({ transform: [{ translateY: 0 }] });

    testRemoteControlManager.handleRight();
    act(() => jest.runAllTimers());

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expectButtonToHaveFocus(component, 'button 2');
    expect(screen.getByText('button 3')).toBeTruthy();
    expect(screen.getByText('button 4')).toBeTruthy();
    expect(screen.getByText('button 5')).toBeTruthy();
    expect(screen.getByText('button 6')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.getByText('button 8')).toBeTruthy();
    expect(screen.getByText('button 9')).toBeTruthy();
    expect(screen.getByText('button 10')).toBeTruthy();
    expect(screen.getByText('button 11')).toBeTruthy();
    expect(screen.getByText('button 12')).toBeTruthy();
    expect(screen.getByText('button 13')).toBeTruthy();
    expect(screen.getByText('button 14')).toBeTruthy();
    expect(screen.getByText('button 15')).toBeTruthy();
    expect(screen.queryByText('button 16')).toBeFalsy();

    testRemoteControlManager.handleDown();
    act(() => jest.runAllTimers());
    expect(listElement).toHaveStyle({ transform: [{ translateY: -100 }] });

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 3')).toBeTruthy();
    expect(screen.getByText('button 4')).toBeTruthy();
    expect(screen.getByText('button 5')).toBeTruthy();
    expectButtonToHaveFocus(component, 'button 5');
    expect(screen.getByText('button 6')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.getByText('button 8')).toBeTruthy();
    expect(screen.getByText('button 9')).toBeTruthy();
    expect(screen.getByText('button 10')).toBeTruthy();
    expect(screen.getByText('button 11')).toBeTruthy();
    expect(screen.getByText('button 12')).toBeTruthy();
    expect(screen.getByText('button 13')).toBeTruthy();
    expect(screen.getByText('button 14')).toBeTruthy();
    expect(screen.getByText('button 15')).toBeTruthy();
    expect(screen.queryByText('button 16')).toBeFalsy();

    testRemoteControlManager.handleDown();
    act(() => jest.runAllTimers());
    expect(listElement).toHaveStyle({ transform: [{ translateY: -200 }] });

    expect(screen.queryByText('button 1')).toBeFalsy();
    expect(screen.queryByText('button 2')).toBeFalsy();
    expect(screen.queryByText('button 3')).toBeFalsy();
    expect(screen.getByText('button 4')).toBeTruthy();
    expect(screen.getByText('button 5')).toBeTruthy();
    expect(screen.getByText('button 6')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.getByText('button 8')).toBeTruthy();
    expectButtonToHaveFocus(component, 'button 8');
    expect(screen.getByText('button 9')).toBeTruthy();
    expect(screen.getByText('button 10')).toBeTruthy();
    expect(screen.getByText('button 11')).toBeTruthy();
    expect(screen.getByText('button 12')).toBeTruthy();
    expect(screen.getByText('button 13')).toBeTruthy();
    expect(screen.getByText('button 14')).toBeTruthy();
    expect(screen.getByText('button 15')).toBeTruthy();
    expect(screen.getByText('button 16')).toBeTruthy();
    expect(screen.getByText('button 17')).toBeTruthy();
    expect(screen.getByText('button 18')).toBeTruthy();
    expect(screen.queryByText('button 19')).toBeFalsy();

    expect(screen).toMatchSnapshot();
  });
});
