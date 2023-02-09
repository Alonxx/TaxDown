import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

import {TabsNavigator} from './index';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('TabsNavigator component', () => {
  it('renders the component with tabs', async () => {
    const TestComponente = () => <></>;

    const tabs = [
      {
        name: 'Tab 1',
        component: TestComponente,
      },
      {
        name: 'Tab 2',
        component: TestComponente,
      },
    ];

    const {queryAllByText} = render(
      <NavigationContainer>
        <TabsNavigator tabs={tabs} />
      </NavigationContainer>,
    );

    tabs.forEach(tab => {
      expect(queryAllByText(tab.name)).toBeTruthy();
    });
  });
});
