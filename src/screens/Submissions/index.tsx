import {ActionSheet, SubmissionList} from '../../components';
import React from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {useSubmissionDataStore} from '../../stores';
import {TFilterModel, TSubmission} from '../../models';
import {useApplySubmissionFilters, useGetSubmissionsFilters} from '../../hooks';

export const Submissions: React.FC = () => {
  const [isOpenActionSheet, setIsOpenActionSheet] =
    React.useState<boolean>(false);
  const {submissions, deleteSubmission} = useSubmissionDataStore();
  const [filters, setFilters] = React.useState<{[key: string]: TFilterModel}>(
    {},
  );
  const [currentFilterShow, setCurrentFilterShow] = React.useState<string>('');
  const [currentSubmissions, setCurrentSubmissions] = React.useState<
    TSubmission[]
  >([]);
  const [filtersChange, setFiltersChange] = React.useState<boolean>(false);
  const getSubmissionsFilters = useGetSubmissionsFilters();
  const applySubmissionsFilters = useApplySubmissionFilters(
    submissions,
    filters,
  );

  React.useEffect(() => {
    setCurrentSubmissions(submissions);
  }, [submissions]);

  React.useEffect(() => {
    if (currentSubmissions.length > 0) {
      setFilters(prevFilters =>
        getSubmissionsFilters(currentSubmissions, prevFilters),
      );
    }
  }, [currentSubmissions, getSubmissionsFilters]);

  React.useEffect(() => {
    if (filtersChange) {
      setFiltersChange(false);
      const submissionsWhitFilters = applySubmissionsFilters();
      setCurrentSubmissions(submissionsWhitFilters);
    }
  }, [filtersChange, applySubmissionsFilters]);

  const handleFilterOnPress = (item: string) => {
    setFilters({
      ...filters,
      [currentFilterShow]: {
        ...filters[currentFilterShow],
        currentElement: item,
      },
    });
    setIsOpenActionSheet(false);
    setFiltersChange(true);
  };

  const handleClearFilters = () => {
    setCurrentFilterShow('');
    setFilters(getSubmissionsFilters(currentSubmissions, filters, true));
    setFiltersChange(true);
  };

  const handlePressSubmissionItem = (index: number) => {
    deleteSubmission(index);
  };

  return (
    <SafeAreaViewStyled edges={['top', 'left', 'right']}>
      {currentSubmissions.length > 0 ? (
        <>
          <ContainerFiltersList
            data={Object.values(filters)}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <FilterItem
                onPress={() => {
                  setCurrentFilterShow(item.id);
                  setIsOpenActionSheet(true);
                }}>
                {item.currentElement === null ? (
                  <Text>{item.label}</Text>
                ) : (
                  <Text>
                    {item.label}: {item.currentElement}
                  </Text>
                )}
              </FilterItem>
            )}
          />
          <ViewClearButtons>
            <TouchableOpacity onPress={() => handleClearFilters()}>
              <TextButtonClearFilters>CLEAR FILTERS</TextButtonClearFilters>
            </TouchableOpacity>
          </ViewClearButtons>
          <SubmissionList
            onPress={handlePressSubmissionItem}
            submissions={currentSubmissions}
          />
          <ActionsSheetsFilters
            isOpenActionSheet={isOpenActionSheet}
            setIsOpenActionSheet={setIsOpenActionSheet}
            data={filters[currentFilterShow]?.elements}
            handleFilterOnPress={handleFilterOnPress}
          />
        </>
      ) : (
        <ContainerNoData>
          <Text>There are no submissions to display.</Text>
        </ContainerNoData>
      )}
    </SafeAreaViewStyled>
  );
};

//Helper Components

const ActionsSheetsFilters: React.FC<{
  isOpenActionSheet: boolean;
  setIsOpenActionSheet: (status: boolean) => void;
  data: string[];
  handleFilterOnPress: (item: string) => void;
}> = ({isOpenActionSheet, setIsOpenActionSheet, data, handleFilterOnPress}) => (
  <ActionSheet
    setIsActionSheetOpen={setIsOpenActionSheet}
    isActionSheetOpen={isOpenActionSheet}>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({item}) => (
        <ButtonFiltersItem onPress={() => handleFilterOnPress(item)}>
          <Text>{item}</Text>
        </ButtonFiltersItem>
      )}
    />
  </ActionSheet>
);

const ContainerNoData = styled.View`
  background-color: #f5faf5;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SafeAreaViewStyled = styled(SafeAreaView)`
  background-color: #f5faf5;
`;

const ContainerFiltersList = styled.FlatList`
  background-color: #f5faf5;
  height: 58px;
` as unknown as typeof FlatList;

const ViewClearButtons = styled.View`
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const TextButtonClearFilters = styled.Text`
  color: black;
  font-weight: 600;
`;

const ButtonFiltersItem = styled.TouchableOpacity`
  background: white;
  padding: 10px;
  width: 100%;
  flex-direction: column;
  align-self: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom-width: 0.5px;
  border-color: gray;
`;

const FilterItem = styled.TouchableOpacity`
  border-radius: 13px;
  border: 1px solid gray;
  padding: 4px 15px;
  margin-left: 10px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;
