import React from 'react';
import 'react-native';
import {render, fireEvent} from '@testing-library/react-native';
import {CameraPicker} from './index';
import {launchCamera} from 'react-native-image-picker';
import {Text} from 'react-native';

jest.mock('react-native-image-picker', () => {
  return {
    launchCamera: jest.fn(),
  };
});

describe('CameraPicker', () => {
  it('should launch camera when button is pressed', () => {
    const handlerCameraResponse = jest.fn();
    const {getByText} = render(
      <CameraPicker handlerCameraResponse={handlerCameraResponse}>
        <Text>Open Camera</Text>
      </CameraPicker>,
    );

    fireEvent.press(getByText('Open Camera'));

    expect(launchCamera).toHaveBeenCalledWith(
      {mediaType: 'photo'},
      handlerCameraResponse,
    );
  });
});
