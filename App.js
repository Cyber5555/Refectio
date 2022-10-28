import * as React from 'react';
import { Button, View, Text, Image, ScrollView, StyleSheet, StatusBar, Dimensions, ActivityIndicator } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthScreenComponent from './components/Auth/AuthScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from './components/AuthContext/context'
import LoginScreenComponent from './components/Auth/LoginScreen';
import RegisteredScreenComponent from './components/Auth/RegisteredScreen';
import RegistrationUserScreenComponent from './components/Auth/RegistrationUserScreen';
import RegistrationManufacturerComponent from './components/Auth/RegistrationManufacturer';
import ConfirmTelScreenComponent from './components/Auth/ConfirmTelScreen';
import CustomerMainPageComponent from './components/Customer/CustomerMainPage';
import GhostPageComponent from './components/Ghost/GhostPage';
import GhostPageTwoComponent from './components/Ghost/GhostPageTwo';
import DesignerPageComponent from './components/Designer/DesignerPage';
import EditPhoneNumberComponent from './components/Auth/EditPhoneNumber';
import DesignerPageTwoComponent from './components/Designer/DesignerPageTwo';
import CustomerPageTwoComponent from './components/Customer/CustomerPageTwo';
import ForgetPasswordComponent from './components/Auth/ForgetPassword';
import ForgetPasswordTelComponent from './components/Auth/ForgetPasswordTel';
import NewPasswordComponent from './components/Auth/NewPassword';
import DesignerMyBroniComponent from './components/Designer/DesignerMyBroni';
import MyAccauntComponent from './components/Designer/MyAccaunt';
import DesignerSavedComponent from './components/Designer/DesignerSaved';
import CustomerMyBroniComponent from './components/Customer/CustomerMyBroni';
import CustomerRewardsComponent from './components/Customer/CustomerRewards';
import CustomerMyAccauntComponent from './components/Customer/CustomerMyAccaunt';
import CheckDesignerComponent from './components/Customer/CheckDesigner';
import PraductiaComponent from './components/Customer/Praductia';
import AddProductComponent from './components/Customer/AddProduct';
import ModalComponent from './components/Ghost/Modal';
import EditPhoneNumberConfirmComponent from './components/Auth/EditPhoneNumberConfirm';
import EditPasswordCustomerCompnent from './components/Auth/EditPaswordCustomer';
import EditPhoneNumberDesignerComponent from './components/Auth/EditPhoneNumberDesigner';
import EditPhoneNumberDesignerConfirmComponent from './components/Auth/EditPhoneNumberDesignerConfirm';
import EditPasswordDesignerCompnent from './components/Auth/EditPaswordDesigner';




const Tab = createBottomTabNavigator();


function AuthScreen({ navigation }) {
  return (
    <AuthScreenComponent navigation={navigation} />
  );
}

function LoginScreen({ navigation }) {
  return (
    <LoginScreenComponent navigation={navigation} />
  );
}


function RegisteredScreen({ navigation }) {
  return (
    <RegisteredScreenComponent navigation={navigation} />
  );
}


function RegistrationUserScreen({ navigation }) {
  return (
    <RegistrationUserScreenComponent navigation={navigation} />
  )
}

function RegistrationManufacturer({ navigation }) {
  return (
    <RegistrationManufacturerComponent navigation={navigation} />
  )
}


function ConfirmTelScreenFunction({ route, navigation }) {

  const { params } = route.params;

  return (
    <ConfirmTelScreenComponent token={params} navigation={navigation} />
  )

}

function CustomerMainPage({ navigation }) {
  return (
    <CustomerMainPageComponent navigation={navigation} />
  );
}

function GhostPage({ navigation }) {
  return (
    <GhostPageComponent navigation={navigation} />
  );
}

function DesignerPage({ navigation }) {
  return (
    <DesignerPageComponent navigation={navigation} />
  );
}
function EditPhoneNumber({ navigation }) {
  return (
    <EditPhoneNumberComponent navigation={navigation} />
  );
}
function EditPhoneNumberConfirm({ route, navigation }) {

  const { params } = route.params

  return (
    <EditPhoneNumberConfirmComponen phoneNumb={params} navigation={navigation} />
  );
}

function EditPhoneNumberDesigner({ navigation }) {
  return (
    <EditPhoneNumberDesignerComponent navigation={navigation} />
  );
}

function EditPhoneNumberDesignerConfirm({ route, navigation }) {

  const { params } = route.params

  return (
    <EditPhoneNumberDesignerConfirmComponent phoneNumb={params} navigation={navigation} />
  );
}

function EditPasswordCustomer({ navigation }) {
  return (
    <EditPasswordCustomerCompnent navigation={navigation} />
  );
}

function GhostPageTwo({ navigation }) {
  return (
    <GhostPageTwoComponent navigation={navigation} />
  );
}
function DesignerPageTwo({ route, navigation }) {

  const { params } = route.params;

  return (
    <DesignerPageTwoComponent user_id={params} navigation={navigation} />
  );
}

function CustomerPageTwo({ route, navigation }) {


  const { params } = route.params;

  return (
    <CustomerPageTwoComponent userID={params} navigation={navigation} />
  );
}


function ForgetPassword({ navigation }) {
  return (
    <ForgetPasswordComponent navigation={navigation} />
  );
}
function ForgetPasswordTel({ navigation }) {
  return (
    <ForgetPasswordTelComponent navigation={navigation} />
  );
}

function NewPassword({ navigation }) {
  return (
    <NewPasswordComponent navigation={navigation} />
  );
}



function DesignerMyBroni({ navigation }) {
  return (
    <DesignerMyBroniComponent navigation={navigation} />
  )
}

function MyAccaunt({ navigation }) {
  return (
    <MyAccauntComponent navigation={navigation} />
  )
}

function DesignerSaved({ navigation }) {
  return (
    <DesignerSavedComponent navigation={navigation} />
  )
}

function CustomerMyBroni({ navigation }) {
  return (
    <CustomerMyBroniComponent navigation={navigation} />
  )
}

function CustomerRewards({ navigation }) {
  return (
    <CustomerRewardsComponent navigation={navigation} />
  )
}

function CustomerMyAccaunt({ navigation }) {
  return (
    <CustomerMyAccauntComponent navigation={navigation} />
  )
}

function CheckDesigner({ navigation }) {
  return (
    <CheckDesignerComponent navigation={navigation} />
  )
}

function PraductiaFunc({ route, navigation }) {

  const { params } = route.params;

  return (
    <PraductiaComponent id={params} navigation={navigation} />
  )
}

function AddProductScreen({ route, navigation }) {

  const { params } = route.params

  return (
    <AddProductComponent id={params} navigation={navigation} />
  )
}

function Modal({ navigation }) {
  return (
    <ModalComponent navigation={navigation} />
  )
}


const tabBarStyle = {
  height: 90,
  backgroundColor: 'white',
  elevation: 0,
  borderTopColor: 'white',
  width: Dimensions.get('window').width - 50,
  marginTop: 0,
  marginRight: 'auto',
  marginBottom: 0,
  marginLeft: 'auto',
}








export default function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [userRole, setUserRole] = React.useState(null);


  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userRole: null
  };



  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.userToken,
          userRole: action.userRole,

          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.userToken,
          userRole: action.userRole,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          userRole: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userToken: action.userToken,
          userRole: action.userRole,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      // setIsLoading(true);
      const userToken = String(foundUser.userToken);
      const userRole = String(foundUser.userRole);

      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userRole', userRole);

        console.log(userToken, 'userToken -  AFTER LOGIN')
        console.log(userRole, 'userRole -  AFTER LOGIN')

      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', userToken: userToken, userRole: userRole });

    },
    signOut: async (callback) => {
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userRole');

        setIsLoading(false);

      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
      callback();
    },
    signUp: () => {
      // setIsLoading(false);
    }
  }), []);


  // Проверка при входе в приложение.

  React.useEffect(() => {
    setTimeout(async () => {

      let userToken;
      let userRole;

      userToken = null;
      userRole = null;

      try {

        // await AsyncStorage.clear()

        userToken = await AsyncStorage.getItem('userToken');
        userRole = await AsyncStorage.getItem('userRole');

        console.log(userToken, 'userToken');
        console.log(userRole, 'userRole');

        setIsLoading(false);
        console.log('test')

      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', userToken: userToken, userRole: userRole });
    }, 1000);
  }, []);


  if (isLoading) {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={100} color="#00f" />
      </View>
    );
  } else {

    return (

      <AuthContext.Provider value={authContext}>

        <StatusBar
          animated={true}
          hidden={false}
          backgroundColor='white'
          barStyle="dark-content"
        />
        <NavigationContainer>

          {
            //  Designer Pages Tabs
            loginState.userToken !== null && loginState.userRole == '2' ? (
              <Tab.Navigator
                initialRouteName="DesignerPage"
                screenOptions={({ route }) => ({
                  tabBarShowLabel: false,
                  headerShown: false,
                  tabBarActiveTintColor: '#2EB6A5',
                  tabBarInactiveTintColor: 'gray',
                  tabBarStyle: tabBarStyle,

                })}
              >
                <Tab.Screen name="DesignerPage" component={DesignerPageComponent}
                  options={({ route }) => ({
                    tabBarButton: () => null,
                    tabBarStyle: { display: 'none' }
                  })}
                />

                <Tab.Screen name="DesignerMyBroni" component={DesignerMyBroniComponent}
                  options={({ route }) => ({
                    tabBarButton: () => null,
                    tabBarStyle: { display: 'none' }
                  })}
                />
                <Tab.Screen name="DesignerPageTwo" component={DesignerPageTwo}
                  options={({ route }) => ({
                    tabBarButton: () => null,
                    tabBarStyle: { display: 'none' }
                  })}
                />

                <Tab.Screen name="DesignerSaved" component={DesignerSavedComponent}
                  options={({ route }) => ({
                    tabBarButton: () => null,
                    tabBarStyle: { display: 'none' }
                  })}
                />
                <Tab.Screen name="MyAccaunt" component={MyAccauntComponent}
                  options={({ route }) => ({
                    tabBarButton: () => null,
                    tabBarStyle: { display: 'none' }
                  })}
                />
                <Tab.Screen name="EditPhoneNumberDesigner" component={EditPhoneNumberDesignerComponent}
                  options={({ route }) => ({
                    tabBarButton: () => null,
                    tabBarStyle: { display: 'none' }
                  })}
                />
                <Tab.Screen name="EditPhoneNumberDesignerConfirm" component={EditPhoneNumberDesignerConfirm}
                  options={({ route }) => ({
                    tabBarButton: () => null,
                    tabBarStyle: { display: 'none' }
                  })}
                />
                 <Tab.Screen name="EditPasswordDesigner" component={EditPasswordDesignerCompnent}
                    options={({ route }) => ({
                      tabBarButton: () => null,
                      tabBarStyle: { display: 'none' }
                    })}
                  />
              </Tab.Navigator>
            ) :


              // Customer Pages Tabs

              loginState.userToken !== null && loginState.userRole == '3' ? (
                <Tab.Navigator
                  initialRouteName="CustomerMainPage"
                  screenOptions={({ route }) => ({
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarActiveTintColor: '#2EB6A5',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: tabBarStyle,

                  })}
                >
                  <Tab.Screen name="CustomerMainPage" component={CustomerMainPageComponent}
                    options={({ route }) => ({
                      tabBarButton: () => null,
                      tabBarStyle: { display: 'none' }
                    })}
                  />
                  <Tab.Screen name="AddProduct" component={AddProductScreen}
                    options={({ route }) => ({
                      tabBarButton: () => null,
                      tabBarStyle: { display: 'none' }
                    })}
                  />
                  <Tab.Screen name="CheckDesigner" component={CheckDesignerComponent}
                    options={({ route }) => ({
                      tabBarButton: () => null,
                      tabBarStyle: { display: 'none' }
                    })}
                  />

                  <Tab.Screen name="CustomerMyAccaunt" component={CustomerMyAccauntComponent}
                    options={({ route }) => ({
                      tabBarButton: () => null,
                      tabBarStyle: { display: 'none' }
                    })}
                  />
                  <Tab.Screen name="CustomerMyBroni" component={CustomerMyBroniComponent}
                    options={({ route }) => ({
                      tabBarButton: () => null,
                      tabBarStyle: { display: 'none' }
                    })}
                  />
                  <Tab.Screen name="CustomerPageTwo" component={CustomerPageTwo}
                    options={({ route }) => ({
                      tabBarButton: () => null,
                      tabBarStyle: { display: 'none' }
                    })}
                  />
                  <Tab.Screen name="CustomerRewards" component={CustomerRewardsComponent}
                    options={({ route }) => ({
                      tabBarButton: () => null,
                      tabBarStyle: { display: 'none' }
                    })}
                  />
                  <Tab.Screen name="Praductia" component={PraductiaFunc}
                    options={({ route }) => ({
                      tabBarButton: () => null,
                      tabBarStyle: { display: 'none' }
                    })}
                  />
                  <Tab.Screen name="EditPhoneNumber" component={EditPhoneNumberComponent}
                    options={({ route }) => ({
                      tabBarButton: () => null,
                      tabBarStyle: { display: 'none' }
                    })}
                  />
                  <Tab.Screen name="EditPhoneNumberConfirm" component={EditPhoneNumberConfirm}
                    options={({ route }) => ({
                      tabBarButton: () => null,
                      tabBarStyle: { display: 'none' }
                    })}
                  />

                  <Tab.Screen name="EditPasswordCustomer" component={EditPasswordCustomerCompnent}
                    options={({ route }) => ({
                      tabBarButton: () => null,
                      tabBarStyle: { display: 'none' }
                    })}
                  />
                </Tab.Navigator>
              ) :

                // Guest pages tabs

                loginState.userToken == null ? (
                  <Tab.Navigator
                    initialRouteName="GhostPage"
                    screenOptions={({ route }) => ({
                      tabBarShowLabel: false,
                      headerShown: false,
                      tabBarActiveTintColor: '#2EB6A5',
                      tabBarInactiveTintColor: 'gray',
                      tabBarStyle: tabBarStyle,

                    })}
                  >
                    <Tab.Screen name="GhostPage" component={GhostPageComponent}
                      options={({ route }) => ({
                        tabBarButton: () => null,
                        tabBarStyle: { display: 'none' }
                      })}
                    />
                    <Tab.Screen name="LoginScreen" component={LoginScreenComponent}
                      options={({ route }) => ({
                        tabBarButton: () => null,
                        tabBarStyle: { display: 'none' }
                      })}
                    />
                    <Tab.Screen name="ConfirmTelScreen" component={ConfirmTelScreenFunction}
                      options={({ route }) => ({
                        tabBarButton: () => null,
                        tabBarStyle: { display: 'none' }
                      })}
                    />
                    <Tab.Screen name="RegisteredScreen" component={RegisteredScreenComponent}
                      options={({ route }) => ({
                        tabBarButton: () => null,
                        tabBarStyle: { display: 'none' }
                      })}
                    />
                    <Tab.Screen name="RegisteredUserScreen" component={RegistrationUserScreenComponent}
                      options={({ route }) => ({
                        tabBarButton: () => null,
                        tabBarStyle: { display: 'none' }
                      })}
                    />
                    <Tab.Screen name="RegistrationManufacturer" component={RegistrationManufacturerComponent}
                      options={({ route }) => ({
                        tabBarButton: () => null,
                        tabBarStyle: { display: 'none' }
                      })}
                    />
                    <Tab.Screen name="AuthScreen" component={AuthScreenComponent}
                      options={({ route }) => ({
                        tabBarButton: () => null,
                        tabBarStyle: { display: 'none' }
                      })}
                    />
                    <Tab.Screen name="GhostPageTwo" component={GhostPageTwoComponent}
                      options={({ route }) => ({
                        tabBarButton: () => null,
                        tabBarStyle: { display: 'none' }
                      })}
                    />
                    <Tab.Screen name="ForgetPassword" component={ForgetPasswordComponent}
                      options={({ route }) => ({
                        tabBarButton: () => null,
                        tabBarStyle: { display: 'none' }
                      })}
                    />
                    <Tab.Screen name="ForgetPasswordTel" component={ForgetPasswordTelComponent}
                      options={({ route }) => ({
                        tabBarButton: () => null,
                        tabBarStyle: { display: 'none' }
                      })}
                    />
                    <Tab.Screen name="NewPassword" component={NewPasswordComponent}
                      options={({ route }) => ({
                        tabBarButton: () => null,
                        tabBarStyle: { display: 'none' }
                      })}
                    />
                    <Tab.Screen name="Modal" component={ModalComponent}
                      options={({ route }) => ({
                        tabBarButton: () => null,
                        tabBarStyle: { display: 'none' }
                      })}
                    />
                  </Tab.Navigator>
                ) : <></>
          }
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
}