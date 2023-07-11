import { StyleSheet, View } from 'react-native';
import { SpatialNavigationVirtualizedList } from 'react-native-tv-spatial-navigation/src';
import { useCallback } from 'react';
import { PROGRAM_HEIGHT } from './Program';
import { SimpleNode } from './SimpleNode';

const NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN = 4;
const WINDOW_SIZE = NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN + 8;

export const VirtualizedSpatialList = ({
  numberOfItems,
  orientation,
  containerStyle,
}: {
  numberOfItems: number;
  orientation?: 'vertical' | 'horizontal';
  containerStyle?: object;
}) => {
  const renderItem = useCallback(() => <SimpleNode />, []);

  const indexes = Array.from(Array(numberOfItems).keys()).map((value) => {
    return {
      index: value,
    };
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <SpatialNavigationVirtualizedList
        orientation={orientation}
        data={indexes}
        renderItem={renderItem}
        itemSize={PROGRAM_HEIGHT + 50}
        numberOfRenderedItems={WINDOW_SIZE}
        numberOfItemsVisibleOnScreen={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
        onEndReachedThresholdItemsNumber={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    padding: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  row: { height: 320 },
  column: { height: 700, width: 265 },
});

export const VirtualizedRow = ({
  numberOfItems,
  containerStyle,
}: {
  numberOfItems: number;
  containerStyle?: object;
}) => (
  <VirtualizedSpatialList
    numberOfItems={numberOfItems}
    containerStyle={[containerStyle, styles.row]}
  />
);

export const VirtualizedColumn = ({
  numberOfItems,
  containerStyle,
}: {
  numberOfItems: number;
  containerStyle?: object;
}) => (
  <VirtualizedSpatialList
    numberOfItems={numberOfItems}
    orientation="vertical"
    containerStyle={[containerStyle, styles.column]}
  />
);
