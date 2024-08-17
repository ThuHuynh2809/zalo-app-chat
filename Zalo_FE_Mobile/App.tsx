import {SafeAreaView, Text} from 'react-native';
import StackNavigator from './src/navigations/StackNavigator';
import {UserContext} from './src/store/UserContext';
import store from './src/reduxToolkit/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <UserContext>
          <StackNavigator />
        </UserContext>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
