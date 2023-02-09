import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {TaxCard} from './index';

describe('TaxCard component', () => {
  it('renders the name and subTitle', () => {
    const onPress = jest.fn();
    const name = 'Tax season 2020';
    const subTitle = 'You have not sent submissions';
    const {getByText} = render(
      <TaxCard name={name} subTitle={subTitle} onPress={onPress} />,
    );

    expect(getByText(name)).toBeTruthy();
    expect(getByText(subTitle)).toBeTruthy();
  });

  it('calls onPress when the component is pressed', () => {
    const onPress = jest.fn();
    const name = 'Tax season 2020';
    const subTitle = 'You have not sent submissions';
    const {getByTestId} = render(
      <TaxCard name={name} subTitle={subTitle} onPress={onPress} />,
    );

    fireEvent.press(getByTestId('tax-item'));
    expect(onPress).toHaveBeenCalled();
  });
});
