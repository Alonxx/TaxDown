import React from 'react';
import {render, act, fireEvent} from '@testing-library/react-native';
import {TTax} from 'models';
import {TaxList} from './index';

const taxes: TTax[] = [
  {
    id: '1',
    year: '2021',
    name: 'Tax season 2021',
    active: true,
  },
  {
    id: '2',
    year: '2022',
    name: 'Tax season 2022',
    active: true,
  },
];

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const navigation = {
  navigate: jest.fn(),
};

describe('TaxList component', () => {
  it('renders the component with taxes cards', () => {
    const {queryAllByTestId} = render(
      <TaxList taxes={taxes} navigation={navigation as any} />,
    );

    expect(queryAllByTestId('tax-item')).toHaveLength(2);
  });

  it('renders a loading indicator when there are no taxes', () => {
    const {queryByTestId} = render(
      <TaxList taxes={[]} navigation={navigation as any} />,
    );

    expect(queryByTestId('activity-indicator')).toBeTruthy();
  });

  it('navigates to the Add Submissions screen when a tax item is pressed', () => {
    const {getAllByText} = render(
      <TaxList taxes={taxes} navigation={navigation as any} />,
    );

    const taxCard = getAllByText(taxes[0].name)[0];
    act(() => {
      fireEvent.press(taxCard);
    });

    expect(navigation.navigate).toHaveBeenCalledWith('Add Submissions', {
      taxYear: taxes[0].year,
      taxName: taxes[0].name,
      taxId: taxes[0].id,
    });
  });
});
