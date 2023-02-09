import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {SubmissionCard} from './index';

describe('SubmissionCard component', () => {
  it('renders correctly', () => {
    const mockOnPress = jest.fn();
    const {getByText} = render(
      <SubmissionCard
        year="2021"
        name="Carlos"
        surname="Castillo"
        age="30"
        index={0}
        onPress={mockOnPress}
      />,
    );

    expect(getByText('Year: 2021')).toBeTruthy();
    expect(getByText('Touch to delete')).toBeTruthy();
    expect(getByText('Name: Carlos')).toBeTruthy();
    expect(getByText('Surname: Castillo')).toBeTruthy();
    expect(getByText('Age: 30')).toBeTruthy();
  });

  it('truncates name and surname correctly', () => {
    const mockOnPress = jest.fn();
    const {getByText} = render(
      <SubmissionCard
        year="2021"
        name="Carlos Doe Doe"
        surname="Castillo Doe Doe Doe"
        age="30"
        index={0}
        onPress={mockOnPress}
      />,
    );

    expect(getByText('Name: Carlos Doe...')).toBeTruthy();
    expect(getByText('Surname: Castillo D...')).toBeTruthy();
  });

  it('calls onPress function when pressed', () => {
    const mockOnPress = jest.fn();
    const {getByTestId} = render(
      <SubmissionCard
        year="2021"
        name="Carlos"
        surname="Castillo"
        age="30"
        index={0}
        onPress={mockOnPress}
      />,
    );

    fireEvent.press(getByTestId('submission-item'));
    expect(mockOnPress).toHaveBeenCalledWith(0);
  });
});
