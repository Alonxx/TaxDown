import {TSubmission} from '../../models';
import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {SubmissionCard} from '../SubmissionCard';

interface Props {
  submissions: TSubmission[];
  onPress: (index: number) => void;
}

export const SubmissionList: React.FC<Props> = ({submissions, onPress}) => {
  return (
    <SubmissionFlatList
      data={submissions}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => (
        <SubmissionCard
          onPress={onPress}
          index={index}
          year={item.year}
          name={item.name}
          surname={item.surname}
          age={item.age}
        />
      )}
    />
  );
};

const SubmissionFlatList = styled.FlatList`
  background-color: #f5faf5;
  height: 100%;
` as unknown as typeof FlatList;
