import React from 'react';
import {render} from '@testing-library/react-native';
import {ActionSheet} from './index';
import {View} from 'react-native';

describe('ActionSheet', () => {
  it('renders correctly when isActionSheetOpen is false', () => {
    const {queryByTestId} = render(
      <ActionSheet isActionSheetOpen={false} setIsActionSheetOpen={jest.fn()}>
        <View testID="test-child" />
      </ActionSheet>,
    );
    expect(queryByTestId('test-child')).toBeNull();
  });

  it('renders correctly when isActionSheetOpen is true', () => {
    const {getByTestId} = render(
      <ActionSheet isActionSheetOpen={true} setIsActionSheetOpen={jest.fn()}>
        <View testID="test-child" />
      </ActionSheet>,
    );
    expect(getByTestId('test-child')).toBeDefined();
  });
});
