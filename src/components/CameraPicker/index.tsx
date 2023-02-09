import React, {ReactNode} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ImagePickerResponse, launchCamera} from 'react-native-image-picker';

interface Props {
  handlerCameraResponse: (response: ImagePickerResponse) => void;
  children: ReactNode;
}

export const CameraPicker: React.FC<Props> = ({
  handlerCameraResponse,
  children,
}) => {
  const handleImagePicker = () =>
    launchCamera({mediaType: 'photo'}, handlerCameraResponse);

  return (
    <View>
      <TouchableOpacity onPress={handleImagePicker}>
        {children}
      </TouchableOpacity>
    </View>
  );
};
