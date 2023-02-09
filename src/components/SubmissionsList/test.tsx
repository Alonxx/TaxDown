import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {SubmissionList} from './index';

describe('SubmissionList', () => {
  it('renders a list of submissions', () => {
    const submissions = [
      {
        year: '2020',
        name: 'Carlos',
        surname: 'Castillos',
        age: '30',
      },
      {
        year: '2021',
        name: 'Juan',
        surname: 'Pedro',
        age: '28',
      },
    ];

    const onPress = jest.fn();
    const {queryAllByTestId} = render(
      <SubmissionList submissions={submissions} onPress={onPress} />,
    );
    expect(queryAllByTestId('submission-item')).toHaveLength(2);
  });

  it('calls onPress when a submission is pressed', () => {
    const submissions = [
      {
        year: '2020',
        name: 'Carlos',
        surname: 'Castillos',
        age: '30',
      },
    ];

    const onPress = jest.fn();
    const {getByTestId} = render(
      <SubmissionList submissions={submissions} onPress={onPress} />,
    );

    fireEvent.press(getByTestId('submission-item'));
    expect(onPress).toHaveBeenCalledWith(0);
  });
});
