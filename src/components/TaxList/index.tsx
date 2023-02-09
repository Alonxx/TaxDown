import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {TTax} from '../../models';
import styled from 'styled-components/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSubmissionDataStore} from '../../stores';
import {TaxCard} from '../TaxCard';
import {FlatList} from 'react-native';

interface Props {
  taxes: TTax[];
  navigation?: NativeStackNavigationProp<any, any>;
}

export const TaxList: React.FC<Props> = ({taxes, navigation}) => {
  const {submissions} = useSubmissionDataStore();

  const checkSubmissionsForTax = (year: string) => {
    const checkSubmissionForYear = submissions.some(
      submission => submission.year === year,
    );

    return checkSubmissionForYear;
  };

  const handlerOnPressTaxItem = (item: TTax) => {
    return navigation?.navigate('Add Submissions', {
      taxYear: item.year,
      taxName: item.name,
      taxId: item.id,
    });
  };

  if (taxes.length > 0) {
    return (
      <View>
        <TaxFlatList
          data={taxes}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            const haveSubmissions = checkSubmissionsForTax(item.year);

            return (
              <TaxCard
                name={item.name}
                subTitle={
                  haveSubmissions
                    ? 'You sent submissions'
                    : 'You have not sent submissions'
                }
                onPress={() => handlerOnPressTaxItem(item)}
              />
            );
          }}
        />
      </View>
    );
  } else {
    return (
      <ViewLoading>
        <ActivityIndicator testID="activity-indicator" size={'large'} />
      </ViewLoading>
    );
  }
};

const ViewLoading = styled.View`
  align-items: center;
  margin-top: 50px;
  flex: 1;
`;

const TaxFlatList = styled.FlatList`
  background-color: #f5faf5;
  min-height: 100%;
` as unknown as typeof FlatList;
