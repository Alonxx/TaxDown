import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

interface Props {
  name: string;
  subTitle: string;
  onPress: () => void;
}

export const TaxCard: React.FC<Props> = ({name, subTitle, onPress}) => {
  return (
    <TaxItem testID="tax-item" onPress={() => onPress()}>
      <View>
        <TaxTitle>{name}</TaxTitle>
        <TextSubTitle>{subTitle}</TextSubTitle>
      </View>
    </TaxItem>
  );
};

const TaxItem = styled.TouchableOpacity`
  margin-top: 10px;
  background: white;
  padding: 10px;
  width: 80%;
  border-radius: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  align-self: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
`;

const TaxTitle = styled.Text`
  font-size: 22px;
  font-weight: 900;
  color: #74cd9d;
`;

const TextSubTitle = styled.Text`
  font-size: 12px;
  color: #85a192;
  font-weight: 600;
`;
