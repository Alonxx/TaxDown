import {CameraPicker} from '../../components';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {ImagePickerResponse} from 'react-native-image-picker';
import {useSubmissionDataStore} from '../../stores';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ActivityIndicator} from 'react-native';

interface Props {
  route: RouteProp<
    {params: {taxYear: string; taxName: string; taxId: string}},
    'params'
  >;
  navigation: NativeStackNavigationProp<any, any>;
}

export const AddSubmissions: React.FC<Props> = ({
  route: {
    params: {taxYear, taxName, taxId},
  },
  navigation,
}) => {
  const [inputsValues, setInputsValues] = React.useState<{
    [key: string]: string;
  }>({});

  const [emptyInputs, setEmptyInputs] = React.useState<boolean>(false);

  const {
    postSubmissionTax,
    fetchSubmissionInputFields,
    currentSubmissionsFields,
    clearSubmissionsFields,
  } = useSubmissionDataStore();

  React.useEffect(() => {
    clearSubmissionsFields();
    fetchSubmissionInputFields(taxId);
  }, [taxId, fetchSubmissionInputFields, clearSubmissionsFields]);

  React.useEffect(() => {
    if (currentSubmissionsFields.length > 0) {
      const inputsFieldsToObjects = currentSubmissionsFields.reduce(
        (o, key) => ({
          ...o,
          [key.id]: '',
        }),
        {},
      );
      setInputsValues(inputsFieldsToObjects);
    }
  }, [currentSubmissionsFields]);

  const handleChangueInput = (text: string, id: string) => {
    setInputsValues(prevState => ({
      ...prevState,
      [id]: text,
    }));
    setEmptyInputs(false);
  };

  const handleCameraResponse = (response: ImagePickerResponse, id: string) => {
    if (response.assets && response.assets.length) {
      setInputsValues(prevState => ({
        ...prevState,
        [id]: response.assets![0].uri ?? '',
      }));
    }
  };

  const handleAddSubmission = () => {
    const checkInputsEmptys = Object.values(inputsValues).some(
      input => input === '',
    );

    if (checkInputsEmptys) {
      setEmptyInputs(true);
      return;
    } else {
      const submissionTaxWhitYear = {year: taxYear, ...inputsValues};
      postSubmissionTax(submissionTaxWhitYear, taxId);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView>
      <Container>
        <TextTitle>{taxName}</TextTitle>
        {currentSubmissionsFields.length > 0 ? (
          <>
            {currentSubmissionsFields.map(input => (
              <React.Fragment key={input.id}>
                <TextLabel>{input.label}</TextLabel>
                {input.type === 'picture' ? (
                  <CameraPicker
                    handlerCameraResponse={res =>
                      handleCameraResponse(res, input.id)
                    }>
                    <TextButtonCamera>📷</TextButtonCamera>
                  </CameraPicker>
                ) : (
                  <TextInputStyled
                    placeholder={input.placeholder}
                    maxLength={input.maxLength ?? undefined}
                    keyboardType={
                      input.type === 'number' ? 'numeric' : undefined
                    }
                    onChangeText={text => handleChangueInput(text, input.id)}
                  />
                )}
              </React.Fragment>
            ))}
            <ButtonStyled onPressOut={() => handleAddSubmission()}>
              <TextAddButton>Add Submission</TextAddButton>
            </ButtonStyled>
            {emptyInputs && (
              <TextError> * You must complete the entire form</TextError>
            )}
            <TextSubtittle>
              You can see all your submitted submissions on the Submissions
              screen
            </TextSubtittle>
          </>
        ) : (
          <ActivityIndicator size={'large'} />
        )}
      </Container>
    </SafeAreaView>
  );
};

const TextError = styled.Text`
  color: red;
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const TextTitle = styled.Text`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 30px;
`;

const TextInputStyled = styled.TextInput`
  width: 50%;
  border-bottom-width: 1px;
  border-color: gray;
  margin-bottom: 10px;
`;

const TextLabel = styled.Text`
  font-weight: 600;
`;

export const ButtonStyled = styled.TouchableOpacity`
  margin-top: 20px;
  background: #00dc5a;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  padding: 10px 40px;
  margin-bottom: 10px;
`;

export const TextAddButton = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

export const TextSubtittle = styled.Text`
  font-size: 10px;
  color: gray;
`;

const TextButtonCamera = styled.Text`
  font-size: 40px;
`;
