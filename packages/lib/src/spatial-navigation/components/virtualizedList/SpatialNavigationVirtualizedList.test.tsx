import { RenderResult, act, render, screen } from '@testing-library/react-native';
import { ItemWithIndex } from '../virtualizedList/VirtualizedList';
import { PropsTestButton, TestButton } from '../tests/TestButton';
import { SpatialNavigationRoot } from '../Root';
import '../tests/helpers/configureTestRemoteControl';
import { SpatialNavigationVirtualizedList } from './SpatialNavigationVirtualizedList';
import { DefaultFocus } from '../../context/DefaultFocusContext';
import testRemoteControlManager from '../tests/helpers/testRemoteControlManager';

export const expectButtonToHaveFocus = (component: RenderResult, text: string) => {
  const element = component.getByRole('button', { name: text });
  expect(element).toHaveAccessibilityState({ selected: true });
};

describe('SpatialNavigationVirtualizedList', () => {
  const renderItem = ({ item }: { item: PropsTestButton & ItemWithIndex }) => (
    <TestButton title={item.title} onSelect={item.onSelect} />
  );

  const data = [
    { title: 'button 1', onSelect: () => undefined, index: 0 },
    { title: 'button 2', onSelect: () => undefined, index: 1 },
    { title: 'button 3', onSelect: () => undefined, index: 2 },
    { title: 'button 4', onSelect: () => undefined, index: 3 },
    { title: 'button 5', onSelect: () => undefined, index: 4 },
    { title: 'button 6', onSelect: () => undefined, index: 5 },
    { title: 'button 7', onSelect: () => undefined, index: 6 },
    { title: 'button 8', onSelect: () => undefined, index: 7 },
    { title: 'button 9', onSelect: () => undefined, index: 8 },
    { title: 'button 10', onSelect: () => undefined, index: 9 },
  ];

  const renderList = () =>
    render(
      <SpatialNavigationRoot>
        <DefaultFocus>
          <SpatialNavigationVirtualizedList
            testID="test-list"
            renderItem={renderItem}
            data={data}
            itemSize={100}
            width={300}
            numberOfRenderedItems={5}
            numberOfItemsVisibleOnScreen={3}
          />
        </DefaultFocus>
      </SpatialNavigationRoot>,
    );

  it('renders the correct number of item', () => {
    const component = renderList();
    act(() => jest.runAllTimers());

    expect(screen).toMatchSnapshot();

    const button1 = screen.getByText('button 1');
    expect(button1).toBeTruthy();
    expectButtonToHaveFocus(component, 'button 1');

    const button2 = screen.getByText('button 2');
    expect(button2).toBeTruthy();

    const button3 = screen.getByText('button 3');
    expect(button3).toBeTruthy();

    const button4 = screen.getByText('button 4');
    expect(button4).toBeTruthy();

    const button5 = screen.getByText('button 5');
    expect(button5).toBeTruthy();

    const button6 = screen.queryByText('button 6');
    expect(button6).toBeFalsy();
  });

  it('handles correctly RIGHT and RENDERS new elements accordingly while deleting elements that are too far from scroll', async () => {
    const component = renderList();
    act(() => jest.runAllTimers());

    const listElement = component.getByTestId('test-list');
    expect(listElement).toHaveStyle({ transform: [{ translateX: 0 }] });

    testRemoteControlManager.handleRight();
    act(() => jest.runAllTimers());
    expectButtonToHaveFocus(component, 'button 2');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -100 }] });

    expect(screen.getByText('button 1')).toBeTruthy();
    expect(screen.getByText('button 5')).toBeTruthy();
    expect(screen.queryByText('button 6')).toBeFalsy();

    testRemoteControlManager.handleRight();
    act(() => jest.runAllTimers());
    expectButtonToHaveFocus(component, 'button 3');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -200 }] });

    expect(screen.queryByText('button 1')).toBeFalsy();
    expect(screen.getByText('button 2')).toBeTruthy();
    expect(screen.getByText('button 6')).toBeTruthy();
    expect(screen.queryByText('button 7')).toBeFalsy();

    testRemoteControlManager.handleRight();
    act(() => jest.runAllTimers());
    expectButtonToHaveFocus(component, 'button 4');
    expect(listElement).toHaveStyle({ transform: [{ translateX: -300 }] });

    expect(screen.queryByText('button 2')).toBeFalsy();
    expect(screen.getByText('button 3')).toBeTruthy();
    expect(screen.getByText('button 7')).toBeTruthy();
    expect(screen.queryByText('button 8')).toBeFalsy();
  });
});
