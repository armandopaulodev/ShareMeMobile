import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { Appbar, Banner, Button } from "react-native-paper";

import { Image, ScrollView } from "react-native";
import "react-native-gesture-handler";
import { Avatar, Card, Dialog, Portal, Text } from "react-native-paper";
import { ThemeContextProvider, useTheme } from "./src/context/ThemeContext";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const TestScreen = () => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();

  return (
    <View>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={() => {}} /> */}
        <Appbar.Content title="ShareMe" />
        <Appbar.Action icon="calendar" onPress={() => {}} />
        <Appbar.Action
          icon={isDarkTheme ? "moon-waning-crescent" : "white-balance-sunny"}
          onPress={toggleThemeType}
        />
      </Appbar.Header>
      <Banner
        visible={visible}
        actions={[
          {
            label: "Fix it",
            onPress: () => setVisible(false),
          },
          {
            label: "Learn more",
            onPress: () => setVisible(false),
          },
        ]}
        icon={({ size }) => (
          <Image
            source={{
              uri: "https://images.pexels.com/photos/4064969/pexels-photo-4064969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }}
            style={{
              width: size,
              height: size,
            }}
          />
        )}
      >
        Esse banner sera exibido apenas uma vez
      </Banner>
      <ScrollView
        style={{ marginLeft: "2%", marginRight: "2%", maxHeight:"100%", minHeight:'100%', height:'100%' }}
      >
        <Card style={{ marginTop: "2%" }} onPress={() => setVisible(!visible)}>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={LeftContent}
          />
          <Card.Content>
            <Text variant="titleLarge">Card title</Text>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content>
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
          <Card.Actions>
            <Button onPress={() => {}}>Cancel</Button>
            <Button onPress={() => {}}>Ok</Button>
          </Card.Actions>
        </Card>
        <Card style={{ marginTop: "2%" }}>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={LeftContent}
          />
          <Card.Content>
            <Text variant="titleLarge">Card title</Text>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content>
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
          <Card.Actions>
            <Button onPress={() => {}}>Cancel</Button>
            <Button onPress={() => {}}>Ok</Button>
          </Card.Actions>
        </Card>

        <Card style={{ marginTop: "2%" }}>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={LeftContent}
          />
          <Card.Content>
            <Text variant="titleLarge">Card title</Text>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content>
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
          <Card.Actions>
            <Button onPress={() => {}}>Cancel</Button>
            <Button onPress={() => {}}>Ok</Button>
          </Card.Actions>
        </Card>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={{ backgroundColor: "red" }}
          >
            <Dialog.Title>Alerta de Bateria fraca</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Apenas um exemplo de modal</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancelar</Button>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeContextProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Test"
          component={TestScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </ThemeContextProvider>
  );
};

export default App;
