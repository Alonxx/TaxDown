import React from 'react';
import styled from 'styled-components/native';

interface Props {
  year: string;
  name: string;
  surname: string;
  age: string;
  index: number;
  onPress: (index: number) => void;
}

export const SubmissionCard: React.FC<Props> = ({
  year,
  name,
  surname,
  age,
  onPress,
  index,
}) => {
  return (
    <SubmissionItem testID={'submission-item'} onPress={() => onPress(index)}>
      <ContainterTitle>
        <TextTitle>Year: {year}</TextTitle>
        <TextInfo>Touch to delete</TextInfo>
      </ContainterTitle>
      <SubmissionBody>
        <TextItem ellipsizeMode="tail" numberOfLines={1}>
          Name: {trunc(name)}
        </TextItem>
        <TextItem ellipsizeMode="tail" numberOfLines={1}>
          Surname: {trunc(surname)}
        </TextItem>
        <TextItem>Age: {age}</TextItem>
      </SubmissionBody>
    </SubmissionItem>
  );
};

const trunc = (text: string) => {
  return text.length > 10 ? `${text.substr(0, 10)}...` : text;
};

const ContainterTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TextTitle = styled.Text`
  font-size: 17px;
  font-weight: 900;
  color: #74cd9d;
`;
const TextInfo = styled.Text`
  font-size: 12px;
`;

const SubmissionBody = styled.View`
  flex-direction: row;
`;

const TextItem = styled.Text`
  font-size: 14px;
  margin-right: 10px;
  width: 135px;
  color: #85a192;
`;

const SubmissionItem = styled.TouchableOpacity`
  background: white;
  padding: 10px;
  width: 100%;
  height: 70px;
  flex-direction: column;
  align-self: center;
  justify-content: space-between;
  border: 1px solid whitesmoke;
`;
