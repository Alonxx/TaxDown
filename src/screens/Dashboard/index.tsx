import {RouteProp, ParamListBase} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Share, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {TaxList, TabsNavigator} from '../../components';
import {useTaxesDataStore, useUserDataStore} from '../../stores';

export const Dashboard: React.FC = () => {
  const {fetchTaxes, taxes} = useTaxesDataStore();
  const {setLogOutUser} = useUserDataStore();

  useEffect(() => {
    fetchTaxes();
  }, [fetchTaxes]);

  const handleShare = () => {
    Share.share({
      message: 'Use Taxdown and save on your income statement! 💯',
    });
  };

  const handleLogOut = () => {
    setLogOutUser();
  };

  const ActiveTaxes = (props: {
    route: RouteProp<ParamListBase, string>;
    navigation: any;
  }) => <TaxList {...props} taxes={taxes.filter(tax => tax.active)} />;
  const InactiveTaxes = (props: {
    route: RouteProp<ParamListBase, string>;
    navigation: any;
  }) => <TaxList {...props} taxes={taxes.filter(tax => !tax.active)} />;

  const tabs = [
    {
      name: 'Active Taxes',
      component: ActiveTaxes,
    },
    {
      name: 'Inactive Taxes',
      component: InactiveTaxes,
    },
  ];

  return (
    <Container>
      <SafeAreaViewStyled edges={['top', 'left', 'right']}>
        <TouchableOpacity onPress={handleLogOut}>
          <TextButtonCloseSession>LOGOUT</TextButtonCloseSession>
        </TouchableOpacity>
        <TitleContainer>
          <TextTitle>My taxes 📋</TextTitle>
          <ButtonView>
            <ShareButton onPress={handleShare}>
              <ShareButtonText>Share the app 🙌</ShareButtonText>
            </ShareButton>
          </ButtonView>
        </TitleContainer>
        <TaxesContainer>
          <TabsNavigator tabs={tabs} />
        </TaxesContainer>
      </SafeAreaViewStyled>
    </Container>
  );
};

const TextButtonCloseSession = styled.Text`
  color: black;
  font-weight: 600;
  margin-left: 20px;
  margin-top: 30px;
  font-size: 14px;
`;

const SafeAreaViewStyled = styled(SafeAreaView)`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f5faf5;
`;

const TitleContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const TextTitle = styled.Text`
  color: #2f2e46;
  font-size: 34px;
  font-weight: 600;
`;

const TaxesContainer = styled.View`
  flex: 3;
`;

const ButtonView = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const ShareButton = styled.TouchableOpacity`
  background: #00dc5a;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  padding: 10px 40px;
`;

export const ShareButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;
