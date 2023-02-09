import React from 'react';
import {SafeAreaView} from 'react-native';
import {useUserDataStore} from '../../stores';
import styled from 'styled-components/native';

export const Login: React.FC = () => {
  const [emptyInputs, setEmptyInputs] = React.useState<Boolean>(false);

  const [inputsValues, setInputsValues] = React.useState<{
    email: '';
    password: '';
  }>({
    email: '',
    password: '',
  });

  const {setLoginUser} = useUserDataStore();

  const handleChangueInput = (text: string, id: string) => {
    setInputsValues(prevState => ({
      ...prevState,
      [id]: text,
    }));
    setEmptyInputs(false);
  };

  const handleLoginUser = () => {
    const checkInputsEmptys = Object.values(inputsValues).some(
      input => input === '',
    );

    if (checkInputsEmptys) {
      setEmptyInputs(true);
      return;
    } else {
      setLoginUser(inputsValues.email);
    }
  };

  return (
    <SafeAreaView>
      <ViewContainer>
        <ContainerLogo>
          <ImageLogo source={require('../../assets/logo.png')} />
        </ContainerLogo>
        <ViewInputsContainer>
          <ViewInputs>
            <TextTitle>Email</TextTitle>
            <TextInputStyled
              onChangeText={text => handleChangueInput(text, 'email')}
            />
          </ViewInputs>
          <ViewInputs>
            <TextTitle>Password</TextTitle>
            <TextInputStyled
              onChangeText={text => handleChangueInput(text, 'password')}
              secureTextEntry={true}
              textContentType="password"
            />
          </ViewInputs>
        </ViewInputsContainer>
        {emptyInputs && (
          <TextError> * You must complete the entire form</TextError>
        )}

        <ViewButtonsContainer>
          <ButtonStyled onPress={handleLoginUser}>
            <TextStyled>LOG IN</TextStyled>
          </ButtonStyled>
          <ButtonStyled onPress={handleLoginUser}>
            <TextStyled>SIGN UP</TextStyled>
          </ButtonStyled>
        </ViewButtonsContainer>
      </ViewContainer>
    </SafeAreaView>
  );
};

const ContainerLogo = styled.View`
  width: 300px;
  height: 45px;
  margin-bottom: 30px;
`;

const ImageLogo = styled.Image`
  flex: 1;
  height: 100%;
  width: 100%;
`;

const TextError = styled.Text`
  color: red;
`;

const TextTitle = styled.Text`
  font-weight: 600;
`;

const ViewInputs = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ViewContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ViewInputsContainer = styled.View`
  height: 180px;
  width: 50%;
  align-items: center;
`;

const ViewButtonsContainer = styled.View`
  width: 100%;
  height: 80px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
`;

const TextInputStyled = styled.TextInput`
  width: 100%;
  border-bottom-width: 1px;
  border-color: gray;
`;

const TextStyled = styled.Text`
  color: white;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;

const ButtonStyled = styled.TouchableOpacity`
  height: 30px;
  width: 200px;
  border-radius: 50px;
  background-color: #00dc5a;
  align-items: center;
  justify-content: center;
`;
